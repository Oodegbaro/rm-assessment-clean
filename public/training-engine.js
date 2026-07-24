
const MODULE_TITLES = ['Why this matters now', 'Think, Plan, Engage', 'What an account plan actually is', 'Wallet share in practice', 'Mapping relationships', 'The opportunity pipeline', 'Using GenAI well', 'Call memos & client insights'];

async function completeTrainingAndGo(){
  try {
    await fetch('/api/training/complete', { method: 'POST' });
  } catch (e) {
    console.warn('Could not save training completion, proceeding anyway', e);
  }
  window.location.href = '/assessment';
}

function advanceModule(fromNum){
  document.getElementById('mod' + fromNum).style.display = 'none';
  const nextNum = fromNum + 1;
  if(nextNum <= 8){
    document.getElementById('mod' + nextNum).style.display = 'block';
    document.getElementById('modStatus').textContent = 'Module ' + nextNum + ' of 8 \u00b7 ' + MODULE_TITLES[nextNum-1];
    document.getElementById('overallFill').style.width = (nextNum/8*100) + '%';
  } else {
    document.getElementById('mod-final').style.display = 'block';
    document.getElementById('modStatus').textContent = 'All modules complete';
    document.getElementById('overallFill').style.width = '100%';
  }
  window.scrollTo(0,0);
}



(function(){
// ===== Module 1 =====

const CORRECT = {t1:"z1", t2:"z2", t3:"z3", t4:"z4"};
let placements = {};
document.querySelectorAll("#mod1 .tile").forEach(t => {
  t.addEventListener("dragstart", e => { e.dataTransfer.setData("text", t.dataset.id); });
});
function dropTile_m1(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text");
  const tile = document.querySelector('#mod1 [data-id="'+id+'"]');
  if(!tile) return;
  Object.keys(placements).forEach(z => { if(placements[z]===id) delete placements[z]; });
  placements[zone] = id;
  renderZones_m1();
}
function renderZones_m1(){
  document.querySelectorAll("#mod1 .zone").forEach(z => {
    const zoneName = z.dataset.zone;
    const label = z.dataset.label || z.textContent.split("\n")[0];
    z.classList.remove("correct","incorrect");
    const id = placements[zoneName];
    const baseLabel = ZONELABELS[zoneName];
    if(id){
      const tile = document.querySelector('#mod1 [data-id="'+id+'"]');
      z.innerHTML = baseLabel + '<div class="placedtile">'+tile.textContent+'</div>';
    } else {
      z.innerHTML = baseLabel;
    }
  });
  document.querySelectorAll("#mod1 .tile").forEach(t => {
    const placed = Object.values(placements).includes(t.dataset.id);
    t.classList.toggle("placed", placed);
  });
}
const ZONELABELS = {z1:"High value per client", z2:"Wallet is invisible", z3:"Decisions sit high up", z4:"Deals are episodic"};
function checkSort_m1(){
  const fb = document.getElementById("sortfeedback_m1");
  const continueBtn = document.getElementById("continueBtn_m1");
  let allCorrect = true;
  document.querySelectorAll("#mod1 .zone").forEach(z => {
    const zoneName = z.dataset.zone;
    const id = placements[zoneName];
    if(!id){ allCorrect = false; return; }
    const isCorrect = CORRECT[id] === zoneName;
    z.classList.add(isCorrect ? "correct" : "incorrect");
    if(!isCorrect) allCorrect = false;
  });
  let revealHtml = "";
  if(!allCorrect){
    revealHtml = "<div style='margin-top:8px;'><b>Correct pairing:</b><br>" + Object.keys(CORRECT).map(tid => {
      const tile = document.querySelector('#mod1 [data-id="'+tid+'"]');
      return ZONELABELS[CORRECT[tid]] + " → " + tile.textContent;
    }).join("<br>") + "</div>";
  }
  fb.className = "sortfeedback show " + (allCorrect ? "good" : "bad");
  fb.innerHTML = (allCorrect
    ? "Exactly right — each reason has a distinct implication for how an RM should operate."
    : "Not quite — here's how they actually match up:") + revealHtml;
  continueBtn.disabled = false;
  continueBtn.textContent = "Continue to practice questions →";
}
function resetSort_m1(){
  placements = {};
  renderZones_m1();
  document.getElementById("sortfeedback_m1").className = "sortfeedback_m1";
}
let answeredPQ = {};
function answerPQ_m1(btn, isCorrect, qid){
  const group = btn.parentElement.querySelectorAll(".pqopt");
  group.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? "correct" : "incorrect");
  btn.closest('.pq').querySelector('.pqexplain').classList.add('show');
  answeredPQ[qid] = true;
  if(answeredPQ.q1 && answeredPQ.q2){
    document.getElementById("finishBtn_m1").disabled = false;
  }
}
function goTo_m1(screen){
  document.getElementById("screen-learn_m1").classList.toggle("active", screen==="learn");
  document.getElementById("screen-check_m1").classList.toggle("active", screen==="check");
  document.getElementById("screen-done_m1").classList.toggle("active", screen==="done");
  window.scrollTo(0,0);
}
renderZones_m1();

  window.dropTile_m1 = dropTile_m1;
  window.checkSort_m1 = checkSort_m1;
  window.resetSort_m1 = resetSort_m1;
  window.answerPQ_m1 = answerPQ_m1;
  window.goTo_m1 = goTo_m1;
})();



(function(){
// ===== Module 2 =====

const CORRECT = {t1:"Think", t2:"Plan", t3:"Engage"};
let placements = {};

document.querySelectorAll("#mod2 .tile").forEach(t => {
  t.addEventListener("dragstart", e => { e.dataTransfer.setData("text", t.dataset.id); });
});

function dropTile_m2(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text");
  const tile = document.querySelector('#mod2 [data-id="'+id+'"]');
  if(!tile) return;
  Object.keys(placements).forEach(z => { if(placements[z]===id) delete placements[z]; });
  placements[zone] = id;
  renderZones_m2();
}

function renderZones_m2(){
  document.querySelectorAll("#mod2 .zone").forEach(z => {
    const zoneName = z.dataset.zone;
    z.classList.remove("correct","incorrect");
    const id = placements[zoneName];
    if(id){
      const tile = document.querySelector('#mod2 [data-id="'+id+'"]');
      z.innerHTML = zoneName + '<div class="placedtile">'+tile.textContent+'</div>';
    } else {
      z.innerHTML = zoneName;
    }
  });
  document.querySelectorAll("#mod2 .tile").forEach(t => {
    const placed = Object.values(placements).includes(t.dataset.id);
    t.classList.toggle("placed", placed);
  });
}

function checkSort_m2(){
  const fb = document.getElementById("sortfeedback_m2");
  const continueBtn = document.getElementById("continueBtn_m2");
  let allCorrect = true;
  document.querySelectorAll("#mod2 .zone").forEach(z => {
    const zoneName = z.dataset.zone;
    const id = placements[zoneName];
    if(!id){ allCorrect = false; return; }
    const isCorrect = CORRECT[id] === zoneName;
    z.classList.add(isCorrect ? "correct" : "incorrect");
    if(!isCorrect) allCorrect = false;
  });
  let revealHtml = "";
  if(!allCorrect){
    revealHtml = "<div style='margin-top:8px;'><b>Correct pairing:</b><br>" + Object.keys(CORRECT).map(tid => {
      const tile = document.querySelector('#mod2 [data-id="'+tid+'"]');
      return CORRECT[tid] + " → " + tile.textContent;
    }).join("<br>") + "</div>";
  }
  fb.className = "sortfeedback show " + (allCorrect ? "good" : "bad");
  fb.innerHTML = (allCorrect
    ? "That's it exactly — diagnosis, then organizing, then the client-facing moment."
    : "Not quite — here's how they actually sort:") + revealHtml;
  continueBtn.disabled = false;
  continueBtn.textContent = "Continue to practice questions →";
}

function resetSort_m2(){
  placements = {};
  renderZones_m2();
  document.getElementById("sortfeedback_m2").className = "sortfeedback_m2";
}

let answeredPQ = {};
function answerPQ_m2(btn, isCorrect, qid){
  const group = btn.parentElement.querySelectorAll(".pqopt");
  group.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? "correct" : "incorrect");
  btn.closest('.pq').querySelector('.pqexplain').classList.add('show');
  answeredPQ[qid] = true;
  if(answeredPQ.q1 && answeredPQ.q2){
    document.getElementById("finishBtn_m2").disabled = false;
  }
}

function goTo_m2(screen){
  document.getElementById("screen-learn_m2").classList.toggle("active", screen==="learn");
  document.getElementById("screen-check_m2").classList.toggle("active", screen==="check");
  document.getElementById("screen-done_m2").classList.toggle("active", screen==="done");
  window.scrollTo(0,0);
}

  window.dropTile_m2 = dropTile_m2;
  window.checkSort_m2 = checkSort_m2;
  window.resetSort_m2 = resetSort_m2;
  window.answerPQ_m2 = answerPQ_m2;
  window.goTo_m2 = goTo_m2;
})();



(function(){
// ===== Module 3 =====

let answeredPQ = {};
function answerPQ_m3(btn, isCorrect, qid){
  const group = btn.parentElement.querySelectorAll(".pqopt");
  group.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? "correct" : "incorrect");
  btn.closest('.pq').querySelector('.pqexplain').classList.add('show');
  answeredPQ[qid] = true;
  if(answeredPQ.q1 && answeredPQ.q2){
    document.getElementById("finishBtn_m3").disabled = false;
  }
}
function goTo_m3(screen){
  document.getElementById("screen-learn_m3").classList.toggle("active", screen==="learn");
  document.getElementById("screen-check_m3").classList.toggle("active", screen==="check");
  document.getElementById("screen-done_m3").classList.toggle("active", screen==="done");
  window.scrollTo(0,0);
}

const CORRECT = {t1:"z1", t2:"z2", t3:"z3", t4:"z4"};
const ZONELABELS = {z1:"Company overview", z2:"Financial performance", z3:"Relationship mapping", z4:"Opportunity pipeline"};
let placements = {};
document.querySelectorAll("#mod3 .tile").forEach(t => {
  t.addEventListener("dragstart", e => { e.dataTransfer.setData("text", t.dataset.id); });
});
function dropTile_m3(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text");
  const tile = document.querySelector('#mod3 [data-id="'+id+'"]');
  if(!tile) return;
  Object.keys(placements).forEach(z => { if(placements[z]===id) delete placements[z]; });
  placements[zone] = id;
  renderZones_m3();
}
function renderZones_m3(){
  document.querySelectorAll("#mod3 .zone").forEach(z => {
    const zoneName = z.dataset.zone;
    z.classList.remove("correct","incorrect");
    const id = placements[zoneName];
    const baseLabel = ZONELABELS[zoneName];
    if(id){
      const tile = document.querySelector('#mod3 [data-id="'+id+'"]');
      z.innerHTML = baseLabel + '<div class="placedtile">'+tile.textContent+'</div>';
    } else { z.innerHTML = baseLabel; }
  });
  document.querySelectorAll("#mod3 .tile").forEach(t => {
    t.classList.toggle("placed", Object.values(placements).includes(t.dataset.id));
  });
}
function checkSort_m3(){
  const fb = document.getElementById("sortfeedback_m3");
  const continueBtn = document.getElementById("continueBtn_m3");
  let allCorrect = true;
  document.querySelectorAll("#mod3 .zone").forEach(z => {
    const id = placements[z.dataset.zone];
    if(!id){ allCorrect = false; return; }
    const ok = CORRECT[id] === z.dataset.zone;
    z.classList.add(ok ? "correct" : "incorrect");
    if(!ok) allCorrect = false;
  });
  let revealHtml = "";
  if(!allCorrect){
    revealHtml = "<div style='margin-top:8px;'><b>Correct pairing:</b><br>" + Object.keys(CORRECT).map(tid => {
      const tile = document.querySelector('#mod3 [data-id="'+tid+'"]');
      return ZONELABELS[CORRECT[tid]] + " \u2192 " + tile.textContent;
    }).join("<br>") + "</div>";
  }
  fb.className = "sortfeedback show " + (allCorrect ? "good" : "bad");
  fb.innerHTML = (allCorrect ? "Exactly right." : "Not quite \u2014 here's how they actually match up:") + revealHtml;
  continueBtn.disabled = false;
  continueBtn.textContent = "Continue to practice questions \u2192";
}
function resetSort_m3(){ placements = {}; renderZones_m3(); document.getElementById("sortfeedback_m3").className = "sortfeedback_m3"; }
renderZones_m3();


  window.dropTile_m3 = dropTile_m3;
  window.checkSort_m3 = checkSort_m3;
  window.resetSort_m3 = resetSort_m3;
  window.answerPQ_m3 = answerPQ_m3;
  window.goTo_m3 = goTo_m3;
})();



(function(){
// ===== Module 4 =====

let answeredPQ = {};
function answerPQ_m4(btn, isCorrect, qid){
  const group = btn.parentElement.querySelectorAll(".pqopt");
  group.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? "correct" : "incorrect");
  btn.closest('.pq').querySelector('.pqexplain').classList.add('show');
  answeredPQ[qid] = true;
  if(answeredPQ.q1 && answeredPQ.q2){
    document.getElementById("finishBtn_m4").disabled = false;
  }
}
function goTo_m4(screen){
  document.getElementById("screen-learn_m4").classList.toggle("active", screen==="learn");
  document.getElementById("screen-check_m4").classList.toggle("active", screen==="check");
  document.getElementById("screen-done_m4").classList.toggle("active", screen==="done");
  window.scrollTo(0,0);
}

const CORRECT_ANSWER = "t1";
let placements = {};
document.querySelectorAll("#mod4 .tile").forEach(t => {
  t.addEventListener("dragstart", e => { e.dataTransfer.setData("text", t.dataset.id); });
});
function dropTile_m4(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text");
  placements[zone] = id;
  renderZones_m4();
}
function renderZones_m4(){
  document.querySelectorAll("#mod4 .zone").forEach(z => {
    z.classList.remove("correct","incorrect");
    const id = placements[z.dataset.zone];
    if(id){
      const tile = document.querySelector('#mod4 [data-id="'+id+'"]');
      z.innerHTML = 'Your answer<div class="placedtile">'+tile.textContent+'</div>';
    } else { z.innerHTML = "Your answer"; }
  });
  document.querySelectorAll("#mod4 .tile").forEach(t => {
    t.classList.toggle("placed", Object.values(placements).includes(t.dataset.id));
  });
}
function checkSort_m4(){
  const fb = document.getElementById("sortfeedback_m4");
  const continueBtn = document.getElementById("continueBtn_m4");
  const id = placements["z1"];
  const ok = id === CORRECT_ANSWER;
  document.querySelector('#mod4 .zone[data-zone="z1"]').classList.add(ok ? "correct" : "incorrect");
  const correctTile = document.querySelector('#mod4 [data-id="'+CORRECT_ANSWER+'"]');
  fb.className = "sortfeedback show " + (ok ? "good" : "bad");
  fb.innerHTML = ok
    ? "Right \u2014 revenue pool = 3% of 400,000,000 = 12,000,000. Wallet share = 2,400,000 / 12,000,000 = 20%."
    : "Not quite \u2014 the correct answer is <b>" + correctTile.textContent + "</b>. Revenue pool = 3% of 400,000,000 = 12,000,000. Wallet share = 2,400,000 / 12,000,000 = 20%. Remember, wallet share is revenue divided by the pool, not by total revenue itself.";
  continueBtn.disabled = false;
  continueBtn.textContent = "Continue to practice questions \u2192";
}
function resetSort_m4(){ placements = {}; renderZones_m4(); document.getElementById("sortfeedback_m4").className = "sortfeedback_m4"; }
renderZones_m4();


  window.dropTile_m4 = dropTile_m4;
  window.checkSort_m4 = checkSort_m4;
  window.resetSort_m4 = resetSort_m4;
  window.answerPQ_m4 = answerPQ_m4;
  window.goTo_m4 = goTo_m4;
})();



(function(){
// ===== Module 5 =====

let answeredPQ = {};
function answerPQ_m5(btn, isCorrect, qid){
  const group = btn.parentElement.querySelectorAll(".pqopt");
  group.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? "correct" : "incorrect");
  btn.closest('.pq').querySelector('.pqexplain').classList.add('show');
  answeredPQ[qid] = true;
  if(answeredPQ.q1 && answeredPQ.q2){
    document.getElementById("finishBtn_m5").disabled = false;
  }
}
function goTo_m5(screen){
  document.getElementById("screen-learn_m5").classList.toggle("active", screen==="learn");
  document.getElementById("screen-check_m5").classList.toggle("active", screen==="check");
  document.getElementById("screen-done_m5").classList.toggle("active", screen==="done");
  window.scrollTo(0,0);
}

const CORRECT = {t1:"z1", t2:"z1", t3:"z2", t4:"z2"};
const RIGHT_ANSWER = {z1:"t2", z2:"t4"};
let placements = {};
document.querySelectorAll("#mod5 .tile").forEach(t => {
  t.addEventListener("dragstart", e => { e.dataTransfer.setData("text", t.dataset.id); });
});
function dropTile_m5(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text");
  placements[zone] = id;
  renderZones_m5();
}
const ZONELABELS = {z1:"Influence level", z2:"Sentiment"};
function renderZones_m5(){
  document.querySelectorAll("#mod5 .zone").forEach(z => {
    z.classList.remove("correct","incorrect");
    const id = placements[z.dataset.zone];
    const base = ZONELABELS[z.dataset.zone];
    if(id){
      const tile = document.querySelector('#mod5 [data-id="'+id+'"]');
      z.innerHTML = base + '<div class="placedtile">'+tile.textContent+'</div>';
    } else { z.innerHTML = base; }
  });
  document.querySelectorAll("#mod5 .tile").forEach(t => {
    t.classList.toggle("placed", Object.values(placements).includes(t.dataset.id));
  });
}
function checkSort_m5(){
  const fb = document.getElementById("sortfeedback_m5");
  const continueBtn = document.getElementById("continueBtn_m5");
  let allCorrect = true;
  Object.keys(RIGHT_ANSWER).forEach(zone => {
    const id = placements[zone];
    const ok = id === RIGHT_ANSWER[zone];
    document.querySelector('#mod5 .zone[data-zone="'+zone+'"]').classList.add(ok ? "correct" : "incorrect");
    if(!ok) allCorrect = false;
  });
  let revealHtml = "";
  if(!allCorrect){
    revealHtml = "<div style='margin-top:8px;'><b>Correct:</b><br>" + Object.keys(RIGHT_ANSWER).map(zone => {
      const tile = document.querySelector('#mod5 [data-id="'+RIGHT_ANSWER[zone]+'"]');
      return ZONELABELS[zone] + ": " + tile.textContent;
    }).join("<br>") + "</div>";
  }
  fb.className = "sortfeedback show " + (allCorrect ? "good" : "bad");
  fb.innerHTML = (allCorrect
    ? "Right \u2014 Gatekeeper, since he executes without deciding, and Neutral, since there's no stated preference either way."
    : "Not quite \u2014 here's the correct read:") + revealHtml;
  continueBtn.disabled = false;
  continueBtn.textContent = "Continue to practice questions \u2192";
}
function resetSort_m5(){ placements = {}; renderZones_m5(); document.getElementById("sortfeedback_m5").className = "sortfeedback_m5"; }
renderZones_m5();


  window.dropTile_m5 = dropTile_m5;
  window.checkSort_m5 = checkSort_m5;
  window.resetSort_m5 = resetSort_m5;
  window.answerPQ_m5 = answerPQ_m5;
  window.goTo_m5 = goTo_m5;
})();



(function(){
// ===== Module 6 =====

let answeredPQ = {};
function answerPQ_m6(btn, isCorrect, qid){
  const group = btn.parentElement.querySelectorAll(".pqopt");
  group.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? "correct" : "incorrect");
  btn.closest('.pq').querySelector('.pqexplain').classList.add('show');
  answeredPQ[qid] = true;
  if(answeredPQ.q1 && answeredPQ.q2){
    document.getElementById("finishBtn_m6").disabled = false;
  }
}
function goTo_m6(screen){
  document.getElementById("screen-learn_m6").classList.toggle("active", screen==="learn");
  document.getElementById("screen-check_m6").classList.toggle("active", screen==="check");
  document.getElementById("screen-done_m6").classList.toggle("active", screen==="done");
  window.scrollTo(0,0);
}

const CORRECT_ANSWER = "t1";
let placements = {};
document.querySelectorAll("#mod6 .tile").forEach(t => {
  t.addEventListener("dragstart", e => { e.dataTransfer.setData("text", t.dataset.id); });
});
function dropTile_m6(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text");
  placements[zone] = id;
  renderZones_m6();
}
function renderZones_m6(){
  document.querySelectorAll("#mod6 .zone").forEach(z => {
    z.classList.remove("correct","incorrect");
    const id = placements[z.dataset.zone];
    if(id){
      const tile = document.querySelector('#mod6 [data-id="'+id+'"]');
      z.innerHTML = 'Your answer<div class="placedtile">'+tile.textContent+'</div>';
    } else { z.innerHTML = "Your answer"; }
  });
  document.querySelectorAll("#mod6 .tile").forEach(t => {
    t.classList.toggle("placed", Object.values(placements).includes(t.dataset.id));
  });
}
function checkSort_m6(){
  const fb = document.getElementById("sortfeedback_m6");
  const continueBtn = document.getElementById("continueBtn_m6");
  const id = placements["z1"];
  const ok = id === CORRECT_ANSWER;
  document.querySelector('#mod6 .zone[data-zone="z1"]').classList.add(ok ? "correct" : "incorrect");
  const correctTile = document.querySelector('#mod6 [data-id="'+CORRECT_ANSWER+'"]');
  fb.className = "sortfeedback show " + (ok ? "good" : "bad");
  fb.innerHTML = ok
    ? "Right \u2014 60,000,000 \u00d7 1.5% \u00d7 50% = GHS 450,000."
    : "Not quite \u2014 the correct answer is <b>" + correctTile.textContent + "</b>. It's volume \u00d7 spread \u00d7 probability, all three multiplied together: 60,000,000 \u00d7 1.5% \u00d7 50% = GHS 450,000.";
  continueBtn.disabled = false;
  continueBtn.textContent = "Continue to practice questions \u2192";
}
function resetSort_m6(){ placements = {}; renderZones_m6(); document.getElementById("sortfeedback_m6").className = "sortfeedback_m6"; }
renderZones_m6();


  window.dropTile_m6 = dropTile_m6;
  window.checkSort_m6 = checkSort_m6;
  window.resetSort_m6 = resetSort_m6;
  window.answerPQ_m6 = answerPQ_m6;
  window.goTo_m6 = goTo_m6;
})();



(function(){
// ===== Module 7 =====

function goTo_m7(id){
  const screenIds = {s1:'screen-s1_m7', s2:'screen-s2_m7', s3:'screen-s3_m7', s4:'screen-s4_m7', done:'screen-done_m7'};
  Object.keys(screenIds).forEach(k => document.getElementById(screenIds[k]).classList.toggle('active', k===id));
  window.scrollTo(0,0);
}

// ---- Stage 1 ----
let place1 = null;
document.querySelectorAll('#tilepool1_m7 .tile').forEach(t => t.addEventListener('dragstart', e => e.dataTransfer.setData('text', t.dataset.id)));
function dropTile1_m7(e){
  e.preventDefault(); e.currentTarget.classList.remove('over');
  place1 = e.dataTransfer.getData('text');
  const tile = document.querySelector('#tilepool1_m7 [data-id="'+place1+'"]');
  e.currentTarget.innerHTML = 'Your answer<div class="placedtile">'+tile.textContent+'</div>';
  document.querySelectorAll('#tilepool1_m7 .tile').forEach(t => t.classList.toggle('placed', t.dataset.id===place1));
}
function checkStage1_m7(){
  const fb = document.getElementById('feedback1_m7');
  const ok = place1 === 'a4';
  document.querySelector('#screen-s1_m7 .zone').classList.add(ok?'correct':'incorrect');
  fb.className = 'sortfeedback show ' + (ok?'good':'bad');
  fb.innerHTML = ok ? 'Right \u2014 local decisions, but real sign-off sits with the parent abroad. That is Global/group.' : 'Not quite \u2014 the correct answer is <b>Global / group</b>. Local decisions are made day to day, but real sign-off authority sits with the parent abroad above a threshold.';
  document.getElementById('btn1_m7').disabled = false;
  document.getElementById('btn1_m7').textContent = 'Continue \u2192';
}
function resetStage1_m7(){ place1=null; document.querySelector('#screen-s1_m7 .zone').innerHTML='Your answer'; document.querySelector('#screen-s1_m7 .zone').classList.remove('correct','incorrect'); document.getElementById('feedback1_m7').className='sortfeedback'; document.querySelectorAll('#tilepool1_m7 .tile').forEach(t=>t.classList.remove('placed')); }

// ---- Stage 2 ----
const CORRECT2 = {t1:'S',t2:'C',t3:'O',t4:'P',t5:'E'};
let placements2 = {};
document.querySelectorAll('#tilepool2_m7 .tile').forEach(t => t.addEventListener('dragstart', e => e.dataTransfer.setData('text', t.dataset.id)));
function dropTile2_m7(e, zone){
  e.preventDefault(); e.currentTarget.classList.remove('over');
  const id = e.dataTransfer.getData('text');
  Object.keys(placements2).forEach(z => { if(placements2[z]===id) delete placements2[z]; });
  placements2[zone] = id;
  renderZones2_m7();
}
function renderZones2_m7(){
  document.querySelectorAll('#screen-s2_m7 .zone').forEach(z => {
    const zn = z.dataset.zone; z.classList.remove('correct','incorrect');
    const id = placements2[zn];
    if(id){ const tile = document.querySelector('#tilepool2_m7 [data-id="'+id+'"]'); z.innerHTML = zn + '<div class="placedtile">'+tile.textContent+'</div>'; }
    else { z.innerHTML = zn; }
  });
  document.querySelectorAll('#tilepool2_m7 .tile').forEach(t => t.classList.toggle('placed', Object.values(placements2).includes(t.dataset.id)));
}
function checkStage2_m7(){
  const fb = document.getElementById('feedback2_m7'); let allOk = true;
  document.querySelectorAll('#screen-s2_m7 .zone').forEach(z => {
    const id = placements2[z.dataset.zone];
    if(!id){ allOk=false; return; }
    const ok = CORRECT2[id]===z.dataset.zone;
    z.classList.add(ok?'correct':'incorrect');
    if(!ok) allOk=false;
  });
  let revealHtml = '';
  if(!allOk){
    revealHtml = "<div style='margin-top:8px;'><b>Correct:</b><br>" + Object.keys(CORRECT2).map(tid => {
      const tile = document.querySelector('#tilepool2_m7 [data-id="'+tid+'"]');
      return CORRECT2[tid] + ' = ' + tile.textContent;
    }).join("<br>") + "</div>";
  }
  fb.className = 'sortfeedback show ' + (allOk?'good':'bad');
  fb.innerHTML = (allOk ? 'Exactly right.' : "Not quite \u2014 here's the correct mapping:") + revealHtml;
  document.getElementById('btn2_m7').disabled = false;
  document.getElementById('btn2_m7').textContent = 'Continue \u2192';
}
function resetStage2_m7(){ placements2={}; renderZones2_m7(); document.getElementById('feedback2_m7').className='sortfeedback'; }
renderZones2_m7();

// ---- Stage 3 ----
let selected3 = false;
function selectPrompt_m7(which){
  if(selected3) return;
  selected3 = true;
  document.getElementById('pcard-good_m7').classList.add('reveal', which==='good' ? 'good' : 'good');
  document.getElementById('pcard-vague_m7').classList.add('reveal','bad');
  document.getElementById('pcard-risky_m7').classList.add('reveal','bad');
  document.getElementById('btn3_m7').disabled = false;
  document.getElementById('btn3_m7').textContent = 'Continue \u2192';
}

// ---- Stage 4 ----
async function evaluatePrompt_m7(){
  const promptText = document.getElementById('promptInput_m7').value.trim();
  if(!promptText) return;
  const btn = document.getElementById('evalBtn_m7');
  const loading = document.getElementById('loadingMsg_m7');
  btn.disabled = true; loading.style.display = 'block';
  document.getElementById('evalResult_m7').classList.remove('show');

  let evaluation = null;
  let demo = false;
  try{
    const res = await fetch('/api/training/evaluate-prompt', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({prompt: promptText})
    });
    if(!res.ok) throw new Error('not ok');
    const data = await res.json();
    evaluation = data.evaluation;
  } catch(e){
    demo = true;
    // Simulated response so this preview is viewable without a live backend.
    const hasArchetype = /private|local|public|listed|global|group|sector|soe/i.test(promptText);
    const hasSource = /financial|call memo|rm notes|source|document|holdings/i.test(promptText);
    const hasFormat = /section|format|confidence|table|length/i.test(promptText);
    const hasProof = /invent|evidence|flag|gap|unsupported/i.test(promptText);
    const hasEscalate = /validation|next step|next action|follow.?up|owner/i.test(promptText);
    const hasCompany = /overview|business model|ownership/i.test(promptText);
    const hasFinancial = /financ|revenue|wallet/i.test(promptText);
    const hasRel = /relationship|stakeholder|decision maker/i.test(promptText);
    const hasPriorities = /priorit/i.test(promptText);
    const hasPipeline = /pipeline|opportunit/i.test(promptText);
    evaluation = {
      scope: {source_pack:hasSource, client_archetype:hasArchetype, output_format:hasFormat, proof_and_gaps:hasProof, escalate_to_action:hasEscalate},
      sections: {company_overview:hasCompany, financial_performance:hasFinancial, relationships_and_risks:hasRel, strategic_priorities:hasPriorities, opportunity_pipeline:hasPipeline},
      strengths: ["(demo mode \u2014 simulated, not a real AI evaluation)"],
      gaps: ["Connect this to the live backend to get a real evaluation instead of this keyword-based simulation."],
      overall_verdict: "This is a simulated result for preview purposes \u2014 the real version calls an actual AI model."
    };
  }

  loading.style.display = 'none';
  renderEvaluation_m7(evaluation, demo);
  document.getElementById('btn4_m7').disabled = false;
  document.getElementById('btn4_m7').textContent = 'Continue \u2192';
  btn.disabled = false;
}

function renderEvaluation_m7(ev, demo){
  const scopeLabels = {source_pack:'Source pack', client_archetype:'Client archetype', output_format:'Output format', proof_and_gaps:'Proof and gaps', escalate_to_action:'Escalate to action'};
  const sectionLabels = {company_overview:'Company overview', financial_performance:'Financial performance', relationships_and_risks:'Relationships and risks', strategic_priorities:'Strategic priorities', opportunity_pipeline:'Opportunity pipeline'};

  let scopeHtml = '';
  Object.keys(scopeLabels).forEach(k => {
    const yes = ev.scope[k];
    scopeHtml += '<div class="checkitem '+(yes?'yes':'no')+'"><span class="ico">'+(yes?'\u2713':'\u2715')+'</span>'+scopeLabels[k]+'</div>';
  });
  document.getElementById('scopeChecklist_m7').innerHTML = scopeHtml;

  let sectionsHtml = '';
  Object.keys(sectionLabels).forEach(k => {
    const yes = ev.sections[k];
    sectionsHtml += '<div class="checkitem '+(yes?'yes':'no')+'"><span class="ico">'+(yes?'\u2713':'\u2715')+'</span>'+sectionLabels[k]+'</div>';
  });
  document.getElementById('sectionsChecklist_m7').innerHTML = sectionsHtml;

  const strengthsHtml = (ev.strengths||[]).map(s=>'<div>+ '+s+'</div>').join('');
  const gapsHtml = (ev.gaps||[]).map(s=>'<div>&minus; '+s+'</div>').join('');
  document.getElementById('verdictBox_m7').innerHTML =
    '<b>Verdict'+(demo?' <span class="demolabel">Demo mode</span>':'')+':</b> ' + ev.overall_verdict +
    '<div style="margin-top:8px;">' + strengthsHtml + gapsHtml + '</div>';

  document.getElementById('evalResult_m7').classList.add('show');
}

  window.dropTile1_m7 = dropTile1_m7;
  window.checkStage1_m7 = checkStage1_m7;
  window.resetStage1_m7 = resetStage1_m7;
  window.dropTile2_m7 = dropTile2_m7;
  window.checkStage2_m7 = checkStage2_m7;
  window.resetStage2_m7 = resetStage2_m7;
  window.selectPrompt_m7 = selectPrompt_m7;
  window.evaluatePrompt_m7 = evaluatePrompt_m7;
  window.goTo_m7 = goTo_m7;
})();



(function(){
// ===== Module 8 =====

let answeredPQ = {};
function answerPQ_m8(btn, isCorrect, qid){
  const group = btn.parentElement.querySelectorAll(".pqopt");
  group.forEach(b => b.disabled = true);
  btn.classList.add(isCorrect ? "correct" : "incorrect");
  btn.closest('.pq').querySelector('.pqexplain').classList.add('show');
  answeredPQ[qid] = true;
  if(answeredPQ.q1 && answeredPQ.q2){
    document.getElementById("finishBtn_m8").disabled = false;
  }
}
function goTo_m8(screen){
  document.getElementById("screen-learn_m8").classList.toggle("active", screen==="learn");
  document.getElementById("screen-check_m8").classList.toggle("active", screen==="check");
  document.getElementById("screen-done_m8").classList.toggle("active", screen==="done");
  window.scrollTo(0,0);
}

const CORRECT = {t1:"missing", t2:"missing", t3:"missing", t4:"present"};
let placements = {};
document.querySelectorAll("#mod8 .tile").forEach(t => {
  t.addEventListener("dragstart", e => { e.dataTransfer.setData("text", t.dataset.id); });
});
function dropTile_m8(e, zone){
  e.preventDefault();
  e.currentTarget.classList.remove("over");
  const id = e.dataTransfer.getData("text");
  Object.keys(placements).forEach(k => { if(placements[k]===id) delete placements[k]; });
  if(!placements[zone]) placements[zone] = [];
  placements[zone].push(id);
  renderZones_m8();
}
function renderZones_m8(){
  document.querySelectorAll("#mod8 .zone").forEach(z => {
    const zoneName = z.dataset.zone;
    z.classList.remove("correct","incorrect");
    const ids = placements[zoneName] || [];
    let html = zoneName === "missing" ? "Missing" : "Already present";
    ids.forEach(id => {
      const tile = document.querySelector('#mod8 [data-id="'+id+'"]');
      html += '<div class="placedtile">'+tile.textContent+'</div>';
    });
    z.innerHTML = html;
  });
  const allPlaced = [].concat(placements.missing||[], placements.present||[]);
  document.querySelectorAll("#mod8 .tile").forEach(t => {
    t.classList.toggle("placed", allPlaced.includes(t.dataset.id));
  });
}
function checkSort_m8(){
  const fb = document.getElementById("sortfeedback_m8");
  const continueBtn = document.getElementById("continueBtn_m8");
  let allCorrect = true;
  ["missing","present"].forEach(zone => {
    const ids = placements[zone] || [];
    const ok = ids.length>0 && ids.every(id => CORRECT[id]===zone) && Object.keys(CORRECT).filter(k=>CORRECT[k]===zone).length===ids.length;
    document.querySelector('#mod8 .zone[data-zone="'+zone+'"]').classList.add(ok ? "correct" : "incorrect");
    if(!ok) allCorrect = false;
  });
  let revealHtml = "";
  if(!allCorrect){
    const missingList = Object.keys(CORRECT).filter(k=>CORRECT[k]==="missing").map(id=>document.querySelector('#mod8 [data-id="'+id+'"]').textContent);
    const presentList = Object.keys(CORRECT).filter(k=>CORRECT[k]==="present").map(id=>document.querySelector('#mod8 [data-id="'+id+'"]').textContent);
    revealHtml = "<div style='margin-top:8px;'><b>Correct:</b><br>Missing: " + missingList.join(", ") + "<br>Already present: " + presentList.join(", ") + "</div>";
  }
  fb.className = "sortfeedback show " + (allCorrect ? "good" : "bad");
  fb.innerHTML = (allCorrect ? "Right \u2014 an owner, date, and validation question are all missing; a vague next action is at least present." : "Not quite \u2014 here's how it actually breaks down:") + revealHtml;
  continueBtn.disabled = false;
  continueBtn.textContent = "Continue to practice questions \u2192";
}
function resetSort_m8(){ placements = {}; renderZones_m8(); document.getElementById("sortfeedback_m8").className = "sortfeedback_m8"; }
renderZones_m8();


  window.dropTile_m8 = dropTile_m8;
  window.checkSort_m8 = checkSort_m8;
  window.resetSort_m8 = resetSort_m8;
  window.answerPQ_m8 = answerPQ_m8;
  window.goTo_m8 = goTo_m8;
})();
