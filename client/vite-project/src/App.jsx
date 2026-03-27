import Dashboard from "./components/Dashboard";
import "./App.css";

const stats = [
  { value: "99.92%", label: "platform uptime target" },
  { value: "<300ms", label: "latency benchmark" },
  { value: "24/7", label: "operational visibility" },
];

const features = [
  {
    title: "Rail Health Monitoring",
    text: "Track institution health, pending pressure, and response time before issues become payment failures.",
  },
  {
    title: "Routing Intelligence",
    text: "Use live operational signals to decide where traffic should flow for better conversion and lower disruption.",
  },
  {
    title: "Ops Command Center",
    text: "Give product, finance, and reliability teams one place to understand how your banking network is performing.",
  },
];

const productModules = [
  {
    title: "Live Ops Console",
    text: "Real-time visibility into institution health, success rates, and operational anomalies.",
  },
  {
    title: "Alerting Layer",
    text: "Trigger incident workflows when degraded rails, queue buildup, or latency spikes cross thresholds.",
  },
  {
    title: "Partner Scorecards",
    text: "Compare banks and rails over time with performance snapshots that teams can act on quickly.",
  },
  {
    title: "Executive Reporting",
    text: "Turn infrastructure data into a business-ready view for leadership, investors, and partners.",
  },
];

const steps = [
  "Connect banking and payment rails to your metrics pipeline.",
  "Monitor live health, success, and latency signals in one dashboard.",
  "Respond faster with a single operating view for fintech teams.",
];

const useCases = [
  "Merchant payment orchestration",
  "Fintech operations teams",
  "Settlement and treasury visibility",
  "Bank partner performance monitoring",
];

const testimonials = [
  {
    quote:
      "RailPulse gave our operations team the confidence to explain partner reliability in one screen.",
    name: "Aarav Mehta",
    role: "Head of Ops, PayBridge",
  },
  {
    quote:
      "We moved from reactive incident updates to proactive routing decisions during peak payment windows.",
    name: "Nisha Kapoor",
    role: "Product Lead, Settly",
  },
];

const pricing = [
  {
    tier: "Starter",
    price: "$499",
    note: "per month",
    points: [
      "Up to 5 institutions",
      "Live operations dashboard",
      "Core KPI monitoring",
      "Email support",
    ],
  },
  {
    tier: "Growth",
    price: "$1,499",
    note: "per month",
    featured: true,
    points: [
      "Up to 20 institutions",
      "Advanced alerting",
      "Role-based access",
      "Historical performance trends",
    ],
  },
  {
    tier: "Enterprise",
    price: "Custom",
    note: "tailored plan",
    points: [
      "Unlimited institutions",
      "Custom integrations",
      "Dedicated support",
      "Private deployment options",
    ],
  },
];

const faqs = [
  {
    question: "Who is RailPulse for?",
    answer:
      "RailPulse is designed for fintech startups, payment teams, treasury operations, and reliability teams that depend on multiple banking or payment partners.",
  },
  {
    question: "Is this only for internal teams?",
    answer:
      "No. It can be used as an internal command center, a partner-facing scorecard, or a demo-ready product interface for clients and investors.",
  },
  {
    question: "What should be added next to make it production-ready?",
    answer:
      "The highest-value next steps are authentication, alerts, historical analytics, audit trails, and partner-specific drill-down pages.",
  },
];

const partners = ["Horizon Bank", "PayBridge", "Northstar Capital", "ClearLedger", "AxisFlow"];

function App() {
  return (
    <div className="startup-site">
      <header className="startup-nav">
        <div className="startup-brand">
          <div>
            <p className="startup-brand-name">RailPulse</p>
            <p className="startup-brand-tag">
              Live payment rail intelligence for modern fintech teams
            </p>
          </div>
        </div>

        <nav className="startup-links">
          <a href="#product">Product</a>
          <a href="#solutions">Solutions</a>
          <a href="#operations">Operations</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="startup-main">
        <section className="startup-hero">
          <div className="startup-hero-copy">
            <p className="startup-eyebrow">Fintech Infrastructure Startup</p>
            <h1>Build trust into every payment rail you operate.</h1>
            <p className="startup-hero-text">
              RailPulse is a startup-ready operations platform for fintech companies
              that need real-time visibility into bank connectivity, transaction health,
              and partner performance across their network.
            </p>

            <div className="startup-actions">
              <a className="startup-primary" href="#operations">
                Explore Live Dashboard
              </a>
              <a className="startup-secondary" href="#pricing">
                View Pricing
              </a>
            </div>

            <div className="startup-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="startup-stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="startup-hero-panel">
            <p className="hero-panel-label">Why fintech teams care</p>
            <div className="hero-panel-card">
              <span>Failed payment prevention</span>
              <strong>Detect weak institutions before merchants feel it.</strong>
            </div>
            <div className="hero-panel-card">
              <span>Partner transparency</span>
              <strong>See how each banking rail behaves in real time.</strong>
            </div>
            <div className="hero-panel-card">
              <span>Decision speed</span>
              <strong>Turn infrastructure signals into faster routing choices.</strong>
            </div>
          </aside>
        </section>

        <section id="operations" className="startup-section">
          <div className="section-heading">
            <p className="section-kicker">Operations</p>
            <h2>Live network operations dashboard</h2>
            <p className="section-copy">
              This is the product view your clients, ops team, or internal stakeholders
              can use to understand how your infrastructure is working in real time.
            </p>
          </div>

          <Dashboard />
        </section>

        <section className="trust-strip">
          <p className="trust-label">Trusted design direction for modern fintech operations</p>
          <div className="partner-row">
            {partners.map((partner) => (
              <span key={partner} className="partner-pill">
                {partner}
              </span>
            ))}
          </div>
        </section>

        <section id="product" className="startup-section">
          <div className="section-heading">
            <p className="section-kicker">Product</p>
            <h2>One operating layer for payment reliability</h2>
            <p className="section-copy">
              Bring health monitoring, routing confidence, and partner visibility into
              a single product experience that feels enterprise-ready from day one.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <p className="feature-title">{feature.title}</p>
                <p className="feature-text">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="startup-section">
          <div className="section-heading">
            <p className="section-kicker">Platform Modules</p>
            <h2>Built like a real fintech SaaS product</h2>
          </div>

          <div className="module-grid">
            {productModules.map((module) => (
              <article key={module.title} className="module-card">
                <p className="module-title">{module.title}</p>
                <p className="module-text">{module.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solutions" className="startup-section startup-split">
          <div className="section-heading">
            <p className="section-kicker">Why Us</p>
            <h2>Made for fintech startups that need operational clarity early</h2>
            <p className="section-copy">
              Early-stage fintech companies often manage multiple bank partners,
              payment providers, and fragile workflows. RailPulse helps teams look
              credible, move faster, and operate with the discipline of a larger company.
            </p>
          </div>

          <div className="step-panel">
            {steps.map((step, index) => (
              <div key={step} className="step-row">
                <span className="step-index">0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="startup-section usecase-panel">
          <div className="section-heading">
            <p className="section-kicker">Use Cases</p>
            <h2>Position it for customers, partners, and investors</h2>
          </div>

          <div className="usecase-grid">
            {useCases.map((item) => (
              <div key={item} className="usecase-card">
                {item}
              </div>
            ))}
          </div>
        </section>

        

        <section className="startup-section">
          <div className="section-heading">
            <p className="section-kicker">Testimonials</p>
            <h2>Make the product feel market-ready</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <p className="testimonial-quote">"{item.quote}"</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="startup-section">
          <div className="section-heading">
            <p className="section-kicker">Pricing</p>
            <h2>Simple plans for startup, growth, and enterprise teams</h2>
          </div>

          <div className="pricing-grid">
            {pricing.map((plan) => (
              <article
                key={plan.tier}
                className={`pricing-card${plan.featured ? " featured-plan" : ""}`}
              >
                <p className="pricing-tier">{plan.tier}</p>
                <div className="pricing-value">
                  <strong>{plan.price}</strong>
                  <span>{plan.note}</span>
                </div>
                <div className="pricing-list">
                  {plan.points.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
                <a href="#contact" className="pricing-action">
                  Get Started
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="startup-section">
          <div className="section-heading">
            <p className="section-kicker">FAQ</p>
            <h2>Answer the questions people will ask first</h2>
          </div>

          <div className="faq-list">
            {faqs.map((item) => (
              <article key={item.question} className="faq-card">
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="startup-section contact-panel">
          <div>
            <p className="section-kicker">Contact</p>
            <h2>Position this as your startup's core product.</h2>
            <p className="section-copy">
              With real metrics, authentication, alerts, and customer-facing workflows,
              this can become a compelling fintech startup product or investor demo.
            </p>
          </div>

          <div className="contact-cta">
            <span>Next moves</span>
            <strong>Add auth, alerting, partner pages, and historical trends.</strong>
            <a href="mailto:hello@railpulse.ai" className="startup-primary contact-button">
              hello@railpulse.ai
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
