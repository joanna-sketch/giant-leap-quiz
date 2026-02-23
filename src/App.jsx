import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// ✏️ UPDATE THESE 2 THINGS EACH WEEK
// ═══════════════════════════════════════════════════════════════════════════

const WEEK_LABEL = '18 – 24 Feb 2026';
const LEADERBOARD_KEY = 'giant_leap_quiz_feb18_2026';

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 CONFIGURATION - SET ONCE
// ═══════════════════════════════════════════════════════════════════════════

const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/3948221/ucppuo0/';
const GOOGLE_SHEET_ID = '1oYP6SOjYXSX_2rGCh3rZP9GfL17wbzgWtcKgGysMNII';

// ═══════════════════════════════════════════════════════════════════════════

const questionBank = [
  {
    question: "In Capital Brief’s coverage of Eucalyptus’ sale to Hims & Hers, what metric shift was highlighted as most important for Australian VCs right now?",
    options: [
      "Increase in TVPI from marking up private rounds",
      "Higher IRR driven by paper gains pre-exit",
      "Conversion of exit value into DPI (cash back to LPs)",
      "Growth in management fees from larger funds"
    ],
    correct: 2,
    explanation: "In the current exit environment, DPI (real cash returned to LPs) matters more than paper mark-ups. Liquidity is being prioritised over unrealised valuation gains."
  },
  {
    question: "Capital Brief reported that Eucalyptus retreated from an expansion into men’s longevity to focus on weight loss. From an IC perspective, what’s the best interpretation of that pivot given a strategic buyer acquired them shortly after?",
    options: [
      "They were forced to pivot mainly due to a new Australian regulation limiting longevity marketing",
      "It likely improved buyer fit by doubling down on the highest-growth, most defensible wedge (GLP-1/weight loss)",
      "It signals their CAC had collapsed in men’s health, so they chased a cheaper demographic",
      "It implies their clinicians refused to support longevity products on ethical grounds"
    ],
    correct: 1,
    explanation: "Strategic focus can increase acquisition probability by clarifying the core growth engine and reducing execution risk. Optionality is not always valuable if it blurs product-market fit before liquidity."
  },
  {
    question: "Capital Brief described an evolution in Firmus’ sustainability positioning—moving from aspirational claims to quantifiable measures. What’s the most investor-relevant risk this evolution highlights for an AI data-centre IPO story?",
    options: [
      "Quantified metrics always reduce scrutiny, making IPO due diligence faster",
      "It suggests the main risk is customer churn in enterprise SaaS contracts",
      "It increases the likelihood of a short-seller attack focused on unit economics disclosure",
      "It flags that 'green edge' differentiation can compress as competitors match measured efficiency, reducing pricing power"
    ],
    correct: 3,
    explanation: "If sustainability advantages narrow, valuation must rely on durable cost curves and customer lock-in rather than narrative differentiation. Measurable moats can also become comparable."
  },
  {
    question: "Capital Brief reported Superpower is being sued by US rival Function Health, including allegations about inflating biomarker claims and risky employee practices. As an early-stage healthtech investor, what’s the most prudent immediate diligence response?",
    options: [
      "Focus primarily on cloud spend and gross margin trajectory to assess runway risk",
      "Ask for cohort retention metrics to see if the product still works despite controversy",
      "Request detailed substantiation: clinical validation, marketing claim support, and internal safety/compliance controls",
      "Delay diligence until the lawsuit settles to avoid anchoring bias"
    ],
    correct: 2,
    explanation: "In consumer health, claims substantiation and governance are existential risks. Diligence must assess defensibility under adversarial scrutiny, not just growth."
  },
  {
    question: "Techstars Sydney is shutting down after three years because NSW government funding was not renewed. What’s the most likely near-term ecosystem implication for Australian pre-seed investors?",
    options: [
      "Higher availability of government grants will replace accelerator-first cheques",
      "More seed rounds will shift offshore because Australian SAFEs are no longer accepted",
      "University spinouts will slow because accelerators are the primary IP owners",
      "Less structured early founder formation locally, increasing the value of founder-led communities and scout networks"
    ],
    correct: 3,
    explanation: "When a structured early funnel disappears, sourcing shifts to informal networks, universities, and micro-funds. Funds that replicate accelerator value may gain disproportionate access."
  },
  {
    question: "Overnight Success covered Appetise raising a Series A and explicitly walking away from ~$400k in consumer subscription revenue to scale its data engine. What’s the best VC interpretation of this trade-off?",
    options: [
      "It likely improves strategic value by prioritising a scalable B2B insights product over low-ceiling consumer monetisation",
      "It suggests the product is failing, so they abandoned monetisation entirely",
      "It’s mainly a branding decision to win app-store rankings through free distribution",
      "It reduces compliance risk because paid subscriptions trigger stricter privacy obligations than free apps"
    ],
    correct: 0,
    explanation: "Sacrificing small consumer revenue can be rational if it accelerates dataset growth and strengthens a higher-ARPA B2B model. The key question is whether the data moat compounds."
  },
  {
    question: "Breaker raised a $9m seed to move beyond the 'one-operator-per-robot' model, using voice commands and onboard agents even in GPS/comms-denied environments. For a VC assessing dual-use defence tech, what’s the sharpest go-to-market question implied?",
    options: [
      "Can the company win repeated procurement pathways (not just demos) across defence agencies with long sales cycles?",
      "Can the company reduce office footprint to extend runway?",
      "Can the company migrate from Python to Rust for performance?",
      "Can the company avoid hiring ex-military staff to keep burn low?"
    ],
    correct: 0,
    explanation: "Defence outcomes hinge on procurement and integration, not just technical capability. Converting demos into programs of record determines venture-scale viability."
  },
  {
    question: "Capital Brief noted deep AI scepticism among lower income, older and regional Australians, potentially limiting AI’s role in lifting productivity. What’s the most actionable implication for builders and investors in AI for education and workforce upskilling?",
    options: [
      "Avoid these segments entirely and target only metro enterprise users",
      "Lead with trust-building UX: transparency, human-in-the-loop support, and outcomes evidence rather than capability marketing",
      "Prioritise entertainment use-cases first to normalise AI adoption",
      "Shift investment away from applied AI and into semiconductor manufacturing"
    ],
    correct: 1,
    explanation: "If scepticism is concentrated among vulnerable cohorts, adoption depends on perceived safety, fairness, and measurable outcomes. Distribution partnerships become critical."
  },
  {
    question: "UNSW committed $35m to launch 50 university spinouts over five years. Which investor behaviour is most rational if this type of university 'spinout factory' scales?",
    options: [
      "Build earlier technical diligence capability and relationships with university translational offices to pre-empt competitive seed rounds",
      "Move downmarket into consumer apps because spinouts won’t hire commercial talent",
      "Stop backing universities and focus only on repeat founders",
      "Wait for Series B when IP risk is fully eliminated"
    ],
    correct: 0,
    explanation: "Higher spinout volume increases dealflow but also adverse selection risk. Investors who systematise early IP diligence can secure stronger ownership before valuations rise."
  },
  {
    question: "Capital Brief reported Archangel is raising a $40m fund to back pre-seed and seed, citing a funding gap and improving LP appetite favouring smaller VCs. What’s the best explanation for why a smaller fund could be structurally advantaged right now?",
    options: [
      "Smaller funds can deliver meaningful DPI sooner via secondaries and smaller exits, aligning with LP demand for cash distributions",
      "Smaller funds can always underwrite later-stage growth rounds better than large funds",
      "Smaller funds are exempt from competitive deal processes",
      "Smaller funds avoid valuation risk because pre-seed valuations never fall"
    ],
    correct: 0,
    explanation: "In an exit-drought environment, LPs favour managers who can return cash sooner. Smaller funds can generate fund-returners with fewer outcomes and tighter ownership concentration."
  }
];

const C = {
  forest:   '#2d4a3e',
  sage:     '#5a7a64',
  sageLt:   '#8aab8e',
  sand:     '#f5f0e8',
  sandDk:   '#e8e0d0',
  cream:    '#fdfaf5',
  terra:    '#c17f59',
  terralLt: '#e8a87c',
  ink:      '#2a2a24',
  muted:    '#7a7a6e',
  white:    '#ffffff',
  border:   '#ddd8cc',
};

const MEDAL = ['🥇','🥈','🥉'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Load leaderboard from Google Sheets
async function loadLeaderboard() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=Sheet1`;
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));
    
    const entries = json.table.rows.map(row => ({
      name: row.c[0]?.v || '',
      company: row.c[1]?.v || '',
      score: parseInt(row.c[2]?.v || 0),
      total: parseInt(row.c[3]?.v || 10),
      pct: parseInt(row.c[4]?.v || 0),
      ts: new Date(row.c[5]?.v || Date.now()).getTime(),
      week: row.c[6]?.v || ''
    }));
    
    // Filter for current week and sort
    const currentWeek = entries.filter(e => e.week === WEEK_LABEL);
    currentWeek.sort((a, b) => b.pct - a.pct || a.ts - b.ts);
    
    return currentWeek;
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    // Fallback to localStorage
    try {
      const data = localStorage.getItem(LEADERBOARD_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}

// Save score to Zapier webhook (which writes to Google Sheets)
async function saveScore(name, company, score, total) {
  const pct = Math.round((score / total) * 100);
  const timestamp = new Date().toISOString();
  
  try {
    // Send to Zapier webhook
    await fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name || '',
        company: company || '',
        score,
        total,
        percentage: pct,
        timestamp,
        week: WEEK_LABEL
      })
    });
    
    // Also save to localStorage as backup
    const localData = localStorage.getItem(LEADERBOARD_KEY);
    const entries = localData ? JSON.parse(localData) : [];
    const newEntry = { name, company, score, total, pct, ts: Date.now() };
    const idx = entries.findIndex(
      e => (e.name||'').toLowerCase() === name.toLowerCase() &&
           (e.company||'').toLowerCase() === company.toLowerCase()
    );
    if (idx >= 0) { if (pct > entries[idx].pct) entries[idx] = newEntry; }
    else entries.push(newEntry);
    entries.sort((a, b) => b.pct - a.pct || a.ts - b.ts);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries.slice(0, 50)));
    
  } catch (error) {
    console.error('Error saving score:', error);
  }
}

const font = { fontFamily: "'Georgia','Times New Roman',serif" };
const sans = { fontFamily: "'Inter','Helvetica Neue',sans-serif" };

function Cover({ onStart }) {
  return (
    <div style={{ minHeight:'100vh', background: C.cream, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.5rem 1.5rem', ...sans }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <img 
          src="/logo.png" 
          alt="Giant Leap" 
          style={{ 
            width: 240,
            maxWidth: '80%',
            height: 'auto',
            objectFit: 'contain'
          }} 
        />
      </div>

      <div style={{ maxWidth:500, width:'100%', textAlign:'center' }}>
        <h1 style={{ ...font, color: C.ink, fontSize:'2.6rem', fontWeight:400, lineHeight:1.2, marginBottom:'0.5rem' }}>
          Tuesday Morning<br/>
          <em style={{ color: C.terra }}>Startup Quiz</em>
        </h1>

        <p style={{ color: C.muted, fontSize:'0.92rem', lineHeight:1.7, marginBottom:'2rem', maxWidth:380, margin:'0 auto 2rem' }}>
          A weekly team ritual at Giant Leap. How closely were you following the Australian startup ecosystem this week?
        </p>

        <div style={{ display:'flex', gap:'0.7rem', justifyContent:'center', marginBottom:'2rem', flexWrap:'wrap' }}>
          {[['10 questions',''],['~5 minutes','']].map(([v, l]) => (
            <div key={v} style={{ background: C.sandDk, borderRadius:50, padding:'0.45rem 1rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
              <span style={{ color: C.ink, fontSize:'0.82rem', fontWeight:600 }}>{v}</span>
            </div>
          ))}
          <div style={{ background: C.sandDk, borderRadius:50, padding:'0.45rem 1rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
            <span style={{ color: C.sageLt, fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600 }}>This week:</span>
            <span style={{ color: C.ink, fontSize:'0.82rem', fontWeight:600 }}>{WEEK_LABEL}</span>
          </div>
        </div>

        <div style={{ background: C.sandDk, border:`1px solid ${C.border}`, borderRadius:12, padding:'1rem 1.3rem', marginBottom:'2.2rem', textAlign:'left' }}>
          <p style={{ color: C.muted, fontSize:'0.78rem', lineHeight:1.65, margin:0 }}>
            <span style={{ color: C.forest, fontWeight:700 }}>👋 A note before you play:</span> Questions cover Australian startup & venture news from the past week. Your score goes on a public leaderboard. Enter your name or company to participate.
          </p>
        </div>

        <button onClick={onStart}
          style={{ background: C.forest, color: C.white, border:'none', borderRadius:50, padding:'0.85rem 2.5rem', fontWeight:600, fontSize:'1rem', cursor:'pointer', letterSpacing:'0.01em', transition:'opacity 0.15s' }}
          onMouseOver={e => e.currentTarget.style.opacity = 0.85}
          onMouseOut={e => e.currentTarget.style.opacity = 1}>
          Let's play →
        </button>
      </div>
    </div>
  );
}

function Register({ onSubmit }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const disabled = name.trim().length < 2 && company.trim().length < 2;

  const inputStyle = {
    width:'100%', boxSizing:'border-box', background: C.white,
    border:`1.5px solid ${C.border}`, borderRadius:8, color: C.ink,
    fontSize:'0.97rem', padding:'0.7rem 1rem', outline:'none', ...sans,
    transition:'border-color 0.15s',
  };

  return (
    <div style={{ minHeight:'100vh', background: C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', ...sans }}>
      <div style={{ maxWidth:400, width:'100%' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <span style={{ fontSize:'2rem' }}>☕</span>
          <h2 style={{ ...font, color: C.ink, fontSize:'1.7rem', fontWeight:400, margin:'0.5rem 0 0.3rem' }}>Before we begin…</h2>
          <p style={{ color: C.muted, fontSize:'0.88rem', lineHeight:1.6 }}>Fill in at least one — your entry will appear on the leaderboard.</p>
        </div>

        <div style={{ background: C.white, border:`1px solid ${C.border}`, borderRadius:14, padding:'2rem' }}>
          <label style={{ display:'block', color: C.ink, fontSize:'0.78rem', fontWeight:700, marginBottom:'0.4rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alex"
            onFocus={e => e.target.style.borderColor = C.forest} onBlur={e => e.target.style.borderColor = C.border}
            style={{ ...inputStyle, marginBottom:'1.2rem' }} />

          <label style={{ display:'block', color: C.ink, fontSize:'0.78rem', fontWeight:700, marginBottom:'0.4rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Company / Organisation</label>
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Giant Leap"
            onFocus={e => e.target.style.borderColor = C.forest} onBlur={e => e.target.style.borderColor = C.border}
            style={{ ...inputStyle, marginBottom:'0.5rem' }} />

          <p style={{ color: C.muted, fontSize:'0.75rem', marginBottom:'1.5rem' }}>Fill in at least one of the above to continue.</p>

          <button disabled={disabled} onClick={() => onSubmit(name.trim(), company.trim())}
            style={{ width:'100%', background: disabled ? C.sandDk : C.forest, color: disabled ? C.muted : C.white, border:'none', borderRadius:50, padding:'0.8rem', fontWeight:600, fontSize:'0.97rem', cursor: disabled ? 'not-allowed' : 'pointer', transition:'all 0.15s' }}>
            Start quiz →
          </button>
        </div>
      </div>
    </div>
  );
}

function Quiz({ questions, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const q = questions[idx];
  const progress = (idx / questions.length) * 100;
  const currentScore = answered && selected === q.correct ? score + 1 : score;

  const submit = () => {
    if (selected === null) return;
    setAnswered(true);
    if (selected === q.correct) setScore(s => s + 1);
  };

  const next = () => {
    const newScore = (selected === q.correct ? score + 1 : score);
    if (idx + 1 >= questions.length) { onComplete(newScore); return; }
    setIdx(i => i + 1);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div style={{ minHeight:'100vh', background: C.sand, ...sans, padding:'1.5rem 1rem' }}>
      <div style={{ maxWidth:640, margin:'0 auto 1.2rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <img 
          src="/logo.png" 
          alt="Giant Leap" 
          style={{ width: 130, height: 'auto', objectFit:'contain' }} 
        />
        <span style={{ color: C.muted, fontSize:'0.8rem' }}>{WEEK_LABEL}</span>
      </div>

      <div style={{ maxWidth:640, margin:'0 auto 1.4rem' }}>
        <div style={{ background: C.border, borderRadius:50, height:4 }}>
          <div style={{ background: C.sage, height:4, borderRadius:50, width:`${progress}%`, transition:'width 0.4s ease' }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
          <span style={{ color: C.muted, fontSize:'0.75rem' }}>Question {idx + 1} of {questions.length}</span>
          <span style={{ color: C.forest, fontWeight:700, fontSize:'0.75rem' }}>Score: {currentScore}</span>
        </div>
      </div>

      <div style={{ maxWidth:640, margin:'0 auto', background: C.white, borderRadius:16, overflow:'hidden', boxShadow:'0 2px 20px rgba(45,74,62,0.08)' }}>
        <div style={{ background: C.forest, padding:'1.6rem 2rem' }}>
          <div style={{ display:'inline-block', background:'rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.75)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'3px 10px', borderRadius:20, marginBottom:'0.8rem' }}>
            Q{idx + 1}
          </div>
          <p style={{ ...font, color: C.white, fontSize:'1.05rem', lineHeight:1.65, margin:0, fontWeight:400 }}>{q.question}</p>
        </div>

        <div style={{ padding:'1.6rem 2rem' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem', marginBottom:'1.4rem' }}>
            {q.options.map((opt, i) => {
              let bg = C.cream, border = C.border, color = C.ink, fw = 400;
              if (answered) {
                if (i === q.correct) { bg='#edf4ec'; border=C.sage; color=C.forest; fw=600; }
                else if (i === selected && i !== q.correct) { bg='#fdf0ec'; border=C.terra; color='#8b3a1f'; }
                else { color=C.muted; }
              } else if (i === selected) {
                bg='#edf4ec'; border=C.sageLt; color=C.forest; fw=600;
              }
              return (
                <div key={i} onClick={() => !answered && setSelected(i)}
                  style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:10, padding:'0.8rem 1.1rem', cursor: answered ? 'default' : 'pointer', color, fontWeight:fw, fontSize:'0.92rem', lineHeight:1.5, transition:'all 0.15s', userSelect:'none', display:'flex', gap:'0.7rem', alignItems:'flex-start' }}>
                  <span style={{ opacity:0.45, flexShrink:0, marginTop:1, fontSize:'0.8rem', fontWeight:700 }}>{String.fromCharCode(65+i)}.</span>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>

          {!answered ? (
            <button onClick={submit} disabled={selected === null}
              style={{ background: selected !== null ? C.forest : C.sandDk, color: selected !== null ? C.white : C.muted, border:'none', borderRadius:50, padding:'0.7rem 2rem', fontWeight:600, fontSize:'0.92rem', cursor: selected !== null ? 'pointer' : 'not-allowed', transition:'all 0.15s' }}>
              Submit answer
            </button>
          ) : (
            <div>
              <div style={{ background: selected === q.correct ? '#edf4ec' : '#fdf0ec', border:`1.5px solid ${selected === q.correct ? C.sageLt : C.terralLt}`, borderRadius:10, padding:'1rem 1.2rem', marginBottom:'1rem' }}>
                <p style={{ fontWeight:700, color: selected === q.correct ? C.forest : '#8b3a1f', marginBottom:'0.3rem', fontSize:'0.88rem' }}>
                  {selected === q.correct ? '✓ Correct!' : '✕ Not quite'}
                </p>
                <p style={{ color: C.muted, fontSize:'0.85rem', lineHeight:1.6, margin:0 }}>{q.explanation}</p>
              </div>
              <button onClick={next}
                style={{ background: C.forest, color: C.white, border:'none', borderRadius:50, padding:'0.7rem 2rem', fontWeight:600, fontSize:'0.92rem', cursor:'pointer' }}>
                {idx + 1 >= questions.length ? 'See my results →' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Results({ score, total, name, onRestart, onLeaderboard }) {
  const pct = Math.round((score / total) * 100);
  const [saved, setSaved] = useState(false);

  const result = pct >= 80
    ? { emoji:'🌳', title:'Ecosystem Expert', msg:"Sharp. You were clearly paying close attention this week." }
    : pct >= 60
    ? { emoji:'🌱', title:'Well Informed', msg:"A solid read on the week — a few curveballs caught you out, but you've got the big picture." }
    : pct >= 40
    ? { emoji:'🌾', title:'Getting There', msg:"You're across the right spaces. Keep digging into the headlines each week and watch this score climb." }
    : { emoji:'🪴', title:'Room to Grow', msg:"The ecosystem moves fast — tune in each week and this score will leap." };

  useEffect(() => {
    setSaved(true);
  }, []);

  return (
    <div style={{ minHeight:'100vh', background: C.cream, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem', ...sans }}>
      <div style={{ maxWidth:440, width:'100%', textAlign:'center' }}>
        <div style={{ fontSize:'3.5rem', marginBottom:'0.5rem' }}>{result.emoji}</div>
        <h2 style={{ ...font, color: C.ink, fontSize:'2rem', fontWeight:400, marginBottom:'0.3rem' }}>{result.title}</h2>
        <p style={{ color: C.muted, fontSize:'0.9rem', marginBottom:'1.8rem', lineHeight:1.6 }}>{result.msg}</p>

        <div style={{ background: C.white, border:`1px solid ${C.border}`, borderRadius:14, padding:'2rem', marginBottom:'1.5rem' }}>
          <div style={{ color: C.forest, fontWeight:800, fontSize:'3.2rem', ...font }}>{score}<span style={{ fontSize:'1.4rem', color: C.muted, fontWeight:400 }}>/{total}</span></div>
          <div style={{ color: C.terra, fontWeight:700, fontSize:'1.2rem', marginBottom:'0.8rem' }}>{pct}% correct</div>
          <div style={{ color: C.muted, fontSize:'0.78rem' }}>
            {saved ? '✓ Score saved to the leaderboard' : 'Saving…'}
          </div>
        </div>

        <div style={{ display:'flex', gap:'0.8rem', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={onLeaderboard}
            style={{ background: C.forest, color: C.white, border:'none', borderRadius:50, padding:'0.75rem 1.8rem', fontWeight:600, fontSize:'0.92rem', cursor:'pointer' }}>
            See leaderboard →
          </button>
          <button onClick={onRestart}
            style={{ background:'transparent', color: C.ink, border:`1.5px solid ${C.border}`, borderRadius:50, padding:'0.75rem 1.8rem', fontWeight:500, fontSize:'0.92rem', cursor:'pointer' }}>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

function Leaderboard({ currentName, currentCompany, onBack }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await loadLeaderboard();
      setEntries(data);
      setLoading(false);
    })();
  }, []);

  const displayName = e => e.name || e.company || 'Anonymous';
  const isMe = e =>
    (e.name||'').toLowerCase() === currentName.toLowerCase() &&
    (e.company||'').toLowerCase() === currentCompany.toLowerCase();

  return (
    <div style={{ minHeight:'100vh', background: C.cream, ...sans, padding:'2rem 1rem' }}>
      <div style={{ maxWidth:560, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2rem' }}>
          <div>
            <img 
              src="/logo.png" 
              alt="Giant Leap" 
              style={{ 
                width:130, 
                height:'auto', 
                objectFit:'contain',
                marginBottom:'0.8rem'
              }} 
            />
            <h2 style={{ ...font, color: C.ink, fontSize:'1.7rem', fontWeight:400, margin:0 }}>This week's scores</h2>
            <p style={{ color: C.muted, fontSize:'0.8rem', marginTop:4 }}>{WEEK_LABEL}</p>
          </div>
          <button onClick={onBack}
            style={{ background:'transparent', color: C.muted, border:`1px solid ${C.border}`, borderRadius:50, padding:'0.45rem 1.1rem', fontSize:'0.8rem', cursor:'pointer', flexShrink:0 }}>
            ← Back
          </button>
        </div>

        {loading ? (
          <p style={{ color: C.muted, textAlign:'center', padding:'2rem 0' }}>Loading…</p>
        ) : entries.length === 0 ? (
          <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
            <span style={{ fontSize:'2rem' }}>🌱</span>
            <p style={{ color: C.muted, marginTop:'0.8rem' }}>No scores yet — be the first on the board!</p>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.55rem' }}>
            {entries.map((e, i) => (
              <div key={i} style={{
                background: isMe(e) ? '#edf4ec' : C.white,
                border: `1.5px solid ${isMe(e) ? C.sageLt : C.border}`,
                borderRadius:12, padding:'0.9rem 1.2rem',
                display:'flex', alignItems:'center', gap:'1rem'
              }}>
                <div style={{ width:32, textAlign:'center', flexShrink:0 }}>
                  {i < 3
                    ? <span style={{ fontSize:'1.2rem' }}>{MEDAL[i]}</span>
                    : <span style={{ color: C.muted, fontWeight:700, fontSize:'0.88rem' }}>#{i+1}</span>}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color: isMe(e) ? C.forest : C.ink, fontWeight:600, fontSize:'0.93rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                    {displayName(e)} {isMe(e) && <span style={{ fontSize:'0.72rem', color: C.sage, fontWeight:400 }}>— you</span>}
                  </div>
                  {e.name && e.company && <div style={{ color: C.muted, fontSize:'0.76rem', marginTop:1 }}>{e.company}</div>}
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ color: C.forest, fontWeight:800, fontSize:'1.05rem' }}>{e.pct}%</div>
                  <div style={{ color: C.muted, fontSize:'0.73rem' }}>{e.score}/{e.total}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('cover');
  const [playerName, setPlayerName] = useState('');
  const [playerCompany, setPlayerCompany] = useState('');
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);

  const handleRegister = (name, company) => {
    setPlayerName(name);
    setPlayerCompany(company);
    setQuestions(shuffle(questionBank));
    setScreen('quiz');
  };

  const handleComplete = async (score) => {
    setFinalScore(score);
    await saveScore(playerName, playerCompany, score, questionBank.length);
    setScreen('results');
  };

  const handleRestart = () => {
    setQuestions(shuffle(questionBank));
    setScreen('quiz');
  };

  if (screen === 'cover') return <Cover onStart={() => setScreen('register')} />;
  if (screen === 'register') return <Register onSubmit={handleRegister} />;
  if (screen === 'quiz') return <Quiz questions={questions} onComplete={handleComplete} />;
  if (screen === 'results') return <Results score={finalScore} total={questionBank.length} name={playerName} onRestart={handleRestart} onLeaderboard={() => setScreen('leaderboard')} />;
  if (screen === 'leaderboard') return <Leaderboard currentName={playerName} currentCompany={playerCompany} onBack={() => setScreen('results')} />;
  return null;
}
