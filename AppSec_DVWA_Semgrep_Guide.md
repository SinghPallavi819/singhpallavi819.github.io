# AppSec Intern Guide — DVWA Security Scanning
### Tools: Bandit + Semgrep (CLI & Cloud)
### Author: Pallavi | Role: AppSec Intern

---

## What We Did So Far

### Environment Setup
- Installed UTM on Mac
- Created Windows 11 VM inside UTM
- Enabled Hyper-V inside Windows 11
- Installed Miniconda (Python environment manager)
- Installed Bandit and Semgrep via pip
- Cloned DVWA from GitHub

### Scans Already Completed
- **Bandit scan** → 1 finding (Python only — assert used)
- **Semgrep CLI scan** → 78 findings (PHP, JS, YAML)

---

## Part 1: CLI Scanning (Already Done)

### Bandit Command
```
C:\ProgramData\miniconda3\Scripts\bandit -r C:\DVWA -f txt -o C:\dvwa_scan_report.txt
```

**What it does:**
- `-r` → Scan recursively (all subfolders)
- `-f txt` → Save as text format
- `-o` → Save to file

**Result:** 1 finding — B101 assert_used (Low severity, Python file only)

**Why only 1?** Bandit scans Python files only. DVWA is mostly PHP so Bandit found very little.

---

### Semgrep CLI Command
```
C:\ProgramData\miniconda3\Scripts\semgrep --config=auto C:\DVWA --json --output C:\dvwa_semgrep_report.json
```

**What it does:**
- `--config=auto` → Automatically picks best security rules
- `--json` → Saves output as JSON
- `--output` → Saves to file

**Result:** 78 findings across PHP, JavaScript, and YAML files

---

### Scan Single Feature (Learning Mode)
```
C:\ProgramData\miniconda3\Scripts\semgrep --config=auto C:\DVWA\vulnerabilities\sqli
```

Use this to study one vulnerability at a time.

---

## Part 2: Cloud Scanning (Next Steps)

### Step 1: Fork DVWA to Your GitHub
1. Go to `https://github.com/digininja/DVWA`
2. Click **Fork** (top right)
3. Select your personal GitHub account
4. DVWA is now at `https://github.com/YourUsername/DVWA`

**Is it safe?** Yes — DVWA is already public open source. Forking it does not expose your personal data.

---

### Step 2: Connect GitHub to Semgrep Cloud
1. Go to `https://semgrep.dev`
2. Log in to your account (already created)
3. Click **Projects** in left sidebar
4. Click **Scan new project**
5. Select **GitHub** as source
6. Authorize Semgrep to access your GitHub
7. Select your forked **DVWA** repo
8. Click **Begin Scan**

---

### Step 3: Wait for Scan to Complete
- Semgrep Cloud will automatically scan all files
- Takes about 2-5 minutes
- You will see results in the dashboard

---

### Step 4: Review Cloud Results
You will again see ~78 vulnerabilities (same as CLI).

**What to do with them:**

#### A. Look at the Dashboard
- Check the **Findings** tab
- Filter by **Severity** (High first)
- Filter by **Category** (Injection, SSRF etc.)

#### B. Click on Each Finding
Each finding shows:
- Which file and line number
- What the vulnerability is
- Why it is dangerous
- How to fix it

#### C. Mark Findings
For each finding mark it as:
- **Ignored** — if it is a false positive
- **Open** — if it is a real vulnerability to fix
- **Fixed** — after you have fixed it

---

### Step 5: Connect Your Personal Project
1. In Semgrep Cloud click **Scan new project**
2. Select your personal GitHub repo (Toyota Dealership project)
3. Let it scan
4. Review findings — these will be real vulnerabilities in YOUR code
5. Fix them one by one

---

## Part 3: Understanding the 78 Vulnerabilities

### Vulnerability Categories Found:

| Category | Count | Severity | OWASP |
|----------|-------|----------|-------|
| SQL Injection | ~15 | High | A03 |
| Command Injection | ~12 | High | A03 |
| SSRF | ~10 | Medium | A10 |
| MD5 Loose Equality | ~8 | Low | A02 |
| eval() Usage | ~6 | High | A03 |
| CORS Misconfiguration | ~2 | Low | A07 |
| phpinfo Exposure | ~1 | Medium | A01 |
| Path Traversal | ~1 | Medium | A01 |
| ReDoS | ~2 | Medium | A05 |
| GitHub Actions Injection | ~1 | High | A03 |

---

### False Positives (~20-25 out of 78)
Some findings may not be real issues because:
- DVWA is intentionally vulnerable — some are by design
- "impossible" level files are already secure but still flagged
- MD5 usage is intentional for education purposes

**How to identify false positives:**
- Check if file is `impossible.php` — likely false positive
- Check if file is `low.php` — likely real vulnerability
- Try to actually exploit it — if you can, it's real

---

## Part 4: Next Steps as AppSec Intern

### Immediate (This Week)

**Day 1-2: SQL Injection**
- Run: `semgrep --config=auto C:\DVWA\vulnerabilities\sqli`
- Read `sqli/source/low.php` — understand the vulnerable code
- Open DVWA in browser — try SQL injection manually
- Read `sqli/source/impossible.php` — understand the fix
- Document what you learned

**Day 3-4: Command Injection**
- Run: `semgrep --config=auto C:\DVWA\vulnerabilities\exec`
- Read `exec/source/low.php`
- Try command injection in browser
- Read the fix in `impossible.php`
- Document findings

**Day 5: SSRF**
- Run: `semgrep --config=auto C:\DVWA\vulnerabilities\fi`
- Understand file inclusion vulnerabilities
- Document findings

---

### Short Term (Next 2 Weeks)

**Week 2: XSS and CSRF**
- Study XSS Reflected, XSS Stored, XSS DOM
- Study CSRF attacks
- Try exploiting each in DVWA browser

**Week 3: Authentication and CORS**
- Study brute force attacks
- Study CORS misconfiguration
- Study MD5 vs bcrypt for passwords

---

### Medium Term (Month 1)

**Learn OWASP Top 10 deeply:**
- A01 Broken Access Control
- A02 Cryptographic Failures
- A03 Injection
- A04 Insecure Design
- A05 Security Misconfiguration
- A06 Vulnerable Components
- A07 Authentication Failures
- A08 Software Integrity Failures
- A09 Logging Failures
- A10 SSRF

**Practice on PortSwigger Web Security Academy:**
- Free labs at `portswigger.net/web-security`
- Covers all OWASP Top 10 with hands-on labs

---

## Part 5: How to Document Each Vulnerability

Use this template for every finding:

```
Vulnerability Name: SQL Injection
Tool: Semgrep
File: C:\DVWA\vulnerabilities\sqli\source\low.php
Line: 10
Severity: High
OWASP: A03 - Injection
CWE: CWE-89

Description:
User input is directly inserted into SQL query without sanitization.

Vulnerable Code:
$query = "SELECT * FROM users WHERE id = '$id'";

How to Exploit:
Enter ' OR '1'='1 in the input field to bypass authentication.

Impact:
Attacker can steal all database records, bypass login, or delete data.

Fix:
Use prepared statements:
$stmt = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("s", $id);

False Positive: No
Verified: Yes (manually exploited)
```

---

## Part 6: What to Tell Your Manager

### Daily Standup:
"Yesterday I scanned DVWA using Semgrep and found 78 vulnerabilities. Today I am going through SQL Injection findings one by one, verifying them manually, and documenting each one. I am also setting up Semgrep Cloud to scan my personal project."

### Weekly Update:
"This week I completed analysis of SQL Injection and Command Injection vulnerabilities in DVWA. I verified X findings as real and Y as false positives. I have documented each finding with description, exploit steps, and fix recommendations. Next week I will cover XSS and SSRF."

### Monthly Presentation:
- Show Semgrep dashboard with findings
- Present top 3 critical vulnerabilities with proof of concept
- Show false positive analysis
- Share your documentation
- Explain your learning progress and OWASP Top 10 understanding

---

## Part 7: Tools Summary

| Tool | Purpose | Language | Command |
|------|---------|----------|---------|
| Bandit | Python security scanner | Python only | `bandit -r C:\DVWA` |
| Semgrep CLI | Multi-language scanner | PHP, JS, Python, YAML | `semgrep --config=auto C:\DVWA` |
| Semgrep Cloud | Cloud-based scanner with dashboard | All languages | `semgrep.dev` |
| OWASP ZAP | Dynamic scanner (black box) | All | Next tool to learn |
| SonarQube | Code quality + security | All | Next tool to learn |

---

## Part 8: Your 30 Day Learning Plan

| Week | Topic | DVWA Feature | Tool |
|------|-------|-------------|------|
| Week 1 | SQL Injection + Command Injection | sqli, exec | Semgrep CLI |
| Week 2 | XSS + File Inclusion + SSRF | xss_r, xss_s, fi | Semgrep CLI |
| Week 3 | CSRF + Auth + CORS | csrf, brute, api | Semgrep Cloud |
| Week 4 | Full report + Personal project scan | All | Semgrep Cloud |

---

## Key Resources

- OWASP Top 10: `owasp.org/Top10`
- PortSwigger Academy: `portswigger.net/web-security`
- Semgrep Docs: `semgrep.dev/docs`
- Bandit Docs: `bandit.readthedocs.io`
- DVWA GitHub: `github.com/digininja/DVWA`
- CWE Database: `cwe.mitre.org`

---

*Document created as part of AppSec onboarding task*
*Tools used: Bandit, Semgrep, DVWA, Miniconda, Hyper-V, UTM, Windows 11*
