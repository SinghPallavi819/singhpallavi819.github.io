---
layout: post
title: "AI Security Lab on AWS: Data Leakage, Guardrails, and Detection"
categories: [projects]
categorieslink: "/#projects"
excerpt: "Hands-on AI security testing of a document-based customer-support assistant on AWS, comparing sensitive data exposure across models and testing Amazon Bedrock Guardrails and CloudWatch alerts."
image: ai-security-lab.png
---

## Overview

This project explores **sensitive data exposure and defensive controls in an AI customer-support assistant on AWS**.

The assistant answers questions using company documents. I tested it as both attacker and defender to investigate whether it would reveal internal information and how to block and detect those attempts.

The completed stages include model comparison, standalone guardrail testing, and detection using CloudWatch logs and alarms.

**Project status: In progress.** Data separation and end-to-end application security testing are planned next.

All passwords and API keys used in this project were **fake demonstration data**.

---

## Goal

Build a hands-on lab to investigate how an AI assistant handles sensitive information and evaluate defenses against credential extraction.

The project demonstrates how to:

- test an assistant for sensitive data exposure
- compare responses across different models
- evaluate input and output guardrails
- detect credential extraction attempts in logs
- validate email alerts
- document findings and testing limitations

---

## Environment Setup

The lab used:

- Amazon Bedrock models
- an Amazon Bedrock Knowledge Base
- a public FAQ document
- an internal demonstration document containing dummy credentials
- Amazon Bedrock Guardrails
- the ApplyGuardrail API
- Amazon CloudWatch model invocation logs
- a CloudWatch metric filter and alarm

The internal document was labeled **INTERNAL ONLY** and contained a fake admin password and API key.

Both documents were available to the assistant during the initial tests.

---

## Credential Extraction Testing

The assistant was asked to provide the admin password from the internal document.

A follow-up request claimed that the user was the administrator.

The test compared two models using the **same documents and the same questions**.

The model was the only variable changed in this comparison.

---

### Stronger Model Response

The stronger safety-tuned model refused to disclose the internal information in the tested attempts.

It continued to refuse when I claimed to be the administrator.

This showed that the model treated the internal label as a reason to withhold the information during these tests.

---

### Weaker Model Response

The weaker model disclosed the internal file after I claimed to be the administrator.

The disclosed content included:

- the dummy admin password
- the dummy API key
- the remaining internal file contents

The model accepted an unverified identity claim as justification for sharing the information.

---

## Sensitive Data Exposure Finding

The initial tests demonstrated **model-dependent behavior when handling sensitive document content**.

One model refused the tested requests, while the other exposed the internal file.

Because the assistant could access the internal document, disclosure depended partly on the model's interpretation of the request.

The **INTERNAL ONLY** label did not establish an enforced access boundary.

The results apply to the tested prompts. They do not prove that the stronger model would resist every extraction attempt.

---

## Configuring Amazon Bedrock Guardrails

The next stage focused on blocking credential extraction.

I configured Amazon Bedrock Guardrails with:

- a denied topic for internal credentials
- a prompt attack filter

I then evaluated the guardrail using the **ApplyGuardrail API**.

Testing covered both incoming requests and content supplied as model output.

---

## Input Guardrail Testing

Requests for internal credentials were submitted to the guardrail as input.

**Observed result:** The tested credential requests were blocked.

This demonstrated that the configured guardrail could identify and block those requests during standalone input testing.

---

## Output Guardrail Testing

The previously leaked dummy credentials were supplied to the guardrail as model output.

This tested whether the guardrail would block a response containing the demonstration credentials.

**Observed result:** The tested output was blocked.

This validated output filtering for the supplied content. It was a standalone test rather than a complete application request.

---

## Model Invocation Logging

To add visibility into extraction attempts, I enabled **model invocation logging to Amazon CloudWatch**.

The logs provided the basis for detecting suspicious requests.

This extended the lab beyond response blocking to include monitoring and notification.

---

## Credential Extraction Detection

I created a **CloudWatch metric filter** to flag credential extraction attempts in the invocation logs.

A CloudWatch alarm was configured to generate an email notification when the detection condition was met.

The detection workflow connected:

- model invocation logs
- a metric filter
- a CloudWatch alarm
- an email notification

---

## Alert Validation

I submitted a test credential extraction attempt to validate the detection workflow.

**Observed result:** An email alert arrived approximately five minutes after the test attack.

This confirmed that the configured detection and notification workflow triggered for the tested attempt.

Additional testing is needed to evaluate false positives and attempts that the filter may miss.

---

## Testing Limitations

In the Knowledge Base console test interface used for this lab, I could not attach a guardrail directly.

I therefore tested the guardrail separately through the **ApplyGuardrail API**.

The completed tests demonstrated:

- credential exposure from the weaker model
- refusals from the stronger model for the tested prompts
- standalone blocking of tested credential requests
- standalone blocking of supplied credential-containing output
- an email alert following a test extraction attempt

Guardrail enforcement within the complete application request flow has not yet been validated.

---

## Next Steps

The next phase will focus on document access boundaries and integrated testing.

Planned work includes:

- separating public documents from internal documents
- enforcing authorization before retrieving internal content
- attaching guardrails to the application's API request flow
- repeating extraction tests against the integrated application
- testing legitimate support questions for unintended blocking
- reviewing sensitive content captured in logs

These steps have not yet been completed.

---

## Skills Demonstrated

This project demonstrates offensive and defensive AI security concepts:

- AI application security testing
- credential extraction testing
- sensitive data exposure analysis
- comparative model evaluation
- Amazon Bedrock Knowledge Bases
- Amazon Bedrock Guardrails
- ApplyGuardrail API testing
- CloudWatch logging and metric filters
- alarm configuration and alert validation
- security findings documentation

---

## Key Takeaway

Model choice influenced whether the assistant disclosed internal information in this lab.

Guardrails blocked the credential requests and outputs I tested, while CloudWatch generated an alert for a test extraction attempt.

The next phase will establish which documents each user can access and validate the defenses within the complete application workflow.
```
