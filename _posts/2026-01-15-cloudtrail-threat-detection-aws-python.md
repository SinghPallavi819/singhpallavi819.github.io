---
layout: post
title: "CloudTrail Threat Detection (AWS + Python)"
categories: [AWS, Cloud Security, Python, CloudTrail]
---

## Overview
This project detects suspicious AWS activity by analyzing **CloudTrail logs** and flagging **high-risk API actions**.  
It also sends a **Slack alert** when a high-risk event is found.

## Goal
- Collect CloudTrail management events in AWS
- Parse CloudTrail JSON logs with Python
- Detect high-risk actions (example: **CreateUser**)
- Export findings to a CSV report
- Send Slack notification for detected high-risk events

## Lab Setup / Data Source
- Created a **CloudTrail trail** (management events enabled)
- CloudTrail logs stored in an **S3 bucket**
- Generated test activity in AWS (example: creating IAM users)
- Downloaded/used CloudTrail JSON log files for analysis

## Tools Used
- AWS CloudTrail
- Amazon S3
- AWS IAM
- Python 3
- Slack Incoming Webhook

## Detection Logic
The script extracts key fields from each CloudTrail record:
- `eventTime`
- `eventSource`
- `eventName`
- `readOnly`
- `userIdentity.type` (ex: Root / IAMUser / AssumedRole / AWSService)
- `userArn`
- `sourceIPAddress`

Then it flags **high-risk events** based on `eventName`.

**Example high-risk event detected in my logs:**
- `iam.amazonaws.com : CreateUser`

## Output / Evidence
- Console summary: total events loaded + high-risk count
- CSV report generated: **high_risk_events.csv**
- Slack alert sent when high-risk events are found

## Results
I successfully:
- Collected CloudTrail logs in S3
- Parsed real CloudTrail JSON logs with Python
- Detected an IAM **CreateUser** event as high-risk
- Exported the alert evidence to a CSV report
- Triggered Slack alerting for detected high-risk activity

## What I Learned
- How CloudTrail logs AWS API activity and identity context
- How to parse and analyze Cloud logs using Python
- How to build a simple detection + alert pipeline
- How to create audit evidence (CSV) for security investigations

---

## Screenshots (add yours here)
**1) CloudTrail trail created + logging enabled**  
*<insert screenshot>*

**2) S3 bucket storing CloudTrail logs**  
*<insert screenshot>*

**3) CloudTrail event showing CreateUser / AttachUserPolicy**  
*<insert screenshot>*

**4) Script output showing events loaded + high-risk flagged**  
*<insert screenshot>*

**5) CSV report opened (high_risk_events.csv)**  
*<insert screenshot>*

**6) Slack alert message screenshot**  
*<insert screenshot>*
