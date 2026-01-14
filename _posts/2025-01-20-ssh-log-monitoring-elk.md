---
title: "SSH Log Monitoring – ELK Stack"
excerpt: "Built an ELK pipeline to ingest Linux SSH authentication logs and visualize failed login attempts to spot suspicious activity."
---

## Overview
Built an ELK pipeline to ingest and analyze Linux SSH authentication logs and detect suspicious login behavior.

## What I built
- Parsed Linux auth logs and ingested events into Elasticsearch
- Created Kibana dashboards to track failed SSH logins and trends
- Investigated patterns like repeated failures and spikes over time

## Tools / Tech
ELK Stack (Elasticsearch, Logstash, Kibana), Linux, SSH/auth logs

## Evidence (add screenshots)
- Dashboard screenshot: failed logins over time
- Top IPs / usernames visualization
- Example parsed event (before/after parsing)
