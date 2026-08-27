---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 7
## Access Control Lists

---

## Why This Matters

In **2020**, a ransomware attack on **University Hospital Düsseldorf** forced the redirect of emergency patients — one patient died during the delay.

Attackers entered through a remote-access server with **no traffic restrictions**: any IP could connect to port 443 and exploit the vulnerability.

An ACL wouldn't have stopped a determined attacker indefinitely — but it would have restricted which source addresses could even *reach* the vulnerable service, dramatically shrinking the attack surface.

ACLs are the most widely deployed traffic-filtering tool in the world.

---

## Learning Outcomes

1. Explain standard vs extended ACLs, when to use each
2. Write numbered and named ACL rules with wildcard masks
3. Apply an ACL to the correct interface and direction
4. Use `show access-lists` and `show ip interface` to verify
5. Debug a misconfigured ACL by reading hit counts

---

## Theory Review — Standard vs Extended

| Property | Standard | Extended |
|----------|----------|----------|
| Matches on | Source IP only | Source, Dest, Protocol, Port |
| Numbered range | 1–99, 1300–1999 | 100–199, 2000–2699 |
| Best placed | Close to **destination** | Close to **source** |
| Use case | Block/permit a source entirely | Block a specific traffic type |

**Processing:** top-to-bottom, first match wins. No match → **implicit deny all**. Order matters: `permit any` before a `deny` makes the deny unreachable.

---

## Theory Review — Wildcard Masks

| Wildcard | Matches |
|----------|---------|
| `0.0.0.0` | Exactly one host (`host` keyword) |
| `0.0.0.255` | All hosts in a /24 |
| `255.255.255.255` | All addresses (`any` keyword) |

Shorthand: `host 192.168.1.10` = `192.168.1.10 0.0.0.0`

A wildcard `1` bit means "don't care" — the inverse of a subnet mask.

---

## Guided Lab Overview

**Part A** — Standard ACL: restrict server access to the Admin subnet only, applied outbound closest to destination

**Part B** — Extended ACL: permit ICMP but block HTTP from one specific host, applied inbound closest to source

**Part C** — Named ACL + debugging: rewrite as a named ACL; deliberately remove `permit any` and observe **everything** break

---

## Key Insight — The Implicit Deny Trap

Every ACL ends with an unwritten **implicit deny all**.

Removing your explicit `permit ip any any` line doesn't just remove one rule — it exposes that implicit deny, and **all** traffic through that interface stops, not just the traffic you meant to block.

This is the single most common ACL authoring mistake in production networks.

---

## Deliverables & Assessment

Baseline connectivity, standard ACL (success/fail + hit counts), extended ACL (ICMP ok, HTTP blocked), named ACL verification, implicit-deny explanation, deliberate-mistake demonstration.

| Criterion | Points |
|-----------|--------|
| Standard ACL, correct placement & effect | 25 |
| Extended ACL, ping ok / HTTP blocked | 25 |
| Named ACL, correct syntax | 20 |
| Implicit-deny explanation | 15 |
| Extended ACL placement rationale | 15 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 7 in the Book →](../book/module-07.html)**
