---
marp: true
theme: default
paginate: true
size: 16:9
---

<!-- _class: lead -->

# Module 3
## Network Review 2 & Router/Switch Basic Config

---

## Why This Matters

Every Cisco device ships factory-default: no hostname, no passwords, no IPs, every interface shut down.

The moment a device goes live, it's a target — attackers scan for unconfigured routers with publicly documented default credentials.

The **2016 Bangladesh Bank heist** ($81M stolen via SWIFT) began with attackers who had already compromised router-level access.

A router with no console password, no enable password, no management restrictions is an **open door**. This module closes it.

---

## Learning Outcomes

1. Access a router/switch via the Console port in PT
2. Navigate the IOS mode hierarchy
3. Apply hardening: hostname, console password, VTY password, enable secret, MOTD banner
4. Verify the active configuration with `show` commands
5. Recognize straight-through vs crossover vs rollover cables

---

## Theory Review — IOS Mode Hierarchy

```
Router> enable                     → Privileged EXEC
Router# configure terminal         → Global Config
Router(config)# interface Fa0/0    → Interface Config
Router(config-if)# exit            → back to Global Config
Router(config)# end  (Ctrl+Z)      → back to Privileged EXEC
```

The **prompt** tells you exactly where you are: `Router>` (User) vs `Router#` (Privileged) vs `Router(config)#` (Global) vs `Router(config-if)#` (Interface).

---

## Theory Review — Config Storage

| Store | Memory | Contents | Persists reboot? |
|-------|--------|----------|-------------------|
| running-config | RAM (volatile) | Currently active | No |
| startup-config | NVRAM (non-volatile) | Loaded at boot | Yes |

Save with: `copy running-config startup-config` (or `wr`)

**Why `enable secret` not `enable password`:** stored as an MD5 hash, not cleartext — resistant to shoulder-surfing off a `show running-config`.

---

## Guided Lab Overview

**Part A** — physical UTP crimping (if hardware available) *or* subnetting review drills

**Part B** — IOS mode navigation: observe the prompt change through all four modes

**Part C** — Basic router hardening: hostname, MOTD banner, console password, VTY password, `enable secret`, save config, `reload` and observe

---

## Key Insight — What `reload` Without Saving Does

Anything only in `running-config` (RAM) is **lost** on reload: hostname, passwords, interface config — everything since the last `copy running-config startup-config`.

This is why "save your work constantly" applies to routers too, not just Packet Tracer files.

---

## Deliverables & Assessment

Subnetting table / cabling photo, all four IOS prompts, hardening commands applied, `show running-config` with encrypted enable secret, save confirmation, reload-consequences explanation.

| Criterion | Points |
|-----------|--------|
| IOS mode navigation | 25 |
| Hardening commands applied | 30 |
| running-config w/ encrypted secret | 20 |
| Reload consequences explanation | 15 |
| Challenge Task | 10 |

---

<!-- _class: lead -->

## Full step-by-step lab instructions:

**[Open Module 3 in the Book →](../book/module-03.html)**
