import { workScenarios } from "./work.js";

let currentScenario = null;
let currentNode = "start";
let used = [];

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
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

function getRandom() {
  const keys = Object.keys(workScenarios);

  if (used.length >= keys.length) {
    used = [];
  }

  const available = keys.filter(k => !used.includes(k));
  const key = available[Math.floor(Math.random() * available.length)];

  used.push(key);
  return workScenarios[key];
}

async function show(addMessage, answers, options, getSession) {
  const node = currentScenario[currentNode];
  const session = getSession?.();

  for (const msg of node.messages) {
    if (getSession && session !== getSession()) return;

    const t = typing(answers);
    await delay(500);

    if (getSession && session !== getSession()) return;

    t.remove();
    addMessage(msg, "bot");

    await delay(600);
  }

  options.innerHTML = "";

  if (node.end) {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = "Ещё сценарий";

    btn.onclick = () => startWorkDialog(addMessage, answers, options, getSession);

    options.appendChild(btn);
    return;
  }

  node.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt.text;

    btn.onclick = () => {
      if (getSession && session !== getSession()) return;

      addMessage(opt.text, "user");
      currentNode = opt.next;

      show(addMessage, answers, options, getSession);
    };

    options.appendChild(btn);
  });
}

export function startWorkDialog(addMessage, answers, options, getSession) {
  currentScenario = getRandom();
  currentNode = "start";

  answers.innerHTML = "";
  options.innerHTML = "";

  show(addMessage, answers, options, getSession);
}