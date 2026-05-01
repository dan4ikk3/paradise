import { scenarios } from "./dialogs.js";

let currentScenario = null;
let currentNode = "start";

let usedScenarios = [];

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function getDelay(text) {
  return Math.min(1600, 300 + text.length * 20);
}

function typing(answers) {
  const el = document.createElement("div");
  el.className = "message bot typing";
  el.innerHTML = `
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  `;
  answers.appendChild(el);
  answers.scrollTop = answers.scrollHeight;
  return el;
}

async function show(addMessage, answers, options, getSession) {
  if (!currentScenario) return;

  const node = currentScenario[currentNode];
  const session = getSession?.();

  const type = node.from === "friend" ? "bot" : "correct-msg";

  if (node.messages) {
    for (const msg of node.messages) {
      if (getSession && session !== getSession()) return;

      const t = typing(answers);

      await delay(500);

      if (getSession && session !== getSession()) return;

      t.remove();
      addMessage(msg, type);

      await delay(getDelay(msg));
    }
  } else {
    const t = typing(answers);
    await delay(700);
    if (t) t.remove();
    addMessage(node.text, type);
  }

  options.innerHTML = "";

  if (node.end) {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = "Ещё сценарий";

    btn.onclick = () => {
      startDialog(addMessage, answers, options, getSession);
    };

    options.appendChild(btn);
    return;
  }

  node.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt.text;

    btn.onclick = () => {
      addMessage(opt.text, "user");

      document.querySelectorAll(".option").forEach(b => {
        b.style.pointerEvents = "none";
      });

      setTimeout(() => {
        currentNode = opt.next;
        show(addMessage, answers, options, getSession);
      }, 500);
    };

    options.appendChild(btn);
  });
}

function getRandomScenario() {
  const keys = Object.keys(scenarios);

  if (usedScenarios.length >= keys.length) {
    usedScenarios = [];
  }

  const available = keys.filter(k => !usedScenarios.includes(k));

  const randomKey =
    available[Math.floor(Math.random() * available.length)];

  usedScenarios.push(randomKey);

  return randomKey;
}

export function startDialog(addMessage, answers, options, getSession) {
  const random = getRandomScenario();

  currentScenario = scenarios[random];
  currentNode = "start";

  answers.innerHTML = "";
  options.innerHTML = "";

  show(addMessage, answers, options, getSession);
}