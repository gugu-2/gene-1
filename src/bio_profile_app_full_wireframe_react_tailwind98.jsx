import React, { useState, useEffect } from "react";

/**
 * BIO PROFILE — Clickable Prototype (React + Tailwind)
 * Upgraded: adds full UI features requested by user
 * - Combined biological insights (AI-style summary)
 * - Chatbot companion (wellness/genetic) — persistent panel
 * - Daily insights/activities & notification badge (return loop)
 * - Educational "Why DNA matters" micro-content
 * - Personalized product/service recommendations + filter
 * - Points & rewards store with redeem flow
 * - Full biological profile editor & storage
 * - Privacy & security controls + explanation modal
 *
 * Notes: This remains a client-side prototype — AI/ML calls are mocked.
 */

export default function BioProfilePrototypeFull() {
  const [mode, setMode] = useState("Dashboard");
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [plans, setPlans] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi — I'm your Genomic Companion. Ask me anything about your DNA or wellness." }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Drink water within 30 min of waking", points: 10, done: false },
    { id: 2, title: "Limit caffeine after 3 PM (based on caffeine metabolism)", points: 20, done: false },
    { id: 3, title: "Try a 20 min low‑impact workout", points: 15, done: false }
  ]);
  const [points, setPoints] = useState(120);

  const [profile, setProfile] = useState({
    name: "Alex",
    gender: "Male",
    age: 29,
    ethnicity: "South Asian",
    height: "176 cm",
    weight: "78 kg",
    allergies: "Peanuts",
    email: "alex@example.com"
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [dailyInsights, setDailyInsights] = useState([
    { id: 1, title: "Sleep & Caffeine", text: "Your genes show faster caffeine metabolism — avoid late caffeine for better recovery.", date: new Date().toLocaleDateString() },
    { id: 2, title: "Skin Care Tip", text: "Moderate acne potential — use non‑comedogenic products and maintain gentle cleansing.", date: new Date().toLocaleDateString() }
  ]);

  const traits = [
    { id: "t1", name: "Caffeine Metabolism", impact: 81, zone: "Brain", risk: "High", desc: "You metabolize caffeine faster than average.", productTag: "Energy" },
    { id: "t2", name: "Basal Metabolism", impact: 55, zone: "Muscle", risk: "Normal", desc: "Resting metabolic rate is typical for your profile.", productTag: "Nutrition" },
    { id: "t3", name: "Acne Potential", impact: 62, zone: "Skin", risk: "Moderate", desc: "Slight predisposition for adult acne.", productTag: "Skin" }
  ];

  const recommendations = {
    Energy: [
      { id: 1, title: "Timed Caffeine Plan", type: "Service", reason: "Stagger caffeine doses for performance and sleep." },
      { id: 2, title: "Low-caf Green Tea", type: "Product", reason: "Gentle caffeine source matched to biology." }
    ],
    Nutrition: [
      { id: 3, title: "Metabolism Booster Program", type: "Service", reason: "Personalized meal plan to support basal metabolism." }
    ],
    Skin: [
      { id: 4, title: "Non-comedogenic Skincare Set", type: "Product", reason: "Gentle routine to reduce acne potential." }
    ]
  };

  // Mock: Compute combined (multi-trait) insights — would be produced by an AI engine in prod.
  function computeCombinedInsights() {
    // Simple rules to combine traits into an insight string.
    const highRisks = traits.filter(t => t.risk === "High");
    const messages = [];
    if (highRisks.length) {
      messages.push(`You have ${highRisks.length} high-impact genetic area(s): ${highRisks.map(h => h.name).join(", ")}. Prioritize sleep and timed nutrition.`);
    }
    // use profile data to customize
    if (profile.ethnicity && profile.ethnicity.toLowerCase().includes("south")) {
      messages.push("Some dietary patterns common in your heritage may interact with metabolic genes — consider tailored meal timing.");
    }

    if (!messages.length) return "No combined alerts — your profile looks balanced. Keep monitoring for updates.";
    return messages.join(" ");
  }

  // Rewards: simple redeem flow
  const rewardItems = [
    { id: 1, title: "15% off Nutrition Consult", cost: 300 },
    { id: 2, title: "Free 30m Skin Consultation", cost: 450 },
    { id: 3, title: "Sleep Tracker Band (discount)", cost: 800 }
  ];

  // Simple chat send (mocked AI responses)
  function sendChat(text) {
    if (!text) return;
    const msg = { id: Date.now(), from: "user", text };
    setMessages(m => [...m, msg]);
    setTimeout(() => {
      let resp = "I don't know that yet — upload more data or ask a different question.";
      const q = text.toLowerCase();
      if (q.includes("something i don't know") || q.includes("surprise")) {
        resp = computeCombinedInsights();
      } else if (q.includes("recommend")) {
        resp = "Based on your profile I recommend a timed caffeine plan and a metabolism focused meal plan. I can add these to your living plan.";
      } else if (q.includes("why dna")) {
        resp = "DNA provides predispositions — knowing them helps you pick the best diet, sleep schedule, and targeted therapies. It's about probabilities, not certainties.";
      }
      setMessages(m => [...m, { id: Date.now() + 1, from: "bot", text: resp }]);
      setNotificationsCount(0);
    }, 800);
  }

  function setNotificationsCount(n) { setNotifications(n); }

  function completeTask(taskId) {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId && !t.done) {
        setPoints(p => p + t.points);
        return { ...t, done: true };
      }
      return t;
    }));
  }

  function addToPlan(trait) {
    setPlans(p => [...p, { id: Date.now(), trait, createdAt: new Date().toISOString() }]);
  }

  function redeemReward(item) {
    if (points >= item.cost) {
      setPoints(p => p - item.cost);
      alert(`Redeemed: ${item.title}`);
    } else {
      alert("Not enough points");
    }
  }

  useEffect(() => {
    // simulate daily insight arriving and notification increment
    const t = setTimeout(() => {
      const newInsight = { id: Date.now(), title: "Daily Check-in", text: "AI noticed a small change in your sleep pattern — consider moving caffeine earlier.", date: new Date().toLocaleDateString() };
      setDailyInsights(d => [newInsight, ...d]);
      setNotifications(n => n + 1);
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 text-slate-900">

      {/* HEADER */}
      <Header profile={profile} points={points} onUpload={() => alert('Upload flow (demo)')} onOpenProfile={() => setShowProfileModal(true)} notifications={notifications} openChat={() => setChatOpen(true)} />

      {/* NAV / Modes */}
      <nav className="px-6 py-3">
        <div className="flex gap-2 items-center">
          {['Dashboard', 'BodyMap', 'Timeline', 'Planner'].map(m => (
            <button key={m} onClick={() => setMode(m)} className={`px-3 py-1 rounded-full text-sm ${mode === m ? 'bg-emerald-500 text-white' : 'bg-white border'}`}>{m}</button>
          ))}

          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => setShowPrivacyModal(true)} className="text-xs px-2 py-1 border rounded-md bg-white">Privacy & Security</button>
            <button onClick={() => setShowRewards(true)} className="text-xs px-2 py-1 border rounded-md bg-white">Rewards</button>
          </div>
        </div>
      </nav>

      {/* TOP SECTION: Combined AI Insight + Education + CTA */}
      <section className="px-6 py-4">
        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-7 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">Combined AI Insight</h2>
                <p className="text-sm text-slate-500 mt-1">A short, AI-curated summary that connects your traits, profile and lifestyle.</p>
              </div>
              <div>
                <button onClick={() => sendChat('Tell me something I don\'t know')} className="px-3 py-2 rounded-lg bg-emerald-500 text-white">Tell me something new</button>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border">
              <p className="text-sm">{computeCombinedInsights()}</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <EducationCard title="Why DNA matters" text="DNA helps identify tendencies — we translate those into actions you can try today." />
              <EducationCard title="How we protect data" text="Your genetic data is encrypted on-device and at rest. You control sharing."></EducationCard>
              <EducationCard title="How AI helps" text="AI combines your traits + behavior to surface the highest-impact actions." />
            </div>
          </div>

          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Daily Insights & Notifications</h3>
              <div className="text-xs text-slate-500">{notifications} new</div>
            </div>

            <div className="mt-3 space-y-2 max-h-48 overflow-auto">
              {dailyInsights.map(i => (
                <div key={i.id} className="p-3 rounded-lg border bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{i.title}</div>
                      <div className="text-xs text-slate-500">{i.text}</div>
                    </div>
                    <div className="text-xs text-slate-400">{i.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button onClick={() => setNotificationsCount(0)} className="w-full px-3 py-2 rounded-lg bg-white border">Mark all read</button>
            </div>
          </div>

        </div>
      </section>

      {/* MAIN GRID */}
      <main className="grid grid-cols-12 gap-6 px-6 pb-10">

        {/* LEFT: Body Map + Quick Filters */}
        <section className="col-span-4 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Interactive Body Map</h3>
            <div className="text-xs text-slate-500">Zones highlight by impact</div>
          </div>

          <div className="mt-4 h-80 rounded-xl bg-gradient-to-b from-emerald-100 to-slate-100 flex items-center justify-center cursor-pointer" onClick={() => setSelectedTrait(traits[0])}>
            <div className="text-slate-400 text-center">Human Model (click zone)
              <div className="text-xs text-slate-500 mt-2">Click a zone to filter traits</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="px-2 py-2 rounded-lg bg-white border text-sm">All Zones</button>
            <button className="px-2 py-2 rounded-lg bg-white border text-sm">Top Risks</button>
            <button className="px-2 py-2 rounded-lg bg-white border text-sm">Daily Tips</button>
            <button className="px-2 py-2 rounded-lg bg-white border text-sm">Compare Reports</button>
          </div>
        </section>

        {/* CENTER: Trait Feed & Recommendations */}
        <section className="col-span-5 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Trait Intelligence Feed</h3>
            <div className="text-xs text-slate-500">Click a trait to see recommendations</div>
          </div>

          <div className="mt-3 space-y-3">
            {traits.map(t => (
              <div key={t.id} className="p-3 rounded-xl border hover:bg-emerald-50 cursor-pointer" onClick={() => setSelectedTrait(t)}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-slate-500">Zone: {t.zone} • {t.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs ${t.risk === 'High' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>{t.risk}</div>
                    <div className="text-xs text-slate-400 mt-2">Impact: {t.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-medium">Recommendations & Products</h4>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {recommendations.Energy.concat(recommendations.Nutrition).slice(0,6).map(p => (
                <div key={p.id} className="p-3 rounded-lg bg-slate-50 border">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{p.type}</div>
                  <div className="text-xs text-slate-400 mt-2">{p.reason}</div>
                  <button onClick={() => alert('Added to cart (demo)')} className="mt-3 px-2 py-1 bg-emerald-500 text-white rounded-md text-sm">Add</button>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* RIGHT: AI Action Engine + Plans */}
        <aside className="col-span-3 bg-white rounded-2xl p-4 shadow-sm flex flex-col">
          <h3 className="font-semibold">AI Companion</h3>

          <div className="mt-3 flex-1">
            {selectedTrait ? (
              <div>
                <p className="font-medium">{selectedTrait.name}</p>
                <p className="text-xs text-slate-500 mt-1">{selectedTrait.desc}</p>

                <div className="mt-3">
                  <button onClick={() => addToPlan(selectedTrait)} className="w-full px-3 py-2 rounded-lg bg-emerald-500 text-white">Add to Living Plan</button>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-slate-500">Suggested actions</p>
                  <ul className="mt-2 list-disc ml-5 text-sm text-slate-700">
                    <li>Adjust caffeine timing</li>
                    <li>Track sleep for 14 days</li>
                    <li>Try timed low‑caf beverages</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-400">Select a trait or click "Tell me something new" for AI suggestions.</div>
            )}
          </div>

          <div className="mt-4">
            <button onClick={() => setChatOpen(true)} className="w-full px-3 py-2 rounded-lg bg-white border">Open Chat Companion</button>
          </div>

          <div className="mt-4 border-t pt-3">
            <p className="text-xs text-slate-500">Active Plans</p>
            <div className="mt-2 space-y-2">
              {plans.length === 0 ? <div className="text-xs text-slate-400">No plans yet — add traits to create personalized plans.</div> : plans.map(p => <div key={p.id} className="text-sm">{p.trait.name} • {new Date(p.createdAt).toLocaleString()}</div>)}
            </div>
          </div>
        </aside>

      </main>

      {/* BOTTOM: Tasks & Rewards */}
      <section className="px-6 pb-12">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Daily Tasks & Rewards</h3>
            <div className="text-xs text-slate-500">Earn points by completing tasks</div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <div className="space-y-2">
                {tasks.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-lg border bg-white">
                    <div>
                      <div className={`text-sm ${t.done ? 'line-through text-slate-400' : ''}`}>{t.title}</div>
                      <div className="text-xs text-slate-500">+{t.points} pts</div>
                    </div>
                    <div>
                      {t.done ? <div className="text-emerald-600 font-semibold">Done</div> : <button onClick={() => completeTask(t.id)} className="px-3 py-1 rounded-lg bg-emerald-500 text-white">Complete</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1 bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500">Your progress</div>
              <div className="mt-3 text-3xl font-semibold">{points}</div>
              <div className="text-xs text-slate-400 mt-2">Redeem points for consults & discounts</div>
              <button onClick={() => setShowRewards(true)} className="mt-3 w-full px-3 py-2 rounded-lg bg-emerald-500 text-white">Redeem</button>
            </div>
          </div>
        </div>
      </section>

      {/* CHAT COMPANION PANEL */}
      {chatOpen && (
        <div className="fixed right-6 bottom-6 w-96 bg-white rounded-2xl shadow-lg border overflow-hidden">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="font-medium">Genie — Wellness Companion</div>
            <button onClick={() => setChatOpen(false)} className="text-slate-500">✕</button>
          </div>
          <div className="h-64 p-3 overflow-auto bg-slate-50">
            {messages.map(m => (
              <div key={m.id} className={`mb-2 ${m.from === 'bot' ? 'text-left' : 'text-right'}`}>
                <div className={`inline-block p-2 rounded-md ${m.from === 'bot' ? 'bg-white border' : 'bg-emerald-500 text-white'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <ChatInput onSend={sendChat} />
        </div>
      )}

      {/* Profile modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-[720px] bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Edit Biological Profile</h3>
              <button onClick={() => setShowProfileModal(false)} className="text-slate-500">✕</button>
            </div>
            <ProfileEditor profile={profile} onSave={(p) => { setProfile(p); setShowProfileModal(false); }} />
          </div>
        </div>
      )}

      {/* Privacy modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-[640px] bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Privacy & Security</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="text-slate-500">✕</button>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              <p><strong>Encryption:</strong> We encrypt your genetic data on device and at rest using AES-256 and TLS for transit.</p>
              <p className="mt-2"><strong>Control:</strong> You choose who to share data with — revoke at any time.</p>
              <p className="mt-2"><strong>Anonymity:</strong> We support anonymized research opt-ins with clear consent flows.</p>
            </div>
          </div>
        </div>
      )}

      {/* Rewards modal */}
      {showRewards && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-[640px] bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Rewards Store</h3>
              <button onClick={() => setShowRewards(false)} className="text-slate-500">✕</button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {rewardItems.map(item => (
                <div key={item.id} className="p-3 rounded-lg border bg-slate-50">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-1">Cost: {item.cost} pts</div>
                  <button onClick={() => redeemReward(item)} className="mt-3 px-2 py-1 bg-emerald-500 text-white rounded-md text-sm">Redeem</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* Subcomponents */
function Header({ profile, points, onUpload, onOpenProfile, notifications, openChat }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500" />
          <div>
            <div className="text-xs text-slate-500">Gene Vault</div>
            <div className="font-semibold">Bio Intelligence</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={openChat} className="px-3 py-1 rounded-lg bg-white border text-sm">Chat</button>
          <div className="px-3 py-1 rounded-lg border bg-white text-sm">Notifications <span className="ml-2 inline-block bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs">{notifications}</span></div>
          <div className="px-3 py-1 rounded-lg border bg-white text-sm">Points: <span className="font-semibold">{points}</span></div>
          <button onClick={onUpload} className="px-3 py-1 rounded-lg bg-emerald-500 text-white">Upload DNA</button>
          <button onClick={onOpenProfile} className="w-9 h-9 rounded-full bg-slate-300">{profile.name[0]}</button>
        </div>
      </div>
    </header>
  );
}

function EducationCard({ title, text }) {
  return (
    <div className="p-3 rounded-lg border bg-white">
      <div className="font-medium">{title}</div>
      <div className="text-xs text-slate-500 mt-2">{text}</div>
      <div className="mt-3 text-xs text-emerald-600">Learn more ➜</div>
    </div>
  );
}

function ChatInput({ onSend }) {
  const [val, setVal] = useState("");
  return (
    <div className="p-3 border-t flex gap-2">
      <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask your companion..." className="flex-1 px-3 py-2 rounded-lg border" />
      <button onClick={() => { onSend(val); setVal(""); }} className="px-3 py-2 rounded-lg bg-emerald-500 text-white">Send</button>
    </div>
  );
}

function ProfileEditor({ profile, onSave }) {
  const [form, setForm] = useState(profile);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">Name
          <input className="w-full mt-1 p-2 border rounded-md" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="text-sm">Gender
          <input className="w-full mt-1 p-2 border rounded-md" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} />
        </label>
        <label className="text-sm">Age
          <input className="w-full mt-1 p-2 border rounded-md" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
        </label>
        <label className="text-sm">Ethnicity
          <input className="w-full mt-1 p-2 border rounded-md" value={form.ethnicity} onChange={e => setForm({ ...form, ethnicity: e.target.value })} />
        </label>
        <label className="text-sm">Height
          <input className="w-full mt-1 p-2 border rounded-md" value={form.height} onChange={e => setForm({ ...form, height: e.target.value })} />
        </label>
        <label className="text-sm">Weight
          <input className="w-full mt-1 p-2 border rounded-md" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} />
        </label>
        <label className="text-sm">Allergies
          <input className="w-full mt-1 p-2 border rounded-md" value={form.allergies} onChange={e => setForm({ ...form, allergies: e.target.value })} />
        </label>
        <label className="text-sm">Email
          <input className="w-full mt-1 p-2 border rounded-md" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </label>
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={() => onSave(form)} className="px-4 py-2 rounded-lg bg-emerald-500 text-white">Save</button>
      </div>
    </div>
  );
}

const rewardItems = [
  { id: 1, title: "15% off Nutrition Consult", cost: 300 },
  { id: 2, title: "Free 30m Skin Consultation", cost: 450 },
  { id: 3, title: "Sleep Tracker Band (discount)", cost: 800 }
];

export { rewardItems };
