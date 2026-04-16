import { questions } from "./questions.js";

const answers = document.getElementById("answers");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let q = shuffle([...questions]);
let i = 0;


function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "message " + type;
  msg.textContent = text;
  answers.appendChild(msg);

  answers.scrollTop = answers.scrollHeight;
}


function show() {
  addMessage(q[i].text, "bot");

  q[i].answers.forEach((a, j) => {
    const btn = document.createElement("div");
    btn.className = "message user";
    btn.textContent = a;

    btn.onclick = () => check(j, a);

    answers.appendChild(btn);
  });
}


function check(index, text) {
  const correct = index === q[i].correct;


  const all = document.querySelectorAll(".user");
  all.forEach(b => b.style.pointerEvents = "none");


  all.forEach(b => {
    if (b.textContent !== text) b.style.opacity = "0.5";
  });

  setTimeout(() => {
    addMessage(
      correct ? "✅ Правильно!" : "❌ Неправильно!",
      "bot"
    );


    setTimeout(() => nextQuestion(), 800);

  }, 400);
}


function nextQuestion() {
  i++;

  if (i < q.length) {
    show();
  } else {
    addMessage("🎉 Викторина завершена", "bot");
  }
}

show();