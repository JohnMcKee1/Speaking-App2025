// ===== PROMPTS FOR UNITS 1,2,3,4,5,6,8 =====
const PROMPTS = {
  animals: [
    "Describe a wild animal you find fascinating. Explain its habitat and one adaptation.",
    "Compare two pets that are common in your country. Which is easier to care for and why?",
    "Should zoos focus on conservation or education? Give reasons with one example."
  ],
  environment: [
    "Explain one cause and one effect of air pollution in cities you know.",
    "Give three practical ways a college can reduce plastic waste. Which is most effective?",
    "Do the benefits of renewable energy outweigh the costs in your country? Explain."
  ],
  transport: [
    "Compare public transport and private cars for daily commuting. Which is better and why?",
    "Suggest improvements to make your city’s transport safer and more efficient.",
    "How would self-driving vehicles change logistics or daily life? Give one advantage and one risk."
  ],
  customs: [
    "Describe a local celebration or tradition. What values does it teach?",
    "How should tourists behave to respect local customs? Give two examples.",
    "Compare wedding traditions in two cultures. What is similar and different?"
  ],
  health: [
    "Describe a weekly routine that helps you stay fit. Include exercise and diet.",
    "What advice would you give a friend who wants to improve their sleep?",
    "Explain the pros and cons of high-intensity training for beginners."
  ],
  invention: [
    "Choose a modern invention and explain how it changed daily life.",
    "Compare two inventions and explain which is more impactful and why.",
    "Describe a problem at college and propose an invention to solve it."
  ],
  economics: [
    "What are the advantages and disadvantages of online shopping for local business?",
    "Explain inflation in simple terms with one real example.",
    "Should students be paid for part-time work during term? Give reasons."
  ]
};

// ===== DOM REFS =====
const topicSel     = document.getElementById("topic");
const nextBtn      = document.getElementById("nextPrompt");
const promptBox    = document.getElementById("prompt");

const nameInput    = document.getElementById("studentName");
const idInput      = document.getElementById("studentId");
const classInput   = document.getElementById("studentClass");

const recordBtn    = document.getElementById("record");
const stopBtn      = document.getElementById("stop");
const statusEl     = document.getElementById("status");
const timerEl      = document.getElementById("timer");
const player       = document.getElementById("player");
const downloadLink = document.getElementById("download");

const metaBox      = document.getElementById("meta");
const copyBtn      = document.getElementById("copyData");
const submitBtn    = document.getElementById("submit");

// ===== MIC-HELP BANNER HANDLERS =====
function showMicHelp(){ 
  const el = document.getElementById("mic-help");
  if (el) el.style.display = "block";
}
function hideMicHelp(){ 
  const el = document.getElementById("mic-help");
  if (el) el.style.display = "none";
}
const micHelpCloseBtn = document.getElementById("mic-help-close");
if (micHelpCloseBtn) micHelpCloseBtn.onclick = hideMicHelp;

// ===== PROMPT LOGIC =====
let promptIndex = -1;
function showNextPrompt() {
  const list = PROMPTS[topicSel.value];
  if (!list || !list.length) {
    promptBox.textContent = "No prompts available.";
    return;
  }
  promptIndex = (promptIndex + 1) % list.length;
  promptBox.textContent = list[promptIndex];
}
nextBtn.addEventListener("click", showNextPrompt);

// ===== RECORDER (MediaRecorder) =====
let mediaRecorder;
let chunks = [];
let t0 = 0;
let tick = null;
let lastPayload = null; // snapshot for copy/submit

function fmt(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2,"0");
  const s = Math.floor(sec % 60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

function startTimer() {
  t0 = Date.now();
  timerEl.textContent = "00:00";
  tick = setInterval(() => {
    const el = (Date.now() - t0) / 1000;
    timerEl.textContent = fmt(el);
  }, 250);
}
function stopTimer() {
  if (tick) clearInterval(tick);
  const el = (Date.now() - t0) / 1000;
  return Math.round(el);
}

async function setupMic() {
  // Show help immediately if already denied (where supported)
  if (navigator.permissions && navigator.permissions.query) {
    try {
      const p = await navigator.permissions.query({ name: "microphone" });
      if (p.state === "denied") showMicHelp();
      p.onchange = () => { if (p.state === "denied") showMicHelp(); else hideMicHelp(); };
    } catch {}
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    statusEl.textContent = "This browser cannot record audio here.";
    recordBtn.disabled = true;
    stopBtn.disabled = true;
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      chunks = [];
      statusEl.textContent = "Recording…";
      recordBtn.disabled = true;
      stopBtn.disabled = false;
      downloadLink.style.display = "none";
      copyBtn.disabled = true;
      submitBtn.disabled = true;
      startTimer();
    };

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const durationSec = stopTimer();
      const blob = new Blob(chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      player.src = url;
      downloadLink.href = url;
      downloadLink.download = "recording.webm";
      downloadLink.style.display = "inline-block";
      statusEl.textContent = "Recorded. Play or download below.";
      recordBtn.disabled = false;
      stopBtn.disabled = true;

      const payload = {
        name:  nameInput.value.trim(),
        id:    idInput.value.trim(),
        klass: classInput.value.trim(),
        unit:  topicSel.value,
        prompt: promptBox.textContent.trim(),
        timestamp_iso: new Date().toISOString(),
        duration_sec: durationSec
      };
      lastPayload = payload;
      metaBox.textContent = JSON.stringify(payload, null, 2);
      copyBtn.disabled = false;
      submitBtn.disabled = false;
    };

    statusEl.textContent = "Mic ready. Tap Start Recording.";
    recordBtn.disabled = false;
    stopBtn.disabled = true;

    recordBtn.onclick = () => mediaRecorder.start();
    stopBtn.onclick   = () => mediaRecorder.stop();
  } catch (err) {
    statusEl.textContent = "Mic error: " + err.message;
    recordBtn.disabled = true;
    stopBtn.disabled   = true;
    if (err.name === "NotAllowedError" || err.name === "SecurityError") showMicHelp();
  }
}

copyBtn.addEventListener("click", async () => {
  if (!lastPayload) return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(lastPayload));
    copyBtn.textContent = "Copied ✔";
    setTimeout(() => (copyBtn.textContent = "📋 Copy data"), 1500);
  } catch {
    alert("Copy failed. Select the text and copy manually.");
  }
});

// Placeholder for next step (Make.com → Google Sheets)
submitBtn.addEventListener("click", () => {
  alert("Submit will send data to Google Sheets (we’ll connect this next).");
});

setupMic();
