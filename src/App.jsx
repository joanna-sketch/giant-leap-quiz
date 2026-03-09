import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// ✏️ UPDATE THESE 2 THINGS EACH WEEK
// ═══════════════════════════════════════════════════════════════════════════

const WEEK_LABEL = '4 – 10 Mar 2026';
const LEADERBOARD_KEY = 'giant_leap_quiz_Mar4_2026';

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 CONFIGURATION - SET ONCE
// ═══════════════════════════════════════════════════════════════════════════

const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/3948221/ucppuo0/';
const GOOGLE_SHEET_ID = '1oYP6SOjYXSX_2rGCh3rZP9GfL17wbzgWtcKgGysMNII';

// ═══════════════════════════════════════════════════════════════════════════

const questionBank = [
  {
    question: "In the breakdown of Eucalyptus’ $1.6 billion sale to Hims & Hers, what proportion of key employees’ total payout is scheduled to be paid upfront at closing?",
    options: [
      "60%",
      "40%",
      "18%",
      "25%"
    ],
    correct: 1,
    explanation: "According to the reporting, 40% of key employees’ payout is scheduled to be paid upfront at closing, with the remainder tied to future conditions or earn-outs."
  },
  {
    question: "Heidi’s acquisition of UK-based Automedica was followed by launches including Heidi Evidence and Heidi Comms. For an early-stage healthtech investor, what is the strongest strategic signal from that sequence?",
    options: [
      "Heidi is shifting from a single-point AI scribe toward a broader clinical workflow platform with stronger defensibility",
      "Heidi is mainly pursuing geographic arbitrage by moving R&D to the UK",
      "Heidi is deprioritising core product monetisation in favour of regulatory lobbying",
      "Heidi is reducing model dependence by exiting third-party foundation models"
    ],
    correct: 0,
    explanation: "The sequence suggests Heidi is expanding from documentation into decision support and coordination, broadening its product surface area and embedding more deeply in clinical workflows. This typically strengthens retention, pricing power and strategic value."
  },
  {
    question: "Canva acquired Cavalry and stealth startup MangoAI in the same week. Which interpretation best explains the combined logic of those deals?",
    options: [
      "Canva is building a hardware-accelerated video rendering stack to compete with chip vendors",
      "Canva is pivoting away from design software into pure ad buying",
      "Canva is trying to become an end-to-end creative and performance marketing platform, spanning production and optimisation",
      "Canva is mainly making acqui-hires to replace internal engineering teams"
    ],
    correct: 2,
    explanation: "Cavalry strengthens professional motion creation while MangoAI adds reinforcement-learning-driven ad optimisation. Together they suggest Canva is moving up the value chain toward a full creative and performance marketing workflow platform."
  },
  {
    question: "In the article on AI spending and tech debt, what was the core concern raised by boards and CFOs about enterprise AI adoption?",
    options: [
      "AI cannot be deployed until all legacy systems are fully replaced",
      "AI may improve productivity but still fail to overcome years of costly tech decisions or reliably lift margins and returns",
      "AI budgets are too small to create any measurable operational impact",
      "AI regulation in Australia has already made enterprise deployment uneconomic"
    ],
    correct: 1,
    explanation: "The concern is that AI spending alone does not guarantee ROI. Startups that can integrate into messy enterprise environments and demonstrate clear economic proof points are more likely to succeed."
  },
  {
    question: "IREN was promoting itself heavily in Sydney while remaining hesitant to build local data centres, citing red tape. From a VC perspective, what is the best read on that posture?",
    options: [
      "It suggests Australian demand for AI infrastructure is collapsing",
      "It implies branding has become more important than infrastructure economics",
      "It indicates listed AI infrastructure players may want policy signalling and customer presence before committing capex locally",
      "It shows Australia has already solved planning and power bottlenecks for AI compute"
    ],
    correct: 2,
    explanation: "The article implies the bottleneck is execution conditions such as permitting, power access and infrastructure economics. Companies may seek policy clarity and market presence before committing major capex locally."
  },
  {
    question: "PlasmaLeap raised $30 million to advance zero-emission fertilisers. In climate tech underwriting, which factor is most likely to be the critical gating risk from here?",
    options: [
      "Whether fertiliser distributors will accept lower gross margins than software resellers",
      "Whether the company can achieve cost-competitive production and reliable scale-up versus incumbent fertiliser pathways",
      "Whether residential consumers understand the emissions profile of fertiliser inputs",
      "Whether carbon accounting standards prohibit new fertiliser categories"
    ],
    correct: 1,
    explanation: "Industrial climate startups often succeed or fail based on scale-up and cost parity with incumbents. In fertiliser production, capital intensity and reliable industrial deployment are critical to commercial viability."
  },
  {
    question: "The NSW Government launched a $20 million fund to back emerging tech and bioscience startups. For seed investors in life sciences, what is the most defensible implication?",
    options: [
      "State-backed capital can help extend runway for technically strong startups that are too early for mainstream VC, especially in bioscience",
      "The fund is likely to crowd out all private seed investment in NSW biotech",
      "Bioscience companies in NSW no longer need private follow-on capital",
      "The main effect will be immediate liquidity for existing shareholders"
    ],
    correct: 0,
    explanation: "Bioscience startups often face longer development cycles and thinner early private capital markets. Targeted public funding can support company formation and de-risk the stage before institutional VC leads."
  },
  {
    question: "TMRW raised $7 million and struck an exclusive local deal with US epigenetic testing leader TruDiagnostic to expand its precision medicine platform. What is the clearest strategic upside of that pairing?",
    options: [
      "It removes the need for clinical validation in Australia",
      "It lets TMRW avoid customer acquisition by selling only through hospitals",
      "It primarily converts TMRW into a therapeutics company",
      "It gives TMRW differentiated access to testing capability and brand leverage without having to build the underlying lab platform from scratch"
    ],
    correct: 3,
    explanation: "Exclusive partnerships can create defensibility and accelerate go-to-market without requiring full infrastructure buildout. This approach preserves capital and maintains optionality for deeper integration later."
  },
  {
    question: "The CSIRO warned that long-term underfunding had forced deep job cuts. Which annual funding range did CSIRO say it needs over the next decade to remain sustainable?",
    options: [
      "$20m–$50m per year",
      "$150m–$200m per year",
      "$80m–$135m per year",
      "$40m–$70m per year"
    ],
    correct: 2,
    explanation: "CSIRO stated it needs between $80m and $135m per year over the next decade to maintain sustainable operations after significant job cuts across research and non-research roles."
  },
  {
    question: "Baseten raised a $300 million Series E at a $5 billion valuation to power AI inference in production. Which thesis best explains why investors may view inference infrastructure as one of the stickiest layers in the AI stack?",
    options: [
      "Training infrastructure is disappearing, leaving inference as the only remaining AI category",
      "Inference demand is becoming operationally complex as workloads fragment across models, clouds and chips, making orchestration a persistent pain point",
      "Most enterprises prefer to build all inference systems fully in-house",
      "Inference economics are largely insulated from hardware scarcity and price volatility"
    ],
    correct: 1,
    explanation: "Serving production AI is a distributed systems challenge involving routing, optimisation and heterogeneous compute. Infrastructure providers solving this complexity may capture durable value even as models commoditise."
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
