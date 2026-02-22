
import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// ✏️ UPDATE THESE 3 THINGS EACH WEEK
// ═══════════════════════════════════════════════════════════════════════════

const WEEK_LABEL = '10 – 17 Feb 2026';
const LEADERBOARD_KEY = 'giant_leap_quiz_feb17_2026';

const questionBank = [
  {
    question: "Neara's digital twin platform creates 3D models of energy networks to help utilities manage growing electrification demands. Which of the following is a key strategic reason investors are backing Neara right now?",
    options: ["The company has reached full grid coverage across North America","Physics-based simulation unlocks asset flexibility without expensive hardware upgrades","Digital twins reduce energy demand from AI data centres","TCV aims to consolidate Australian energy startups"],
    correct: 1,
    explanation: "As electrification and AI workloads strain legacy grid infrastructure, software that models real-physics scenarios offers a capital-efficient alternative to hardware overhauls."
  },
  {
    question: "Why is an AI approach to enterprise workflow mapping potentially more scalable than management consultant-led audits?",
    options: ["A chatbot interface improves adoption among non-technical teams","It captures keystroke-level data at a fraction of consulting costs","It eliminates the need for client-side deployment or integration","A passive desktop agent generates real-time, context-rich data for automation opportunities"],
    correct: 3,
    explanation: "Agent-based data capture enables AI to surface automation opportunities in minutes rather than months — fundamentally reshaping how large enterprises approach digital transformation."
  },
  {
    question: "Which Australian health insurer recently launched a $25M fund that prioritises member health outcomes over financial returns?",
    options: ["Medibank","NIB","HBF","BUPA Australia"],
    correct: 2,
    explanation: "The fund challenges traditional corporate VC models, positioning health innovation as central to long-term member value rather than pure investment return."
  },
  {
    question: "Pro Medicus suffered a sharp share-price fall despite reporting a ~30% lift in profit. What best explains the market's reaction?",
    options: ["Rising interest rates reduced healthcare sector valuations broadly","Expectations were tied to the performance of 4D Medical alone","High dependency on US hospital systems amid policy risk","Growth visibility no longer appeared to justify its premium valuation multiple"],
    correct: 3,
    explanation: "Even rising profits can trigger major re-ratings in richly valued medtech stocks when investors sense that peak growth expectations aren't being met."
  },
  {
    question: "An Australian quantum computing startup claims its architecture could reduce qubit requirements for large-scale problems by orders of magnitude. What is that architecture called?",
    options: ["FusionCore","Pinnacle","QuantaLayer","DeepSpin"],
    correct: 1,
    explanation: "'Pinnacle' advances quantum fault tolerance by materially reducing hardware requirements — critical to bringing practical use cases closer to reality."
  },
  {
    question: "Why might a major AI lab entering Australia via quiet, relationship-first channels offer a long-term advantage over a high-profile launch?",
    options: ["It allows faster recruitment of ex-competitor employees","It avoids post-regulation scrutiny","It enables deeper alignment with local VCs and institutional channels before committing public capital","It reduces marketing costs prior to monetising the product locally"],
    correct: 2,
    explanation: "Building nuanced ties with local partners first typically produces stickier commercial and political outcomes than a splashy entrance."
  },
  {
    question: "An Australian agri-tech startup is commercialising autonomous electric tractors designed specifically for vineyards and orchards. What feature makes them uniquely suited to these crops?",
    options: ["They require specialised pilots with drone licences","They substitute diesel engines for hybrid gas turbines","They can operate in narrow rows with modular electric attachments","They manually tag pests using infrared vision"],
    correct: 2,
    explanation: "Purpose-built for high-value specialty farms, these units are nimbler and more efficient than retrofitted mainstream machinery — and avoid the fuel and emissions costs of diesel alternatives."
  },
  {
    question: "UNSW recently launched a Global Innovation Foundry program. What market gap is this initiative primarily designed to address for Australian startups?",
    options: ["Declining domestic R&D funding","IP licensing with multinational pharma","Maximising returns from university-affiliated IP","Connecting founders to global hiring, capital, and partnerships despite Australia's small domestic market"],
    correct: 3,
    explanation: "Australia's tech startups consistently struggle to scale internationally. Programs that link founders to global networks fill a material structural gap in the local ecosystem."
  },
  {
    question: "An Australian AI-powered UX observability startup recently completed a Seed raise. Approximately how large was that round?",
    options: ["$25M Series B","$7M Seed","$11M SAFE","$12.5M Convertible Note"],
    correct: 1,
    explanation: "The $7M Seed round reflects growing investor appetite for tools that help product teams understand user behaviour through AI-driven session analysis and insight."
  },
  {
    question: "A prominent Australian VC firm recently deposited $750k into court as part of ongoing litigation with a portfolio company. What does this signal about early-stage VC behaviour in high-risk environments?",
    options: ["VCs are increasingly reliant on legal remedies over portfolio construction","VCs are willing to pursue costly litigation to protect signalling and relationships","VCs are too exposed to follow-on dilution in failed bets","Courts are now a routine channel for distressed venture monetisation"],
    correct: 1,
    explanation: "Pursuing expensive litigation signals to LPs and founders that the firm defends its positions — a move rooted as much in reputation management as legal leverage."
  }
];

// ═══════════════════════════════════════════════════════════════════════════

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

function loadLeaderboard() {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveScore(name, company, score, total) {
  try {
    const entries = loadLeaderboard();
    const pct = Math.round((score / total) * 100);
    const newEntry = { name, company, score, total, pct, ts: Date.now() };
    const idx = entries.findIndex(
      e => (e.name||'').toLowerCase() === name.toLowerCase() &&
           (e.company||'').toLowerCase() === company.toLowerCase()
    );
    if (idx >= 0) { if (pct > entries[idx].pct) entries[idx] = newEntry; }
    else entries.push(newEntry);
    entries.sort((a, b) => b.pct - a.pct || a.ts - b.ts);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries.slice(0, 50)));
    return entries;
  } catch { return []; }
}

const font = { fontFamily: "'Georgia','Times New Roman',serif" };
const sans = { fontFamily: "'Inter','Helvetica Neue',sans-serif" };

function Cover({ onStart }) {
  return (
    <div style={{ minHeight:'100vh', background: C.cream, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.5rem 1.5rem', ...sans }}>
      <div style={{ 
  marginBottom: '4.5rem', 
  textAlign: 'center'
}}>
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
          {[['10 questions',''],['~5 minutes',''],['10 – 17 Feb 2026','This week']].map(([v, l]) => (
            <div key={v} style={{ background: C.sandDk, borderRadius:50, padding:'0.45rem 1rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
              {l && <span style={{ color: C.sageLt, fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600 }}>{l}:</span>}
              <span style={{ color: C.ink, fontSize:'0.82rem', fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ background: C.sandDk, border:`1px solid ${C.border}`, borderRadius:12, padding:'1rem 1.3rem', marginBottom:'2.2rem', textAlign:'left' }}>
          <p style={{ color: C.muted, fontSize:'0.78rem', lineHeight:1.65, margin:0 }}>
            <span style={{ color: C.forest, fontWeight:700 }}>👋 A note before you play:</span> Questions cover Australian startup & venture news from the past week. Your score goes on a public leaderboard — enter your name or company to participate.
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
    setEntries(loadLeaderboard());
    setLoading(false);
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

  const handleComplete = (score) => {
    setFinalScore(score);
    saveScore(playerName, playerCompany, score, questionBank.length);
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
