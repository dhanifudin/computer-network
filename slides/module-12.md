---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 12
## DHCP (Dynamic Host Configuration Protocol)

---

## Why This Matters

A university manages 3,000 laptops across 50 classrooms. Without DHCP, every laptop in every new room needs manual IP/mask/gateway/DNS configuration — 300 manual setups before a 300-seat exam hall can go online.

With **DHCP**, a laptop enters any room, broadcasts, and receives a full config in milliseconds — invisibly.

But it cuts both ways: a **rogue DHCP server** can hand out malicious gateway/DNS settings, redirecting all traffic through an attacker's machine. Understanding DHCP mechanically lets you deploy it *and* detect when something's wrong.

---

## Learning Outcomes

1. Explain the DHCP **DORA** process
2. Configure a router as a DHCP server — pools, exclusions, lease, DNS
3. Configure a DHCP relay agent (`ip helper-address`)
4. Verify with `show ip dhcp pool` / `binding` / `server statistics`
5. Troubleshoot with `ipconfig /release` and `/renew`

---

## Theory Review — The DORA Process

| # | Message | Direction | Purpose |
|---|---------|-----------|---------|
| 1 | **D**iscover | Client → Server (broadcast) | "Any DHCP server out there?" |
| 2 | **O**ffer | Server → Client (unicast) | Offers an IP + lease |
| 3 | **R**equest | Client → Server (broadcast) | Formally claims the offered IP |
| 4 | **A**cknowledge | Server → Client (unicast) | Confirms the assignment |

Discover/Request are **broadcast** (client has no IP yet). Offer/Ack are **unicast** to the client's known MAC. All four share one Transaction ID (XID).

---

## Theory Review — Server Config & Relay

```
ip dhcp excluded-address <start> <end>
ip dhcp pool <name>
 network <network> <mask>
 default-router <gateway-IP>
 dns-server <DNS-IP>
 lease <days>
```

**DHCP relay** — since Discover is a broadcast and routers don't forward broadcasts between subnets, a relay agent converts it to **unicast** toward the server:

```
Router(config-if)# ip helper-address <DHCP-server-IP>
```
Applied on the **client-facing** interface.

---

## Guided Lab Overview

**Part A** — configure R0 as a DHCP server (pool, exclusions, lease); trigger DHCP on PCs, verify with `show ip dhcp pool` / `binding` / `statistics`

**Part B** — client verification: `ipconfig /all`, release/renew, observe DORA live in Simulation Mode

**Part C** — DHCP relay: add a router between clients and server; DHCP fails without a relay, succeeds once `ip helper-address` is configured

---

## Key Insight — the giaddr Field

When a relay forwards a Discover, it stamps its own IP into the **giaddr** (gateway IP address) field.

The DHCP server reads giaddr to determine **which pool** to assign an address from — this is how one central server can serve many remote subnets through relays.

---

## Deliverables & Assessment

Pool config, `show ip dhcp binding` (all clients), `ipconfig /all` annotated, release/renew sequence, DORA event list (broadcast/unicast annotated), relay before/after, giaddr explanation.

| Criterion | Points |
|-----------|--------|
| Pool w/ exclusions, GW, DNS, lease | 20 |
| Binding table, all clients | 15 |
| DORA simulation, annotated | 20 |
| Release/renew demonstrated | 10 |
| DHCP relay working | 25 |
| giaddr explanation | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 12 in the Book →](../book/module-12.html)**
