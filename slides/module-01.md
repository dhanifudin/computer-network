---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 1
## Orientation & Lab Environment

---

## Why This Matters

You know the theory of how packets travel. But when a network breaks, you can't open a textbook diagram — you have to **interrogate the live system**.

Every OS ships built-in diagnostic commands exposing exactly what it knows: its IP, its routing decisions, the path a packet takes, what names resolve to.

Knowing these cold is the difference between finding a fault in five minutes and rebooting things randomly for two hours.

---

## Learning Outcomes

By the end of this lab, you can:

1. Launch Packet Tracer and describe each workspace panel
2. Use `ipconfig`/`ip addr`, `ping`, `tracert`/`traceroute`, `nslookup`/`dig` to read network state
3. Explain what each command's output means and which layer it queries
4. Build a minimal 2-PC topology and verify connectivity with `ping`

---

## Theory Review — Three Pieces of L3 State

Every network interface has at minimum:

- **IP address**
- **Subnet mask** — defines the local network boundary
- **Default gateway** — the router for everything outside the local network

The OS maintains a **routing table**: destination networks and where to send packets for each.

---

## How the Diagnostic Commands Work

- **`ping`** — sends ICMP Echo Request. Same subnet → direct (via ARP); otherwise → default gateway.
- **`tracert`/`traceroute`** — exploits IP TTL: each probe's TTL increments by one, each router along the path replies "Time Exceeded," revealing the hop-by-hop route.
- **`nslookup`/`dig`** — queries a **DNS resolver**, translating hostname → IP.

> "Website works by IP but not by name" → DNS is broken, not the network.

---

## Theory Review — Cable Selection Rules

| Connection | Cable Type | Why |
|------------|-----------|-----|
| PC ↔ Switch / Router | Straight-through | Unlike devices |
| Switch ↔ Router | Straight-through | Unlike devices |
| PC ↔ PC / Switch ↔ Switch | Crossover | Like devices |
| PC ↔ Router console | Rollover | Management only |

**T-568A vs T-568B:** straight-through = same standard both ends; crossover = A on one end, B on the other, swapping TX/RX pairs.

Modern switches use **Auto-MDIX** to detect and correct automatically.

---

## Guided Lab Overview

**Part A — Interrogating Your Own Machine**
`ipconfig`/`ip addr`, ping the gateway, traceroute to 8.8.8.8, `nslookup`/`dig`

**Part B — Packet Tracer Orientation**
Workspace, device list, Simulation vs Realtime mode

**Part C — First Topology**
Two PCs, crossover cable, static IPs, verify with `ping`

Full step-by-step instructions and screenshots are in the book.

---

## Deliverables & Assessment

Lab report: 4 command screenshots (annotated), OSI-layer explanation, PT topology + successful ping, crossover cable explanation, one Challenge Task.

| Criterion | Points |
|-----------|--------|
| Command screenshots, annotated | 30 |
| OSI-layer explanations | 25 |
| PT topology + ping | 25 |
| Crossover cable explanation | 10 |
| Challenge Task | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 1 in the Book →](../book/module-01.html)**
