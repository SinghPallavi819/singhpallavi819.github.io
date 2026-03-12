---
layout: post
title: "AI-Powered SOC Alert Triage System"
categories: [projects]
categorieslink: "/#projects"
excerpt: "AI-powered SOC alert triage pipeline built in Python that enriches simulated SIEM alerts with threat intelligence, applies rule-based severity classification, and uses a local LLM to generate investigation summaries and analyst guidance."
image: ai-soc.png
---

## Overview

This project simulates an AI-assisted Security Operations Center (SOC) alert triage workflow. The goal was to explore how security alerts can be automatically enriched, prioritized, and analyzed to support analysts during early-stage incident investigation.

The system processes simulated SIEM alerts through a structured pipeline that enriches alert data with threat intelligence, applies triage logic, and generates investigation guidance using a local language model.

The project demonstrates how automation and AI can be combined to provide analysts with faster context and recommended next steps when reviewing security alerts.

---

## Goal

Build a prototype pipeline that demonstrates how security alerts can be:

- processed in a structured workflow
- enriched with contextual threat intelligence
- prioritized using rule-based triage logic
- analyzed using AI to generate investigation guidance

The focus of the project is to simulate how automation could assist analysts during the alert triage phase of a security investigation.

---

## Data Source

The project uses simulated SIEM alerts stored in JSON format.

These alerts represent common authentication monitoring scenarios, including repeated login failures targeting a remote access service. The dataset contains fields typically found in security monitoring alerts such as timestamps, user identifiers, source IP addresses, and event counts.

Using simulated alerts allows experimentation with triage workflows without requiring access to production security data.

---

## Tools Used

- Python
- JSON-based alert ingestion
- Rule-based triage logic
- Threat intelligence enrichment (AbuseIPDB API)
- Ollama
- Llama3 (Local LLM)

Running the language model locally allows experimentation with AI-assisted investigation workflows without requiring external AI services.

---

## System Design

![AI Alert Triage Architecture](/assets/images/ai-alert-triage-architecture.png)

The system processes alerts through a modular pipeline that mirrors how alerts move through a Security Operations Center.

The pipeline consists of several stages:

1. **Alert Parsing** – ingest and normalize alert data  
2. **Threat Intelligence Enrichment** – query IP reputation using AbuseIPDB  
3. **Rule-Based Triage** – classify alert severity and recommended action  
4. **AI Investigation Assistance** – generate investigation summaries and guidance  

This modular architecture separates alert parsing, enrichment, triage logic, and AI analysis into independent components, making the system easier to extend or modify.

---

## Threat Intelligence Enrichment

Each alert is enriched with threat intelligence data by querying the AbuseIPDB API.

The enrichment stage retrieves:

- IP abuse score
- number of abuse reports
- country code
- reputation classification

This allows the pipeline to automatically detect suspicious or malicious IP activity before the alert is analyzed by the AI model.

For example, during testing the system identified:

- **IP:** 185.220.101.45  
- **Abuse Score:** 91/100  
- **Reputation:** Known Malicious  
- **Classification:** Tor Exit Node

This enrichment provides important investigation context that SOC analysts typically rely on when triaging alerts.

---

## Alert Processing

![Alert Processing Output](/assets/images/AI-analysys.png)

During processing, each alert is enriched with contextual information and classified based on its characteristics.

For example:

- High event counts + malicious IP reputation → **Escalate**
- Medium event counts + internal IP → **Review**
- Low event counts + low-risk IP → **Monitor**

This stage simulates how SOC automation pipelines prioritize alerts before they are reviewed by analysts.

---

## AI Investigation Guidance

![AI Prompt Preview](/assets/images/alert-loaded.png)
![AI Investigation Analysis](/assets/images/ai-analysis.png)

After enrichment and triage, the alert data is converted into a structured prompt analyzed by a local language model.

The model generates investigation-oriented output designed to assist analysts in understanding:

- what the alert means
- why it may be suspicious
- what investigation steps should be taken

Rather than simply labeling alerts, the AI provides reasoning and investigation guidance that helps analysts quickly understand why an alert may require attention.

The system also references relevant attack techniques such as **MITRE ATT&CK T1110 (Brute Force)** when analyzing authentication-related alerts.

---

## Structured Output

The system saves investigation results in structured JSON format. This output contains:

- enriched alert data
- threat intelligence results
- triage decisions
- AI-generated investigation guidance

Saving results in a structured format allows the pipeline to be extended later with dashboards, alert review interfaces, or integrations with additional security tooling.

---

## What I Learned

This project helped strengthen my understanding of several core security operations concepts, including:

- SOC alert triage workflows
- threat intelligence enrichment
- alert prioritization and escalation logic
- designing modular detection pipelines
- prompt engineering for security investigations
- using local language models to assist security analysis

Building the system also highlighted how structured automation can reduce the amount of manual analysis required when handling large volumes of alerts.

---

## Future Improvements

Several enhancements could extend this prototype into a more advanced SOC automation tool:

- support for additional alert types
- correlation of related alerts
- integration with real SIEM log sources
- analyst dashboards for reviewing triage results
- automated clustering of related alerts
- automated response actions for high-confidence detections

These additions would allow the pipeline to more closely resemble real-world detection and response systems.

---

## Conclusion

This project demonstrates a prototype for AI-assisted alert triage in a Security Operations Center environment.

By combining threat intelligence enrichment, rule-based prioritization, and AI-generated investigation guidance, the system explores how automation can help analysts process alerts more efficiently and focus on meaningful security investigations.
