export function generateScenario() {
  const types = ["phishing", "scam", "safe"];

  const type = types[Math.floor(Math.random() * types.length)];

  if (type === "phishing") return generatePhishing();
  if (type === "scam") return generateScam();
  return generateSafe();
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePhishing() {
  const links = [
    "secure-login.verify-user.com",
    "account-security-check.net",
    "login-confirm-alert.org"
  ];

  const link = rand(links);

  return {
    start: {
      from: "system",
      messages: [
        "Обнаружена подозрительная активность",
        "Ваш аккаунт может быть заблокирован",
        `Подтвердите вход: https://${link}`
      ],
      options: [
        { text: "Открыть ссылку", next: "phish" },
        { text: "Проверить вручную", next: "safe_check" },
        { text: "Игнорировать", next: "bad_end" },
        { text: "Сменить пароль", next: "good_end" }
      ]
    },

    phish: {
      from: "system",
      messages: [
        "Сайт запрашивает логин и пароль",
        "Также просит код из SMS"
      ],
      options: [
        { text: "Ввести данные", next: "bad_end" },
        { text: "Закрыть страницу", next: "good_end" },
        { text: "Назад", next: "start" }
      ]
    },

    safe_check: {
      from: "system",
      messages: [
        "Официальный сайт не подтверждает ссылку",
        "Это фишинговая страница"
      ],
      options: [
        { text: "Удалить письмо", next: "good_end" },
        { text: "Сообщить в поддержку", next: "good_end" }
      ]
    },

    good_end: {
      from: "system",
      messages: [
        "Ты избежал фишинга",
        "Аккаунт защищён"
      ],
      end: true
    },

    bad_end: {
      from: "system",
      messages: [
        "Данные украдены",
        "Аккаунт скомпрометирован"
      ],
      end: true
    }
  };
}


function generateScam() {
  const amounts = ["50€", "200€", "500€", "1000€"];

  const amount = rand(amounts);

  return {
    start: {
      from: "friend",
      messages: [
        "Привет, срочно нужна помощь",
        `Можешь занять ${amount}?`,
        "Верну завтра"
      ],
      options: [
        { text: "Почему?", next: "pressure" },
        { text: "Позвоню тебе", next: "check" },
        { text: "Отправить деньги", next: "bad_end" },
        { text: "Отказ", next: "good_end" }
      ]
    },

    pressure: {
      from: "friend",
      messages: [
        "Проблемы с банком",
        "Очень срочно нужно"
      ],
      options: [
        { text: "Отправить", next: "bad_end" },
        { text: "Проверить", next: "check" },
        { text: "Отказ", next: "good_end" }
      ]
    },

    check: {
      from: "system",
      messages: [
        "Ты позвонил другу",
        "Он говорит, что его аккаунт взломан"
      ],
      options: [
        { text: "Понятно", next: "good_end" }
      ]
    },

    good_end: {
      from: "system",
      messages: [
        "Ты не попался на мошенничество",
        "Аккаунт друга был взломан"
      ],
      end: true
    },

    bad_end: {
      from: "system",
      messages: [
        "Деньги отправлены",
        "Мошенник исчез"
      ],
      end: true
    }
  };
}

function generateSafe() {
  const tips = [
    "проверять ссылки перед вводом данных",
    "не вводить коды из SMS никому",
    "использовать 2FA",
    "проверять отправителя письма"
  ];

  const tip = rand(tips);

  return {
    start: {
      from: "system",
      messages: [
        "Обучающий сценарий",
        `Совет: важно ${tip}`,
        "Как поступишь?"
      ],
      options: [
        { text: "Запомнить", next: "good_end" },
        { text: "Игнорировать", next: "bad_end" },
        { text: "Подробнее", next: "info" },
        { text: "Проверить позже", next: "good_end" }
      ]
    },

    info: {
      from: "system",
      messages: [
        "Фишинг часто маскируется под банки и сервисы",
        "Не переходи по подозрительным ссылкам"
      ],
      options: [
        { text: "Понятно", next: "good_end" }
      ]
    },

    good_end: {
      from: "system",
      messages: [
        "Ты повысил свою кибербезопасность"
      ],
      end: true
    },

    bad_end: {
      from: "system",
      messages: [
        "Игнорирование повышает риск атак"
      ],
      end: true
    }
  };
}


