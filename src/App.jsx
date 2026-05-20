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

  const [sessionId] = useState(() => `s-${Date.now()}-${Math.random().toString(36).slice(2,8)}`);
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
  const [editingId, setEditingId] = useState(null);
  const [stampMenu, setStampMenu] = useState(null);

  // Stamp dragging state
  const [draggingStamp, setDraggingStamp] = useState(null);
  const stampDragStart = useRef({x:0, y:0, stampX:0, stampY:0});

  // Triple-tap tracking for admin trigger
  const tapTimerRef = useRef(null);
  const tapCountRef = useRef(0);

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
        // On first load, center view on existing stamps so they're visible on all devices
        if (!loaded) {
          if (data.length > 0) {
            const avgX = data.reduce((s, p) => s + Number(p.x), 0) / data.length;
            const avgY = data.reduce((s, p) => s + Number(p.y), 0) / data.length;
            setPan({
              x: window.innerWidth / 2 - avgX,
              y: window.innerHeight / 2 - avgY - 100
            });
          } else {
            // No stamps yet - center origin at viewport center
            setPan({
              x: window.innerWidth / 2,
              y: window.innerHeight / 2
            });
          }
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

  function onTS(e){ if(e.touches.length===1) lt.current={x:e.touches[0].clientX,y:e.touches[0].clientY}; }
  function onTM(e){
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

  async function placeOnCanvas(e) {
    if(stampMenu){ setStampMenu(null); return; }
    if(!placing||!pending) return;
    const rect=cvsRef.current.getBoundingClientRect();
    const x=(e.clientX-rect.left-panR.current.x)/sclR.current;
    const y=(e.clientY-rect.top-panR.current.y)/sclR.current;
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
      setTimeout(()=>setPopped(null),600);
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
  const postBase = { margin:0, padding:0, whiteSpace:"pre", fontFamily:"'Courier New',monospace", fontSize:14, lineHeight:1.4, userSelect:"none", transformOrigin:"top left" };

  // Button hover styles
  const btnHoverStyle = {
    transition: "all 0.2s ease",
  };

  return (
    <div style={{width:"100vw",height:"100vh",position:"relative",overflow:"hidden",fontFamily:"'Courier New',monospace"}}>
      <style>{`
        @keyframes pop{0%{transform:scale(0.2);opacity:0}55%{transform:scale(1.09)}100%{transform:scale(1);opacity:1}}
        @keyframes up{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fd{0%,70%{opacity:1}100%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:0.35}50%{opacity:0.75}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
        .pop{animation:pop 0.38s cubic-bezier(.34,1.56,.64,1) forwards}
        .up{animation:up 0.22s ease-out}
        .ghost{animation:pulse 1s ease-in-out infinite}
        .shake{animation:shake 0.3s}
        .own-stamp:hover{outline:1.5px dashed #c8a8d8;outline-offset:3px;border-radius:4px}
        .btn-hover:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(150,80,170,0.32)}
        .btn-back:hover{background:#f5f0ff !important}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#e0d0e8;border-radius:3px}
        ::-webkit-scrollbar-track{background:transparent}
        
        /* Mobile responsive fixes */
        @media (max-width: 768px) {
          .composer-modal {
            max-height: 80dvh !important;
            padding: 12px 14px calc(env(safe-area-inset-bottom, 0px) + 16px) !important;
          }
          .avatar-grid, .preset-grid, .hair-grid {
            max-height: 220px !important;
          }
          .workspace-textarea {
            height: 170px !important;
          }
          .hint-text {
            white-space: normal !important;
            max-width: 80vw !important;
          }
        }
        
        /* Smaller phones */
        @media (max-width: 380px) {
          .composer-modal {
            max-height: 78dvh !important;
          }
          .avatar-grid, .preset-grid, .hair-grid {
            max-height: 180px !important;
          }
        }
      `}</style>

      {/* CANVAS */}
      <div ref={cvsRef}
        style={{position:"absolute",inset:0,background:"#f9f5f0",cursor:placing?"crosshair":isDragging?"grabbing":"grab",touchAction:"none"}}
        onMouseDown={onCvsMD} onMouseMove={onCvsMM} onMouseUp={onCvsMU} onMouseLeave={onCvsMU}
        onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={()=>{lt.current=null;}}
        onClick={placeOnCanvas}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,#d4b8df 1px,transparent 1px)",backgroundSize:"30px 30px",opacity:0.45,pointerEvents:"none"}}/>
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
          <pre style={{margin:0,textAlign:"center",color:"#d4b8d4",fontSize:13,lineHeight:2.2}}>{`  ✦  ✦  ✦\n\nthe garden is empty\n\nbe the first to leave a mark`}</pre>
        </div>
      )}

      {/* First-visit hint */}
      {hint&&!placing&&loaded&&(
        <div className="hint-text" style={{position:"absolute",bottom:"calc(env(safe-area-inset-bottom, 0px) + 160px)",left:"50%",transform:"translateX(-50%)",fontSize:10,color:"#c8a8c8",animation:"fd 5s ease forwards",pointerEvents:"none",textAlign:"center",maxWidth:"90vw",lineHeight:1.5}}>
          drag or scroll to pan · ctrl+scroll to zoom · tap your own stamps to edit
        </div>
      )}

      {/* Placing banner */}
      {placing&&(
        <div style={{position:"absolute",top:"calc(env(safe-area-inset-top, 0px) + 16px)",left:"50%",transform:"translateX(-50%)",background:"rgba(255,252,249,0.96)",border:"1.5px solid #e0cce8",borderRadius:10,padding:"9px 18px",display:"flex",gap:14,alignItems:"center",fontSize:11,color:"#8a5c9e",boxShadow:"0 4px 24px rgba(120,80,140,0.12)",backdropFilter:"blur(10px)",zIndex:20,maxWidth:"90vw"}}>
          <span>click anywhere to place your mark</span>
          <button onClick={()=>{setPlacing(false);setPending(null);setOpen(true);}} style={{background:"none",border:"none",cursor:"pointer",color:"#c0a0c0",fontSize:13,padding:0,lineHeight:1,flexShrink:0}}>✕</button>
        </div>
      )}

      {/* Admin indicator */}
      {admin&&!open&&(
        <div style={{position:"absolute",top:"calc(env(safe-area-inset-top, 0px) + 14px)",right:14,fontSize:10,color:"#c87090",background:"rgba(255,240,245,0.9)",padding:"4px 10px",borderRadius:12,border:"1.5px solid #f0c0d0",letterSpacing:1,zIndex:15}}>
          ✦ admin mode
        </div>
      )}

      {/* Stamp menu */}
      {stampMenu&&(
        <div style={{position:"absolute",left:stampMenu.x,top:stampMenu.y,background:"rgba(255,252,249,0.98)",border:"1.5px solid #e0cce8",borderRadius:10,padding:5,boxShadow:"0 4px 20px rgba(120,80,140,0.18)",backdropFilter:"blur(10px)",zIndex:30,display:"flex",flexDirection:"column",gap:2,minWidth:96}}>
          {stampMenu.isOwn&&(
            <>
              <button onClick={editStamp} style={menuBtn}>✎ edit</button>
              <button onClick={duplicateStamp} style={menuBtn}>⎘ duplicate</button>
            </>
          )}
          <button onClick={deleteStamp} style={{...menuBtn,color:"#c87090"}}>✕ delete</button>
          <button onClick={()=>setStampMenu(null)} style={{...menuBtn,color:"#bbb"}}>cancel</button>
        </div>
      )}

      {/* Admin password prompt */}
      {pwPrompt&&(
        <div style={{position:"absolute",top:"30%",left:"50%",transform:"translateX(-50%)",background:"rgba(255,252,249,0.98)",border:"1.5px solid #e0cce8",borderRadius:12,padding:"16px 18px",boxShadow:"0 6px 30px rgba(120,80,140,0.2)",backdropFilter:"blur(14px)",zIndex:40,minWidth:240}}
             className={pwErr?"shake":""}>
          <div style={{fontSize:11,color:"#8a5c9e",marginBottom:8,letterSpacing:1}}>✦ enter admin password</div>
          <input type="password" value={pwInput} autoFocus
            onChange={e=>setPwInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter")checkPw();}}
            style={{width:"100%",padding:"7px 10px",borderRadius:8,border:pwErr?"1.5px solid #c87090":"1.5px solid #e0cce8",fontFamily:"'Courier New',monospace",fontSize:12,background:"#fffaff",boxSizing:"border-box",outline:"none",color:"#555"}}/>
          <div style={{display:"flex",gap:6,marginTop:10,justifyContent:"flex-end"}}>
            <button onClick={()=>setPwPrompt(false)} style={{...menuBtn,color:"#bbb"}}>cancel</button>
            <button onClick={checkPw} style={{padding:"6px 14px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#a060c0,#d090b0)",color:"#fff",fontWeight:"bold",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>enter</button>
          </div>
        </div>
      )}

      {/* Zoom controls */}
      {!open&&(
        <div style={{position:"absolute",bottom:"calc(env(safe-area-inset-bottom, 0px) + 90px)",right:18,display:"flex",flexDirection:"column",gap:5,zIndex:10}}>
          {[{l:"+",f:()=>setScl(s=>Math.min(s*1.2,7))},{l:"−",f:()=>setScl(s=>Math.max(s*0.8,0.1))},{l:"⌂",f:()=>{
            if(posts.length>0){
              const avgX = posts.reduce((s, p) => s + Number(p.x), 0) / posts.length;
              const avgY = posts.reduce((s, p) => s + Number(p.y), 0) / posts.length;
              setPan({x:window.innerWidth/2-avgX, y:window.innerHeight/2-avgY-100});
            } else {
              setPan({x:window.innerWidth/2, y:window.innerHeight/2});
            }
            setScl(1);
          }}].map(b=>(
            <button key={b.l} onClick={b.f} style={{width:32,height:32,borderRadius:8,border:"1.5px solid #e0d0e8",background:"rgba(255,252,249,0.95)",cursor:"pointer",fontSize:b.l==="⌂"?12:16,color:"#9b7e9b",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)",boxShadow:"0 2px 8px rgba(120,80,140,0.12)"}}>{b.l}</button>
          ))}
        </div>
      )}

      {/* Counter - with triple-tap handler */}
      {posts.length>0&&!open&&(
        <div 
          onClick={handleCounterTap}
          style={{position:"absolute",top:"calc(env(safe-area-inset-top, 0px) + 14px)",left:"50%",transform:"translateX(-50%)",fontSize:10,color:"#c8a8c8",letterSpacing:1,whiteSpace:"nowrap",cursor:"default"}}>
          {posts.length} mark{posts.length!==1?"s":""}
        </div>
      )}

      {/* Leave a mark CTA */}
      {!open&&!placing&&(
        <button onClick={()=>{setOpen(true); setEditingId(null);}}
          className="btn-hover"
          style={{...btnHoverStyle,position:"absolute",bottom:"calc(env(safe-area-inset-bottom, 0px) + 90px)",left:"50%",transform:"translateX(-50%)",padding:"11px 26px",borderRadius:28,border:"none",background:"linear-gradient(135deg,#a060c0,#d090b0)",color:"#fff",fontFamily:"'Courier New',monospace",fontWeight:"bold",fontSize:13,cursor:"pointer",letterSpacing:1,boxShadow:"0 4px 24px rgba(150,80,170,0.28)",whiteSpace:"nowrap",zIndex:10}}>
          ✦ leave a mark
        </button>
      )}

      {/* COMPOSER */}
      {open&&(
        <div className="up composer-modal" style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:480,maxWidth:"100vw",background:"rgba(255,252,249,0.98)",borderRadius:"18px 18px 0 0",boxShadow:"0 -6px 40px rgba(120,80,140,0.15)",padding:"14px 16px calc(env(safe-area-inset-bottom, 0px) + 22px)",backdropFilter:"blur(14px)",border:"1.5px solid #eedde8",borderBottom:"none",zIndex:20,maxHeight:"85dvh",display:"flex",flexDirection:"column"}}>

          {/* Tab bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{display:"flex",border:"1.5px solid #e0cce8",borderRadius:9,overflow:"hidden"}}>
              {[["avatar","✦ avatar"],["preset","✿ preset"],["text","✎ text"]].map(([t,lbl])=>(
                <button key={t} onClick={()=>{setTab(t); if(t!=="text") setEditingId(null);}} style={{padding:"6px 14px",border:"none",background:tab===t?"#f0e0ff":"transparent",color:tab===t?"#8a5c9e":"#bbb",fontFamily:"inherit",fontSize:11,cursor:"pointer",fontWeight:tab===t?"bold":"normal"}}>{lbl}</button>
              ))}
            </div>
            <button onClick={()=>{setOpen(false); setEditingId(null);}} style={{background:"none",border:"none",cursor:"pointer",color:"#c8a8c0",fontSize:14,padding:0,lineHeight:1}}>✕</button>
          </div>

          <div style={{fontSize:9,color:"#c8a8c8",letterSpacing:0.6,marginBottom:10,textAlign:"center",fontFamily:"sans-serif"}}>
            feel free to edit and show your creativity ✦
          </div>

          {/* SCROLLABLE CONTENT */}
          <div style={{flex:1,overflowY:"auto",minHeight:0,marginRight:-4,paddingRight:4}}>

          {/* AVATAR TAB - WIZARD */}
          {tab==="avatar" && (
            <>
              <div style={{fontSize:9,color:"#b898c8",fontWeight:"bold",letterSpacing:1.2,textTransform:"uppercase",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>
                  {step===1 && "step 1 — choose your face"}
                  {step===2 && "step 2 — choose your hair"}
                  {step===3 && "step 3 — make it yours"}
                </span>
                <span style={{color:"#d4b8d4"}}>
                  {step}/{face?.complete?2:3}
                </span>
              </div>

              {/* STEP 1: face grid */}
              {step===1 && (
                <div className="avatar-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,maxHeight:330,overflowY:"auto",paddingRight:3,paddingBottom:3}}>
                  {FACES.map(f=>(
                    <button key={f.id} onClick={()=>selectFace(f)}
                      style={{padding:"6px 4px",borderRadius:8,border:face?.id===f.id?"1.5px solid #c084d4":"1.5px solid #e8d8e8",background:face?.id===f.id?"#f5e8ff":"#fffaff",cursor:"pointer",textAlign:"center",overflow:"hidden"}}>
                      <pre style={{margin:0,fontSize:6.5,lineHeight:1.35,color:face?.id===f.id?"#8a5c9e":"#999",fontFamily:"'Courier New',monospace",whiteSpace:"pre",height:78,overflow:"hidden"}}>{f.art}</pre>
                      <div style={{fontSize:8,color:face?.id===f.id?"#a070c0":"#bbb",marginTop:3,fontFamily:"sans-serif",letterSpacing:0.3}}>{f.name}{f.complete?" ●":""}</div>
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
                        style={{padding:"6px 4px",borderRadius:8,border:hair?.id===h.id?"1.5px solid #c084d4":"1.5px solid #e8d8e8",background:hair?.id===h.id?"#f5e8ff":"#fffaff",cursor:"pointer",textAlign:"center",overflow:"hidden"}}>
                        <pre style={{margin:0,fontSize:6.5,lineHeight:1.35,color:hair?.id===h.id?"#8a5c9e":"#999",fontFamily:"'Courier New',monospace",whiteSpace:"pre",height:78,overflow:"hidden"}}>{previewArt}</pre>
                        <div style={{fontSize:8,color:hair?.id===h.id?"#a070c0":"#bbb",marginTop:3,fontFamily:"sans-serif",letterSpacing:0.3}}>{h.name}</div>
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
                    style={{width:"100%",height:220,padding:"10px 12px",borderRadius:10,border:"1.5px solid #e0cce8",fontFamily:"'Courier New',monospace",fontSize:12,background:"#fffaff",boxSizing:"border-box",resize:"none",outline:"none",color:col,lineHeight:1.4,caretColor:col,whiteSpace:"pre"}}
                    placeholder="your character appears here · edit it freely"/>
                </>
              )}

              {/* Nav */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,gap:8,position:"sticky",bottom:0,background:"rgba(255,252,249,0.98)",paddingTop:8,paddingBottom:2,zIndex:5}}>
                <button onClick={backStep} disabled={step===1}
                  className={step>1?"btn-back":""}
                  style={{...btnHoverStyle,padding:"7px 14px",borderRadius:8,border:"1.5px solid #e0cce8",background:step===1?"#f5f0f5":"#fffaff",color:step===1?"#ddd":"#9b7e9b",cursor:step===1?"default":"pointer",fontFamily:"inherit",fontSize:11}}>← back</button>
                {step<3 && (
                  <button onClick={nextStep} disabled={step===1?!face:!hair}
                    className={(step===1?face:hair)?"btn-hover":""}
                    style={{...btnHoverStyle,padding:"7px 18px",borderRadius:8,border:"none",background:(step===1?face:hair)?"linear-gradient(135deg,#a060c0,#d090b0)":"#e8e0ee",color:(step===1?face:hair)?"#fff":"#ccc",cursor:(step===1?face:hair)?"pointer":"default",fontFamily:"inherit",fontWeight:"bold",fontSize:11,letterSpacing:0.5}}>next →</button>
                )}
                {step===3 && <div/>}
              </div>
            </>
          )}

          {/* PRESET TAB */}
          {tab==="preset" && (
            <>
              <div style={{background:"#fff8ff",borderRadius:10,padding:"12px 10px",marginBottom:12,minHeight:140,display:"flex",alignItems:"center",justifyContent:"center",border:"1.5px solid #f0e0f8"}}>
                <pre style={{margin:0,fontSize:11,lineHeight:1.4,color:col,fontFamily:"'Courier New',monospace",whiteSpace:"pre"}}>
                  {preset ? preset.art + (presetText.trim()?"\n"+presetText.trim():"") : "pick a preset below"}
                </pre>
              </div>
              <div className="preset-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,maxHeight:200,overflowY:"auto",paddingRight:3,paddingBottom:3}}>
                {PRESETS.map((p,i)=>(
                  <button key={i} onClick={()=>setPreset(p)}
                    style={{padding:"6px 4px",borderRadius:8,border:preset?.name===p.name?"1.5px solid #c084d4":"1.5px solid #e8d8e8",background:preset?.name===p.name?"#f5e8ff":"#fffaff",cursor:"pointer",textAlign:"center",overflow:"hidden"}}>
                    <pre style={{margin:0,fontSize:6,lineHeight:1.35,color:preset?.name===p.name?"#8a5c9e":"#999",fontFamily:"'Courier New',monospace",whiteSpace:"pre",height:62,overflow:"hidden"}}>{p.art}</pre>
                    <div style={{fontSize:8,color:preset?.name===p.name?"#a070c0":"#bbb",marginTop:3,fontFamily:"sans-serif",letterSpacing:0.3}}>{p.name}</div>
                  </button>
                ))}
              </div>
              <input value={presetText} onChange={e=>setPresetText(e.target.value)}
                placeholder="add a name or message below..."
                style={{width:"100%",marginTop:10,padding:"8px 10px",borderRadius:8,border:"1.5px solid #e8d5e8",fontFamily:"'Courier New',monospace",fontSize:12,background:"#fffaff",boxSizing:"border-box",outline:"none",color:"#888"}}/>
            </>
          )}

          {/* TEXT TAB */}
          {tab==="text" && (
            <>
              {isEditing && (
                <div style={{fontSize:10,color:"#a060c0",marginBottom:6,letterSpacing:0.5}}>✎ editing your stamp</div>
              )}
              <textarea ref={taRef} value={freeText} onChange={e=>setFreeText(e.target.value)} autoFocus
                style={{width:"100%",height:200,padding:"10px 12px",borderRadius:10,border:"1.5px solid #e0cce8",fontFamily:"'Courier New',monospace",fontSize:13,background:"#fffaff",boxSizing:"border-box",resize:"none",outline:"none",color:col,lineHeight:1.5,caretColor:col,whiteSpace:"pre"}}
                placeholder={"paste type or haiku\n\nfeel free to make it yours."}/>
              <div style={{marginTop:10}}>
                <div style={{fontSize:9,color:"#b898c8",fontWeight:"bold",letterSpacing:1.2,textTransform:"uppercase",marginBottom:5}}>ornaments · click to insert</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {ORNS.map((o,i)=>(
                    <button key={i} onClick={()=>{
                      const ta=taRef.current; if(!ta){ setFreeText(t=>t+o); return; }
                      const s=ta.selectionStart, e=ta.selectionEnd;
                      setFreeText(freeText.slice(0,s)+o+freeText.slice(e));
                      requestAnimationFrame(()=>{ ta.focus(); ta.selectionStart=ta.selectionEnd=s+o.length; });
                    }} style={{padding:"3px 8px",borderRadius:5,border:"1px solid #e8d5e8",background:"#fffaff",cursor:"pointer",fontFamily:"'Courier New',monospace",fontSize:13,color:"#666",minWidth:24}}>{o}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* End scrollable content */}
          </div>

          {/* Footer */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14,paddingTop:10,borderTop:"1px solid #f0e0f0",flexShrink:0}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {COLS.map(c=>(
                <button key={c} onClick={()=>setCol(c)} style={{width:20,height:20,borderRadius:"50%",background:c,cursor:"pointer",border:"none",boxShadow:col===c?`0 0 0 2px white,0 0 0 3.5px ${c}`:"none",transition:"box-shadow 0.15s"}}/>
              ))}
            </div>
            <button onClick={stampOrUpdate} disabled={!canStamp}
              className={canStamp?"btn-hover":""}
              style={{...btnHoverStyle,padding:"9px 22px",borderRadius:10,border:"none",background:canStamp?"linear-gradient(135deg,#a060c0,#d090b0)":"#e8e0ee",color:canStamp?"#fff":"#ccc",fontFamily:"inherit",fontWeight:"bold",fontSize:12,cursor:canStamp?"pointer":"default",letterSpacing:0.8}}>
              {isEditing?"update ✓":"stamp it →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const menuBtn = { padding:"5px 10px", borderRadius:6, border:"none", background:"transparent", cursor:"pointer", color:"#8a5c9e", fontFamily:"'Courier New',monospace", fontSize:11, textAlign:"left", letterSpacing:0.3 };
