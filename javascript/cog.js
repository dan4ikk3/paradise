import { questions } from "./questions.js";

const answers = document.getElementById("answers");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let q = shuffle([...questions]);
let i = 0;

/* Добавить сообщение */
function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "message " + type;
  msg.textContent = text;
  answers.appendChild(msg);

  answers.scrollTop = answers.scrollHeight;
}

/* Показать вопрос */
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

/* Проверка */
function check(index, text) {
  const correct = index === q[i].correct;

  // блокируем клики
  const all = document.querySelectorAll(".user");
  all.forEach(b => b.style.pointerEvents = "none");

  // подсветка выбранного
  all.forEach(b => {
    if (b.textContent !== text) b.style.opacity = "0.5";
  });

  setTimeout(() => {
    addMessage(
      correct ? "✅ Правильно!" : "❌ Неправильно!",
      "bot"
    );

    // 👉 авто следующий вопрос
    setTimeout(() => nextQuestion(), 800);

  }, 400);
}

/* Следующий вопрос */
function nextQuestion() {
  i++;

  if (i < q.length) {
    show();
  } else {
    addMessage("🎉 Викторина завершена", "bot");
  }
}

show();