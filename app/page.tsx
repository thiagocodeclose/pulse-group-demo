// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --pl-bg: #F8F8F8;
    --pl-white: #FFFFFF;
    --pl-primary: #FF1744;
    --pl-secondary: #E91E63;
    --pl-dark: #1A1A1A;
    --pl-text: #333333;
    --pl-muted: #777;
    --pl-border: #E5E5E5;
    --font-display: var(--font-mont), 'Montserrat', sans-serif;
    --font-body: var(--font-open), 'Open Sans', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--pl-bg); color: var(--pl-text); overflow-x: hidden; }

  /* NAV */
  .pl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(255,255,255,0.97); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--pl-border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 64px;
  }
  .pl-logo { font-family: var(--font-display); font-size: 1.3rem; font-weight: 900; letter-spacing: 0.02em; color: var(--pl-dark); text-decoration: none; }
  .pl-logo span { color: var(--pl-primary); }
  .pl-nav-links { display: flex; gap: 2rem; list-style: none; }
  .pl-nav-links a { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--pl-muted); text-decoration: none; transition: color 0.2s; }
  .pl-nav-links a:hover { color: var(--pl-primary); }
  .pl-nav-cta { background: var(--pl-primary); color: #fff; font-family: var(--font-display); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; border: none; padding: 0.65rem 1.5rem; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
  .pl-nav-cta:hover { background: #D50032; }

  /* HERO */
  .pl-hero {
    position: relative; padding-top: 64px;
    min-height: 90vh; display: flex; align-items: center;
    overflow: hidden;
  }
  .pl-hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80');
    background-size: cover; background-position: center;
  }
  .pl-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(26,26,26,0.82) 0%, rgba(255,23,68,0.35) 100%); }
  .pl-hero-content { position: relative; z-index: 2; padding: 5rem 2rem; max-width: 700px; margin-left: 5%; }
  .pl-hero-tag { display: inline-block; background: var(--pl-primary); color: #fff; font-family: var(--font-display); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.4rem 1rem; margin-bottom: 1.5rem; border-radius: 2px; }
  .pl-hero-title { font-family: var(--font-display); font-size: clamp(2.8rem, 8vw, 5.5rem); font-weight: 900; line-height: 1; color: #fff; margin-bottom: 1.25rem; }
  .pl-hero-title span { color: var(--pl-primary); }
  .pl-hero-sub { font-size: 1.1rem; font-weight: 300; color: rgba(255,255,255,0.82); line-height: 1.65; margin-bottom: 2.5rem; max-width: 460px; }
  .pl-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .pl-btn-primary { background: var(--pl-primary); color: #fff; font-family: var(--font-display); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 2.5rem; border: none; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
  .pl-btn-primary:hover { background: #D50032; }
  .pl-btn-white { background: transparent; color: #fff; font-family: var(--font-display); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 2rem; border: 2px solid rgba(255,255,255,0.5); border-radius: 4px; cursor: pointer; transition: border-color 0.2s; }
  .pl-btn-white:hover { border-color: #fff; }

  /* STATS STRIP */
  .pl-stats { background: var(--pl-primary); display: grid; grid-template-columns: repeat(4,1fr); }
  .pl-stat { padding: 1.75rem 1.5rem; text-align: center; border-right: 1px solid rgba(255,255,255,0.15); }
  .pl-stat:last-child { border-right: none; }
  .pl-stat-value { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 900; color: #fff; }
  .pl-stat-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.75); margin-top: 0.25rem; }

  /* SECTION */
  .pl-section { padding: 5rem 2rem; max-width: 1200px; margin: 0 auto; }
  .pl-section-alt { background: var(--pl-white); padding: 5rem 0; }
  .pl-section-alt-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .pl-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--pl-primary); margin-bottom: 0.6rem; }
  .pl-heading { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: var(--pl-dark); margin-bottom: 0.75rem; line-height: 1.1; }
  .pl-heading span { color: var(--pl-primary); }
  .pl-body { font-size: 1rem; font-weight: 300; color: var(--pl-muted); line-height: 1.7; max-width: 520px; }

  /* CLASS GRID */
  .pl-classes { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .pl-class { background: var(--pl-white); border-radius: 8px; padding: 1.75rem; border: 1px solid var(--pl-border); box-shadow: 0 2px 12px rgba(0,0,0,0.04); transition: transform 0.25s, box-shadow 0.25s; }
  .pl-class:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(255,23,68,0.12); }
  .pl-class-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
  .pl-class-name { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--pl-dark); }
  .pl-class-meta { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; }
  .pl-class-tag { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; padding: 0.25rem 0.6rem; border-radius: 3px; }
  .pl-class-tag.duration { background: #FFF0F3; color: var(--pl-primary); }
  .pl-class-tag.level { background: #F5F5F5; color: var(--pl-muted); }
  .pl-class-tag.cal { background: #FFF8F0; color: #FF6D00; }
  .pl-class-desc { font-size: 0.88rem; font-weight: 300; color: var(--pl-muted); line-height: 1.6; }

  /* SCHEDULE */
  .pl-schedule { border: 1px solid var(--pl-border); border-radius: 8px; overflow: hidden; margin-top: 3rem; }
  .pl-sch-row { display: grid; grid-template-columns: 3.5rem 6rem 1fr 7rem 4rem; align-items: center; gap: 1rem; padding: 1rem 1.5rem; border-bottom: 1px solid var(--pl-border); transition: background 0.15s; }
  .pl-sch-row:last-child { border-bottom: none; }
  .pl-sch-row:hover { background: #FFF5F7; }
  .pl-sch-day { font-family: var(--font-display); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--pl-primary); }
  .pl-sch-time { font-size: 0.85rem; font-weight: 600; color: var(--pl-dark); }
  .pl-sch-name { font-size: 0.9rem; font-weight: 600; color: var(--pl-dark); }
  .pl-sch-trainer { font-size: 0.8rem; color: var(--pl-muted); }
  .pl-sch-level { font-size: 0.7rem; font-weight: 600; background: #FFF0F3; color: var(--pl-primary); padding: 0.2rem 0.5rem; border-radius: 3px; text-align: center; }

  /* PRICING */
  .pl-pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .pl-plan { background: var(--pl-white); border: 2px solid var(--pl-border); border-radius: 12px; padding: 2.5rem 2rem; position: relative; transition: border-color 0.25s, transform 0.25s; }
  .pl-plan:hover { transform: translateY(-4px); }
  .pl-plan.featured { border-color: var(--pl-primary); }
  .pl-plan-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--pl-primary); color: #fff; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 1rem; border-radius: 20px; white-space: nowrap; }
  .pl-plan-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--pl-dark); margin-bottom: 0.5rem; margin-top: 0.5rem; }
  .pl-plan-price { font-family: var(--font-display); font-size: 3rem; font-weight: 900; color: var(--pl-primary); line-height: 1; }
  .pl-plan-period { font-size: 0.8rem; color: var(--pl-muted); margin-bottom: 1.5rem; }
  .pl-plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
  .pl-plan-features li { font-size: 0.88rem; color: var(--pl-text); display: flex; align-items: center; gap: 0.5rem; }
  .pl-plan-features li::before { content: '✓'; color: var(--pl-primary); font-weight: 700; }
  .pl-btn-plan { width: 100%; background: var(--pl-primary); color: #fff; font-family: var(--font-display); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.9rem; border: none; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
  .pl-btn-plan:hover { background: #D50032; }
  .pl-btn-plan.outline { background: transparent; color: var(--pl-primary); border: 2px solid var(--pl-primary); }
  .pl-btn-plan.outline:hover { background: var(--pl-primary); color: #fff; }

  /* CTA */
  .pl-cta { background: linear-gradient(135deg, #FF1744 0%, #E91E63 100%); padding: 5rem 2rem; text-align: center; }
  .pl-cta-title { font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 4rem); font-weight: 900; color: #fff; margin-bottom: 1rem; }
  .pl-cta-sub { font-size: 1.05rem; color: rgba(255,255,255,0.85); margin-bottom: 2.5rem; }
  .pl-btn-white-solid { background: #fff; color: var(--pl-primary); font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 1.1rem 3rem; border: none; border-radius: 6px; cursor: pointer; transition: opacity 0.2s; }
  .pl-btn-white-solid:hover { opacity: 0.9; }

  /* FOOTER */
  .pl-footer { background: var(--pl-dark); color: rgba(255,255,255,0.7); padding: 3rem 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
  .pl-footer-logo { font-family: var(--font-display); font-size: 1.3rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; }
  .pl-footer-logo span { color: var(--pl-primary); }
  .pl-footer-info { font-size: 0.8rem; line-height: 1.7; }
  .pl-footer-copy { font-size: 0.75rem; color: rgba(255,255,255,0.35); }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 768px) {
    .pl-nav-links { display: none; }
    .pl-stats { grid-template-columns: repeat(2,1fr); }
    .pl-sch-row { grid-template-columns: 3.5rem 1fr auto; gap: 0.5rem; }
    .pl-sch-trainer { display: none; }
    .pl-footer { flex-direction: column; text-align: center; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((e) => {
      e.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('visible'); io.unobserve(x.target); } });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function PulsePage() {
  const d = siteData;
  useReveal();

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="pl-nav">
        <a href="#" className="pl-logo">PULSE<span>.</span></a>
        <ul className="pl-nav-links">
          <li><a href="#classes">Classes</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <button className="pl-nav-cta">Try for Free</button>
      </nav>

      {/* HERO */}
      <section className="pl-hero">
        <div className="pl-hero-bg" />
        <div className="pl-hero-overlay" />
        <div className="pl-hero-content">
          <div className="pl-hero-tag">Miami Beach · Group Fitness</div>
          <h1 data-cg-el="hero_headline_1" className="pl-hero-title">
            FEEL<br />EVERY<br /><span>BEAT.</span>
          </h1>
          <p data-cg-el="hero_subtitle" className="pl-hero-sub">{d.gym.name} brings Miami energy to group fitness. Classes that challenge you, music that moves you, results you'll actually see.</p>
          <div className="pl-hero-actions">
            <button data-cg-el="hero_cta_primary" className="pl-btn-primary">Start for Free</button>
            <button data-cg-el="hero_cta_secondary" className="pl-btn-white">View Schedule</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="pl-stats">
        {d.stats.map((s) => (
          <div key={s.label} className="pl-stat">
            <div className="pl-stat-value">{s.value}</div>
            <div className="pl-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CLASSES */}
      <section className="pl-section" id="classes">
        <p className="pl-eyebrow reveal">What We Offer</p>
        <h2 className="pl-heading reveal" style={{ transitionDelay: '0.1s' }}>GROUP<br /><span>CLASSES</span></h2>
        <p className="pl-body reveal" style={{ transitionDelay: '0.2s' }}>Six class formats, one goal: the best 45 minutes of your day.</p>
        <div className="pl-classes">
          {d.classTypes.map((c, i) => (
            <div key={c.name} className="pl-class reveal" style={{ transitionDelay: `${0.07 * i}s` }}>
              <div className="pl-class-header">
                <span className="pl-class-name">{c.name}</span>
              </div>
              <div className="pl-class-meta">
                <span className="pl-class-tag duration">{c.duration}</span>
                <span className="pl-class-tag level">{c.level}</span>
                <span className="pl-class-tag cal">{c.calories} kcal</span>
              </div>
              <p className="pl-class-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <div className="pl-section-alt" id="schedule">
        <div className="pl-section-alt-inner">
          <p className="pl-eyebrow reveal">This Week</p>
          <h2 className="pl-heading reveal" style={{ transitionDelay: '0.1s' }}>CLASS<br /><span>SCHEDULE</span></h2>
          <div className="pl-schedule">
            {d.schedule.map((s, i) => (
              <div key={i} className="pl-sch-row reveal" style={{ transitionDelay: `${0.05 * i}s` }}>
                <span className="pl-sch-day">{s.day}</span>
                <span className="pl-sch-time">{s.time}</span>
                <span className="pl-sch-name">{s.name}</span>
                <span className="pl-sch-trainer">with {s.trainer}</span>
                <span className="pl-sch-level">{s.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section className="pl-section" id="pricing">
        <p className="pl-eyebrow reveal">Membership</p>
        <h2 className="pl-heading reveal" style={{ transitionDelay: '0.1s' }}>SIMPLE<br /><span>PRICING</span></h2>
        <div className="pl-pricing">
          {d.pricing.map((p, i) => (
            <div key={p.name} className={`pl-plan reveal ${p.highlight ? 'featured' : ''}`} style={{ transitionDelay: `${0.1 * i}s` }}>
              {p.highlight && <div className="pl-plan-badge">Best Value</div>}
              <div className="pl-plan-name">{p.name}</div>
              <div className="pl-plan-price">{p.price}</div>
              <div className="pl-plan-period">{p.period}</div>
              <ul className="pl-plan-features">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button className={`pl-btn-plan ${p.highlight ? '' : 'outline'}`}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="pl-cta">
        <h2 className="pl-cta-title">Your First Class<br />Is On Us</h2>
        <p className="pl-cta-sub">Join {d.gym.location}'s most energetic fitness community. No commitment required.</p>
        <button className="pl-btn-white-solid">Claim Free Class →</button>
      </div>

      {/* FOOTER */}
      <footer className="pl-footer">
        <div>
          <div className="pl-footer-logo">PULSE<span>.</span></div>
          <div className="pl-footer-info">{d.gym.address}<br />{d.gym.phone} · {d.gym.email}</div>
        </div>
        <div className="pl-footer-copy">© {new Date().getFullYear()} {d.gym.name}. Powered by Koriva.</div>
      </footer>
    </>
  );
}
