---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 5
## Routing Fundamentals & Static Routing

---

## Why This Matters

Two offices — Seoul and Busan — each with their own LAN. Every PC can ping its own router, but no one in Seoul can reach Busan. Orders never arrive. Email fails silently.

A router doesn't automatically know that Busan-bound traffic should go out its WAN interface — **nobody told it**.

A **static route** is an explicit instruction: "to reach this network, send traffic out this interface, toward this next hop." Without it, packets die at the router.

---

## Learning Outcomes

1. Explain how a router makes a forwarding decision
2. Configure static routes: next-hop IP syntax and exit-interface syntax
3. Configure a default route (gateway of last resort)
4. Verify routing table entries — static, connected, local
5. Diagnose and fix broken inter-network connectivity

---

## Theory Review — Forwarding Decision

1. Look at destination IP
2. Search the routing table for the **longest prefix match**
3. Forward out the matching interface / next hop
4. No match → use the **default route** (`0.0.0.0/0`) if present; else drop

```
ip route <network> <mask> <next-hop-IP>
ip route <network> <mask> <exit-interface>
ip route 0.0.0.0 0.0.0.0 <next-hop-IP>   ← default route
```

---

## Theory Review — Routing Table Codes

| Code | Meaning |
|------|---------|
| `C` | Directly connected |
| `L` | Local (router's own interface, /32) |
| `S` | Static route |
| `S*` | Static default route |
| `R` / `O` | RIP / OSPF learned (later modules) |

**Routing is never one-way** — request *and* reply packets each need a path, so both routers need a route to the other's LAN.

---

## Key Insight — Reading Ping Failures

| Ping Output | Meaning | Fix Where? |
|-------------|---------|-----------|
| `Destination Host Unreachable` | Source's gateway couldn't forward | Router **nearest the source** |
| `Request Timed Out` | Reached destination, no reply came back | Router **nearest the destination** |
| `Success` | Both directions have valid routes | — |

This heuristic saves real diagnostic time in the field.

---

## Guided Lab Overview

**Part A** — build a two-site topology, observe the failed cross-site ping (the problem state)

**Part B** — add static routes on both routers, verify with `show ip route`, test successful ping

**Part C** — add an ISP-gateway router, configure a default route (`S*`)

**Part D** — break-and-fix: diagnose an injected fault using only `show ip route` and `ping`

---

## Deliverables & Assessment

Topology diagram, failed-ping screenshot + bidirectional-routing explanation, both routing tables, successful ping, `S*` default route, break-and-fix diagnostic narrative.

| Criterion | Points |
|-----------|--------|
| Topology, student-ID addressing | 10 |
| Failed-ping explanation | 15 |
| Both routing tables correct | 25 |
| Successful end-to-end ping | 20 |
| Default route / `S*` | 15 |
| Break-and-fix narrative | 15 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 5 in the Book →](../book/module-05.html)**
