
import { questions } from "./questions.js";


const answers = document.getElementById("answers");
const result = document.getElementById("result");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let q = shuffle([...questions]);
let i = 0;

function show() {
  question.textContent = q[i].text;
  answers.innerHTML = "";
  result.textContent = "";

  q[i].answers.forEach((a, j) => {
    const btn = document.createElement("button");
    btn.textContent = a;
    btn.onclick = () => check(j);
    answers.appendChild(btn);
    answers.appendChild(document.createElement("br"));
  });
}

function check(a) {
  result.textContent =
    a === q[i].correct ? "✅ Правильно!" : "❌ Неправильно!";
}

function nextQuestion() {
  i++;
  if (i < q.length) {
    show();
  } else {
    quiz.innerHTML = "<h2>🎉 Викторина завершена</h2>";
  }
}

window.check = check;
window.nextQuestion = nextQuestion;

show();