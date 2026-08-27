---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 9
## Switching & VLANs

---

## Why This Matters

A department buys 80 PCs, all on the same switches. Day one, a poorly written program floods the network with broadcast frames.

Every PC must process every broadcast — 80 PCs processing an endless flood means no CPU cycles for anything else. A **broadcast storm** on a flat network can take down an entire floor.

**The fix: segmentation.** VLANs divide one physical switch infrastructure into multiple isolated broadcast domains — Finance, Student, Faculty — each behaving as if on separate switches. Traffic crosses between them only through a router **you** control.

---

## Learning Outcomes

1. Explain what a VLAN is and how it differs from a physical LAN
2. Create VLANs, assign ports
3. Configure a trunk link, verify VLAN propagation
4. Implement inter-VLAN routing — router-on-a-stick
5. Verify with `show vlan brief`, `show interfaces trunk`, `show ip route`

---

## Theory Review — VLANs & Port Types

A VLAN is a logical partition: frames tagged VLAN 10 only forward to other VLAN-10 ports — broadcasts stay inside the VLAN.

| Port Type | Belongs To | Tagging |
|-----------|------------|---------|
| **Access** | Exactly one VLAN | None (switch adds/strips internally) |
| **Trunk** | Multiple VLANs | 802.1Q tag (4-byte insert with VLAN ID) |

Trunks connect switch-to-switch and switch-to-router.

---

## Theory Review — Router-on-a-Stick

Inter-VLAN routing needs a Layer 3 device. One physical router interface, divided into **sub-interfaces**, one per VLAN:

```
interface FastEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0

interface FastEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
```

The trunk carries tagged frames for both VLANs to the router; it strips, routes, and re-tags for the destination VLAN.

---

## Guided Lab Overview

**Part A** — create VLANs 10 & 20, assign ports; same-VLAN pings succeed, cross-VLAN pings **fail** (isolated, as expected)

**Part B** — add a second switch, configure a trunk link, verify VLAN propagation across switches

**Part C** — router-on-a-stick: configure sub-interfaces, watch cross-VLAN ping **succeed**

**Part D** — verification: `show vlan brief`, `show interfaces trunk`, `show ip route`

---

## Key Insight — Broadcasts Never Cross VLANs

A student in the Student VLAN cannot flood the Faculty or Finance VLAN — broadcasts in VLAN 10 never reach VLAN 20.

The router is the **only** path between VLANs — and it's the only place you need to apply filtering (ACLs) to control which VLANs can talk to which.

---

## Deliverables & Assessment

`show vlan brief` (annotated), within/cross-VLAN ping evidence, `show interfaces trunk`, sub-interface config, successful inter-VLAN ping, 802.1Q tag observation.

| Criterion | Points |
|-----------|--------|
| VLANs created, ports assigned | 20 |
| Trunk configured | 15 |
| Router-on-a-stick sub-interfaces | 25 |
| Inter-VLAN ping succeeds | 20 |
| 802.1Q simulation observation | 10 |
| Challenge Task | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 9 in the Book →](../book/module-09.html)**
