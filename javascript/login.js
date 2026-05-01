const form = document.getElementById("loginForm");
const error = document.getElementById("error");
const skipBtn = document.getElementById("skipBtn");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!phone || !password) {
    error.classList.add("show");
    return;
  }

  error.classList.remove("show");

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      color:#e6edf3;
      font-family:system-ui;
      text-align:center;
      padding:20px;
    ">
      <h2>Аккаунт утерян</h2>
      <p style="color:#9fb0c0;max-width:420px">
        Вы ввели данные на поддельном сайте, и ваш аккаунт может быть скомпрометирован.
        Сейчас ваши данные в безопасности, но в реальной ситуации это приводит к потере доступа и утечке личной информации.
      </p>
      <p style="color:#9fb0c0;max-width:420px;margin-top:10px">
        Давайте попробуем научиться распознавать такие угрозы.
      </p>
      <button onclick="location.href='tg.html'" style="
        margin-top:16px;
        padding:10px 14px;
        border-radius:10px;
        border:none;
        background:#3b82f6;
        color:#06101a;
        cursor:pointer;
      ">
        Перейти к сценариям
      </button>
    </div>
  `;
});



skipBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      color:#e6edf3;
      font-family:system-ui;
      text-align:center;
      padding:20px;
    ">
      <h2>Вы не повелись на фишинг</h2>
      <p style="color:#9fb0c0;max-width:420px">
        Вы распознали подозрительную форму и не стали вводить свои данные.
        Это правильное поведение при фишинговых атаках.
      </p>
      <p style="color:#9fb0c0;max-width:420px;margin-top:10px">
        Закрепим навык и попробуем научиться ещё лучше различать такие угрозы.
      </p>
      <button onclick="location.href='tg.html'" style="
        margin-top:16px;
        padding:10px 14px;
        border-radius:10px;
        border:none;
        background:#3b82f6;
        color:#06101a;
        cursor:pointer;
      ">
        Перейти к сценариям
      </button>
    </div>
  `;
});