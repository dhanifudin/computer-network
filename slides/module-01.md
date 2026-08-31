---
marp: true
theme: hankyong
paginate: true
footer: 'School of Computer & Applied Mathematics'
---

<!-- SLOT 1: Title -->
<!-- _class: title -->

# Module 1: Orientation & Lab Environment

<span class="subtitle">Intelligent Network Design (지능형네트워크설계)</span>

<div class="meta">
Amalia · School of Computer & Applied Mathematics · 한경국립대학교
</div>

---

<!-- SLOT 2: Where we are -->

# Where We Are

<div class="roadmap">
<div class="wk now"><div class="n">Wk 1</div><div class="t">Orientation</div></div>
<div class="wk"><div class="n">Wk 2</div><div class="t">Network Review 1</div></div>
<div class="wk"><div class="n">Wk 3</div><div class="t">Basic Config</div></div>
<div class="wk"><div class="n">Wk 4</div><div class="t">IOS Management</div></div>
<div class="wk"><div class="n">Wk 5</div><div class="t">Static Routing</div></div>
<div class="wk"><div class="n">Wk 6</div><div class="t">Dynamic Routing</div></div>
<div class="wk"><div class="n">Wk 7</div><div class="t">ACLs</div></div>
<div class="wk review"><div class="n">Wk 8</div><div class="t">Midterm Exam</div></div>
<div class="wk"><div class="n">Wk 9</div><div class="t">VLANs</div></div>
<div class="wk"><div class="n">Wk 10</div><div class="t">WAN: PPP &amp; NAT</div></div>
<div class="wk"><div class="n">Wk 11</div><div class="t">OSPF</div></div>
<div class="wk"><div class="n">Wk 12</div><div class="t">DHCP</div></div>
<div class="wk review"><div class="n">Wk 13</div><div class="t">Proposal Presentation</div></div>
<div class="wk review"><div class="n">Wk 14</div><div class="t">Results Presentation</div></div>
<div class="wk review"><div class="n">Wk 15</div><div class="t">Final Exam</div></div>
</div>

---

<!-- PRELUDE: Course logistics (outside spine numbering, see SPINE.md) -->

# Course Goal

Build and operate computer networks using **Cisco Packet Tracer**.

This course builds on your prior Computer Networks course - you already
understand the theory. Here you **implement, observe failures, and fix
them**.

By the end of the semester: design, build, and present a complete simulated
network integrating every technology covered in the weekly labs.

---

<!-- _class: section -->

# Course Logistics
<div class="driving-q">Read once now, use all semester.</div>

---

## Teaching Methods

| Method | Description |
|--------|-------------|
| Lecture (강의) | Brief concept intro at the start of each session |
| Lab Practice (실험·실습) | Hands-on Packet Tracer guided labs - the majority of class time |
| PBL | Each module begins with a real-world problem your configuration must solve |
| Capstone Design | Weeks 13–14: design, build, present a complete network project |

---

## Grading

| Component | Weight |
|-----------|--------|
| Attendance (출석) | 10% |
| Midterm Exam (중간평가) - Week 8 | 30% |
| Final Exam (기말평가) - Week 15 | 30% |
| Lab Reports / Assignments (과제) | 10% |
| Other (project, participation) | 20% |

Lab reports (실습결과보고서) due on the LMS within one week of each session.

---

## Lab Rules

1. **Save constantly** - Packet Tracer does not auto-save. `StudentID_ModuleN.pka`
2. **Personalize your configs** - hostname = your name, IP addressing = your student ID
3. **Document as you go** - screenshot every step marked 📸
4. **Use Simulation Mode** - watch packets hop-by-hop
5. **No late reports without prior approval** - 20%/day penalty
6. **Packet Tracer has no internet connectivity by default** - every "internet"/ISP hop is something you build yourself, see this module's Guided Lab

---

## How Each Module Is Structured

| Section | Purpose |
|---------|---------|
| The pain | The real-world problem this week's technology solves |
| Learning outcomes | What you can do after the lab |
| Origin & core concept | Where the idea came from, its first formal definition |
| Mechanics & worked example | Configuration patterns, applied to the running lab topology |
| Common mistakes / check yourself | Pitfalls, then a quick recall check |
| Limits | What this technique cannot do - next week's pain |

---

<!-- SLOT 3+4: Recap and the pain -->
<!-- _class: callout -->

# You Can't Open a Textbook Diagram at 3 AM

<span class="thread">Last time: you know the theory of packets, but not how to interrogate a live system when it breaks.</span>

<div class="pain">

You've studied how packets travel across networks in theory. But when a
network actually breaks, there's no diagram to open - you have to
interrogate the live system in front of you: its IP address, its routing
decisions, the path a packet takes, what names resolve to what addresses.

</div>

---

<!-- SLOT 5: Cost of not knowing -->
<!-- _class: callout -->

# What This Actually Costs

- Without these tools, "the network is broken" stays a guess, not a diagnosis
- Hours lost rebooting things randomly instead of reading what the OS already knows

<div class="why">
<strong>In industry:</strong> every help-desk and NOC role starts here - reading <code>ipconfig</code>/<code>traceroute</code>/<code>dig</code> output cold is table-stakes for any junior network role.
</div>

---

<!-- SLOT 6: Driving question -->
<!-- _class: section -->

# This Module's Question

<div class="driving-q">"How do you read a live network's true state without opening a textbook diagram?"</div>

---

<!-- SLOT 7: Learning outcomes -->

# By the End of This Module, You Can

1. Launch Packet Tracer and describe each workspace panel
2. Use `ipconfig`/`ip addr`, `ping`, `tracert`/`traceroute`, `nslookup`/`dig` to read network state
3. Explain what each command's output means and which OSI layer it queries
4. Build a minimal 2-PC topology and verify connectivity with `ping`

---

<!-- SLOT 8: Origin -->

# Where These Tools Came From

`ping` was written by Mike Muuss in 1983 for early ARPANET troubleshooting -
named after sonar. `traceroute` (Van Jacobson, 1987) exploits a field
already in every IP packet: TTL. `nslookup`/`dig` query DNS (Mockapetris,
1983), the system built to replace one giant shared hostname file. None of
these are new inventions - they're 40-year-old tools still standard because
the problem they solve never went away.

---

<!-- SLOT 9: Core concept -->

# L3 Host State: Definition

> Every network interface carries three pieces of Layer-3 state - its **IP
> address**, its **subnet mask** (the local network boundary), and its
> **default gateway** (the router for everything outside it). The OS's
> **routing table** decides, per packet, where it goes next.

---

<!-- Act 3 / BUILD -->

# How the Diagnostic Commands Work

- **`ping`** - sends ICMP Echo Request. Same subnet → direct (via ARP); otherwise → default gateway
- **`tracert`/`traceroute`** - increments TTL by one each probe; each router along the path replies "Time Exceeded," revealing the hop-by-hop route
- **`nslookup`/`dig`** - queries a DNS resolver, translating hostname → IP

> "Website works by IP but not by name" → DNS is broken, not the network.

---

# Cable Selection Rules

| Connection | Cable Type | Why |
|------------|-----------|-----|
| PC ↔ Switch / Router | Straight-through | Unlike devices |
| Switch ↔ Router | Straight-through | Unlike devices |
| PC ↔ PC / Switch ↔ Switch | Crossover | Like devices |
| PC ↔ Router console | Rollover | Management only |

**T-568A vs T-568B** (TIA/EIA-568): straight-through = same standard both
ends; crossover = A on one end, B on the other, swapping TX/RX pairs.
Modern switches use **Auto-MDIX** to detect and correct automatically.

---

<!-- SLOT N-2: Worked example -->

# Guided Lab at a Glance

**Part A** - interrogate your own machine: `ipconfig`/`ip addr`, ping the
gateway, traceroute to 8.8.8.8, `nslookup`/`dig`

**Part B** - Packet Tracer orientation: workspace, device list, Simulation
vs Realtime mode

**Part C** - first topology: two PCs, crossover cable, static IPs, verify
with `ping`

---

<!-- SLOT N-1: Common mistakes -->

# Common Mistakes

- **Wrong cable, blaming the interface:** a red link light after a
  straight-through cable between two switches is a cabling mistake, not a
  hardware failure - check Auto-MDIX before you assume anything is broken
- **Confusing DNS failure with network failure:** if `ping <IP>` works but
  `ping <hostname>` doesn't, the *network* is fine - go fix DNS, not routing

---

<!-- SLOT N: Check yourself -->

# Check Yourself

1. What layer of the OSI model does `ping` operate at, and what protocol does it use?
2. What happens to a packet destined for a remote network when no default gateway is configured?

---

# Answers

1. Layer 3 (Network) - `ping` uses **ICMP** Echo Request/Reply
2. The packet cannot leave the local subnet - with no gateway, the host has no path to anywhere off-link, so the packet is dropped

---

<!-- SLOT N+1+N+2: Limits and bridge -->
<!-- _class: callout -->

# What This Module's Tools Cannot Do

<div class="limits">
You can now read one host's state and build a 2-PC LAN. But you don't yet
know what happens to a packet's headers as it crosses a switch and a
router - the OSI/TCP-IP mechanics are still a black box.
</div>

<span class="thread">Next: Module 2 opens the box - the OSI/TCP-IP models, watched live in Simulation Mode.</span>

---

<!-- SLOT N+3: Summary -->

# Summary

- Diagnostic commands read L3 state without needing a diagram
- Cable type matters - Auto-MDIX doesn't excuse skipping the rule
- **Deliverables & assessment:** 4 annotated command screenshots, PT topology
  + successful ping, crossover cable explanation - see the book for the full
  rubric

---

<!-- SLOT N+4: Thank You -->
<!-- _class: end -->

# Thank You

<div class="meta">Full step-by-step lab instructions: <a href="../book/module-01.html">Open Module 1 in the Book</a></div>
