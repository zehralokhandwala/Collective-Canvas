import { useState, useEffect, useRef } from "react";
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://kztekmzvvolqmgypbbya.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dGVrbXp2dm9scW1neXBiYnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjEzODksImV4cCI6MjA5NDgzNzM4OX0.VwMf8gHSaW7gb47QQ_nhzI3kQ81SOGCJ1rvRh5UTRGY';
const supabase = createClient(supabaseUrl, supabaseKey);

const HAIRS = [
  { id:"bald",  name:"bald",  type:"none",   art:"" },
  { id:"wave",  name:"wave",  type:"topper", art:"       .-~~~-.       \n      /       \\      " },
  { id:"curly", name:"curly", type:"topper", art:"       .:=:=:.       \n      i;'~ ~`:i      " },
  { id:"wavy",  name:"wavy",  type:"topper", art:"       .-~~~-.       \n      (//'~`\\\\)      " },
  { id:"afro",  name:"afro",  type:"wrap",   art:"        _..._        \n      .~(|||)~.      \n     ((//'~`\\\\))     \n     (!       !)     " },
  { id:"bun",   name:"bun",   type:"wrap",   art:"         _._         \n        (\\!/)        \n      .(|||||).      \n     ((/·'~`·\\))     \n     (!       !)     " },
];

const FACES = [
  { id:"f1", name:"Classy", complete:false, art:"      ! '   ` !      \n     (. ·   · .)     \n      !   W   !      \n       \\ `-' /       \n       !\\._./!       \n      /`-._.-'\\      \n   -~'\\_/ |o\\_/`~-   " },
  { id:"f2", name:"calm",       complete:false, art:"      ! ~   ~ !      \n     (. -   - .)     \n      |  (_)  |      \n      !   -   !      \n       !.___.!       \n     _ |     | _     \n _.-~             ~-." },
  { id:"f3", name:"beard",      complete:false, art:"      ! .   . !      \n     (. .   . .)     \n      (\\_.J._/)      \n      (((/-\\)))      \n       ((\\¡/))       " },
  { id:"f4", name:"smile",     complete:false, art:"      ! -   - !      \n     (. .   . .)     \n      |   u   |      \n      !  `-'  !      \n       \\.___./       \n       |     |       " },
  { id:"f5", name:"Big Eyes",    complete:false, art:"      ! -···- !      \n     (. O   O .)     \n      7  (_)  <      \n     (   ·-·   )     \n      `._   _.'      \n      |  `~' |       \n _.-~'        `~-._  " },
  { id:"f6", name:"big beard",  complete:false, art:"      ! ~   ~ !      \n     (. o   o .)     \n      (\\_.L._/)      \n      (((/_\\)))      \n      (((\\¡/)))      \n      (((|||)))      \n _.-~'.((|||)).`~-._ \n'      `-...-'       " },
  { id:"f7", name:"happy",      complete:false, art:"      ! ~   ~ !      \n     (. o   o .)     \n      |   L   |      \n      !  '_`  !      \n       !.___.!       \n      /'     `\\      " },
  { id:"f8", name:"cute",    complete:false, art:"     (! '   ` !)     \n     (. -   - .)     \n      7   v   <      \n     (   )-(   )     \n      `._   _.'      \n      |' `~' `|      \n _.-;'.       .`:-._ " },
  { id:"f9", name:"rizz", complete:false, art:"     (!__   __!)     \n     (~(_)-(_)~)     \n      !   L   !      \n       \\ ·-· /       \n       !`---'!       \n      /'     `\\      \n _.-~'.  \\ /  .`~-._ \n'      `-...-'      `" },
  { id:"lh1", name:"curls",   complete:true, art:"       _.---._       \n     .(((|||))).     \n    (((/(((((\\)))    \n    ))! ~   ~ !((    \n   (((. o   o .)))   \n   i)))   L   (((i   \n  ((((!   _   !))))  \n   ))))!.___.!((((   \n  ((((/'     `\\))))  \n _i))))       ((((i_ \n'((((( `-...-' )))))`" },
  { id:"lh2", name:"short hair",    complete:true, art:"       _.---._       \n     .(((|||))).     \n    (((//'~`\\\\)))    \n    ))! ~   ~ !((    \n   (((. o   o .)))   \n    )))   L   (((    \n   ((( \\ `-' / )))   \n    )))!`---'!(((    \n       |     |       \n _.-~'.       .`~-._ " },
  { id:"lh3", name:"vibes",    complete:true, art:"       _.---._       \n     .(((|||))).     \n    (((//'~`\\\\)))    \n    ))! ~   ~ !((    \n   (((~(_)-(_)~))    \n    )))   L   (((    \n   ((( \\ `-' / )))   \n    )))!`---'!(((    \n       |     |       \n _.-~'.       .`~-._ " },
  { id:"lh4", name:"drip", complete:true, art:"       _.---._       \n     .(((|||))).     \n    (((//'~`\\\\)))    \n    ))!_______!((    \n   ((((  /-\\  )))    \n    )))`' L `'(      \n   ((( \\ ·-· /       \n       !`---'!       \n      /'     `\\      \n _.-~'.  \\ /  .`~-._ \n'      `-...-'      `" },
  { id:"lh5", name:"sunny", complete:true, art:"        _..._        \n      .~(|||)~.      \n     ((//'~`\\\\))     \n     (!_______!)     \n     ((  /-\\  ))     \n      !`' L `'!      \n       \\ ·-· /       \n       !`---'!       \n      /'     `\\      \n _.-~'.  \\ /  .`~-._ " },
];

const PRESETS = [
  { name:"cow",     art:"\\|/          (__)    \n     `\\------(oo)\n       ||    (__)\n       ||w--||     \\|/\n   \\|/" },
  { name:"Popeye",  art:"       .-'-.\n       __|     `\\\n      `-,-`--._  `\\\n []  .->'  a   `|-'\n  `=/ (__/_     /\n    \\_,    `  _)\n      `----; |" },
  { name:"castle",  art:"             A\n          __/_\\__\n         /\\-'o'-/\\\n        _||:<_>:||_\n       /\\_/=====\\_/\\\n      _|:_:_[I]_:_:|_\n   _/::::::::::::::::\\_\n _/::::::::::::::::::::\\_\n/::::::::::::::::::::::::\\" },
  { name:"house",   art:"       ':.\n         []_____\n        /\\      \\\n    ___/  \\__/\\__\\__\n---/\\___\\ |''''''|__\\-- ---\n   ||'''| |''||''|''|\n   ``\"\"\"`\"`\"\"))\"\"`\"\"`" },
  { name:"fish",    art:"             O  o\n          _\\_   o\n>('>   \\\\/  o\\ .\n       //\\___=\n          ''" },
  { name:"whale",   art:"       .\n      \":\"\n    ___:____     |\"\\/\"|\n  ,'        `.    \\  /\n  |  O        \\___/  |\n~^~^~^~^~^~^~^~^~^~^~^~^~" },
  { name:"cat",     art:" _._     _,-'\"\"`-._\n(,-.`._,'(       |\\`-/|\n    `-.-' \\ )-`( , o o)\n          `-    \\`_`\"'-" },
  { name:"sheep",   art:"        __  _\n    .-.'  `; `-._  __  _\n   (_,         .-:'  `; `-._\n ,'o\"(        (_,           )\n(__,-'      ,'o\"(            )>\n   (       (__,-'            )\n    `-'._.--._(             )\n       |||  |||`-'._.--._.-'\n                  |||  |||" },
];

const ORNS = ["✿","❀","✾","❃","❁","✦","✧","★","☆","♡","♥","·","˚","°","⊹","≋","∿","~"];
const COLS = ["#9B6BC4","#C87090","#4A9E8A","#C07040","#5A88C0","#7A6050","#6A9E50","#B05898"];
const PASSWORD = "zee786";

function combineHF(hair, face, textBelow) {
  if (!face) return "";
  let out;
  if (face.complete || !hair || !hair.art) out = face.art;
  else if (hair.type === "wrap") {
    const fL = face.art.split("\n");
    out = hair.art + "\n" + fL.slice(1).join("\n");
  } else {
    out = hair.art + "\n" + face.art;
  }
  if (textBelow && textBelow.trim()) out += "\n" + textBelow.trim();
  return out;
}

export default function App() {
  const cvsRef = useRef(null);
  const taRef  = useRef(null);
  const wsRef  = useRef(null);
  const [pan, setPan] = useState({x:0,y:0});
  const [scl, setScl] = useState(1);
  const panR = useRef({x:0,y:0}), sclR = useRef(1);
  const cvDrag = useRef(false), lm = useRef({x:0,y:0}), lt = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const [sessionId] = useState(() => {
    const stored = localStorage.getItem('creative-canvas-session');
    if (stored) return stored;
    const newId = `s-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    localStorage.setItem('creative-canvas-session', newId);
    return newId;
  });
  const initialPanSet = useRef(false);
  const [admin, setAdmin] = useState(false);
  const [pwPrompt, setPwPrompt] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwErr, setPwErr] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [hint, setHint] = useState(true);

  const [open, setOpen] = useState(false);
  const [tab, setTab]   = useState("avatar");

  const [step, setStep] = useState(1);
  const [face, setFace] = useState(null);
  const [hair, setHair] = useState(HAIRS[0]);
  const [workspace, setWorkspace] = useState("");

  const [preset, setPreset] = useState(null);
  const [presetText, setPresetText] = useState("");
  const [freeText, setFreeText] = useState("");
  const [col, setCol] = useState(COLS[0]);

  const [placing, setPlacing] = useState(false);
  const [pending, setPending] = useState(null);
  const [ghost, setGhost] = useState({x:-999,y:-999});
  const [popped, setPopped] = useState(null);
  const [toast, setToast] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [stampMenu, setStampMenu] = useState(null);

  // Stamp dragging state
  const [draggingStamp, setDraggingStamp] = useState(null);
  const stampDragStart = useRef({x:0, y:0, stampX:0, stampY:0});

  // Triple-tap tracking for admin trigger
  const tapTimerRef = useRef(null);
  const tapCountRef = useRef(0);

  // Welcome card state - shown only on first visit
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('creative-canvas-welcomed');
  });

  function dismissWelcome() {
    localStorage.setItem('creative-canvas-welcomed', 'true');
    setShowWelcome(false);
  }

  useEffect(()=>{ panR.current = pan; }, [pan]);
  useEffect(()=>{ sclR.current = scl; }, [scl]);
  useEffect(()=>{ const t=setTimeout(()=>setHint(false),5000); return ()=>clearTimeout(t); },[]);

  async function load() {
    try {
      const { data, error } = await supabase
        .from('stamps')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      if (data) {
        setPosts(data);
        // Only set initial view ONCE, never reset on polling refreshes
        if (!initialPanSet.current) {
          initialPanSet.current = true;
          setPan({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
          });
          setScl(1);
        }
      }
    } catch (err) {
      console.error('Error loading stamps:', err);
    }
    setLoaded(true);
  }
  useEffect(()=>{ load(); const iv=setInterval(load,7000); return ()=>clearInterval(iv); },[]);

  // Wheel: ctrl/cmd = zoom, otherwise pan in both axes (covers trackpad + scroll wheel)
  useEffect(()=>{
    const el=cvsRef.current; if(!el) return;
    const fn=e=>{
      if(open) return;
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const factor = e.deltaY < 0 ? 1.12 : 0.9;
        setScl(s=>Math.min(Math.max(s*factor,0.1),7));
      } else {
        setPan(p=>({x:p.x-e.deltaX, y:p.y-e.deltaY}));
      }
    };
    el.addEventListener("wheel",fn,{passive:false});
    return ()=>el.removeEventListener("wheel",fn);
  },[open]);

  // Admin shortcut
  useEffect(()=>{
    const fn=e=>{
      if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(e.key==="A"||e.key==="a")) {
        e.preventDefault();
        if(admin){ setAdmin(false); } else { setPwPrompt(true); setPwInput(""); setPwErr(false); }
      }
      if(e.key==="Escape") { setPwPrompt(false); setStampMenu(null); }
    };
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  },[admin]);

  function checkPw() {
    if (pwInput === PASSWORD) { setAdmin(true); setPwPrompt(false); setPwInput(""); setPwErr(false); }
    else { setPwErr(true); setTimeout(()=>setPwErr(false), 1500); }
  }

  // Simplified drag handlers
  function onCvsMD(e){ 
    if(placing||e.button!==0||open||stampMenu||draggingStamp) return;
    cvDrag.current=true; 
    setIsDragging(true); 
    lm.current={x:e.clientX,y:e.clientY}; 
  }

  function onCvsMM(e){
    // Handle stamp dragging first
    if(draggingStamp) {
      onStampDragMove(e);
      return;
    }
    
    // Handle placing ghost
    if(placing){ 
      const rect=cvsRef.current.getBoundingClientRect();
      setGhost({x:e.clientX-rect.left,y:e.clientY-rect.top}); 
      return; 
    }
    
    // Handle canvas panning
    if(!cvDrag.current) return;
    const dx = e.clientX - lm.current.x;
    const dy = e.clientY - lm.current.y;
    setPan(p=>({x:p.x+dx, y:p.y+dy}));
    lm.current={x:e.clientX, y:e.clientY};
  }

  function onCvsMU(){ 
    // Handle stamp drag end
    if(draggingStamp) {
      onStampDragEnd();
      return;
    }
    
    // Handle canvas pan end
    cvDrag.current=false; 
    setIsDragging(false); 
  }

  const pinchDist = useRef(null);

  function onTS(e){ 
    if(e.touches.length===2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchDist.current = Math.sqrt(dx*dx + dy*dy);
    } else if(e.touches.length===1) {
      lt.current={x:e.touches[0].clientX,y:e.touches[0].clientY};
    }
  }
  function onTM(e){
  if(e.touches.length===2 && pinchDist.current !== null) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const newDist = Math.sqrt(dx*dx + dy*dy);
    const factor = newDist / pinchDist.current;
    // Zoom around the midpoint between two fingers
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    setPan(p=>({
      x: midX - factor * (midX - p.x),
      y: midY - factor * (midY - p.y)
    }));
    setScl(s=>Math.min(Math.max(s*factor,0.1),7));
    pinchDist.current = newDist;
    return;
  }
  if(!lt.current||e.touches.length!==1) return;
  const dx=e.touches[0].clientX-lt.current.x, dy=e.touches[0].clientY-lt.current.y;
  lt.current={x:e.touches[0].clientX,y:e.touches[0].clientY};
  setPan(p=>({x:p.x+dx,y:p.y+dy}));
}
  // Stamp drag handlers
  function onStampDragStart(stamp, e) {
    e.stopPropagation();
    if(stamp.session_id !== sessionId && !admin) return;
    setDraggingStamp(stamp.id);
    stampDragStart.current = {
      x: e.clientX,
      y: e.clientY,
      stampX: stamp.x,
      stampY: stamp.y
    };
  }

  function onStampDragMove(e) {
    if(!draggingStamp) return;
    const dx = (e.clientX - stampDragStart.current.x) / sclR.current;
    const dy = (e.clientY - stampDragStart.current.y) / sclR.current;
    
    setPosts(posts.map(p => 
      p.id === draggingStamp 
        ? {...p, x: stampDragStart.current.stampX + dx, y: stampDragStart.current.stampY + dy}
        : p
    ));
  }

  async function onStampDragEnd() {
    if(!draggingStamp) return;
    const draggedStamp = posts.find(p => p.id === draggingStamp);
    if(!draggedStamp) return;

    try {
      await supabase
        .from('stamps')
        .update({ x: draggedStamp.x, y: draggedStamp.y })
        .eq('id', draggingStamp);
    } catch(err) {
      console.error('Error updating stamp position:', err);
    }

    setDraggingStamp(null);
  }

  // Estimate stamp dimensions for collision detection
  function getStampSize(content) {
    const lines = (content || "").split('\n');
    const width = Math.max(...lines.map(l => l.length), 1) * 8.5;
    const height = lines.length * 20;
    return { width, height };
  }

  // Check if two stamp rectangles overlap (with padding)
  function stampsOverlap(a, b, padding = 25) {
    const sizeA = getStampSize(a.content);
    const sizeB = getStampSize(b.content);
    return !(
      a.x + sizeA.width + padding < b.x ||
      b.x + sizeB.width + padding < a.x ||
      a.y + sizeA.height + padding < b.y ||
      b.y + sizeB.height + padding < a.y
    );
  }

  // Find nearest non-overlapping position by spiraling outward
  function findValidPosition(targetX, targetY, content, existingPosts) {
    const candidate = { x: targetX, y: targetY, content };
    let collision = existingPosts.some(p => stampsOverlap(candidate, p));
    if (!collision) return { x: targetX, y: targetY };
    
    // Spiral search: try increasing radii at 8 angles
    for (let radius = 30; radius <= 400; radius += 30) {
      for (let angle = 0; angle < 360; angle += 45) {
        const rad = angle * Math.PI / 180;
        const testX = targetX + Math.cos(rad) * radius;
        const testY = targetY + Math.sin(rad) * radius;
        const testCandidate = { x: testX, y: testY, content };
        collision = existingPosts.some(p => stampsOverlap(testCandidate, p));
        if (!collision) return { x: testX, y: testY };
      }
    }
    return { x: targetX, y: targetY }; // fallback
  }

  async function placeOnCanvas(e) {
    if(stampMenu){ setStampMenu(null); return; }
    if(!placing||!pending) return;
    const rect=cvsRef.current.getBoundingClientRect();
    const rawX=(e.clientX-rect.left-panR.current.x)/sclR.current;
    const rawY=(e.clientY-rect.top-panR.current.y)/sclR.current;
    // Auto-offset if too close to existing stamps
    const { x, y } = findValidPosition(rawX, rawY, pending.content, posts);
    const np={...pending,x,y};
    setPlacing(false); setPending(null);
    
    try {
      const { data, error } = await supabase
        .from('stamps')
        .insert([{
          id: np.id,
          content: np.content,
          color: np.color,
          x: np.x,
          y: np.y,
          ts: np.ts,
          session_id: np.sessionId
        }])
        .select();
      
      if (error) throw error;
      await load(); // Reload to get the new stamp
      setPopped(np.id); 
      setTimeout(()=>setPopped(null),700);
      setToast("✓ stamped");
      setTimeout(()=>setToast(null), 2200);
    } catch(err){ 
      console.error('Error placing stamp:', err); 
    }
  }

  function onStampClick(p, e) {
    e.stopPropagation();
    if(placing) return;
    const isOwn = p.session_id === sessionId;
    if(!isOwn && !admin) return;
    const rect = cvsRef.current.getBoundingClientRect();
    setStampMenu({ stamp:p, isOwn, x:e.clientX-rect.left, y:e.clientY-rect.top });
  }

  // Triple-tap handler for mobile admin
  function handleCounterTap() {
    tapCountRef.current++;
    if(tapCountRef.current === 3) {
      if(admin) { 
        setAdmin(false); 
      } else { 
        setPwPrompt(true); 
        setPwInput(""); 
        setPwErr(false); 
      }
      tapCountRef.current = 0;
    }
    
    if(tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 800);
  }

  function getCurrentContent() {
    if (tab === "avatar") return workspace.replace(/\s+$/, "");
    if (tab === "preset") {
      let out = preset?.art || "";
      if (presetText.trim()) out += "\n" + presetText.trim();
      return out.replace(/\s+$/, "");
    }
    return freeText.replace(/\s+$/, "");
  }

  async function stampOrUpdate() {
    const content = getCurrentContent();
    if (!content.trim()) return;
    if (editingId) {
      try {
        const { error } = await supabase
          .from('stamps')
          .update({ content, color: col })
          .eq('id', editingId);
        
        if (error) throw error;
        await load();
        setEditingId(null);
        setOpen(false);
        resetComposer();
      } catch(err){ 
        console.error('Error updating stamp:', err); 
      }
    } else {
      setPending({ id:`${Date.now()}-${Math.random().toString(36).slice(2,6)}`, content, color:col, ts:Date.now(), sessionId });
      setPlacing(true); setOpen(false);
    }
  }

  function resetComposer() {
    setStep(1); setFace(null); setHair(HAIRS[0]); setWorkspace("");
    setPreset(null); setPresetText(""); setFreeText("");
  }

  function editStamp() {
    if(!stampMenu) return;
    const p = stampMenu.stamp;
    setFreeText(p.content); setCol(p.color); setEditingId(p.id);
    setTab("text"); setOpen(true); setStampMenu(null);
  }
  function duplicateStamp() {
    if(!stampMenu) return;
    const p = stampMenu.stamp;
    setFreeText(p.content); setCol(p.color); setEditingId(null);
    setTab("text"); setOpen(true); setStampMenu(null);
  }
  async function deleteStamp() {
    if(!stampMenu) return;
    try {
      const { error } = await supabase
        .from('stamps')
        .delete()
        .eq('id', stampMenu.stamp.id);
      
      if (error) throw error;
      await load();
      setStampMenu(null);
    } catch(err){ 
      console.error('Error deleting stamp:', err); 
    }
  }

  function selectFace(f) {
    setFace(f);
    const newWs = combineHF(hair, f, "");
    setWorkspace(newWs);
  }
  function selectHair(h) {
    setHair(h);
    const newWs = combineHF(h, face, "");
    setWorkspace(newWs);
  }
  function gotoStep(s) {
    if (s === 3) {
      // rebuild workspace from current selections
      const c = combineHF(hair, face, "");
      setWorkspace(c);
    }
    setStep(s);
  }
  function nextStep() {
    if (step === 1) {
      if (face?.complete) gotoStep(3);
      else gotoStep(2);
    } else if (step === 2) gotoStep(3);
  }
  function backStep() {
    if (step === 3) gotoStep(face?.complete ? 1 : 2);
    else if (step === 2) gotoStep(1);
  }

  const canStamp = getCurrentContent().trim().length > 0;
  const isEditing = !!editingId;

  // shared post styling
const postBase = { margin:0, padding:0, whiteSpace:"pre", fontFamily:"'Courier New',monospace", fontSize:14, lineHeight:1.4, fontWeight:"bold", userSelect:"none", transformOrigin:"top left" };
  // Button hover styles
  const btnHoverStyle = {
    transition: "all 0.2s ease",
  };

  return (
    <div style={{width:"100vw",height:"100dvh",position:"relative",overflow:"hidden",fontFamily:"'Courier New',monospace"}}>
      <style>{`
  @keyframes pop{
    0%{transform:scale(0.4) rotate(-8deg);opacity:0}
    40%{transform:scale(1.15) rotate(3deg);opacity:1}
    70%{transform:scale(0.95) rotate(-1deg)}
    100%{transform:scale(1) rotate(0);opacity:1}
  }
  @keyframes stampImpression{
    0%{outline:3px solid #8b3a2f;outline-offset:0;opacity:1}
    100%{outline:3px solid #8b3a2f;outline-offset:20px;opacity:0}
  }
  @keyframes stampedToast{
    0%{transform:translate(-50%,-20px);opacity:0}
    15%,80%{transform:translate(-50%,0);opacity:1}
    100%{transform:translate(-50%,-10px);opacity:0}
  }
  @keyframes up{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes fd{0%,70%{opacity:1}100%{opacity:0}}
  @keyframes pulse{0%,100%{opacity:0.35}50%{opacity:0.75}}
  @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
  @keyframes fadeIn{from{opacity:0;transform:translate(-50%,-48%) rotate(-1.5deg)}to{opacity:1;transform:translate(-50%,-50%) rotate(-1.5deg)}}

  .pop{animation:pop 0.55s cubic-bezier(.34,1.56,.64,1) forwards, stampImpression 0.7s ease-out}
  .toast{animation:stampedToast 2.2s ease forwards}
  .up{animation:up 0.25s cubic-bezier(.25,.46,.45,.94)}
  .ghost{animation:pulse 1s ease-in-out infinite}
  .shake{animation:shake 0.3s}
  .fade-in{animation:fadeIn 0.4s ease-out}

  /* Stamp hover */
  .own-stamp{transition:opacity 0.15s ease}
  .own-stamp:hover{outline:1.5px dashed #8b3a2f;outline-offset:3px;border-radius:2px;opacity:0.88}

  /* Button interactions — press into paper feel */
  .btn-hover{transition:transform 0.12s ease, box-shadow 0.12s ease !important}
  .btn-hover:hover{transform:translate(-1px,-1px) !important;box-shadow:4px 4px 0 #1a1614 !important}
  .btn-hover:active{transform:translate(2px,2px) !important;box-shadow:1px 1px 0 #1a1614 !important}

  /* Back button */
  .btn-back{transition:background 0.15s ease, transform 0.12s ease, box-shadow 0.12s ease !important}
  .btn-back:hover{background:#faf5e8 !important;transform:translate(-1px,-1px) !important;box-shadow:3px 3px 0 #1a1614 !important}
  .btn-back:active{transform:translate(2px,2px) !important;box-shadow:1px 1px 0 #1a1614 !important}

  /* Custom tooltip — immediate, no delay */
  [data-tooltip]{position:relative}
  [data-tooltip]::after{
    content:attr(data-tooltip);
    position:absolute;
    bottom:calc(100% + 8px);
    right:0;
    background:#1a1614;
    color:#fefcf7;
    padding:4px 8px;
    border-radius:3px;
    font-size:10px;
    font-family:'Courier New',monospace;
    letter-spacing:0.5px;
    white-space:nowrap;
    opacity:0;
    transform:translateY(4px);
    transition:opacity 0.15s ease, transform 0.15s ease;
    pointer-events:none;
    box-shadow:2px 2px 0 rgba(26,22,20,0.3);
  }
  [data-tooltip]:hover::after{opacity:1;transform:translateY(0)}

  /* Grid item hover */
  .avatar-grid button, .hair-grid button, .preset-grid button{
    transition:transform 0.15s ease, border-color 0.15s ease, background 0.15s ease !important
  }
  .avatar-grid button:hover, .hair-grid button:hover, .preset-grid button:hover{
    transform:scale(1.04) !important
  }

  /* Tab transitions */
  .tab-btn{transition:background 0.15s ease, color 0.15s ease}

  /* Input focus */
  textarea:focus, input[type="text"]:focus, input[type="password"]:focus{
    border-color:#8b3a2f !important;
    box-shadow:2px 2px 0 #8b3a2f !important;
    transition:border-color 0.15s, box-shadow 0.15s;
    outline:none;
  }

  /* Close button spin */
  .close-btn{transition:transform 0.2s ease, color 0.15s ease}
  .close-btn:hover{transform:rotate(90deg);color:#8b3a2f !important}

  /* Color picker dots */
  .color-dot{transition:transform 0.15s ease, box-shadow 0.15s ease !important}
  .color-dot:hover{transform:scale(1.25) !important}

  /* Scrollbar */
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-thumb{background:#d4c5a8;border-radius:2px}
  ::-webkit-scrollbar-track{background:transparent}

  /* Mobile */
  @media (max-width: 768px) {
    .composer-modal{max-height:80dvh !important;padding:12px 14px calc(env(safe-area-inset-bottom, 0px) + 16px) !important}
    .avatar-grid,.hair-grid{grid-template-columns:repeat(2,1fr) !important;max-height:280px !important}
    .preset-grid{grid-template-columns:repeat(2,1fr) !important;max-height:240px !important}
    .avatar-grid pre,.hair-grid pre{font-size:8.5px !important;height:110px !important}
    .preset-grid pre{font-size:8px !important;height:80px !important}
    .workspace-textarea{height:170px !important}
    .hint-text{white-space:normal !important;max-width:80vw !important}
  }
  @media (max-width: 380px) {
    .composer-modal{max-height:78dvh !important}
    .avatar-grid,.hair-grid{max-height:240px !important}
  }
`}</style>

      {/* Welcome sticky note - first visit only */}
      {showWelcome&&loaded&&(
        <div style={{position:"absolute",inset:0,background:"rgba(244,237,224,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,padding:20,backdropFilter:"blur(2px)"}}>
          <div className="fade-in" style={{background:"#fefcf7",padding:"40px 36px 32px",maxWidth:340,width:"100%",border:"1.5px solid #1a1614",boxShadow:"6px 6px 0 #1a1614",transform:"rotate(-1.5deg)",fontFamily:"'Courier New',monospace",position:"relative"}}>
            <div style={{fontSize:14,color:"#1a1614",marginBottom:16,letterSpacing:0.5,lineHeight:1.4,fontWeight:"bold"}}>
              welcome to creative canvas.
            </div>
            <div style={{fontSize:13,color:"#1a1614",lineHeight:1.7,marginBottom:24,fontStyle:"italic"}}>
              leave a mark — a note, a message, a doodle.<br/>
              for the world. or just for me.
            </div>
            <button onClick={dismissWelcome}
              className="btn-hover"
              style={{padding:"8px 18px",borderRadius:3,border:"1.5px solid #1a1614",background:"#8b3a2f",color:"#fefcf7",fontFamily:"'Courier New',monospace",fontWeight:"bold",fontSize:12,cursor:"pointer",letterSpacing:1,boxShadow:"3px 3px 0 #1a1614",transition:"all 0.15s"}}>
              enter →
            </button>
            <div style={{position:"absolute",bottom:-22,right:-4,fontSize:9,color:"#a8967a",fontStyle:"italic",letterSpacing:0.3}}>
              — kept by zee
            </div>
          </div>
        </div>
      )}

      {/* CANVAS */}
      <div ref={cvsRef}
        style={{position:"absolute",inset:0,background:"#f4ede0",cursor:placing?"crosshair":isDragging?"grabbing":"grab",touchAction:"none"}}
        onMouseDown={onCvsMD} onMouseMove={onCvsMM} onMouseUp={onCvsMU} onMouseLeave={onCvsMU}
        onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={()=>{lt.current=null; pinchDist.current=null;}}
        onClick={placeOnCanvas}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#c4b598 1px,transparent 1px)",backgroundSize:"30px 30px",opacity:0.5,pointerEvents:"none"}}/>
        <div style={{position:"absolute",left:0,top:0,transform:`translate(${pan.x}px,${pan.y}px) scale(${scl})`,transformOrigin:"0 0",width:1,height:1}}>
          {posts.map(p=>{
            const isOwn = p.session_id === sessionId;
            const clickable = isOwn || admin;
            const isDraggable = clickable && stampMenu?.stamp.id === p.id;
            return (
              <pre key={p.id}
                className={(popped===p.id?"pop ":"") + (isOwn?"own-stamp":"")}
                onClick={clickable ? (e)=>onStampClick(p,e) : undefined}
                onMouseDown={isDraggable ? (e)=>onStampDragStart(p,e) : undefined}
                style={{...postBase, position:"absolute", left:p.x, top:p.y, color:p.color, cursor:isDraggable?"move":clickable?"pointer":"default", pointerEvents:clickable?"auto":"none"}}>
                {p.content}
              </pre>
            );
          })}
        </div>
        {placing&&pending&&(
          <pre className="ghost" style={{...postBase, position:"absolute", left:ghost.x, top:ghost.y, fontSize:14*scl, color:pending.color, pointerEvents:"none"}}>
            {pending.content}
          </pre>
        )}
      </div>

      {/* Empty state */}
      {loaded&&posts.length===0&&!open&&!placing&&(
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
          <pre style={{margin:0,textAlign:"center",color:"#a8967a",fontSize:13,lineHeight:2.2}}>{`  +  +  +\n\nthe canvas is empty\n\nbe the first to leave a mark`}</pre>
        </div>
      )}

      {/* First-visit hint */}
      {hint&&!placing&&loaded&&!showWelcome&&(
        <div className="hint-text" style={{position:"absolute",bottom:"calc(env(safe-area-inset-bottom, 0px) + 160px)",left:"50%",transform:"translateX(-50%)",fontSize:10,color:"#a8967a",animation:"fd 5s ease forwards",pointerEvents:"none",textAlign:"center",maxWidth:"90vw",lineHeight:1.5}}>
          drag or scroll to pan · ctrl+scroll to zoom · tap your own stamps to edit
        </div>
      )}

      {/* Stamped toast */}
      {toast&&(
        <div className="toast" style={{position:"absolute",top:"calc(env(safe-area-inset-top, 0px) + 60px)",left:"50%",transform:"translateX(-50%)",background:"#1a1614",color:"#fefcf7",padding:"8px 18px",borderRadius:3,fontSize:12,fontFamily:"'Courier New',monospace",letterSpacing:1,zIndex:25,boxShadow:"3px 3px 0 #8b3a2f",pointerEvents:"none"}}>
          {toast}
        </div>
      )}

      {/* Placing banner */}
      {placing&&(
        <div style={{position:"absolute",top:"calc(env(safe-area-inset-top, 0px) + 16px)",left:"50%",transform:"translateX(-50%)",background:"rgba(254,252,247,0.96)",border:"1.5px solid #d4c5a8",borderRadius:6,padding:"9px 18px",display:"flex",gap:14,alignItems:"center",fontSize:11,color:"#1a1614",boxShadow:"0 2px 12px rgba(26,22,20,0.1)",backdropFilter:"blur(10px)",zIndex:20,maxWidth:"90vw"}}>
          <span>click anywhere to place your mark</span>
          <button onClick={()=>{setPlacing(false);setPending(null);setOpen(true);}} style={{background:"none",border:"none",cursor:"pointer",color:"#a8967a",fontSize:13,padding:0,lineHeight:1,flexShrink:0}}>✕</button>
        </div>
      )}

      {/* Admin indicator */}
      {admin&&!open&&(
        <div style={{position:"absolute",top:"calc(env(safe-area-inset-top, 0px) + 14px)",right:14,fontSize:10,color:"#8b3a2f",background:"#fefcf7",padding:"4px 10px",borderRadius:4,border:"1.5px solid #8b3a2f",letterSpacing:1,zIndex:15}}>
          + admin mode
        </div>
      )}

      {/* Stamp menu */}
      {stampMenu&&(
        <div style={{position:"absolute",left:stampMenu.x,top:stampMenu.y,background:"#fefcf7",border:"1.5px solid #1a1614",borderRadius:4,padding:5,boxShadow:"3px 3px 0 #1a1614",zIndex:30,display:"flex",flexDirection:"column",gap:2,minWidth:96}}>
          {stampMenu.isOwn&&(
            <>
              <button onClick={editStamp} style={menuBtn}>✎ edit</button>
              <button onClick={duplicateStamp} style={menuBtn}>⎘ duplicate</button>
            </>
          )}
          <button onClick={deleteStamp} style={{...menuBtn,color:"#8b3a2f"}}>✕ delete</button>
          <button onClick={()=>setStampMenu(null)} style={{...menuBtn,color:"#a8967a"}}>cancel</button>
        </div>
      )}

      {/* Admin password prompt */}
      {pwPrompt&&(
        <div style={{position:"absolute",top:"30%",left:"50%",transform:"translateX(-50%)",background:"#fefcf7",border:"1.5px solid #1a1614",borderRadius:4,padding:"16px 18px",boxShadow:"4px 4px 0 #1a1614",zIndex:40,minWidth:240}}
             className={pwErr?"shake":""}>
          <div style={{fontSize:11,color:"#1a1614",marginBottom:8,letterSpacing:1}}>+ enter admin password</div>
          <input type="password" value={pwInput} autoFocus
            onChange={e=>setPwInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter")checkPw();}}
            style={{width:"100%",padding:"7px 10px",borderRadius:3,border:pwErr?"1.5px solid #8b3a2f":"1.5px solid #d4c5a8",fontFamily:"'Courier New',monospace",fontSize:12,background:"#fefcf7",boxSizing:"border-box",outline:"none",color:"#1a1614"}}/>
          <div style={{display:"flex",gap:6,marginTop:10,justifyContent:"flex-end"}}>
            <button onClick={()=>setPwPrompt(false)} style={{...menuBtn,color:"#a8967a"}}>cancel</button>
            <button onClick={checkPw} style={{padding:"6px 14px",borderRadius:3,border:"1.5px solid #1a1614",background:"#8b3a2f",color:"#fefcf7",fontWeight:"bold",fontSize:11,cursor:"pointer",fontFamily:"inherit",boxShadow:"2px 2px 0 #1a1614"}}>enter</button>
          </div>
        </div>
      )}

      {/* Zoom controls */}
      {!open&&!showWelcome&&(
        <div style={{position:"absolute",bottom:"calc(env(safe-area-inset-bottom, 0px) + 90px)",right:18,display:"flex",flexDirection:"column",gap:5,zIndex:10}}>
          {[
            ...(posts.filter(p=>p.session_id===sessionId).length>0 ? [{l:"✦",f:()=>{
              const mine = posts.filter(p=>p.session_id===sessionId);
              // Center on the most recent stamp from this session
              const latest = mine[mine.length - 1];
              const size = getStampSize(latest.content);
              setPan({
                x: window.innerWidth/2 - Number(latest.x) - size.width/2,
                y: window.innerHeight/2 - Number(latest.y) - size.height/2
              });
              setScl(1);
            }}] : []),
            {l:"+",f:()=>setScl(s=>Math.min(s*1.2,7))},
            {l:"−",f:()=>setScl(s=>Math.max(s*0.8,0.1))},
            {l:"⌂",f:()=>{setPan({x:window.innerWidth/2, y:window.innerHeight/2});setScl(1);}}
          ].map(b=>(
            <button key={b.l} onClick={b.f}
  data-tooltip={b.l==="✦"?"find my mark":b.l==="⌂"?"home":b.l==="+"?"zoom in":"zoom out"}
  className="btn-hover"
          ))}
        </div>
      )}

      {/* Counter - top left, simple */}
      {posts.length>0&&!open&&(
        <div 
          onClick={handleCounterTap}
          style={{position:"absolute",top:"calc(env(safe-area-inset-top, 0px) + 16px)",left:18,fontSize:11,color:"#1a1614",letterSpacing:0.5,cursor:"default",fontFamily:"'Courier New',monospace",zIndex:5}}>
          {posts.length} mark{posts.length!==1?"s":""}
        </div>
      )}

      {/* Leave a mark CTA */}
      {!open&&!placing&&!showWelcome&&(
        <button onClick={()=>{setOpen(true); setEditingId(null);}}
          className="btn-hover"
          style={{...btnHoverStyle,position:"absolute",bottom:"calc(env(safe-area-inset-bottom, 0px) + 32px)",left:"50%",transform:"translateX(-50%)",padding:"11px 26px",borderRadius:4,border:"1.5px solid #1a1614",background:"#8b3a2f",color:"#fefcf7",fontFamily:"'Courier New',monospace",fontWeight:"bold",fontSize:13,cursor:"pointer",letterSpacing:1.5,boxShadow:"3px 3px 0 #1a1614",whiteSpace:"nowrap",zIndex:10}}>
          + leave a mark
        </button>
      )}

      {/* COMPOSER */}
      {open&&(
<div className="up composer-modal" style={{position:"fixed",bottom:0,left:16,right:16,width:"auto",maxWidth:480,background:"#fefcf7",borderRadius:"8px 8px 0 0",boxShadow:"-3px 0 0 #1a1614, 3px 0 0 #1a1614, 0 -3px 0 #1a1614",padding:"14px 16px calc(env(safe-area-inset-bottom, 0px) + 22px)",border:"1.5px solid #1a1614",borderBottom:"none",zIndex:20,maxHeight:"85dvh",display:"flex",flexDirection:"column"}}>
          {/* Tab bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{display:"flex",border:"1.5px solid #1a1614",borderRadius:3,overflow:"hidden"}}>
              {[["avatar","avatar"],["preset","preset"],["text","text"]].map(([t,lbl])=>(
                <button key={t} onClick={()=>{setTab(t); if(t!=="text") setEditingId(null);}} style={{padding:"6px 14px",border:"none",background:tab===t?"#1a1614":"transparent",color:tab===t?"#fefcf7":"#1a1614",fontFamily:"'Courier New',monospace",fontSize:11,cursor:"pointer",fontWeight:tab===t?"bold":"normal",letterSpacing:0.5,transition:"background 0.15s ease, color 0.15s ease"}}>{lbl}</button><button key={t} onClick={()=>{setTab(t); if(t!=="text") setEditingId(null);}} style={{padding:"6px 14px",border:"none",background:tab===t?"#1a1614":"transparent",color:tab===t?"#fefcf7":"#1a1614",fontFamily:"'Courier New',monospace",fontSize:11,cursor:"pointer",fontWeight:tab===t?"bold":"normal",letterSpacing:0.5,transition:"background 0.15s ease, color 0.15s ease"}}>{lbl}</button>
              ))}
            </div>
<button onClick={()=>{setOpen(false); setEditingId(null);}} className="close-btn" style={{background:"none",border:"none",cursor:"pointer",color:"#1a1614",fontSize:14,padding:0,lineHeight:1}}>✕</button>          </div>

          {/* SCROLLABLE CONTENT */}
          <div style={{flex:1,overflowY:"auto",minHeight:0,marginRight:-4,paddingRight:4}}>

          {/* AVATAR TAB - WIZARD */}
          {tab==="avatar" && (
            <>
              <div style={{fontSize:11,color:"#1a1614",letterSpacing:0.3,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"'Courier New',monospace"}}>
                <span>
                  {step===1 && "pick a face"}
                  {step===2 && "pick your hair"}
                  {step===3 && "make it yours"}
                </span>
                <span style={{color:"#a8967a",fontSize:14,letterSpacing:2}}>
                  {face?.complete ? (
                    <>{step===1?"●":"○"} {step===3?"●":"○"}</>
                  ) : (
                    <>{step===1?"●":"○"} {step===2?"●":"○"} {step===3?"●":"○"}</>
                  )}
                </span>
              </div>

              {/* STEP 1: face grid */}
              {step===1 && (
                <div className="avatar-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,maxHeight:330,overflowY:"auto",paddingRight:3,paddingBottom:3}}>
                  {FACES.map(f=>(
                    <button key={f.id} onClick={()=>selectFace(f)}
                      style={{padding:"6px 4px",borderRadius:3,border:face?.id===f.id?"2px solid #8b3a2f":"1.5px solid #d4c5a8",background:face?.id===f.id?"#fefcf7":"#faf5e8",cursor:"pointer",textAlign:"center",overflow:"hidden"}}>
                      <pre style={{margin:0,fontSize:6.5,lineHeight:1.35,color:face?.id===f.id?"#1a1614":"#5a4a3a",fontFamily:"'Courier New',monospace",whiteSpace:"pre",height:78,overflow:"hidden"}}>{f.art}</pre>
                      <div style={{fontSize:8,color:face?.id===f.id?"#8b3a2f":"#a8967a",marginTop:3,fontFamily:"'Courier New',monospace",letterSpacing:0.3}}>{f.name}{f.complete?" ●":""}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 2: hair grid */}
              {step===2 && (
                <div className="hair-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,maxHeight:330,overflowY:"auto",paddingRight:3,paddingBottom:3}}>
                  {HAIRS.map(h=>{
                    const previewArt = combineHF(h, face || FACES[6], "");
                    return (
                      <button key={h.id} onClick={()=>selectHair(h)}
                        style={{padding:"6px 4px",borderRadius:3,border:hair?.id===h.id?"2px solid #8b3a2f":"1.5px solid #d4c5a8",background:hair?.id===h.id?"#fefcf7":"#faf5e8",cursor:"pointer",textAlign:"center",overflow:"hidden"}}>
                        <pre style={{margin:0,fontSize:6.5,lineHeight:1.35,color:hair?.id===h.id?"#1a1614":"#5a4a3a",fontFamily:"'Courier New',monospace",whiteSpace:"pre",height:78,overflow:"hidden"}}>{previewArt}</pre>
                        <div style={{fontSize:8,color:hair?.id===h.id?"#8b3a2f":"#a8967a",marginTop:3,fontFamily:"'Courier New',monospace",letterSpacing:0.3}}>{h.name}</div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 3: editable workspace */}
              {step===3 && (
                <>
                  <textarea ref={wsRef} value={workspace} onChange={e=>setWorkspace(e.target.value)}
                    className="workspace-textarea"
                    style={{width:"100%",height:220,padding:"10px 12px",borderRadius:3,border:"1.5px solid #d4c5a8",fontFamily:"'Courier New',monospace",fontSize:12,background:"#faf5e8",boxSizing:"border-box",resize:"none",outline:"none",color:col,lineHeight:1.4,caretColor:col,whiteSpace:"pre"}}
                    placeholder="your character appears here · edit it freely"/>
                </>
              )}

              {/* Nav */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,gap:8,position:"sticky",bottom:0,background:"#fefcf7",paddingTop:8,paddingBottom:2,zIndex:5}}>
                <button onClick={backStep} disabled={step===1}
                  className={step>1?"btn-back":""}
                  style={{...btnHoverStyle,padding:"7px 14px",borderRadius:3,border:"1.5px solid #1a1614",background:step===1?"#ede4d0":"#fefcf7",color:step===1?"#c4b598":"#1a1614",cursor:step===1?"default":"pointer",fontFamily:"'Courier New',monospace",fontSize:11,boxShadow:step===1?"none":"2px 2px 0 #1a1614"}}>← back</button>
                {step<3 && (
                  <button onClick={nextStep} disabled={step===1?!face:!hair}
                    className={(step===1?face:hair)?"btn-hover":""}
                    style={{...btnHoverStyle,padding:"7px 18px",borderRadius:3,border:"1.5px solid #1a1614",background:(step===1?face:hair)?"#8b3a2f":"#ede4d0",color:(step===1?face:hair)?"#fefcf7":"#c4b598",cursor:(step===1?face:hair)?"pointer":"default",fontFamily:"'Courier New',monospace",fontWeight:"bold",fontSize:11,letterSpacing:0.5,boxShadow:(step===1?face:hair)?"2px 2px 0 #1a1614":"none"}}>next →</button>
                )}
                {step===3 && <div/>}
              </div>
            </>
          )}

          {/* PRESET TAB */}
          {tab==="preset" && (
            <>
              <div style={{background:"#faf5e8",borderRadius:3,padding:"12px 10px",marginBottom:12,minHeight:140,display:"flex",alignItems:"center",justifyContent:"center",border:"1.5px solid #d4c5a8"}}>
                <pre style={{margin:0,fontSize:11,lineHeight:1.4,color:col,fontFamily:"'Courier New',monospace",whiteSpace:"pre"}}>
                  {preset ? preset.art + (presetText.trim()?"\n"+presetText.trim():"") : "pick a preset below"}
                </pre>
              </div>
              <div className="preset-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,maxHeight:200,overflowY:"auto",paddingRight:3,paddingBottom:3}}>
                {PRESETS.map((p,i)=>(
                  <button key={i} onClick={()=>setPreset(p)}
                    style={{padding:"6px 4px",borderRadius:3,border:preset?.name===p.name?"2px solid #8b3a2f":"1.5px solid #d4c5a8",background:preset?.name===p.name?"#fefcf7":"#faf5e8",cursor:"pointer",textAlign:"center",overflow:"hidden"}}>
                    <pre style={{margin:0,fontSize:6,lineHeight:1.35,color:preset?.name===p.name?"#1a1614":"#5a4a3a",fontFamily:"'Courier New',monospace",whiteSpace:"pre",height:62,overflow:"hidden"}}>{p.art}</pre>
                    <div style={{fontSize:8,color:preset?.name===p.name?"#8b3a2f":"#a8967a",marginTop:3,fontFamily:"'Courier New',monospace",letterSpacing:0.3}}>{p.name}</div>
                  </button>
                ))}
              </div>
              <input value={presetText} onChange={e=>setPresetText(e.target.value)}
                placeholder="add a name or message below..."
                style={{width:"100%",marginTop:10,padding:"8px 10px",borderRadius:3,border:"1.5px solid #d4c5a8",fontFamily:"'Courier New',monospace",fontSize:12,background:"#faf5e8",boxSizing:"border-box",outline:"none",color:"#1a1614"}}/>
            </>
          )}

          {/* TEXT TAB */}
          {tab==="text" && (
            <>
              {isEditing && (
                <div style={{fontSize:10,color:"#8b3a2f",marginBottom:6,letterSpacing:0.5}}>✎ editing your stamp</div>
              )}
              <textarea ref={taRef} value={freeText} onChange={e=>setFreeText(e.target.value)} autoFocus
                style={{width:"100%",height:200,padding:"10px 12px",borderRadius:3,border:"1.5px solid #d4c5a8",fontFamily:"'Courier New',monospace",fontSize:13,background:"#faf5e8",boxSizing:"border-box",resize:"none",outline:"none",color:col,lineHeight:1.5,caretColor:col,whiteSpace:"pre"}}
                placeholder={"paste, type, or haiku\n\nfeel free to make it yours."}/>
              <div style={{marginTop:10}}>
                <div style={{fontSize:10,color:"#a8967a",letterSpacing:0.3,marginBottom:5,fontFamily:"'Courier New',monospace",fontStyle:"italic"}}>little decorations</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {ORNS.map((o,i)=>(
                    <button key={i} onClick={()=>{
                      const ta=taRef.current; if(!ta){ setFreeText(t=>t+o); return; }
                      const s=ta.selectionStart, e=ta.selectionEnd;
                      setFreeText(freeText.slice(0,s)+o+freeText.slice(e));
                      requestAnimationFrame(()=>{ ta.focus(); ta.selectionStart=ta.selectionEnd=s+o.length; });
                    }} style={{padding:"3px 8px",borderRadius:3,border:"1.5px solid #d4c5a8",background:"#faf5e8",cursor:"pointer",fontFamily:"'Courier New',monospace",fontSize:13,color:"#1a1614",minWidth:24}}>{o}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* End scrollable content */}
          </div>

          {/* Footer */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14,paddingTop:10,borderTop:"1.5px solid #d4c5a8",flexShrink:0}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {COLS.map(c=>(
  <button key={c} onClick={()=>setCol(c)} className="color-dot" style={{width:20,height:20,borderRadius:"50%",background:c,cursor:"pointer",border:col===c?"2px solid #1a1614":"1.5px solid #d4c5a8",padding:0}}/>
              ))}
            </div>
            <button onClick={stampOrUpdate} disabled={!canStamp}
              className={canStamp?"btn-hover":""}
              style={{...btnHoverStyle,padding:"9px 22px",borderRadius:3,border:"1.5px solid #1a1614",background:canStamp?"#8b3a2f":"#ede4d0",color:canStamp?"#fefcf7":"#c4b598",fontFamily:"'Courier New',monospace",fontWeight:"bold",fontSize:12,cursor:canStamp?"pointer":"default",letterSpacing:0.8,boxShadow:canStamp?"2px 2px 0 #1a1614":"none"}}>
              {isEditing?"update ✓":"stamp it →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const menuBtn = { padding:"5px 10px", borderRadius:3, border:"none", background:"transparent", cursor:"pointer", color:"#1a1614", fontFamily:"'Courier New',monospace", fontSize:11, textAlign:"left", letterSpacing:0.3 };
