---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 6
## Dynamic Routing: RIP & EIGRP

---

## Why This Matters

Static routing works for two or three sites. But a campus with 40 buildings, or an ISP with hundreds of routers?

If a link fails at 3 AM, someone must manually update routes on every affected router — or sites stay isolated until morning.

Not hypothetical: the **2021 Facebook outage** (took down Instagram, WhatsApp, Oculus for 6 hours) was a BGP misconfiguration that propagated instantly and removed all routes to Facebook's infrastructure globally.

Dynamic routing protocols propagate route info **automatically** and adapt within seconds.

---

## Learning Outcomes

1. Explain distance-vector vs link-state routing
2. Configure RIPv2, verify route propagation
3. Configure EIGRP, compare convergence speed to RIP
4. Use `show ip protocols`, `show ip rip database`, `show ip eigrp neighbors`
5. Simulate a link failure and observe automatic reconvergence

---

## Theory Review — Protocol Comparison

| Property | RIP | EIGRP | OSPF (Mod 11) |
|----------|-----|-------|----------------|
| Metric | Hop count | Composite (BW, delay, reliability) | Cost (bandwidth) |
| Updates | Periodic, 30s | Triggered | Triggered |
| Max hops | 15 | 255 | Unlimited |
| Convergence | Slow | Fast | Fast |

Static routes are configured once and never change — a failed link **black-holes** traffic silently. Dynamic protocols detect the failure and reroute automatically.

---

## Configuration Patterns

**RIPv2** (classful network statements):
```
router rip
 version 2
 network <classful-network>
 no auto-summary
```

**EIGRP** (wildcard mask, AS number must match on all routers):
```
router eigrp <AS-number>
 network <network> <wildcard-mask>
 no auto-summary
```

---

## Guided Lab Overview

**Part A** — build a three-router topology; configure RIPv2 on all routers; verify with `show ip route` (`R` entries); confirm end-to-end connectivity

**Part B** — verify with `show ip protocols` / `show ip rip database`; simulate a link failure, time RIP's reconvergence

**Part C** — replace RIP with EIGRP (AS 100 on all routers); compare `show ip eigrp neighbors`, `D` entries, and reconvergence time

---

## Key Insight — Why EIGRP Converges Faster

EIGRP's **DUAL algorithm** pre-computes **feasible successors** — backup routes that are loop-free and ready before a failure happens.

RIP has no such backup — it must wait for the next periodic update (up to 30s) and count-to-infinity to detect a dead route.

---

## Deliverables & Assessment

Topology, failed pre-routing ping, RIP routing tables + convergence, EIGRP routing tables + `D` entries, RIP vs EIGRP comparison.

| Criterion | Points |
|-----------|--------|
| RIPv2 configured, `R` entries | 25 |
| Full connectivity verified | 15 |
| Link-failure convergence | 20 |
| EIGRP configured, `D` entries | 25 |
| RIP vs EIGRP comparison | 15 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 6 in the Book →](../book/module-06.html)**
