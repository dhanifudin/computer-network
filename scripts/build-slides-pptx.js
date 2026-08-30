#!/usr/bin/env node
// Converts each top-level slide deck (slides/*.md) to its own .pptx via
// marp-cli, one deck at a time with a per-deck timeout - so a single
// hung Chrome render (marp's PPTX export drives headless Chrome, same
// as book/pdf's rendering) can't wedge the whole batch or silently take
// every other deck down with it.
//
// Usage: node scripts/build-slides-pptx.js [outDir]
//   outDir defaults to dist/pptx/
// CI passes the Pages staging dir, e.g.:
//   node scripts/build-slides-pptx.js "$SITE/slides/pptx"
//
// Requires: network access for the first `npx --yes @marp-team/marp-cli`
// resolution (cached after that), and a Chrome/Chromium marp-cli can
// find - GitHub Actions' ubuntu-latest runners ship Google Chrome
// preinstalled, so CI needs no extra install step.

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SLIDES_DIR = path.join(ROOT, 'slides');
const THEME = path.join(ROOT, 'themes', 'hankyong.css');
const OUT_DIR = path.resolve(process.argv[2] || path.join(ROOT, 'dist', 'pptx'));

const PER_DECK_TIMEOUT_MS = 120000; // marp+chrome startup is heavier than a bare --print-to-pdf
const WARMUP_TIMEOUT_MS = 300000; // first npx call may need to download marp-cli itself

function listDecks() {
  // Top-level slides/*.md only - slides/_shared/ and slides/_template/
  // hold partials and a scaffold, not standalone decks.
  return fs.readdirSync(SLIDES_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();
}

function deckTitle(mdPath) {
  const text = fs.readFileSync(mdPath, 'utf8');
  const heading = text.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return path.basename(mdPath, '.md');
}

// Runs a child process with a hard timeout, killing it if it overruns.
// Async spawn (not spawnSync) throughout: a blocked event loop can't
// happen here the way it did in build-book-pdfs.js (no server to serve),
// but a hung marp/chrome process still needs to be killable from the
// timer, which spawnSync's own built-in timeout can't do cleanly for a
// process tree that ignores SIGTERM - SIGKILL via spawn's handle can.
function run(cmd, args, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {
      cwd: ROOT,
      // stdio: 'pipe' (the default) leaves the child's stdin open with
      // no writer and no EOF. marp-cli detects that as "input may be
      // piped in" and blocks waiting for it - even though the markdown
      // path was already given as a positional arg - which silently
      // wedges the process forever with no error. 'ignore' avoids that;
      // convertDeck() also passes --no-stdin as the documented
      // belt-and-braces fix marp-cli itself suggests for this.
      stdio: ['ignore', 'pipe', 'pipe'],
      // marp-cli only skips Chrome's own sandbox automatically when
      // running as root; under a non-root sandboxed/containerized shell
      // (true both for local dev here and for CI runners) Chrome's
      // sandbox setup can hang on shutdown even after it finishes
      // rendering. CHROME_NO_SANDBOX is marp-cli's documented escape
      // hatch for that. The timeout below stays as a safety net for a
      // genuine hang either way, not as the primary fix for either issue.
      env: { ...process.env, CHROME_NO_SANDBOX: '1' },
    });
    let stderr = '';
    child.stderr.on('data', (d) => { stderr += d; });
    child.stdout.on('data', () => {}); // drain, avoid backpressure stalls
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      resolve({ ok: false, reason: 'timed out', stderr });
    }, timeoutMs);
    child.on('exit', (code) => {
      clearTimeout(timer);
      resolve({ ok: code === 0, reason: stderr || `exit code ${code}`, stderr });
    });
    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ ok: false, reason: err.message, stderr });
    });
  });
}

function convertDeck(mdPath, outPath) {
  return run('npx', [
    '--yes', '@marp-team/marp-cli',
    mdPath,
    '--no-stdin',
    '--theme-set', THEME,
    '--html',
    '--pptx',
    '--allow-local-files',
    '-o', outPath,
  ], PER_DECK_TIMEOUT_MS);
}

function buildIndexHtml(entries) {
  const items = entries.map((e) =>
    `  <li><a href="./${e.file}">${e.title}</a></li>`
  ).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lecture Slides - PowerPoint</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:2rem auto;padding:0 1.5rem;color:#1A1A1A;}
  h1{font-size:1.4rem;}
  ul{list-style:none;padding:0;} li{margin:.3rem 0;}
  a{color:#00A79E;text-decoration:none;} a:hover{text-decoration:underline;}
</style>
</head>
<body>
<h1>Intelligent Network Design - Lecture Slides, as PowerPoint</h1>
<p>Each deck below is also available as its own .pptx file. For the interactive version, see the <a href="../">slides</a>.</p>
<ul>
${items}
</ul>
</body>
</html>
`;
}

async function main() {
  if (!fs.existsSync(SLIDES_DIR)) {
    console.error(`${SLIDES_DIR} not found.`);
    process.exit(1);
  }

  console.log('Resolving marp-cli...');
  const warmup = await run('npx', ['--yes', '@marp-team/marp-cli', '--version'], WARMUP_TIMEOUT_MS);
  if (!warmup.ok) {
    console.error(`marp-cli did not resolve (${warmup.reason}). Aborting.`);
    process.exit(1);
  }

  const decks = listDecks();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Converting ${decks.length} decks to PPTX...`);
  const entries = [];
  let failures = 0;
  for (const deck of decks) {
    const mdPath = path.join(SLIDES_DIR, deck);
    const name = path.basename(deck, '.md');
    const outPath = path.join(OUT_DIR, `${name}.pptx`);
    const result = await convertDeck(mdPath, outPath);
    if (!result.ok) {
      console.error(`FAILED (${result.reason}): ${deck}`);
      failures += 1;
      process.exitCode = 1;
      continue;
    }
    console.log(`  ${deck} -> ${path.relative(ROOT, outPath)}`);
    entries.push({ file: `${name}.pptx`, title: deckTitle(mdPath) });
  }

  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildIndexHtml(entries));
  const okCount = decks.length - failures;
  console.log(`Done. ${okCount}/${decks.length} decks + index.html written to ${path.relative(ROOT, OUT_DIR)}`);
}

main();
