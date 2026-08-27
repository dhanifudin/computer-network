---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 4
## IOS Management Commands

---

## Why This Matters

Midnight call: a branch office can't reach headquarters. You log in remotely. Running config looks fine — but something's wrong.

Interface down? Duplicate IP? Stray ACL? Missing route?

IOS `show` commands are the **MRI scan** of a router: they reveal live internal state of every subsystem in seconds.

Engineers who memorize the ten most important `show` commands — and know how to read them — fix what stumps everyone else.

---

## Learning Outcomes

1. Use `?` (context-sensitive help) to discover commands
2. Execute and interpret key `show` commands
3. Configure all interfaces (IP, `no shutdown`) and verify
4. Back up running config to NVRAM; explain RAM/NVRAM
5. Compare running-config vs startup-config

---

## Theory Review — Interface States

```
FastEthernet0/0 is up, line protocol is up
```

- **First status** — Physical layer: is there a cable/signal?
  - `administratively down` → someone ran `shutdown` (fix: `no shutdown`)
- **Second status** — Data Link layer: is the keepalive/protocol working?
  - L1 down ⇒ L2 always down
  - L1 up, L2 down → often an encapsulation mismatch (WAN links)

---

## Theory Review — Key `show` Commands

| Command | Reveals |
|---------|---------|
| `show version` | IOS version, uptime, memory |
| `show ip interface brief` | Compact table: all interfaces, IP, state |
| `show running-config` / `show startup-config` | Live vs saved config |
| `show ip route` | Routing table |
| `show arp` | IP-to-MAC mappings learned |
| `show cdp neighbors` | Directly connected Cisco devices |

Use `?` at any prompt level — never memorize, discover.

---

## Ping & Traceroute as Diagnostic Tools

IOS ping symbol patterns:

- `!!!!!` — full connectivity
- `.....` — no route on the router nearest the **source**
- `U....` — "no route to host" from the router nearest the **destination**
- `!!!!.` — intermittent loss

**Traceroute:** sends probes with increasing TTL; each router that decrements TTL to 0 replies "Time Exceeded," revealing the path hop by hop.

⚠️ IOS traceroute timeout is in **seconds**; Windows `tracert -w` is in **milliseconds**.

---

## Guided Lab Overview

**Part A** — `?` context-help at every mode level

**Part B** — configure both interfaces with student-ID-based addressing

**Part C** — `show` command deep-dive: interface brief, interfaces, version, arp, ip route, cdp neighbors

**Part D** — extended ping/traceroute options

**Part E** — save config, add a loopback, reload without saving, observe what survives

---

## Deliverables & Assessment

`?` help screenshots, interface brief (both up/up), annotated `show interfaces`, `show ip route` (C/L explained), `show arp` before/after, extended ping/traceroute, RAM vs NVRAM explanation.

| Criterion | Points |
|-----------|--------|
| show commands + screenshots | 25 |
| Interface brief, student-ID addressing | 15 |
| show interfaces, annotated | 15 |
| Extended ping/traceroute, correct interpretation | 25 |
| RAM/NVRAM reload explanation | 10 |
| Challenge Task | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 4 in the Book →](../book/module-04.html)**
