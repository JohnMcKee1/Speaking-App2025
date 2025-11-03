/***** PROMPTS — Units 1–8 (skip 7). Two prompts per level for rotation. *****/
const PROMPTS = {
  "1": { title: "Animals",
    targets: ["comparatives","contrasting ideas","signposting"],
    keywords: ["habitat","wildlife","species","predator","adapt","endangered"],
    prompts: {
      easy: [
        { text: "Compare two animals you know. Use one comparative and one contrast (e.g., however).",
          targets: ["comparatives","contrasting ideas"], minWords: 40 },
        { text: "Describe your favorite animal and give one example of how it survives.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Explain how one animal is adapted to its environment. Use one signpost and one contrast.",
          targets: ["signposting","contrasting ideas"], minWords: 60 },
        { text: "Compare the habitats of two species and recommend one action to support each.",
          targets: ["comparatives","recommendations","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate two conservation strategies for an endangered species. Contrast them and make a recommendation.",
          targets: ["contrasting ideas","signposting","recommendations"], minWords: 80 },
        { text: "Argue which policy would most reduce habitat loss. Use cause & effect and signposting.",
          targets: ["cause & effect","signposting"], minWords: 80 }
      ]
    }
  },
  "2": { title: "The Environment",
    targets: ["cause & effect","giving examples","advantages & disadvantages"],
    keywords: ["pollution","recycling","renewable","emissions","waste","climate"],
    prompts: {
      easy: [
        { text: "Give one cause and one effect of air pollution in your city. Include 'because' or 'because of'.",
          targets: ["cause & effect"], minWords: 40 },
        { text: "Describe one simple way to reduce waste and give an example.",
          targets: ["giving examples","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Explain why recycling matters and discuss one advantage and one disadvantage.",
          targets: ["advantages & disadvantages","giving examples"], minWords: 60 },
        { text: "Compare two energy sources and say which is better for your area, using cause & effect.",
          targets: ["cause & effect","comparatives","recommendations"], minWords: 60 }
      ],
      hard: [
        { text: "Argue for a local policy to reduce emissions. Use at least two signposts and one contrast.",
          targets: ["signposting","contrasting ideas","cause & effect"], minWords: 80 },
        { text: "Evaluate the trade-offs of banning single-use plastics.",
          targets: ["advantages & disadvantages","contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "3": { title: "Transport",
    targets: ["making suggestions","first conditional","comparatives","recommendations"],
    keywords: ["traffic","bus","metro","congestion","safety","cost"],
    prompts: {
      easy: [
        { text: "Make one suggestion to improve traffic near your school and explain why.",
          targets: ["making suggestions"], minWords: 40 },
        { text: "Compare two ways to travel to college and say which you prefer with a reason.",
          targets: ["comparatives","recommendations"], minWords: 40 }
      ],
      medium: [
        { text: "Use the first conditional to explain what will happen if your city adds more buses.",
          targets: ["first conditional","signposting"], minWords: 60 },
        { text: "Discuss safety vs. cost for public transport and make a recommendation.",
          targets: ["contrasting ideas","recommendations"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate whether your city should build a metro. Use at least two signposts and one conditional.",
          targets: ["signposting","first conditional","advantages & disadvantages"], minWords: 80 },
        { text: "Argue which option reduces congestion fastest: more buses or cycling lanes. Contrast and recommend.",
          targets: ["contrasting ideas","recommendations","comparatives"], minWords: 80 }
      ]
    }
  },
  "4": { title: "Customs & Traditions",
    targets: ["adverbs of frequency","dependent prepositions","signposting"],
    keywords: ["festival","family","tradition","celebrate","culture","meal"],
    prompts: {
      easy: [
        { text: "Describe a family custom. Use one adverb of frequency (e.g., usually, often).",
          targets: ["adverbs of frequency"], minWords: 40 },
        { text: "Explain why you are interested in a local festival. Include one dependent preposition.",
          targets: ["dependent prepositions"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two holiday traditions and use one contrasting linker.",
          targets: ["contrasting ideas","adverbs of frequency"], minWords: 60 },
        { text: "Give one cause and effect related to a custom in your community.",
          targets: ["cause & effect","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Discuss how traditions change over time. Use at least two signposts and one dependent preposition.",
          targets: ["signposting","dependent prepositions","contrasting ideas"], minWords: 80 },
        { text: "Evaluate whether a specific tradition should be kept or changed. Argue your view with contrasts.",
          targets: ["contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "5": { title: "Health & Fitness",
    targets: ["modals (advice/obligation)","giving examples","signposting"],
    keywords: ["exercise","diet","sleep","stress","hydration","routine"],
    prompts: {
      easy: [
        { text: "Give one piece of advice for staying healthy and an example.",
          targets: ["modals (advice/obligation)","giving examples"], minWords: 40 },
        { text: "Compare two forms of exercise and say which is better for beginners.",
          targets: ["comparatives","recommendations"], minWords: 40 }
      ],
      medium: [
        { text: "Explain how sleep affects fitness using cause & effect and one signpost word.",
          targets: ["cause & effect","signposting"], minWords: 60 },
        { text: "Recommend a weekly routine. Use at least two modals (should/must/have to).",
          targets: ["modals (advice/obligation)","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate two diet strategies and argue which is more sustainable. Include contrasts and examples.",
          targets: ["contrasting ideas","giving examples","signposting"], minWords: 80 },
        { text: "Propose a college wellness policy. Use modals for obligation and cause & effect.",
          targets: ["modals (advice/obligation)","cause & effect","signposting"], minWords: 80 }
      ]
    }
  },
  "6": { title: "Discovery & Invention",
    targets: ["signposting","giving examples","recommendations"],
    keywords: ["innovation","prototype","research","efficiency","technology","design"],
    prompts: {
      easy: [
        { text: "Describe a simple invention you like and give one example of how it helps people.",
          targets: ["giving examples"], minWords: 40 },
        { text: "Explain one problem a new app could solve and recommend one feature.",
          targets: ["recommendations","signposting"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two technologies that solve the same problem and use one contrasting linker.",
          targets: ["contrasting ideas","comparatives"], minWords: 60 },
        { text: "Explain the cause and effect of adopting a new tool in class. Use signposting.",
          targets: ["cause & effect","signposting"], minWords: 60 }
      ],
      hard: [
        { text: "Argue which invention had the bigger impact in the last decade. Use two signposts and one example.",
          targets: ["signposting","giving examples","contrasting ideas"], minWords: 80 },
        { text: "Propose a research plan to test a prototype. Make recommendations and include one contrast.",
          targets: ["recommendations","contrasting ideas","signposting"], minWords: 80 }
      ]
    }
  },
  "8": { title: "Economics",
    targets: ["advantages & disadvantages","signposting","cause & effect"],
    keywords: ["cost","benefit","market","policy","inflation","employment"],
    prompts: {
      easy: [
        { text: "Give one advantage and one disadvantage of part-time work for students.",
          targets: ["advantages & disadvantages"], minWords: 40 },
        { text: "Explain one cause and one effect of rising prices in your area.",
          targets: ["cause & effect"], minWords: 40 }
      ],
      medium: [
        { text: "Compare two ways to save money for college students and recommend one.",
          targets: ["comparatives","recommendations"], minWords: 60 },
        { text: "Discuss a local policy idea and signpost your main points clearly.",
          targets: ["signposting","advantages & disadvantages"], minWords: 60 }
      ],
      hard: [
        { text: "Evaluate whether a minimum wage increase would help students. Use contrasts and cause & effect.",
          targets: ["contrasting ideas","cause & effect","signposting"], minWords: 80 },
        { text: "Argue for or against subsidized transport for learners. Provide pros/cons and a recommendation.",
          targets: ["advantages & disadvantages","recommendations","signposting"], minWords: 80 }
      ]
    }
  }
};

/***** ELEMENTS *****/
const micHelp = document.getElementById('micHelp');

const studentName = document.getElementById('studentName');
const studentId   = document.getElementById('studentId');
const studentGroup= document.getElementById('studentGroup');

const unitSelect  = document.getElementById('unitSelect');
const levelSelect = document.getElementById('levelSelect');
const loadPromptBtn = document.getElementById('loadPromptBtn');
const promptTitle = document.getElementById('promptTitle');
const promptText  = document.getElementById('promptText');
const targetsBox  = document.getElementById('targetsBox');

const recBtn   = document.getElementById('recBtn');
const stopBtn  = document.getElementById('stopBtn');
const playBtn  = document.getElementById('playBtn');
const player   = document.getElementById('player');
const dlLink   = document.getElementById('dlLink');
const meterFill= document.getElementById('meterFill');
const recStatus= document.getElementById('recStatus');
const timerEl  = document.getElementById('timer');

const feedback = document.getElementById('feedback');
const fbGood = document.getElementById('fbGood');
const fbNext = document.getElementById('fbNext');
const fbCefr = document.getElementById('fbCefr');
const fbStats= document.getElementById('fbStats');

const getFbBtn = document.getElementById('getFbBtn');
const submitBtn= document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const attemptPreview = document.getElementById('attemptPreview');
const copyBtn = document.getElementById('copyBtn');

/***** STATE *****/
let currentPrompt = null;
let mediaStream = null, mediaRecorder = null, audioChunks = [];
let analyser = null, audioCtx = null, rafId = null;
let startTs = 0, timerId = null;
let audioBlob = null;

/***** INIT *****/
(function init(){
  Object.keys(PROMPTS).forEach(u=>{
    const opt=document.createElement('option');
    opt.value=u; opt.textContent=`Unit ${u} — ${PROMPTS[u].title}`;
    unitSelect.appendChild(opt);
  });
  unitSelect.value="1";
  levelSelect.value="medium";
})();

/***** PROMPTS *****/
loadPromptBtn.addEventListener('click', () => {
  const u = unitSelect.value, lvl = levelSelect.value;
  const set = PROMPTS[u];
  const arr = set.prompts[lvl];
  const key = `U${u}-${lvl}-idx`;
  const last = Number(localStorage.getItem(key) || -1);
  const idx = (last + 1) % arr.length;
  localStorage.setItem(key, String(idx));
  currentPrompt = arr[idx];

  promptTitle.textContent = `${set.title} • ${cap(lvl)}`;
  promptText.textContent = currentPrompt.text;
  targetsBox.innerHTML = "";
  const tags = new Set([...(set.targets||[]), ...(currentPrompt.targets||[]), ...(set.keywords||[]).slice(0,6)]);
  tags.forEach(t=>{
    const span=document.createElement('span'); span.className='badge'; span.textContent=t; targetsBox.appendChild(span);
  });

  feedback.classList.add('hidden');
  updateAttemptPreview();
});

/***** RECORDING *****/
recBtn.addEventListener('click', async ()=>{
  try{
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio:true });
    micHelp.style.display = "none";
  }catch(e){
    micHelp.style.display = "block";
    recStatus.textContent = "Mic: permission denied";
    return;
  }

  setupMeter(mediaStream);
  audioChunks = [];
  mediaRecorder = new MediaRecorder(mediaStream);
  mediaRecorder.ondataavailable = e => { if(e.data.size>0) audioChunks.push(e.data); };
  mediaRecorder.onstop = () => {
    audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    player.src = URL.createObjectURL(audioBlob);
    player.classList.remove('hidden');
    dlLink.href = player.src;
    dlLink.classList.remove('hidden');
    playBtn.disabled = false;
    stopMeter();
    stopTimer();
    mediaStream.getTracks().forEach(t=>t.stop());
    mediaStream = null;
    recStatus.textContent = "Mic: stopped";
    updateAttemptPreview();
  };

  mediaRecorder.start();
  startTimer();
  recStatus.textContent = "Recording…";
  recBtn.disabled = true; stopBtn.disabled = false; playBtn.disabled = true; dlLink.classList.add('hidden');
});

stopBtn.addEventListener('click', ()=>{
  if(mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
  recBtn.disabled = false; stopBtn.disabled = true;
});
playBtn.addEventListener('click', ()=> player.play());

function setupMeter(stream){
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const src = audioCtx.createMediaStreamSource(stream);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 512;
  src.connect(analyser);
  meter();
}
function meter(){
  const data = new Uint8Array(analyser.frequencyBinCount);
  const loop = () => {
    analyser.getByteTimeDomainData(data);
    let peak=0;
    for(let i=0;i<data.length;i++){
      const v=Math.abs(data[i]-128)/128; if(v>peak) peak=v;
    }
    meterFill.style.width = Math.min(100, Math.round(peak*140)) + "%";
    rafId = requestAnimationFrame(loop);
  };
  loop();
}
function stopMeter(){ if(rafId) cancelAnimationFrame(rafId); meterFill.style.width="0%"; }

/***** TIMER *****/
function startTimer(){
  startTs = Date.now();
  timerEl.textContent = "00:00";
  timerId = setInterval(()=>{
    const s = Math.floor((Date.now()-startTs)/1000);
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    timerEl.textContent = `${mm}:${ss}`;
  }, 250);
}
function stopTimer(){ if(timerId){ clearInterval(timerId); timerId=null; } }

/***** FEEDBACK (two-line) *****/
getFbBtn.addEventListener('click', ()=>{
  if(!currentPrompt){ alert("Load a prompt first."); return; }
  const set = PROMPTS[unitSelect.value];
  const report = evaluateTwoLine(set, currentPrompt);
  fbGood.textContent = report.good;
  fbNext.textContent = report.next;
  fbCefr.textContent = report.cefr ? `${report.cefr} focus` : "";
  fbStats.textContent = `${report.len.words} words • ${report.targetsHit}/${report.targetsTotal} targets`;
  feedback.classList.remove('hidden');
  updateAttemptPreview(report);
});

/***** SUBMIT (stub) *****/
submitBtn.addEventListener('click', ()=>{
  alert("Submit is not connected yet. We’ll wire this to Google Sheets next (Make.com / Apps Script).");
});

/***** CLEAR *****/
clearBtn.addEventListener('click', ()=>{
  player.src=""; player.classList.add('hidden');
  dlLink.classList.add('hidden'); audioBlob=null;
  feedback.classList.add('hidden');
  timerEl.textContent = "00:00";
  recBtn.disabled=false; stopBtn.disabled=true; playBtn.disabled=true;
  updateAttemptPreview();
});

/***** ATTEMPT PREVIEW + COPY *****/
function updateAttemptPreview(latestReport){
  const data = {
    ts: new Date().toISOString(),
    name: studentName.value || "",
    id: studentId.value || "",
    group: studentGroup.value || "",
    unit: unitSelect.value,
    level: levelSelect.value,
    prompt: currentPrompt ? currentPrompt.text : "",
    duration: timerEl.textContent,
    audio: player && player.src ? player.src : "",
    feedback: latestReport ? {
      good: latestReport.good, next: latestReport.next,
      cefr: latestReport.cefr, words: latestReport.len.words,
      targetsHit: latestReport.targetsHit, targetsTotal: latestReport.targetsTotal
    } : null
  };
  attemptPreview.textContent = JSON.stringify(data, null, 2);
}
copyBtn.addEventListener('click', ()=>{
  navigator.clipboard.writeText(attemptPreview.textContent).then(()=> {
    copyBtn.textContent = "Copied!";
    setTimeout(()=>copyBtn.textContent="Copy", 1000);
  });
});

/***** EVALUATION HEURISTICS (no STT; we judge from targets + simple length proxy) *****/
function evaluateTwoLine(unit, prompt){
  // With no transcript text, we approximate length from time.
  const seconds = readTimerSeconds();
  // Very rough words guess: 110 wpm → ~1.8 wps
  const estWords = Math.round(seconds * 1.8);
  const minWords = prompt.minWords || 40;

  const targets = (unit.targets || []).concat(prompt.targets || []);
  // We can't parse grammar without text. We gently assume beginner hit 1–2 features if time >= thresholds.
  let targetsHit = 0;
  if(seconds >= 25) targetsHit = 1;
  if(seconds >= 40) targetsHit = 2;
  if(seconds >= 60) targetsHit = Math.min(3, targets.length);

  // CEFR-ish from duration only (classroom hint)
  let cefr = "A2–B1";
  if(seconds >= 35) cefr = "B1";
  if(seconds >= 55) cefr = "B1+";

  // Strengths
  const strengths = [];
  if(seconds >= 25) strengths.push("clear routine and enough detail");
  if(seconds >= 35) strengths.push("good flow/organization");
  const good = strengths.length ? capFirst(`What you did well: ${joinTwo(strengths)}.`)
                                : "What you did well: understandable ideas — good start.";

  // Next step (level-aware)
  const lvl = levelSelect.value;
  const tips = [];
  if(estWords < minWords) tips.push(`speak a bit longer to reach ${minWords}+ words`);
  if(lvl === "easy") tips.push("add one signposting phrase (first/then)");
  if(lvl === "medium") tips.push("add two signposts and one comparative");
  if(lvl === "hard") tips.push("add a contrast signpost (however/whereas) and a reason (because/therefore)");
  const next = capFirst(`Next step: ${joinTwo(tips)}.`);

  return {
    good, next, cefr,
    len: { seconds, words: estWords },
    targetsHit, targetsTotal: targets.length
  };
}
function readTimerSeconds(){
  const t = (timerEl.textContent || "00:00").split(":");
  const mm = parseInt(t[0]||"0",10), ss = parseInt(t[1]||"0",10);
  return mm*60 + ss;
}

/***** UTIL *****/
function cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function capFirst(s){ return s ? s[0].toUpperCase() + s.slice(1) : s; }
function joinTwo(arr){ if(!arr.length) return ""; if(arr.length===1) return arr[0]; return `${arr[0]} and ${arr[1]}`; }
