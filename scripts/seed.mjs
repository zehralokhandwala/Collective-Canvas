import { createClient } from '@supabase/supabase-js';

// Same anon credentials the app uses (insert is allowed under existing RLS).
const sb = createClient(
  'https://kztekmzvvolqmgypbbya.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dGVrbXp2dm9scW1neXBiYnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjEzODksImV4cCI6MjA5NDgzNzM4OX0.VwMf8gHSaW7gb47QQ_nhzI3kQ81SOGCJ1rvRh5UTRGY'
);

const COMMIT = process.argv.includes('--commit');

// ----- palette: app brights + a few muted tones to match the organic existing set
const BRIGHT = ['#55FF55','#55FFFF','#FFFF55','#FF5555','#FF55FF','#5577FF','#FFFFFF','#FFAA00'];
const MUTED  = ['#5A88C0','#B05898','#9B6BC4','#C07040','#6A9E50','#7A6050'];
const PALETTE = [...BRIGHT, ...BRIGHT, ...MUTED]; // bias toward bright, signature pink/magenta included

// ----- content pools ---------------------------------------------------------
const TEXTS = [
  "hello from\nbangalore, 2026",
  "first time here :)\nwon't be the last",
  "i was here\n— a stranger",
  "long live the BBS",
  "wash your hands\n& be kind",
  "to whoever finds this:\nyou're doing great.",
  "~ greetings\nfrom the void ~",
  "found my corner.\nit's cozy here.",
  "press F\nto pay respects",
  "made it. finally.",
  "the cake is a lie",
  "old pond —\na frog jumps in.\nthe sound of water",
  "be excellent\nto each other",
  "wanderer,\nrest here awhile",
  "ascii or it\ndidn't happen",
  "// TODO:\nchange the world",
  "hi mom!",
  "we were all here\nat the same time,\nonce.",
  "— mira ✦",
  "01001000\n01001001",
  "knock knock\nanybody home?",
  "good vibes only\nʕ•ᴥ•ʔ",
  "still up at 3am\nworth it",
  "leave a light on\nfor the next one",
];

const DECOS = [
  " .  *  .  ✦\n*  .  ✧  .\n .  ★  .  *",
  "   \\ | /\n  -- ☀ --\n   / | \\",
  "  ♪ ♫\n ♫   ♪\n♪   ♫",
  " /\\_/\\\n( o.o )\n > ^ <",
  "  _,._\n / `' \\\n|  o o |\n '-.-' \n  | |",
  "  .-.\n (o o)\n |   |\n  \\ /\n   ~",
  "  ( (\n   ) )\n .____.\n |    |]\n  \\__/",
  "   _\n  (_)\n  \\|/\n   |\n \\\\|//",
  "  .--.\n (    )\n(  ♥   )\n (    )\n  '--'",
  "    /\\\n   /  \\\n  /    \\\n   ||||",
  "·  ˚  ·  *  ·\n  ·  ✦  ˚  ·\n*  ·  ˚  ·  ✧",
  "~~~~~~~~\n  ><((°>\n~~~~~~~~",
];

// small avatars (pulled from the app's face/preset vocabulary)
const AVATARS = [
  "      ! -   - !      \n     (. .   . .)     \n      |   u   |      \n      !  `-'  !      \n       \\.___./       \n       |     |       ",
  "      ! ~   ~ !      \n     (. o   o .)     \n      |   L   |      \n      !  '_`  !      \n       !.___.!       \n      /'     `\\      ",
  "       _.---._       \n     .(((|||))).     \n    (((//'~`\\\\)))    \n    ))! ~   ~ !((    \n   (((. o   o .)))   \n    )))   L   (((    \n   ((( \\ `-' / )))   \n    )))!`---'!(((    \n       |     |       ",
  " /\\_/\\\n( -.- )\n c(\")(\")",
  "  ___\n /o o\\\n(  >  )\n \\___/",
];

const SCENES = [
  "             O  o\n          _\\_   o\n>('>   \\\\/  o\\ .\n       //\\___=\n          ''",
  "       .\n      \":\"\n    ___:____     |\"\\/\"|\n  ,'        `.    \\  /\n  |  O        \\___/  |\n~^~^~^~^~^~^~^~^~^~^~^~",
  "       ':.\n         []_____\n        /\\      \\\n    ___/  \\__/\\__\\__\n---/\\___\\ |''''''|__\\---\n   ||'''| |''||''|''|",
];

// ----- cluster plan: dense neighbourhoods with gaps between -------------------
const CLUSTERS = [
  { name:'town square', cx: 120,  cy: 80,    maxR: 360, mix:{text:5, deco:3, avatar:1, scene:0} },
  { name:'east side',   cx: 1150, cy: -320,  maxR: 320, mix:{text:4, deco:2, avatar:1, scene:0} },
  { name:'north end',   cx: 320,  cy: -1820, maxR: 360, mix:{text:4, deco:2, avatar:1, scene:1} },
  { name:'west corner', cx: -720, cy: 500,   maxR: 300, mix:{text:3, deco:2, avatar:1, scene:0} },
];

// ----- collision helpers (ported from App.jsx) -------------------------------
function getStampSize(content){
  const lines = (content||'').split('\n');
  const width = Math.max(...lines.map(l=>l.length), 1) * 8.5;
  const height = lines.length * 20;
  return { width, height };
}
function overlap(a, b, pad=30){
  const sa = getStampSize(a.content), sb = getStampSize(b.content);
  return !(a.x+sa.width+pad < b.x || b.x+sb.width+pad < a.x ||
           a.y+sa.height+pad < b.y || b.y+sb.height+pad < a.y);
}

// ----- fake sessions (some regulars place several marks) ---------------------
function mkSession(){ return `s-${1779_000_000_000 + Math.floor(Math.random()*900_000_000)}-${Math.random().toString(36).slice(2,8)}`; }
const SESSIONS = Array.from({length:13}, mkSession);
const pick = arr => arr[Math.floor(Math.random()*arr.length)];

function placeInCluster(c, content, placed){
  for (let r = 40; r <= c.maxR + 200; r += 25){
    for (let attempt = 0; attempt < 14; attempt++){
      const ang = Math.random()*Math.PI*2;
      const rad = r * (0.5 + Math.random()*0.5);
      const x = c.cx + Math.cos(ang)*rad;
      const y = c.cy + Math.sin(ang)*rad;
      const cand = { x, y, content };
      if (!placed.some(p => overlap(cand, p))) return { x, y };
    }
  }
  return null;
}

async function main(){
  // existing stamps go into the collision set so we never overlap real marks
  const { data: existing, error } = await sb.from('stamps').select('id,x,y,content');
  if (error){ console.error('load failed:', error); process.exit(1); }
  const placed = existing.map(p => ({ x:Number(p.x), y:Number(p.y), content:p.content }));
  console.log(`existing stamps: ${placed.length}`);

  // build the ordered content list per cluster from the mix
  const pools = { text:[...TEXTS], deco:[...DECOS], avatar:[...AVATARS], scene:[...SCENES] };
  const take = (kind) => pools[kind].length ? pools[kind].splice(Math.floor(Math.random()*pools[kind].length),1)[0] : pick({text:TEXTS,deco:DECOS,avatar:AVATARS,scene:SCENES}[kind]);

  const rows = [];
  // stagger created_at across the same window as existing activity (May 20 – Jun 19, 2026)
  const START = Date.parse('2026-05-21T00:00:00Z');
  const END   = Date.parse('2026-06-19T20:00:00Z');
  const times = [];

  for (const c of CLUSTERS){
    const items = [];
    for (const [kind, n] of Object.entries(c.mix))
      for (let i=0;i<n;i++) items.push(take(kind));
    // shuffle so kinds interleave within the neighbourhood
    items.sort(()=>Math.random()-0.5);

    // each cluster has 1-2 "regular" sessions plus occasional singletons
    const regulars = [pick(SESSIONS), pick(SESSIONS)];

    for (const content of items){
      const pos = placeInCluster(c, content, placed);
      if (!pos){ console.warn(`  skipped (no room) in ${c.name}`); continue; }
      placed.push({ ...pos, content });
      const session = Math.random() < 0.65 ? pick(regulars) : pick(SESSIONS);
      const t = START + Math.random()*(END-START);
      times.push(t);
      rows.push({
        id: `seed-${Math.floor(t)}-${Math.random().toString(36).slice(2,6)}`,
        content,
        color: pick(PALETTE),
        x: Math.round(pos.x*100)/100,
        y: Math.round(pos.y*100)/100,
        ts: Math.floor(t),
        session_id: session,
        created_at: new Date(t).toISOString(),
        _cluster: c.name,
      });
    }
  }

  // report
  const byCluster = {};
  rows.forEach(r => { byCluster[r._cluster] = (byCluster[r._cluster]||0)+1; });
  console.log('\nplanned new stamps:', rows.length);
  console.log('per neighbourhood:', JSON.stringify(byCluster));
  console.log('unique new sessions:', new Set(rows.map(r=>r.session_id)).size);
  console.log('total after seed:', placed.length, '\n');
  rows.forEach(r=>{
    const first = r.content.split('\n').find(l=>l.trim())||'';
    console.log(`  [${r._cluster.padEnd(11)}] (${String(Math.round(r.x)).padStart(5)},${String(Math.round(r.y)).padStart(6)}) ${r.color}  ${first.slice(0,26)}`);
  });

  if (!COMMIT){
    console.log('\nDRY RUN — nothing written. Re-run with --commit to insert.');
    return;
  }

  const insertRows = rows.map(({_cluster, ...r}) => r);
  const { error: insErr } = await sb.from('stamps').insert(insertRows);
  if (insErr){ console.error('\ninsert failed:', insErr); process.exit(1); }
  console.log(`\n✓ inserted ${insertRows.length} stamps.`);
}

main();
