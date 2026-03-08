---
layout: post
title: "AI-Powered SOC Alert Triage System"
categories: [projects]
categorieslink: "/#projects"
excerpt: "AI-powered SOC alert triage pipeline built in Python that enriches simulated SIEM alerts, applies rule-based severity classification, and uses a local LLM to generate investigation summaries and analyst guidance."
image: ai-soc.png
---

## Overview

This project simulates an AI-assisted Security Operations Center (SOC) alert triage workflow. The goal was to explore how security alerts can be automatically enriched, prioritized, and analyzed to support analysts during early-stage incident investigation.

The system processes simulated SIEM alerts through a structured pipeline that enriches alert data, applies triage logic, and generates investigation guidance using a local language model.

The project demonstrates how automation and AI can be combined to provide analysts with faster context and recommended next steps when reviewing security alerts.

---

## Goal

Build a prototype pipeline that demonstrates how security alerts can be:

- processed in a structured workflow
- enriched with contextual information
- prioritized using triage logic
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
- Ollama
- Llama3 (Local LLM)

Running the language model locally allows experimentation with AI-assisted investigation workflows without requiring external APIs.

---

## System Design

![AI Alert Triage Architecture](/assets/images/ai-alert-triage-architecture.png)

The system processes alerts through a modular pipeline that mirrors how alerts move through a Security Operations Center.

Each stage of the pipeline focuses on transforming raw alert data into structured investigation context. The design separates alert parsing, enrichment, triage logic, and AI analysis into independent components, making the system easier to extend or modify.

This modular architecture allows additional stages to be introduced later, such as threat intelligence enrichment or automated response actions.

---

## Alert Processing

![Alert Processing Output](/assets/images/ai-alert-triage-output.png)

During processing, each alert is enriched with contextual information and classified based on its characteristics. This stage simulates how SOC automation pipelines prepare alerts before they are reviewed by analysts.

By automatically adding severity classification and generating concise summaries, the system reduces the amount of manual interpretation required when analysts first encounter an alert.

---

## AI Investigation Guidance
![AI Prompt Preview](/assets/images/AI-Prompt.png)
![AI Investigation Analysis](/assets/images/ai-alert-triage-analysis.png)

After enrichment and triage, the alert data is converted into a structured prompt that is analyzed by a local language model.

The model generates investigation-oriented output designed to assist analysts in understanding the context of the alert and identifying possible next steps in the investigation process.

Rather than simply labeling alerts, the AI provides reasoning and investigation guidance, which can help analysts quickly understand why an alert may require attention.

---

## Structured Output

The system saves investigation results in structured JSON format. This output contains enriched alert data, triage decisions, and AI-generated investigation guidance.

Saving results in a structured format allows the pipeline to be extended later with dashboards, alert review interfaces, or integrations with additional security tooling.

---

## What I Learned

This project helped strengthen my understanding of several core security operations concepts, including:

- SOC alert triage workflows
- alert enrichment and prioritization
- designing modular detection pipelines
- prompt engineering for security investigations
- using local language models to assist security analysis

Building the system also highlighted how structured automation can reduce the amount of manual analysis required when handling large volumes of alerts.

---

## Future Improvements

Several enhancements could extend this prototype into a more advanced SOC automation tool:

- threat intelligence enrichment for source IP addresses
- support for additional alert types
- integration with real log sources or SIEM platforms
- analyst dashboards for reviewing triage results
- automated clustering of related alerts

These additions would allow the pipeline to more closely resemble real-world detection and response systems.

---

## Conclusion

This project demonstrates a prototype for AI-assisted alert triage in a Security Operations Center environment. By combining alert enrichment, rule-based prioritization, and AI-generated investigation guidance, the system explores how automation can help analysts process alerts more efficiently and focus on meaningful security investigations.
