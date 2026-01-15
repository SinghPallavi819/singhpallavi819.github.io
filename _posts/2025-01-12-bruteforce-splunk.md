---
layout: post
title: "Brute Force Attack Detection using Splunk"
categories: [projects]
categorieslink: "/#projects"
excerpt: "Splunk detection and dashboard to identify repeated failed SSH login attempts by source IP and user."
image: bruteforce-splunk.clean.png
---

## Overview
This project focuses on detecting potential brute-force SSH login attempts by analyzing authentication failure logs in Splunk.

## Goal
Identify source IPs and user accounts generating multiple failed login attempts within a short time window.

## Data Source
Sample Linux SSH authentication logs ingested into Splunk Cloud.

## Tools Used
- Splunk Cloud
- SPL (Search Processing Language)

## Detection Logic
The detection looks for repeated "Failed password" events from the same source IP within a 5-minute window. A threshold of three or more failures is used to flag suspicious behavior.

## Detection Query
```spl
"Failed password"
| rex "Failed password for (invalid user )?(?<user>\w+) from (?<src_ip>\d+\.\d+\.\d+\.\d+)"
| bin _time span=5m
| stats count as failures by src_ip user _time
| where failures >= 3
| sort - failures
```
## Dashboard Overview

![Splunk Dashboard – Failed Login Attempts](/assets/images/bruteforce-dashboard.png)

## Detection Results

![Brute Force Detection Search Results](/assets/images/bruteforce-detection.png)
