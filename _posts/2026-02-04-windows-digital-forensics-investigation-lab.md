---
layout: post
title: "Windows Digital Forensics Investigation Lab (Azure DFIR)"
categories: [Projects]
excerpt: "Built a Windows DFIR lab in Azure to analyze forensic artifacts including Amcache, ShimCache, Prefetch, UserAssist, and Windows Event Logs."
image: dfir-lab.png
---

## Overview

This project explores how digital forensic analysts investigate Windows systems by analyzing forensic artifacts that record program execution, user activity, and system events.

To gain hands-on experience with digital forensics and incident response, I built a **Windows investigation lab in Microsoft Azure** and analyzed several important Windows artifacts commonly used during DFIR investigations.

The goal of this lab was to understand how investigators reconstruct system activity by correlating evidence across multiple artifacts.

---

## Lab Environment

**Platform**

Microsoft Azure Virtual Machine

**Operating System**

Windows Server

**Analysis Tools**

- Eric Zimmerman DFIR Tools  
- PECmd (Prefetch parser)  
- EvtxECmd (Windows Event Log parser)  
- Registry Explorer  
- PowerShell  

The Azure VM served as a controlled environment where activity could be generated and forensic artifacts collected for analysis.

---

## Evidence Collection

Forensic artifacts were collected directly from the Windows system and copied into a separate **Evidence directory** before analysis. This follows standard forensic practice where investigators avoid working on original system files.

Artifacts were extracted from their default locations and stored in the following structure:


DFIR-Lab
├ Evidence
│ ├ Prefetch
│ ├ Registry
│ └ EventLogs


---

## Investigation Workflow

The investigation followed a simplified DFIR workflow:

1. Identify relevant Windows forensic artifacts  
2. Collect artifacts from the system  
3. Parse artifacts using forensic tools  
4. Analyze the results to reconstruct system activity  

The artifacts analyzed in this lab were selected because they commonly appear in real-world digital forensic investigations.

---

## Artifact Analysis

### 1. Amcache

**Location**

C:\Windows\AppCompat\Programs\Amcache.hve

**Purpose**

Amcache records metadata about applications that have been executed or existed on the system.

**Evidence Extracted**

- Executed program paths  
- File metadata  
- Application installation traces  

Amcache is useful for confirming that a program existed on a system and may have been executed.

---

### 2. ShimCache (AppCompatCache)

**Location**

Stored in the **SYSTEM registry hive**

**Purpose**

ShimCache stores historical references to executed applications as part of Windows compatibility mechanisms.

**Evidence Extracted**

- Program execution traces  
- Application file paths  

ShimCache helps investigators identify applications that were previously executed on a system.

---

### 3. Prefetch

**Location**

C:\Windows\Prefetch

**Purpose**

Prefetch files record information about recently executed programs in order to improve system performance.

In digital forensics, Prefetch artifacts provide strong evidence that an application was executed.

**Analysis Tool**

PECmd

**Evidence Extracted**

- Program execution timestamps  
- Execution frequency  
- Files accessed during execution  

Example findings included execution activity for applications such as:

- Notepad  
- Microsoft Edge  
- Windows Terminal  
- Windows Explorer  
- Server Manager  

---

### 4. UserAssist

**Location**

NTUSER.DAT
Software\Microsoft\Windows\CurrentVersion\Explorer\UserAssist

**Purpose**

UserAssist records applications launched through the Windows graphical user interface.

**Analysis Tool**

Registry Explorer

**Evidence Extracted**

- Program launch history  
- Run counts  
- Last execution timestamps  

UserAssist provides insight into **user-driven application activity** within the operating system.

---

### 5. Windows Event Logs

**Location**

C:\Windows\System32\winevt\Logs

**Log Analyzed**

Security.evtx

**Analysis Tool**

EvtxECmd

The Security log records authentication and security-related events on the system.

**Results**

- Parsed **3,696 security events**  
- Extracted authentication activity and system event timelines  

Important events observed included:

| Event ID | Description |
|--------|-------------|
| 4624 | Successful logon |
| 4625 | Failed logon attempt |
| 4688 | Process creation |
| 1102 | Security log cleared |

These logs help investigators build a timeline of system activity and detect suspicious behavior.

---

## Challenges Encountered

### Prefetch folder initially empty

When the Prefetch directory was first accessed, no Prefetch files were present. This occurred because Windows only generates Prefetch files **after applications have been executed**.

After running several applications within the VM (such as Notepad, Microsoft Edge, and Windows Terminal), Prefetch files were generated and became available for analysis.

### Tool execution path issues

While parsing Windows Event Logs using EvtxECmd, PowerShell initially returned an error indicating that the command could not be recognized. This occurred because the tool was executed from the wrong directory.

After navigating to the correct folder and executing the command with:


.\EvtxECmd.exe


the logs were successfully parsed.

### Artifact access permissions

Certain forensic artifacts required **administrative privileges** to access. Running PowerShell as an administrator allowed successful extraction and parsing of these files.

---

## Key Takeaways

This investigation demonstrates how multiple forensic artifacts can be correlated to reconstruct activity on a Windows system.

Key observations from the lab include:

- Multiple artifacts can confirm program execution  
- Registry artifacts reveal user-driven activity  
- Event logs provide authentication and system timelines  
- DFIR tools allow efficient parsing of large volumes of forensic evidence  

---

## Skills Practiced

- Windows forensic artifact analysis  
- Registry investigation  
- Event log analysis  
- Evidence collection and preservation  
- Digital forensics investigation workflow  

---

## Tools Used

- Eric Zimmerman DFIR Tools  
- PECmd  
- EvtxECmd  
- Registry Explorer  
- PowerShell  
- Microsoft Azure  

---
