---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 11
## OSPF (Advanced Routing Protocol)

---

## Why This Matters

RIP works for small networks but has a 15-hop limit and converges in **minutes**. A route change in a data center might not reach the edge for 2–3 minutes — traffic routed into a black hole the whole time.

**OSPF** has no hop limit, converges in **seconds**, and uses actual link bandwidth as its cost — not arbitrary hop count.

It's the dominant Interior Gateway Protocol in enterprise networks and ISP cores worldwide. If you work on a multi-campus network, the protocol between buildings is almost certainly OSPF.

---

## Learning Outcomes

1. Explain OSPF vs RIP: algorithm, metric, convergence, scalability
2. Configure single-area OSPFv2 on multiple routers
3. Manually configure a router-id
4. Configure passive interfaces
5. Verify with `show ip ospf neighbor`, `show ip ospf database`, `show ip route`

---

## Theory Review — OSPF vs RIP

| Property | OSPF | RIPv2 |
|----------|------|-------|
| Algorithm | Dijkstra SPF (link-state) | Bellman-Ford (distance-vector) |
| Metric | Cost = 10⁸ / bandwidth | Hop count |
| Max hops | None | 15 |
| Convergence | Seconds | Minutes |
| Updates | Triggered | Periodic, 30s |
| AD | 110 | 120 |

---

## How OSPF Works

1. **Neighbor discovery** — Hello packets to 224.0.0.5; matching area ID + timers → adjacency
2. **LSA flooding** — each router advertises its links/costs; all routers build an identical **Link State Database**
3. **SPF calculation** — each router independently runs Dijkstra on the LSDB to compute shortest paths

```
router ospf <process-id>
 router-id <A.B.C.D>
 network <network> <wildcard-mask> area <area-id>
 passive-interface <interface>
```

---

## Key Insight — Why `passive-interface` on LAN Ports

LAN-facing interfaces connect to **end devices**, not other routers. Sending OSPF Hellos out those ports wastes bandwidth and confuses end devices.

Passive interfaces still **advertise** the network in OSPF — they just don't send/accept Hellos on that port.

---

## Guided Lab Overview

**Part A** — configure OSPF area 0 on three routers, with passive LAN interfaces

**Part B** — verify: `show ip ospf neighbor` (FULL state), `show ip ospf database` (Router LSAs), `show ip route` (`O` entries + cost)

**Part C** — link failure & reconvergence: shut a link, watch the neighbor disappear (~40s dead interval), restore it, watch adjacency states progress Down → Init → 2-Way → ExStart → Exchange → Loading → Full

---

## Deliverables & Assessment

OSPF config screenshots, FULL-state neighbors, `O` entries with cost verified, LSA count, before/after link failure with RIP-vs-OSPF dead-interval comparison, adjacency state sequence.

| Criterion | Points |
|-----------|--------|
| OSPF configured, all 3 routers | 30 |
| FULL-state neighbor verification | 20 |
| Routing table, correct cost | 20 |
| Link failure & OSPF vs RIP comparison | 20 |
| Adjacency state sequence | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 11 in the Book →](../book/module-11.html)**
