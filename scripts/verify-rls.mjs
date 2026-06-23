import { createClient } from '@supabase/supabase-js';
const sb = createClient('https://kztekmzvvolqmgypbbya.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dGVrbXp2dm9scW1neXBiYnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjEzODksImV4cCI6MjA5NDgzNzM4OX0.VwMf8gHSaW7gb47QQ_nhzI3kQ81SOGCJ1rvRh5UTRGY');

// 1. READ (should still work — public read)
const { data: rows, count, error: selErr } = await sb.from('stamps').select('*',{count:'exact'}).limit(1);
console.log('1) READ  :', selErr ? 'FAILED — '+selErr.message : 'OK (count='+count+')');
const sample = rows && rows[0];

// 2. UPDATE an existing row to its SAME value (non-destructive). Should be BLOCKED now.
if (sample) {
  const { data: upd, error: updErr } = await sb.from('stamps').update({ color: sample.color }).eq('id', sample.id).select();
  console.log('2) UPDATE:', updErr ? 'BLOCKED ✓ ('+updErr.message+')' : (upd.length ? 'ALLOWED ⚠️ STILL OPEN' : 'BLOCKED ✓ (0 rows changed)'));
}

// 3. INSERT a far-off test row. Should still work (public insert) so visitors can leave marks.
const testId = 'rls-verify-'+Date.now();
const { data: ins, error: insErr } = await sb.from('stamps').insert({ id:testId, content:'__rls_verify__', color:'#FF55FF', x:999999, y:999999, ts:Date.now(), session_id:'rls-verify' }).select();
console.log('3) INSERT:', insErr ? 'BLOCKED ⚠️ ('+insErr.message+') — visitors cannot leave marks!' : 'ALLOWED ✓ (leaving a mark still works)');

// 4. DELETE that test row. Should be BLOCKED now.
const { data: del, error: delErr } = await sb.from('stamps').delete().eq('id', testId).select();
console.log('4) DELETE:', delErr ? 'BLOCKED ✓ ('+delErr.message+')' : (del.length ? 'ALLOWED ⚠️ STILL OPEN (test row removed)' : 'BLOCKED ✓ (0 rows deleted — test row remains)'));

const { count: c2 } = await sb.from('stamps').select('id',{count:'exact'});
console.log('final row count:', c2, '(includes a test row at 999999,999999 if delete is blocked)');
