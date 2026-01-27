---
layout: post
title: "CloudTrail Threat Detection (AWS + Python)"
categories: [Projects]
excerpt: "Simulated cloud SOC alert triage by analyzing AWS CloudTrail logs to detect and validate high-risk API activity."
---

## Overview
This project focuses on detecting high-risk AWS API activity by analyzing CloudTrail logs using Python.

The goal was to simulate how a SOC analyst or cloud security engineer can identify suspicious or sensitive actions performed in an AWS account.

## Data Source
- AWS CloudTrail management event logs (JSON format)
- Logs collected from a multi-region CloudTrail trail stored in S3

## Tools Used
- AWS CloudTrail
- Python
- Slack Incoming Webhooks
- CSV reporting

## Detection Logic
The script parses CloudTrail logs and flags **high-risk API actions**, including:
- `CreateUser`
- `AttachUserPolicy`
- `PutBucketPolicy`
- `StopLogging`
  ![CloudTrail CreateUser Event](/assets/images/cloudtrail-createuser.png)

Each event is evaluated based on:
- API action type
- Read-only vs write operation
- User identity (Root, IAM User, Assumed Role)
- Source IP address

## Alerting & Output
- High-risk events are written to a CSV report
- Slack alerts are triggered automatically when risky activity is detected
- Alerts include event name, user, source IP, and timestamp

## Example Finding
A `CreateUser` event initiated by the root account was detected and flagged as high risk, demonstrating the effectiveness of the detection logic.

## What I Learned
- How CloudTrail logs AWS API activity at a granular level
- How to parse and analyze JSON security logs using Python
- How to build basic cloud threat detection logic
- How alerting integrations (Slack) fit into real-world SOC workflows

