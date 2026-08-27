---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 2
## Network Review 1 & Packet Tracer Intro

---

## Why This Matters

"The network is down" usually means one application on one machine stopped working. But is the problem Layer 1 (cable?), Layer 3 (wrong IP?), Layer 4 (blocked port?), or Layer 7 (server down)?

The OSI/TCP-IP models are not textbook abstractions — they're a **diagnostic checklist**. Ping by IP but not by name → DNS layer. Can't ping at all → check lower.

This module makes that thinking concrete: you'll **watch packets move layer by layer** in Simulation Mode.

---

## Learning Outcomes

1. Describe each OSI layer and map it to the TCP/IP layer
2. Use Simulation Mode to observe encapsulation and decapsulation
3. Identify which protocols operate at which layers via packet capture
4. Trace a full HTTP request, naming each envelope added/removed per hop

---

## Theory Review — OSI vs TCP/IP

| OSI | TCP/IP | PDU | Key Protocols |
|-----|--------|-----|---------------|
| Application / Presentation / Session | Application | Data | HTTP, DNS, TLS |
| Transport | Transport | Segment | TCP, UDP |
| Network | Internet | Packet | IP, ICMP, ARP |
| Data Link | Network Access | Frame | Ethernet, PPP |
| Physical | Network Access | Bit | Cables, signals |

Each layer adds a header going down (**encapsulation**), strips it going up (**decapsulation**).

---

## Switch vs Router — Which Layer Do They Read?

- **Switch (Layer 2):** reads the destination **MAC** in the Ethernet frame, forwards to the correct port — never looks at the IP header.
- **Router (Layer 3):** strips the Ethernet frame, reads the **IP** destination, makes a routing decision, re-encapsulates for the next hop.

This is why routing is needed **between** subnets but not **within** them — and why layer-by-layer troubleshooting works: each device is only responsible for its own layer.

---

## Guided Lab Overview

**Part A** — build a 3-subnet review topology (same-subnet pings work; cross-router pings intentionally fail — routing comes in Module 3)

**Part B** — Simulation Mode: watch ARP + ICMP for a same-subnet ping

**Part C** — Simulation Mode: trace a full HTTP request (DNS → TCP → HTTP)

**Part D** — ARP cause-and-effect: why `arp -a` output changes after a ping

---

## Key Insight — Why ARP Precedes ICMP

ARP is a **Layer 2 broadcast** — every device on the local segment receives it, but only the device owning the target IP replies.

This is why ARP works within a subnet but **cannot cross a router** (routers don't forward broadcasts) — and why your PC must resolve a MAC address before it can send its first ICMP Echo Request to a new neighbor.

---

## Deliverables & Assessment

Topology screenshot, annotated ARP/ICMP ping, HTTP protocol sequence (ordered + layered), switch-vs-router explanation, ARP before/after screenshots.

| Criterion | Points |
|-----------|--------|
| Topology built & diagrammed | 20 |
| ARP/ICMP simulation, annotated | 20 |
| HTTP sequence, correctly ordered | 20 |
| Switch vs router explanation | 15 |
| ARP cause-and-effect | 15 |
| Challenge Task | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 2 in the Book →](../book/module-02.html)**
