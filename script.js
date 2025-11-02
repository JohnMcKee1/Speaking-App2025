// ----- SIMPLE PROMPTS -----
const PROMPTS = {
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

const topicSel   = document.getElementById("topic");
const nextBtn    = document.getElementById("nextPrompt");
const promptBox  = document.getElementById("prompt");

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

// ----- RECORDER (MediaRecorder API) -----
const recordBtn    = document.getElementById("record");
const stopBtn      = document.getElementById("stop");
const statusEl     = document.getElementById("status");
const player       = document.getElementById("player");
const downloadLink = document.getElementById("download");

let mediaRecorder;
let chunks = [];

async function setupMic() {
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
    };

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      player.src = url;
      downloadLink.href = url;
      downloadLink.download = "recording.webm";
      downloadLink.style.display = "inline-block";
      statusEl.textContent = "Recorded. Play or download below.";
      recordBtn.disabled = false;
      stopBtn.disabled = true;
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
  }
}
setupMic();

setupMic();

