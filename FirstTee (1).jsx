import { useState } from "react";

const PAGES = { HOME:"home", ABOUT:"about", PRICING:"pricing", SIGNUP:"signup", CHECKOUT:"checkout", DASHBOARD:"dashboard", ADMIN:"admin", ADMIN_DASH:"admin_dash" };
const CLUBS = ["The Club at Ibis – West Palm Beach, FL","Pebble Beach – Pebble Beach, CA","Pinehurst – Pinehurst, NC","Seminole Golf Club – Juno Beach, FL","Baltusrol Golf Club – Springfield, NJ","Other (paste your club's URL)"];
const COURSES = {"The Club at Ibis – West Palm Beach, FL":["Heritage Course","Tradition Course","Legend Course"],"Pebble Beach – Pebble Beach, CA":["Pebble Beach Golf Links","Spyglass Hill","Del Monte"],"Pinehurst – Pinehurst, NC":["Course No. 2","Course No. 4","Course No. 8"],"Seminole Golf Club – Juno Beach, FL":["Main Course"],"Baltusrol Golf Club – Springfield, NJ":["Lower Course","Upper Course"],"Other (paste your club's URL)":[]};
const MOCK_MEMBERS = [
  {id:1,name:"Robert Chen",email:"rchen@email.com",phone:"+15615550101",club:"The Club at Ibis",dates:["Apr 5","Apr 12"],active:true,plan:"Pro",joined:"Mar 12, 2026",alerts:14},
  {id:2,name:"James Kowalski",email:"jkowalski@email.com",phone:"+15615550182",club:"The Club at Ibis",dates:["Apr 6","Apr 19"],active:true,plan:"Pro",joined:"Mar 18, 2026",alerts:7},
  {id:3,name:"Patricia Dunn",email:"pdunn@email.com",phone:"+15615550133",club:"Pebble Beach",dates:["Any"],active:false,plan:"Pro",joined:"Mar 20, 2026",alerts:3},
  {id:4,name:"Michael Torres",email:"mtorres@email.com",phone:"+15615550199",club:"The Club at Ibis",dates:["Apr 9","Apr 16"],active:true,plan:"Pro",joined:"Mar 25, 2026",alerts:2},
];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const C = {navy:"#0a1628",navyMid:"#112240",navyLight:"#1d3461",gold:"#c9a84c",goldLight:"#e8c96a",goldPale:"#f5e9c8",cream:"#faf8f3",white:"#ffffff",muted:"#8a9bb0",borderLight:"#e8e4dc"};

function Calendar({selectedDates, onToggle}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const firstDay = new Date(viewYear,viewMonth,1).getDay();
  const daysInMonth = new Date(viewYear,viewMonth+1,0).getDate();
  const prev = () => { if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1); };
  const next = () => { if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1); };
  const toKey = (d) => `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const isPast = (d) => new Date(viewYear,viewMonth,d) < new Date(today.getFullYear(),today.getMonth(),today.getDate());
  return (
    <div style={{background:"white",border:`1.5px solid ${C.borderLight}`,borderRadius:12,overflow:"hidden"}}>
      <div style={{background:C.navy,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button type="button" onClick={prev} style={{background:"none",border:"none",color:C.gold,fontSize:22,cursor:"pointer",padding:"0 8px",lineHeight:1}}>‹</button>
        <span style={{color:"white",fontFamily:"'DM Serif Display',serif",fontSize:15}}>{MONTHS[viewMonth]} {viewYear}</span>
        <button type="button" onClick={next} style={{background:"none",border:"none",color:C.gold,fontSize:22,cursor:"pointer",padding:"0 8px",lineHeight:1}}>›</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",background:"#f9f7f2",padding:"8px 8px 4px"}}>
        {DOW.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:500,color:C.muted,letterSpacing:"0.04em"}}>{d}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,padding:"6px 8px 12px"}}>
        {Array(firstDay).fill(null).map((_,i)=><div key={`e${i}`}/>)}
        {Array(daysInMonth).fill(null).map((_,i)=>{
          const d=i+1; const key=toKey(d); const past=isPast(d);
          const selected=selectedDates.some(s=>s.date===key);
          return (
            <button type="button" key={d} onClick={()=>!past&&onToggle(key)} style={{
              width:"100%",aspectRatio:"1",borderRadius:8,
              border:selected?`2px solid ${C.gold}`:"2px solid transparent",
              background:selected?C.navy:"transparent",
              color:past?"#ccc":selected?C.gold:C.navy,
              fontSize:13,fontWeight:selected?500:400,
              cursor:past?"default":"pointer",transition:"all 0.12s",
              display:"flex",alignItems:"center",justifyContent:"center"
            }}>{d}</button>
          );
        })}
      </div>
    </div>
  );
}

function DayCard({entry, courses, onRemove, onUpdate}) {
  const [open, setOpen] = useState(false);
  const display = new Date(entry.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  const short = new Date(entry.date+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
  return (
    <div style={{border:`1.5px solid ${open?C.gold:C.borderLight}`,borderRadius:10,overflow:"hidden",marginBottom:10,transition:"border-color 0.15s"}}>
      <div onClick={()=>setOpen(o=>!o)} style={{background:open?C.navy:"#f9f7f2",padding:"11px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",transition:"background 0.15s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:C.gold,flexShrink:0}}/>
          <span style={{fontSize:14,fontWeight:500,color:open?C.gold:C.navy,fontFamily:"'DM Serif Display',serif"}}>{open?display:short}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {!open&&<span style={{fontSize:12,color:"#aaa"}}>{entry.earliest}–{entry.latest}{entry.course?` · ${entry.course}`:""}</span>}
          <span style={{color:open?C.gold:C.muted,fontSize:16,lineHeight:1}}>{open?"▲":"▼"}</span>
        </div>
      </div>
      {open&&(
        <div style={{padding:"14px 16px",background:"white",borderTop:`1px solid ${C.borderLight}`}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            <div>
              <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5}}>Earliest time</div>
              <input type="time" value={entry.earliest} onChange={e=>onUpdate({...entry,earliest:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${C.borderLight}`,borderRadius:7,fontSize:14,color:C.navy,fontFamily:"'DM Sans',sans-serif"}}/>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5}}>Latest time</div>
              <input type="time" value={entry.latest} onChange={e=>onUpdate({...entry,latest:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${C.borderLight}`,borderRadius:7,fontSize:14,color:C.navy,fontFamily:"'DM Sans',sans-serif"}}/>
            </div>
            {courses.length>0&&(
              <div style={{gridColumn:"1 / -1"}}>
                <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5}}>Preferred course</div>
                <select value={entry.course} onChange={e=>onUpdate({...entry,course:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${C.borderLight}`,borderRadius:7,fontSize:14,color:C.navy,fontFamily:"'DM Sans',sans-serif"}}>
                  <option value="">Any course</option>
                  {courses.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
            <div style={{gridColumn:"1 / -1"}}>
              <div style={{fontSize:11,fontWeight:500,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:5}}>Min spots needed</div>
              <select value={entry.players} onChange={e=>onUpdate({...entry,players:e.target.value})} style={{width:"100%",padding:"9px 11px",border:`1.5px solid ${C.borderLight}`,borderRadius:7,fontSize:14,color:C.navy,fontFamily:"'DM Sans',sans-serif"}}>
                <option value="1">Any opening (1+ spots)</option>
                <option value="2">2 or more spots</option>
                <option value="3">3 or more spots</option>
                <option value="4">4 spots (full group)</option>
              </select>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
            <button type="button" onClick={()=>{onUpdate({...entry});setOpen(false);}} style={{background:C.gold,color:C.navy,border:"none",borderRadius:7,padding:"8px 18px",fontSize:13,fontWeight:500,cursor:"pointer"}}>Save</button>
            <button type="button" onClick={onRemove} style={{background:"none",border:"none",color:"#c0392b",fontSize:12,cursor:"pointer",fontWeight:500}}>Remove date</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(PAGES.HOME);
  const [form, setForm] = useState({name:"",email:"",password:"",memberEmail:"",phone:"",club:"",clubUrl:"",interval:"1"});
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [memberDates, setMemberDates] = useState([]);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState(false);
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [saved, setSaved] = useState(false);

  const nav = (p) => { setPage(p); window.scrollTo(0,0); setSaved(false); };
  const toggleDate = (key) => setMemberDates(prev=>{
    if(prev.find(e=>e.date===key)) return prev.filter(e=>e.date!==key);
    return [...prev,{date:key,earliest:"07:00",latest:"12:00",course:"",players:"1"}].sort((a,b)=>a.date.localeCompare(b.date));
  });
  const updateDate = (key, updated) => setMemberDates(prev=>prev.map(e=>e.date===key?updated:e));
  const removeDate = (key) => setMemberDates(prev=>prev.filter(e=>e.date!==key));
  const handleSignup = (e) => { e.preventDefault(); nav(PAGES.CHECKOUT); };
  const handleCheckout = (e) => { e.preventDefault(); nav(PAGES.DASHBOARD); };
  const handleAdmin = (e) => { e.preventDefault(); if(adminPass==="firsttee2026"){nav(PAGES.ADMIN_DASH);setAdminError(false);}else setAdminError(true); };
  const toggleMember = (id) => setMembers(ms=>ms.map(m=>m.id===id?{...m,active:!m.active}:m));
  const deleteMember = (id) => setMembers(ms=>ms.filter(m=>m.id!==id));
  const active = members.filter(m=>m.active).length;
  const mrr = (members.length*14.99).toFixed(2);
  const formatCard = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExp = (v) => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };
  const availableCourses = COURSES[form.club]||[];
  const memberClub = form.club||"The Club at Ibis – West Palm Beach, FL";
  const memberCourses = COURSES[memberClub]||[];

  const CSS = `
    *{box-sizing:border-box;margin:0;padding:0;}
    input,select,button{font-family:'DM Sans',sans-serif;}
    .btn-gold{background:${C.gold};color:${C.navy};border:none;border-radius:8px;padding:14px 28px;font-size:15px;font-weight:500;cursor:pointer;transition:background 0.15s;width:100%;}
    .btn-gold:hover{background:${C.goldLight};}
    .btn-outline{background:transparent;border:1.5px solid ${C.gold};color:${C.gold};border-radius:8px;padding:10px 22px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.15s;}
    .btn-outline:hover{background:${C.gold};color:${C.navy};}
    .btn-ghost{background:transparent;border:none;color:${C.muted};font-size:13px;cursor:pointer;padding:0;}
    .btn-ghost:hover{color:white;}
    .field{margin-bottom:16px;}
    .field label{display:block;font-size:12px;font-weight:500;color:${C.muted};margin-bottom:6px;letter-spacing:0.06em;text-transform:uppercase;}
    .field input,.field select{width:100%;padding:11px 14px;border:1.5px solid #ddd8cc;border-radius:8px;font-size:15px;color:${C.navy};background:white;transition:border-color 0.15s;}
    .field input:focus,.field select:focus{outline:none;border-color:${C.gold};}
    .hint{font-size:12px;color:#aaa;margin-top:5px;}
    .section-label{font-size:10px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:${C.muted};margin:22px 0 12px;padding-bottom:8px;border-bottom:1px solid #eee;}
    .card{background:white;border-radius:14px;border:1px solid ${C.borderLight};padding:24px 28px;}
    .badge-on{background:#e8f5ec;color:#1a5c2e;display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;}
    .badge-off{background:#f5f0e8;color:#8a6d3b;display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:500;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
    .fade-up{animation:fadeUp 0.45s ease forwards;}
    .gold-line{width:40px;height:3px;background:${C.gold};border-radius:2px;margin:0 auto 20px;}
    .nav-link{color:rgba(255,255,255,0.6);font-size:13px;cursor:pointer;background:none;border:none;padding:0;transition:color 0.15s;}
    .nav-link:hover{color:white;}
  `;

  const Nav = ({light}) => (
    <nav style={{background:light?"white":C.navy,padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:100,borderBottom:light?`1px solid ${C.borderLight}`:"none"}}>
      <div onClick={()=>nav(PAGES.HOME)} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,background:C.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4" r="3" fill={C.navy}/><line x1="12" y1="7" x2="12" y2="20" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round"/><path d="M8 17l4 4 4-4" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{color:light?C.navy:C.white,fontFamily:"'DM Serif Display',serif",fontSize:20}}>FirstTee</span>
      </div>
      <div style={{display:"flex",gap:16,alignItems:"center"}}>
        {[["About",PAGES.ABOUT],["Pricing",PAGES.PRICING]].map(([l,p])=>(
          <button key={l} className="nav-link" style={{color:light?C.muted:"rgba(255,255,255,0.6)"}} onClick={()=>nav(p)}>{l}</button>
        ))}
        <button className="btn-outline" style={{padding:"7px 18px",fontSize:13}} onClick={()=>nav(PAGES.SIGNUP)}>Get started</button>
      </div>
    </nav>
  );

  const Footer = () => (
    <div style={{background:C.navy,borderTop:`1px solid ${C.navyLight}`,padding:"24px 32px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:24,height:24,background:C.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4" r="3" fill={C.navy}/><line x1="12" y1="7" x2="12" y2="20" stroke={C.navy} strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>© 2026 FirstTee</span>
      </div>
      <div style={{display:"flex",gap:24}}>
        {[["About",PAGES.ABOUT],["Pricing",PAGES.PRICING],["Admin",PAGES.ADMIN]].map(([l,p])=>(
          <span key={l} onClick={()=>nav(p)} style={{color:"rgba(255,255,255,0.35)",fontSize:13,cursor:"pointer"}}>{l}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",background:C.cream}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
      <style>{CSS}</style>

      {/* ── HOME ── */}
      {page===PAGES.HOME&&(
        <div>
          <Nav/>
          <div style={{background:`linear-gradient(150deg,${C.navy} 0%,${C.navyMid} 55%,${C.navyLight} 100%)`,padding:"90px 24px 110px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-80,right:-80,width:360,height:360,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}15 0%,transparent 70%)`,pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-40,left:-60,width:280,height:280,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}08 0%,transparent 70%)`,pointerEvents:"none"}}/>
            <div style={{position:"relative",maxWidth:640,margin:"0 auto"}} className="fade-up">
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(201,168,76,0.15)",color:C.gold,fontSize:12,fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",padding:"6px 16px",borderRadius:20,marginBottom:28,border:`1px solid rgba(201,168,76,0.25)`}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:C.gold,display:"inline-block"}}/>
                Checks every 60 seconds
              </div>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2.4rem,6vw,3.6rem)",color:C.white,lineHeight:1.12,marginBottom:22}}>
                Be <span style={{color:C.gold,fontStyle:"italic"}}>first</span> on the tee.<br/>Every single time.
              </h1>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:17,lineHeight:1.75,marginBottom:40,fontWeight:300,maxWidth:500,margin:"0 auto 40px"}}>
                FirstTee watches your private club's tee sheet every minute and texts you the instant a spot opens that fits your schedule.
              </p>
              <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
                <button className="btn-gold" style={{width:"auto",padding:"15px 40px",fontSize:16,borderRadius:10}} onClick={()=>nav(PAGES.SIGNUP)}>Start free trial</button>
                <button className="btn-outline" style={{padding:"15px 28px",fontSize:15}} onClick={()=>nav(PAGES.ABOUT)}>Our story</button>
              </div>
              <p style={{color:"rgba(255,255,255,0.3)",fontSize:12,marginTop:16}}>14-day free trial · then $14.99/mo · cancel anytime</p>
            </div>
          </div>

          <div style={{background:C.gold,padding:"18px 24px",display:"flex",justifyContent:"center",gap:"clamp(20px,5vw,70px)",flexWrap:"wrap"}}>
            {[["Checks","Every 60 sec"],["Works with","Any private club"],["Alerts","Instant SMS"],["Setup","2 minutes"]].map(([l,v])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:C.navy}}>{v}</div>
                <div style={{fontSize:11,color:`${C.navy}90`,fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase"}}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{maxWidth:760,margin:"70px auto",padding:"0 24px",textAlign:"center"}}>
            <div className="gold-line"/>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:C.navy,marginBottom:10}}>How FirstTee works</h2>
            <p style={{color:"#888",fontSize:15,marginBottom:48}}>From signup to tee time in minutes</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:20}}>
              {[["01","Sign up in 2 minutes","Enter your details and club login. No app download needed."],["02","Set your schedule","After subscribing, use your dashboard to pick dates and set preferences for each one."],["03","We watch for you","FirstTee checks your club every 60 seconds and texts you the instant a match opens."],["04","Book first","You get the text before anyone else. Tap the link, log in, and grab the tee time."]].map(([n,t,d])=>(
                <div key={n} className="card" style={{textAlign:"left",borderTop:`3px solid ${C.gold}`}}>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:32,color:C.gold,marginBottom:10}}>{n}</div>
                  <div style={{fontSize:15,fontWeight:500,color:C.navy,marginBottom:8}}>{t}</div>
                  <div style={{fontSize:13,color:"#777",lineHeight:1.65}}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:C.navy,padding:"70px 24px",textAlign:"center"}}>
            <div className="gold-line"/>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:C.white,marginBottom:10}}>One plan. Everything included.</h2>
            <p style={{color:C.muted,fontSize:15,marginBottom:36}}>$14.99/month. No tiers, no gotchas.</p>
            <div className="card" style={{maxWidth:340,margin:"0 auto",border:`2px solid ${C.gold}`,textAlign:"center"}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:48,color:C.navy}}>$14.99</div>
              <div style={{fontSize:13,color:"#aaa",marginBottom:24}}>per month · cancel anytime</div>
              {["Checks every 60 seconds","Any private club in the US","Instant SMS alerts","Per-day schedule dashboard","Set time & course per date","14-day free trial"].map(f=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #f0f0ec",textAlign:"left"}}>
                  <span style={{color:C.gold,fontWeight:500}}>✓</span>
                  <span style={{fontSize:14,color:"#444"}}>{f}</span>
                </div>
              ))}
              <button className="btn-gold" style={{marginTop:20}} onClick={()=>nav(PAGES.SIGNUP)}>Start free trial</button>
            </div>
          </div>
          <Footer/>
        </div>
      )}

      {/* ── ABOUT ── */}
      {page===PAGES.ABOUT&&(
        <div>
          <Nav/>
          <div style={{background:`linear-gradient(160deg,${C.navy} 0%,${C.navyLight} 100%)`,padding:"80px 24px 80px",textAlign:"center"}}>
            <div style={{maxWidth:560,margin:"0 auto"}} className="fade-up">
              <div className="gold-line"/>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(2rem,5vw,3rem)",color:C.white,lineHeight:1.15,marginBottom:16}}>Built by golfers,<br/><span style={{color:C.gold,fontStyle:"italic"}}>for golfers.</span></h1>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:16,lineHeight:1.8,fontWeight:300}}>We know how frustrating it is to miss a tee time at your club because you weren't watching at the right moment.</p>
            </div>
          </div>

          <div style={{maxWidth:720,margin:"0 auto",padding:"60px 24px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center",marginBottom:70}}>
              <div>
                <div style={{fontSize:11,fontWeight:500,color:C.gold,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>The problem</div>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:C.navy,marginBottom:16,lineHeight:1.25}}>Tee times disappear before you even know they existed</h2>
                <p style={{fontSize:15,color:"#666",lineHeight:1.8}}>At private clubs, tee times often open up when members cancel — but there's no way to know when that happens unless you're constantly refreshing the booking page. Most members miss out simply because they weren't looking at the right moment.</p>
              </div>
              <div style={{background:C.navy,borderRadius:16,padding:32,textAlign:"center"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:56,color:C.gold,marginBottom:8}}>47%</div>
                <div style={{color:"rgba(255,255,255,0.6)",fontSize:14,lineHeight:1.6}}>of private club members say they've missed a desired tee time due to cancellations they didn't know about</div>
              </div>
            </div>

            <div style={{borderLeft:`3px solid ${C.gold}`,paddingLeft:28,marginBottom:60}}>
              <p style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:C.navy,lineHeight:1.6,fontStyle:"italic"}}>"My grandfather kept missing weekend tee times at his club in West Palm Beach. He'd call the pro shop and they'd say spots had opened and filled within minutes. I built the first version of FirstTee for him over a weekend — and he hasn't missed a tee time since."</p>
              <div style={{marginTop:16,fontSize:13,color:C.muted,fontWeight:500}}>— Zach, Founder of FirstTee</div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:20,marginBottom:60}}>
              {[["Our mission","Make private club golf more accessible by giving every member equal access to tee time openings — not just those who happen to be watching."],["Our approach","We use smart monitoring technology to check your club's tee sheet every 60 seconds and alert you by text the moment something opens up."],["Our values","Honest pricing, no dark patterns, no selling your data. We charge a simple monthly fee and that's it."]].map(([t,d])=>(
                <div key={t} className="card" style={{borderTop:`3px solid ${C.gold}`}}>
                  <div style={{fontSize:15,fontWeight:500,color:C.navy,marginBottom:10}}>{t}</div>
                  <div style={{fontSize:13,color:"#777",lineHeight:1.7}}>{d}</div>
                </div>
              ))}
            </div>

            <div style={{background:C.navy,borderRadius:16,padding:"40px 32px",textAlign:"center"}}>
              <div className="gold-line"/>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:C.white,marginBottom:10}}>Ready to never miss a tee time?</h2>
              <p style={{color:C.muted,fontSize:14,marginBottom:24}}>Join members across the US who use FirstTee to stay first on the tee sheet.</p>
              <button className="btn-gold" style={{width:"auto",padding:"13px 36px"}} onClick={()=>nav(PAGES.SIGNUP)}>Start your 14-day free trial</button>
            </div>
          </div>
          <Footer/>
        </div>
      )}

      {/* ── PRICING ── */}
      {page===PAGES.PRICING&&(
        <div>
          <Nav/>
          <div style={{maxWidth:480,margin:"60px auto",padding:"0 24px 80px"}} className="fade-up">
            <div style={{textAlign:"center",marginBottom:36}}>
              <div className="gold-line"/>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:C.navy,marginBottom:8}}>Simple, honest pricing</h1>
              <p style={{fontSize:14,color:"#888"}}>One plan that does everything.</p>
            </div>
            <div className="card" style={{border:`2px solid ${C.gold}`,textAlign:"center"}}>
              <div style={{background:C.navy,margin:"-24px -28px 24px",padding:16,borderRadius:"12px 12px 0 0"}}>
                <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",color:C.gold}}>Pro Plan</div>
              </div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:52,color:C.navy,lineHeight:1}}>$14.99</div>
              <div style={{fontSize:14,color:"#aaa",marginBottom:28}}>/ month · cancel anytime</div>
              {[["Check frequency","Every 60 seconds"],["Works with","Any private club"],["Alerts","Instant SMS"],["Schedule management","Per-day dashboard"],["Per-day settings","Time & course"],["Player count","Min spots"],["Free trial","14 days"],["Support","Email"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f0f0ec"}}>
                  <span style={{fontSize:14,color:"#666"}}>{l}</span>
                  <span style={{fontSize:14,fontWeight:500,color:C.navy}}>{v}</span>
                </div>
              ))}
              <button className="btn-gold" style={{marginTop:24,padding:15,fontSize:16}} onClick={()=>nav(PAGES.SIGNUP)}>Start 14-day free trial</button>
              <p style={{fontSize:12,color:"#bbb",marginTop:10}}>No credit card required to start</p>
            </div>
          </div>
          <Footer/>
        </div>
      )}

      {/* ── SIGNUP ── */}
      {page===PAGES.SIGNUP&&(
        <div>
          <Nav/>
          <div style={{maxWidth:560,margin:"40px auto",padding:"0 20px 60px"}} className="fade-up">
            <div className="card">
              <div style={{borderBottom:"1px solid #eee",paddingBottom:16,marginBottom:4}}>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:C.navy}}>Create your account</h2>
                <p style={{fontSize:13,color:"#aaa",marginTop:4}}>Quick setup · 14-day free trial · then $14.99/mo</p>
              </div>
              <form onSubmit={handleSignup}>
                <div className="section-label">Your details</div>
                <div className="field"><label>Full name</label><input placeholder="Robert Chen" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div className="field"><label>Email</label><input type="email" placeholder="you@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required/></div>
                  <div className="field"><label>Cell phone</label><input type="tel" placeholder="+15615550100" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} required/></div>
                </div>

                <div className="section-label">Your club</div>
                <div className="field">
                  <label>Select your club</label>
                  <select value={form.club} onChange={e=>setForm(f=>({...f,club:e.target.value}))} required>
                    <option value="">Choose a club...</option>
                    {CLUBS.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {form.club==="Other (paste your club's URL)"&&(
                  <div className="field">
                    <label>Club tee time URL</label>
                    <input placeholder="https://yourclub.com/tee-times" value={form.clubUrl} onChange={e=>setForm(f=>({...f,clubUrl:e.target.value}))}/>
                    <div className="hint">Log into your club, go to tee times, paste the URL</div>
                  </div>
                )}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div className="field"><label>Club member email</label><input type="email" placeholder="Club login email" value={form.memberEmail} onChange={e=>setForm(f=>({...f,memberEmail:e.target.value}))} required/></div>
                  <div className="field"><label>Club password</label><input type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} required/></div>
                </div>
                <div style={{background:"#f0f9f4",border:"1px solid #b8ddc4",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#2d6b40",marginBottom:4}}>
                  🔒 Your login is encrypted and only used to check tee times. Never shared.
                </div>

                <div className="section-label">Alert preferences</div>
                <div className="field">
                  <label>Check frequency</label>
                  <select value={form.interval} onChange={e=>setForm(f=>({...f,interval:e.target.value}))}>
                    <option value="1">Every 1 minute (fastest)</option>
                    <option value="2">Every 2 minutes</option>
                    <option value="5">Every 5 minutes</option>
                    <option value="10">Every 10 minutes</option>
                  </select>
                  <div className="hint">You can set specific dates and times from your dashboard after subscribing</div>
                </div>

                <button type="submit" className="btn-gold" style={{padding:15,fontSize:15,marginTop:8}}>Continue to payment →</button>
                <p style={{fontSize:12,color:"#bbb",textAlign:"center",marginTop:10}}>14-day free trial · then $14.99/month</p>
              </form>
            </div>
            <p style={{textAlign:"center",fontSize:13,color:"#aaa",marginTop:16,cursor:"pointer"}} onClick={()=>nav(PAGES.HOME)}>← Back</p>
          </div>
        </div>
      )}

      {/* ── CHECKOUT ── */}
      {page===PAGES.CHECKOUT&&(
        <div>
          <Nav/>
          <div style={{maxWidth:460,margin:"40px auto",padding:"0 20px 60px"}} className="fade-up">
            <div className="card">
              <div style={{background:C.navy,margin:"-24px -28px 24px",padding:"16px 24px",borderRadius:"12px 12px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:C.white,fontFamily:"'DM Serif Display',serif",fontSize:16}}>Start your free trial</span>
                <span style={{color:C.gold,fontSize:13,fontWeight:500}}>14 days free</span>
              </div>
              <div style={{background:"#f9f7f2",border:"1px solid #e8e4dc",borderRadius:8,padding:"12px 16px",marginBottom:20,display:"flex",justifyContent:"space-between"}}>
                <div><div style={{fontSize:14,fontWeight:500,color:C.navy}}>FirstTee Pro</div><div style={{fontSize:12,color:"#888"}}>Billed monthly after trial</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:500,color:C.navy}}>$0.00 today</div><div style={{fontSize:12,color:"#888"}}>then $14.99/mo</div></div>
              </div>
              <form onSubmit={handleCheckout}>
                <div className="section-label">Payment details</div>
                <div className="field"><label>Card number</label><input placeholder="1234 5678 9012 3456" value={cardNum} onChange={e=>setCardNum(formatCard(e.target.value))} required/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div className="field"><label>Expiry</label><input placeholder="MM/YY" value={cardExp} onChange={e=>setCardExp(formatExp(e.target.value))} required/></div>
                  <div className="field"><label>CVC</label><input placeholder="123" value={cardCvc} onChange={e=>setCardCvc(e.target.value.replace(/\D/g,"").slice(0,4))} required/></div>
                </div>
                <div style={{fontSize:11,color:"#aaa",lineHeight:1.5,marginBottom:16}}>🔒 Payments processed securely by Stripe. Card not charged until after 14-day trial.</div>
                <button type="submit" className="btn-gold" style={{padding:15,fontSize:15}}>Start my free trial</button>
              </form>
            </div>
            <p style={{textAlign:"center",fontSize:13,color:"#aaa",marginTop:16,cursor:"pointer"}} onClick={()=>nav(PAGES.SIGNUP)}>← Back</p>
          </div>
        </div>
      )}

      {/* ── MEMBER DASHBOARD ── */}
      {page===PAGES.DASHBOARD&&(
        <div style={{minHeight:"100vh",background:"#f4f4f0"}}>
          <div style={{background:C.navy,padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:28,height:28,background:C.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4" r="3" fill={C.navy}/><line x1="12" y1="7" x2="12" y2="20" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{color:C.white,fontFamily:"'DM Serif Display',serif",fontSize:18}}>FirstTee</span>
              <span style={{color:C.muted,fontSize:13}}>/ My alerts</span>
            </div>
            <button onClick={()=>nav(PAGES.HOME)} style={{background:"transparent",border:"none",color:C.muted,fontSize:13,cursor:"pointer"}}>Sign out</button>
          </div>

          <div style={{maxWidth:700,margin:"0 auto",padding:"32px 20px 60px"}}>
            <div style={{marginBottom:28}}>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:C.navy,marginBottom:4}}>Welcome back, {form.name||"Member"}</h1>
              <p style={{fontSize:14,color:"#888"}}>{memberClub.split("–")[0].trim()} · Pro plan · Checking every {form.interval} min</p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:28}}>
              {[["Dates watching",memberDates.length],["Alerts sent","0"],["Status","Active"],["Next bill","May 10, 2026"]].map(([l,v])=>(
                <div key={l} style={{background:"white",borderRadius:10,border:"1px solid #e8e4dc",borderTop:`3px solid ${C.gold}`,padding:"12px 14px"}}>
                  <div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{l}</div>
                  <div style={{fontSize:18,fontWeight:500,color:C.navy}}>{v}</div>
                </div>
              ))}
            </div>

            <div className="card" style={{marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:C.navy}}>My tee time schedule</h2>
                  <p style={{fontSize:13,color:"#aaa",marginTop:2}}>Select dates on the calendar, then customize each one below.</p>
                </div>
                {saved&&<div style={{fontSize:12,color:"#2d6b40",background:"#e8f5ec",padding:"5px 12px",borderRadius:20,fontWeight:500}}>✓ Saved</div>}
              </div>

              <Calendar selectedDates={memberDates} onToggle={toggleDate}/>

              <div style={{marginTop:20}}>
                {memberDates.length>0?(
                  <>
                    <div style={{fontSize:12,fontWeight:500,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:12}}>
                      {memberDates.length} date{memberDates.length>1?"s":""} selected — tap to expand and edit
                    </div>
                    {memberDates.map(entry=>(
                      <DayCard key={entry.date} entry={entry} courses={memberCourses} onRemove={()=>removeDate(entry.date)} onUpdate={(updated)=>updateDate(entry.date,updated)}/>
                    ))}
                    <button className="btn-gold" style={{marginTop:12}} onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),3000);}}>Save schedule</button>
                  </>
                ):(
                  <div style={{background:"#f9f7f2",border:`1.5px dashed ${C.borderLight}`,borderRadius:10,padding:24,textAlign:"center"}}>
                    <div style={{fontSize:14,color:"#bbb",marginBottom:6}}>No dates selected yet</div>
                    <div style={{fontSize:13,color:"#ccc"}}>Tap any upcoming date on the calendar above to start watching for tee times</div>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:C.navy,marginBottom:16}}>Account settings</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                <div>
                  <div style={{fontSize:12,color:C.muted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Phone number</div>
                  <div style={{fontSize:14,color:C.navy}}>{form.phone||"+1 (561) 555-0100"}</div>
                </div>
                <div>
                  <div style={{fontSize:12,color:C.muted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Check frequency</div>
                  <div style={{fontSize:14,color:C.navy}}>Every {form.interval} minute{form.interval!=="1"?"s":""}</div>
                </div>
                <div>
                  <div style={{fontSize:12,color:C.muted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Club</div>
                  <div style={{fontSize:14,color:C.navy}}>{memberClub.split("–")[0].trim()}</div>
                </div>
                <div>
                  <div style={{fontSize:12,color:C.muted,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Plan</div>
                  <div style={{fontSize:14,color:C.navy}}>Pro · $14.99/mo</div>
                </div>
              </div>
              <div style={{borderTop:"1px solid #f0f0ec",paddingTop:14,display:"flex",gap:16}}>
                <button style={{background:"none",border:"none",color:C.navyLight,fontSize:13,cursor:"pointer",fontWeight:500}}>Update phone</button>
                <button style={{background:"none",border:"none",color:"#c0392b",fontSize:13,cursor:"pointer",fontWeight:500}}>Cancel subscription</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN LOGIN ── */}
      {page===PAGES.ADMIN&&(
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:24,background:"#070d1a"}}>
          <div style={{background:"#111827",border:`1px solid ${C.navyLight}`,borderRadius:14,padding:"32px 28px",maxWidth:360,width:"100%"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
              <div style={{width:28,height:28,background:C.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="4" r="3" fill={C.navy}/><line x1="12" y1="7" x2="12" y2="20" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{color:C.white,fontFamily:"'DM Serif Display',serif",fontSize:18}}>FirstTee Admin</span>
            </div>
            <form onSubmit={handleAdmin}>
              <div className="field">
                <label style={{color:"#445"}}>Password</label>
                <input type="password" placeholder="••••••••" value={adminPass} onChange={e=>setAdminPass(e.target.value)} style={{background:"#1a2235",border:`1px solid ${adminError?"#e74c3c":C.navyLight}`,color:"white"}} autoFocus/>
                {adminError&&<div style={{fontSize:12,color:"#e74c3c",marginTop:5}}>Wrong password. Hint: firsttee2026</div>}
              </div>
              <button type="submit" className="btn-gold">Sign in</button>
            </form>
            <p style={{fontSize:12,color:"#334",marginTop:14,textAlign:"center",cursor:"pointer"}} onClick={()=>nav(PAGES.HOME)}>← Back</p>
          </div>
        </div>
      )}

      {/* ── ADMIN DASHBOARD ── */}
      {page===PAGES.ADMIN_DASH&&(
        <div style={{minHeight:"100vh",background:"#f4f4f0"}}>
          <div style={{background:C.navy,padding:"0 24px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{color:C.white,fontFamily:"'DM Serif Display',serif",fontSize:18}}>FirstTee</span>
              <span style={{color:C.muted,fontSize:13}}>/ Admin</span>
            </div>
            <button onClick={()=>nav(PAGES.HOME)} style={{background:"transparent",border:"none",color:C.muted,fontSize:13,cursor:"pointer"}}>Sign out</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,padding:"24px 24px 0"}}>
            {[["Members",members.length],["Active",active],["Paused",members.length-active],["MRR",`$${mrr}`]].map(([l,v])=>(
              <div key={l} style={{background:"white",borderRadius:10,border:"1px solid #e8e4dc",borderTop:`3px solid ${C.gold}`,padding:"14px 16px"}}>
                <div style={{fontSize:11,color:"#999",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>{l}</div>
                <div style={{fontSize:26,fontWeight:500,color:C.navy}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{padding:24,overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",background:"white",borderRadius:10,border:"1px solid #e8e4dc",fontSize:13}}>
              <thead>
                <tr style={{background:C.navy}}>
                  {["Member","Club","Dates","Alerts","Status","Actions"].map(h=>(
                    <th key={h} style={{textAlign:"left",padding:"10px 14px",fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",color:C.muted,fontWeight:500}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((m,i)=>(
                  <tr key={m.id} style={{borderBottom:i<members.length-1?"1px solid #f0f0ec":"none"}}>
                    <td style={{padding:"12px 14px"}}><div style={{fontWeight:500,color:C.navy}}>{m.name}</div><div style={{color:"#aaa",fontSize:11}}>{m.email}</div></td>
                    <td style={{padding:"12px 14px",color:"#555"}}>{m.club}</td>
                    <td style={{padding:"12px 14px",color:"#555"}}>{m.dates.join(", ")}</td>
                    <td style={{padding:"12px 14px",color:"#555"}}>{m.alerts}</td>
                    <td style={{padding:"12px 14px"}}><span className={m.active?"badge-on":"badge-off"}>{m.active?"Active":"Paused"}</span></td>
                    <td style={{padding:"12px 14px"}}>
                      <button onClick={()=>toggleMember(m.id)} style={{background:"none",border:"none",color:C.navyLight,fontSize:12,cursor:"pointer",marginRight:10,fontWeight:500}}>{m.active?"Pause":"Resume"}</button>
                      <button onClick={()=>deleteMember(m.id)} style={{background:"none",border:"none",color:"#c0392b",fontSize:12,cursor:"pointer",fontWeight:500}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
