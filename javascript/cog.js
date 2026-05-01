import { questions } from "./questions.js";
import { startDialog } from "./dialogEngine.js";
import { startWorkDialog } from "./workDialog.js";

const answers = document.getElementById("answers");
const options = document.getElementById("options");

let q = shuffle([...questions]);
let i = 0;

let mode = "quiz";
let sessionId = 0;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function addMessage(text, type = "bot") {
  const msg = document.createElement("div");

  let finalType = type;

  if (mode === "dialog") {
    if (type === "user") finalType = "user";
    else if (type === "good-end") finalType = "system success";
    else if (type === "bad-end") finalType = "system fail";
    else finalType = "bot";
  }

  if (mode === "work") {
    if (type === "user") finalType = "user";
    else if (type === "good-end") finalType = "system success";
    else if (type === "bad-end") finalType = "system fail";
    else finalType = "bot";
  }

  if (mode === "quiz") {
    if (type === "correct-msg") finalType = "correct-msg";
    else if (type === "wrong-msg") finalType = "wrong-msg";
    else if (type === "user") finalType = "user";
    else finalType = "bot";
  }

  msg.className = "message " + finalType;
  msg.textContent = text;

  msg.style.opacity = "0";
  msg.style.transform = "translateY(8px)";

  answers.appendChild(msg);
  answers.scrollTop = answers.scrollHeight;

  requestAnimationFrame(() => {
    msg.style.transition = "0.25s ease";
    msg.style.opacity = "1";
    msg.style.transform = "translateY(0)";
  });
}

function show() {
  const current = q[i];
  addMessage(current.text, "bot");

  options.innerHTML = "";

  const shuffled = shuffle(current.answers);

  shuffled.forEach(ans => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = ans;

    btn.onclick = () => check(btn, ans, current);

    options.appendChild(btn);
  });
}

function check(btn, selected, current) {
  const correct = selected === current.correctText;

  addMessage(selected, "user");

  document.querySelectorAll(".option").forEach(b => {
    b.style.pointerEvents = "none";
  });

  document.querySelectorAll(".option").forEach(b => {
    if (b.textContent === current.correctText) {
      b.classList.add("correct");
    }
  });

  if (!correct) btn.classList.add("wrong");

  const currentSession = sessionId;

  setTimeout(() => {
    if (currentSession !== sessionId || mode !== "quiz") return;

    addMessage(
      correct ? "Правильно!" : "Неправильно!",
      correct ? "correct-msg" : "wrong-msg"
    );

    if (current.explanation) {
      setTimeout(() => {
        if (currentSession !== sessionId || mode !== "quiz") return;
        addMessage("💡 " + current.explanation, "explanation");
      }, 300);
    }

    setTimeout(() => {
      if (currentSession !== sessionId || mode !== "quiz") return;
      next();
    }, 1600);

  }, 500);
}

function next() {
  i++;

  if (i < q.length) {
    show();
  } else {
    addMessage("Викторина завершена", "correct-msg");
    options.innerHTML = "";
  }
}

const chats = document.querySelectorAll(".chat-item");

chats.forEach(chat => {
  chat.addEventListener("click", () => {
    chats.forEach(c => c.classList.remove("active"));
    chat.classList.add("active");

    const text = chat.innerText;

    sessionId++;

    answers.innerHTML = "";
    options.innerHTML = "";

    if (text.includes("Викторина")) {
      mode = "quiz";
      i = 0;
      q = shuffle([...questions]);
      show();
    }

    if (text.includes("Друзья")) {
      mode = "dialog";
      startDialog(addMessage, answers, options, () => sessionId);
    }

    if (text.includes("Работа")) {
      mode = "work";
      startWorkDialog(addMessage, answers, options, () => sessionId);
    }
  });
});

show();