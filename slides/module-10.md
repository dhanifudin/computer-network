---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 10
## WAN: PPP & NAT

---

## Why This Matters

IPv4 has 4.3 billion addresses. In **2011**, IANA allocated the last remaining blocks. Today a new public IPv4 address costs real money or a long wait.

**NAT** is the fix that has kept IPv4 alive 25 years past its expected lifespan: your ISP gives you *one* public IP, and your router rewrites the source address of every outgoing packet so hundreds of devices can share it.

Meanwhile, WAN links between sites need **PPP** — adding authentication, error detection, and multilink bonding that raw IP can't provide.

---

## Learning Outcomes

1. Configure PPP encapsulation and CHAP authentication
2. Verify PPP link state
3. Configure static NAT (1:1) and PAT/overload (many:1)
4. Use `show ip nat translations` / `statistics`
5. Explain inside/outside, local/global NAT terms

---

## Theory Review — CHAP Authentication

**Three-way handshake:**
1. Authenticator sends a **Challenge** (random value + hostname)
2. Responder sends a **Response** — MD5 hash of (challenge + password + sequence number)
3. Authenticator verifies the hash locally; sends Success/Failure

**The password never crosses the link in cleartext** — unlike PAP, which should be avoided.

> Same principle as `enable secret` (Module 3): never send or store passwords in plaintext.

---

## Theory Review — NAT Terminology

| Term | Meaning | Example |
|------|---------|---------|
| Inside local | Private IP of an inside host | 192.168.1.10 |
| Inside global | Public IP representing that host outside | 203.0.113.5 |
| Outside global | Public IP of an external server | 8.8.8.8 |

| | Static NAT | PAT (Overload) |
|---|---|---|
| Mapping | 1 local ↔ 1 global | Many local ↔ 1 global (port-multiplexed) |
| Use case | Hosting a server | Sharing one public IP outbound |

---

## Guided Lab Overview

**Part A** — PPP & CHAP: configure encapsulation, matching usernames/passwords; deliberately break the password and observe link failure, then recover

**Part B** — Static NAT: map an inside server to a public IP, verify with `show ip nat translations`

**Part C** — PAT (overload): an entire LAN shares one public IP; verify port-multiplexed translation table entries

---

## Key Insight — How PAT Distinguishes Hosts

Static NAT is one-to-one — simple, but doesn't scale.

PAT tracks each inside host's connection by **port number**, not just IP — so 200 devices can share one public IP address, each connection uniquely identified by its source port.

---

## Deliverables & Assessment

PPP config (Encapsulation PPP, LCP Open), CHAP failure/recovery, static NAT translation table, PAT translation table with ports, static-vs-PAT explanation.

| Criterion | Points |
|-----------|--------|
| PPP + CHAP configured & verified | 25 |
| CHAP failure/recovery demonstrated | 20 |
| Static NAT correct | 20 |
| PAT, port-multiplexed translations | 25 |
| NAT terminology explained | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 10 in the Book →](../book/module-10.html)**
