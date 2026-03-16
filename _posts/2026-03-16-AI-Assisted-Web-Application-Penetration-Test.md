---
layout: post
title: "AI-Assisted Web Application Penetration Test with Llama"
categories: [projects]
categorieslink: "/#projects"
excerpt: "Full web application penetration test against OWASP Juice Shop using Burp Suite, SQL injection exploitation, JWT authentication abuse, and a custom Python AI assistant powered by a local Llama model to generate automated pentest analysis."
image: ai-pentest.png
---

## Overview

This project demonstrates a **full web application penetration testing workflow enhanced with AI assistance**.

The goal was to explore how large language models can assist security analysts during vulnerability investigation and reporting.

A vulnerable web application was deployed locally using Docker, HTTP traffic was intercepted using Burp Suite, and vulnerabilities were exploited manually. Captured request and response data was then analyzed using a locally running Llama model through Ollama.

The custom AI assistant processes HTTP traffic and generates structured vulnerability analysis including severity classification, evidence, recommended testing steps, and remediation guidance.

---

## Goal

Build a prototype workflow that combines traditional web penetration testing with **AI-assisted vulnerability analysis**.

The project demonstrates how analysts can:

- capture HTTP requests during a pentest
- exploit vulnerabilities during testing
- document findings from intercepted traffic
- analyze vulnerabilities using a local LLM
- automatically generate structured pentest analysis

---

## Environment Setup

- The vulnerable application used for testing was **OWASP Juice Shop**.
- The application was deployed locally using Docker.
- docker run -d -p 3000:3000 bkimminich/juice-shop
- The application becomes available at:
http://localhost:3000

---

### Burp Intercepting Login Request

![Burp Intercept Login](/assets/images/burp-login-intercept.png)

Intercepting requests allows inspection and modification of HTTP traffic before it reaches the server.

This is commonly used during penetration testing to analyze authentication requests and application behavior.

---

## SQL Injection Authentication Bypass

The login endpoint was tested for input validation vulnerabilities.

The following SQL injection payload was used:

```text
' OR 1=1--
```
---

### SQL Injection Payload in Burp

![SQL Injection Request](/assets/images/sql-injection-request.png)

### Successful Login Response

![Login Response](/assets/images/login-response.png)

---

## Authentication Token Extraction

After the injection attack succeeded, the application returned a valid authentication token.

This token could be reused to access protected API endpoints.

### JWT Token in Response

![JWT Token Response](/assets/images/jwt-token-response.png)

---

## API Enumeration

Using the extracted authentication token, protected API endpoints were tested.

The following endpoint exposed user data:

```text
GET /api/Users
```
---

### Burp Request to API Endpoint

![API Request](/assets/images/whoami-request.png)

### Sensitive API Response

![API Users Response](/assets/images/api-users-response.png)

The response exposed:

- email addresses
- user roles
- internal user metadata

This represents a sensitive data exposure vulnerability.

---

## Building the AI Pentest Assistant

To explore AI-assisted security workflows, a Python tool was developed to analyze captured HTTP traffic.

The assistant reads vulnerability findings stored as text files and sends them to a local LLM for analysis.

The model used was **Llama** running locally through **Ollama**.

### Project Structure

```text
ai-pentest-assistant
│
├── ai_pentest_assistant.py
├── findings
│   ├── login_sqli.txt
│   └── api_users_exposure.txt
└── pentest_report.md
```
---

## Running the AI Analysis

The assistant processes each finding and sends the HTTP data to the Llama model.

Example command:

```bash
python3 ai_pentest_assistant.py
```
---

# AI Output


---

## AI-Generated Vulnerability Analysis

The model analyzes the HTTP traffic and generates structured vulnerability analysis.

### AI Assistant Output

![AI Analysis Output](/assets/images/ai-output.png)

The analysis includes:

- vulnerability explanation
- severity classification
- attack evidence
- recommended testing steps
- remediation guidance
  
---

## Generated Pentest Report

The assistant automatically generates a Markdown pentest report summarizing all findings.

### Generated Pentest Report

![Pentest Report](/assets/images/pentest-report.png)

The generated report contains:

- vulnerability summary
- severity rating
- evidence from captured HTTP traffic
- remediation recommendations
  
---

## Skills Demonstrated

This project demonstrates several offensive security and automation concepts:

- Web application penetration testing
- HTTP request interception and manipulation
- SQL injection exploitation
- JWT authentication abuse
- API enumeration
- vulnerability analysis
- AI-assisted security tooling
- automated pentest reporting
  
---

## Key Takeaway

Large language models can assist security analysts by accelerating vulnerability investigation and reporting.
While AI does not replace manual penetration testing, it can help analysts analyze findings faster and generate structured security reports during security assessments.
