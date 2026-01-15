---
layout: post
title: "SIEM Alert Response Simulation using Security Onion and Zeek"
categories: [projects]
categorieslink: "/#projects"
excerpt: "Simulated SOC alert triage by correlating SIEM alerts with Zeek network logs to validate suspicious activity."
image: siem-securityonion-zeek-clean.png
---

## Overview
This project simulates a real-world SOC alert response workflow using Security Onion. The focus is on triaging a security alert, validating it using network telemetry, and documenting the findings as part of an incident response process.

## Goal
The primary goal of this project is to practice alert investigation by correlating SIEM alerts with network-level evidence to determine whether the activity represents a true security incident.

## Alert Scenario
A simulated security alert was generated indicating potentially suspicious network activity from an internal host. The alert required further investigation to confirm whether the behavior was malicious or benign.

## Data Sources
- Security Onion generated alerts
- Zeek network logs including:
  - `conn.log`
  - `dns.log`
  - `http.log`
- Linux system authentication logs (where applicable)

## Tools Used
- Security Onion
- Zeek
- Kibana (Security Onion interface)
- Linux

## Investigation Process
The alert was first reviewed within the Security Onion interface to understand the nature of the detected activity. Relevant timestamps, source IPs, destination IPs, and protocols were identified.

Zeek logs were then analyzed to correlate network connections and validate whether the traffic patterns matched the alert behavior. DNS and connection logs were reviewed to identify unusual communication patterns.

## Validation and Findings
Network traffic analysis showed repeated connections consistent with the alert timeline. The Zeek logs helped confirm the scope of activity and provided context such as connection frequency, duration, and destination services.

Based on the correlated evidence, the alert was classified and documented as part of the incident response process.

## Outcome
- Alert successfully triaged and investigated
- Network activity validated using Zeek logs
- Incident findings documented in a structured format
- Improved understanding of SOC alert response workflows

## Lessons Learned
This project reinforced the importance of validating SIEM alerts using multiple data sources. Network telemetry from Zeek provided valuable context that helped reduce uncertainty during alert triage and decision-making.
