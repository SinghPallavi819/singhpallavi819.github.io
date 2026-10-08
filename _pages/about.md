---
layout: page
title: About Me
permalink: /about/
---

<style>
  .about-content {
    color: #172033;
    font-size: 16px;
    line-height: 1.75;
  }

  .about-content,
  .about-content * {
    box-sizing: border-box;
  }

  .about-content .hero-card {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    gap: 32px;
    padding: 32px;
    align-items: start;
  }

  .about-content .hero-left,
  .about-content .hero-right {
    min-width: 0;
  }

  .about-content .hero-title {
    font-size: clamp(28px, 4vw, 38px);
    line-height: 1.2;
    margin: 0 0 24px;
    letter-spacing: -.025em;
  }

  .about-content .hero-subtitle {
    font-size: 16px;
    line-height: 1.75;
    color: #526078;
    margin: 0 0 20px;
  }

  .about-content strong {
    color: #172033;
    font-weight: 650;
  }

  .about-content .mini-card {
    padding: 24px;
    margin: 0 0 18px;
    border: 1px solid #e3e8f0;
    border-radius: 18px;
    background: #fff;
    transition: border-color .2s ease, box-shadow .2s ease;
  }

  .about-content .mini-card:hover {
    border-color: #c5c4ef;
    box-shadow: 0 8px 24px rgba(23, 32, 51, .05);
  }

  .about-content .mini-card h2,
  .about-content .section-card h2 {
    font-size: 20px;
    line-height: 1.35;
    margin: 0 0 14px;
  }

  .about-content .mini-card p,
  .about-content .section-card p {
    margin: 0 0 14px;
    color: #526078;
    font-size: 16px;
    line-height: 1.75;
  }

  .about-content .mini-card p:last-child,
  .about-content .section-card p:last-child {
    margin-bottom: 0;
  }

  .about-content .mini-card ul {
    padding-left: 20px;
    margin: 0;
    color: #526078;
    font-size: 15px;
  }

  .about-content .mini-card li {
    margin: 6px 0;
  }

  .about-content .section-card {
    padding: 28px;
    margin-top: 24px;
  }

  @keyframes about-enter {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .about-content .hero-card {
    animation: about-enter .55s ease-out backwards;
  }

  .about-content .section-card {
    animation: about-enter .55s .15s ease-out backwards;
  }

  @media (max-width: 800px) {
    .about-content .hero-card {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  @media (max-width: 520px) {
    .about-content .hero-card,
    .about-content .section-card {
      padding: 22px;
    }

    .about-content .mini-card {
      padding: 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .about-content .hero-card,
    .about-content .section-card {
      animation: none;
    }

    .about-content .mini-card {
      transition: none;
    }
  }
</style>

<div class="about-content">
  <div class="hero-card">
    <div class="hero-left">
      <h1 class="hero-title">
        Curiosity is where my security work starts.
      </h1>

      <p class="hero-subtitle">
        I like tracing a security issue back to its cause: the
        assumption in application code, the missing check, or the
        activity that stands out in a log. My graduate studies in
        Computer Science give me a foundation for this work, while
        practical projects help me connect concepts to real
        security problems.
      </p>

      <p class="hero-subtitle">
        At <strong>Toyota Insurance Management Solutions</strong>,
        I explored how security tooling fits into a developer’s
        workflow. My internship included configuring and testing a
        <strong>Semgrep SAST pilot in Bitbucket Pipelines</strong>,
        validating findings, working with SAST/SCA tools, and
        training developers on secure development tooling.
        It helped me see the value of clear findings and practical
        guidance when supporting secure development.
      </p>

      <p class="hero-subtitle">
        My earlier work in log analysis and incident investigation
        still shapes how I approach application security: follow
        the evidence, check assumptions, and explain what happened.
        I bring that approach to projects involving
        <strong>AI-assisted vulnerability analysis, alert triage,
        and AWS threat detection</strong>.
      </p>

      <p class="hero-subtitle">
        I’m interested in how AI can help with security analysis
        and in the security challenges AI-powered applications
        introduce. Building and testing these projects gives me
        a way to explore both interests.
      </p>
    </div>

    <div class="hero-right">
      <div class="mini-card">
        <h2>What I’m Practicing</h2>
        <p>
          Through <strong>PentesterLab</strong>, I’m developing my
          web application security and secure code review skills.
          I focus on understanding vulnerable code, following how
          inputs are handled, and connecting application behavior
          to the underlying weakness.
        </p>
      </div>

      <div class="mini-card">
        <h2>Tools &amp; Practices</h2>
        <ul>
          <li>Semgrep and SAST/SCA tooling</li>
          <li>Bitbucket Pipelines and CI/CD security</li>
          <li>Secure SDLC and OWASP Top 10</li>
          <li>AWS security and AWS Inspector</li>
          <li>Python and AI-assisted automation</li>
          <li>Log analysis and SOC alert triage</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="section-card">
    <h2>How I Work Through a Finding</h2>
    <p>
      I start by understanding the context, then investigate
      whether the evidence supports the finding. From there,
      I consider its impact and document practical next steps.
      When I use AI to assist with analysis, I review its output
      against the code, logs, or other evidence rather than
      treating the generated answer as a conclusion.
    </p>
  </div>
</div>
