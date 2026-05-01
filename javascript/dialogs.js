import { generateScenario } from "./generator.js";

export const scenarios = {
dynamic: generateScenario,

 scam_code: {
  start: {
    from: "friend",
    messages: [
      "Привет, можешь помочь?",
      "Я не могу войти в аккаунт, там код приходит на твой номер",
      "Вот страница восстановления: https://secure-login-reset.com",
      "Скинь код, это займёт минуту"
    ],
    options: [
      { text: "Какой код?", next: "doubt" },
      { text: "Не буду отправлять", next: "refuse" },
      { text: "Ок, держи", next: "bad_end" }
    ]
  },

  doubt: {
    from: "friend",
    messages: [
      "Обычный 6-значный код",
      "Или просто подтверди вход тут: https://account-verify-login.com",
      "Я просто восстанавливаю доступ",
      "Мне нужно срочно войти"
    ],
    options: [
      { text: "Позвоню тебе", next: "check" },
      { text: "Ладно отправлю", next: "bad_end" }
    ]
  },

  refuse: {
    from: "friend",
    messages: [
      "Серьёзно?",
      "Я же не просто так прошу",
      "Попробуй войти тут: https://login-support-check.net",
      "Это реально важно сейчас"
    ],
    options: [
      { text: "Проверю тебя", next: "check" },
      { text: "Нет", next: "pressure" }
    ]
  },

  pressure: {
    from: "friend",
    messages: [
      "Ты меня подводишь сейчас",
      "Без кода я теряю доступ",
      "Попробуй ещё раз: https://secure-reset-help.org",
      "Пожалуйста, просто отправь"
    ],
    options: [
      { text: "Игнорировать", next: "good_end" },
      { text: "Отправить код", next: "bad_end" }
    ]
  },

  check: {
    from: "system",
    messages: [
      "Ты звонишь другу",
      "Он говорит, что ничего не писал",
      "Ссылка оказалась фишинговой",
      "Аккаунт пытались взломать"
    ],
    options: [
      { text: "Понятно", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Ты ввёл код или перешёл по ссылке",
      "Сессия аккаунта перехвачена",
      "https://secure-login-reset.com оказался фишинг",
      "Аккаунт украден"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты не повёлся на фишинговые ссылки",
      "Попытка взлома заблокирована",
      "Аккаунт остался в безопасности"
    ],
    end: true
  }
},
bank_login_phish: {
  start: {
    from: "system",
    messages: [
      "Ваша карта временно заблокирована",
      "Подозрительная активность зафиксирована",
      "Подтвердите вход: https://secure-bank-check.com"
    ],
    options: [
      { text: "Перейти по ссылке", next: "site" },
      { text: "Позвонить в банк", next: "good_end" }
    ]
  },

  site: {
    from: "system",
    messages: [
      "Страница банка выглядит официально",
      "Просят логин, пароль и SMS-код"
    ],
    options: [
      { text: "Ввести данные", next: "bad_end" },
      { text: "Закрыть сайт", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Данные введены",
      "Мошенники получили доступ к аккаунту",
      "Деньги списаны"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты позвонил в банк напрямую",
      "Это был фейковый сайт",
      "Доступ защищён"
    ],
    end: true
  }
},

delivery_scam: {
  start: {
    from: "system",
    messages: [
      "Ваша посылка DHL задержана",
      "Требуется оплата доставки",
      "https://dhl-tracking-pay.com"
    ],
    options: [
      { text: "Оплатить", next: "bad_end" },
      { text: "Проверить сайт DHL", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Оплата прошла",
      "Посылки не существует",
      "Деньги потеряны"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил официальный сайт",
      "Это был фейковый трекинг"
    ],
    end: true
  }
},

instagram_verify: {
  start: {
    from: "system",
    messages: [
      "Ваш Instagram будет заблокирован",
      "Подтвердите аккаунт",
      "https://instagram-security-check.com"
    ],
    options: [
      { text: "Войти", next: "site" },
      { text: "Игнорировать", next: "good_end" }
    ]
  },

  site: {
    from: "system",
    messages: [
      "Форма входа Instagram",
      "Просят пароль и 2FA код"
    ],
    options: [
      { text: "Ввести", next: "bad_end" },
      { text: "Закрыть", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Аккаунт украден",
      "Пароль изменён"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проигнорировал фишинг",
      "Аккаунт защищён"
    ],
    end: true
  }
},

fake_antivirus: {
  start: {
    from: "system",
    messages: [
      "Ваш компьютер заражён",
      "Скачайте антивирус: https://secure-cleaner-download.com"
    ],
    options: [
      { text: "Скачать", next: "bad_end" },
      { text: "Проверить источник", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Установлено вредоносное ПО",
      "Данные украдены"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Это был фейковый антивирус",
      "Ты избежал заражения"
    ],
    end: true
  }
},

friend_money_request: {
  start: {
    from: "friend",
    messages: [
      "Срочно нужно 5000₽",
      "https://fast-pay-help.com/send",
      "Верну завтра"
    ],
    options: [
      { text: "Перевести", next: "bad_end" },
      { text: "Позвонить другу", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Деньги отправлены",
      "Аккаунт друга был взломан"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил друга",
      "Это был взлом аккаунта"
    ],
    end: true
  }
},

crypto_airdrop_scam: {
  start: {
    from: "system",
    messages: [
      "Вы получили 2 BTC",
      "Подтвердите вывод: https://crypto-airdrop-win.com"
    ],
    options: [
      { text: "Подключить кошелёк", next: "bad_end" },
      { text: "Игнорировать", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Кошелёк скомпрометирован",
      "Средства украдены"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Это был фейковый airdrop",
      "Ты избежал потери средств"
    ],
    end: true
  }
},


fake_support_call: {
  start: {
    from: "system",
    messages: [
      "Вам звонит поддержка Google",
      "Подозрительный вход в аккаунт",
      "Перейдите: https://google-security-help.com"
    ],
    options: [
      { text: "Войти", next: "site" },
      { text: "Сбросить звонок", next: "good_end" }
    ]
  },

  site: {
    from: "system",
    messages: [
      "Форма Google входа",
      "Просят пароль и код 2FA"
    ],
    options: [
      { text: "Ввести", next: "bad_end" },
      { text: "Закрыть", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Аккаунт Google взломан",
      "Доступ потерян"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты не поверил звонку",
      "Это был фейковый саппорт"
    ],
    end: true
  }
},


job_offer_scam: {
  start: {
    from: "system",
    messages: [
      "Вам одобрили удалённую работу",
      "Заполните форму: https://job-remote-offer.com"
    ],
    options: [
      { text: "Заполнить", next: "bad_end" },
      { text: "Проверить компанию", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Данные украдены",
      "Использованы мошенниками"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Компания оказалась фейковой",
      "Ты избежал обмана"
    ],
    end: true
  }
},


wifi_fake_login: {
  start: {
    from: "system",
    messages: [
      "Вы подключились к Wi-Fi",
      "Требуется авторизация",
      "https://free-wifi-login-secure.com"
    ],
    options: [
      { text: "Войти", next: "site" },
      { text: "Отключиться", next: "good_end" }
    ]
  },

  site: {
    from: "system",
    messages: [
      "Страница входа Wi-Fi",
      "Просят email и пароль"
    ],
    options: [
      { text: "Ввести", next: "bad_end" },
      { text: "Закрыть", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Данные перехвачены",
      "Сессия украдена"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты не ввёл данные",
      "Избежал фишинга"
    ],
    end: true
  }
},

social_engineering_friend_clone: {
  start: {
    from: "friend",
    messages: [
      "Слушай, у меня новый аккаунт",
      "Старый взломали",
      "Добавь меня: https://new-friend-profile.net/add"
    ],
    options: [
      { text: "Добавить", next: "step1" },
      { text: "Проверить", next: "check" }
    ]
  },

  step1: {
    from: "friend",
    messages: [
      "Срочно помоги",
      "Мне нужно восстановить доступ к почте",
      "Код приходит на твой номер"
    ],
    options: [
      { text: "Сказать код", next: "bad_end" },
      { text: "Отказаться", next: "step2" }
    ]
  },

  step2: {
    from: "friend",
    messages: [
      "Я же тебе доверяю",
      "Вот старая переписка: https://chat-backup-view.com",
      "Пожалуйста, это важно"
    ],
    options: [
      { text: "Скинуть код", next: "bad_end" },
      { text: "Проверить звонком", next: "check" }
    ]
  },

  check: {
    from: "system",
    messages: [
      "Ты звонишь другу",
      "Он говорит, что у него один аккаунт и он не писал",
      "Это был клон аккаунта"
    ],
    options: [
      { text: "Понятно", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Код передан злоумышленнику",
      "Оригинальный аккаунт взломан"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты распознал подмену аккаунта",
      "Попытка социальной инженерии провалилась"
    ],
    end: true
  }
},

advanced_phishing_chain_email: {
  start: {
    from: "system",
    messages: [
      "Письмо: 'Подозрительная активность в почте'",
      "Ссылка: https://mail-security-alert.com/login"
    ],
    options: [
      { text: "Открыть ссылку", next: "step1" },
      { text: "Игнорировать", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Интерфейс похож на Gmail",
      "Просят пароль"
    ],
    options: [
      { text: "Ввести пароль", next: "step2" },
      { text: "Закрыть", next: "good_end" }
    ]
  },

  step2: {
    from: "system",
    messages: [
      "Теперь требуется 2FA код",
      "Появляется сообщение: 'ошибка входа, повторите'"
    ],
    options: [
      { text: "Ввести код", next: "bad_end" },
      { text: "Проверить вручную", next: "step3" }
    ]
  },

  step3: {
    from: "system",
    messages: [
      "Ты заходишь на официальный Gmail",
      "Видишь: попытка входа из другой страны",
      "https://mail-security-alert.com оказался подделкой"
    ],
    options: [
      { text: "Понятно", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Почта взломана",
      "Используется для сброса других аккаунтов"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил источник вручную",
      "Фишинг предотвращён"
    ],
    end: true
  }
},

crypto_wallet_multi_attack: {
  start: {
    from: "system",
    messages: [
      "Ваш криптокошелёк заблокирован",
      "Подтвердите восстановление: https://wallet-recovery-crypto.com"
    ],
    options: [
      { text: "Перейти", next: "step1" },
      { text: "Игнорировать", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Запрос seed-фразы",
      "Или вход через расширение браузера"
    ],
    options: [
      { text: "Ввести seed", next: "bad_end" },
      { text: "Отказаться", next: "step2" }
    ]
  },

  step2: {
    from: "system",
    messages: [
      "Появляется второе письмо",
      "https://metamask-restore-login.com",
      "Требуется повторная авторизация"
    ],
    options: [
      { text: "Попробовать снова", next: "bad_end" },
      { text: "Проверить кошелёк", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Seed-фраза украдена",
      "Кошелёк пуст"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил официальный кошелёк",
      "Фишинговая атака остановлена"
    ],
    end: true
  }
},


fake_job_hiring_chain: {
  start: {
    from: "system",
    messages: [
      "Вам одобрена вакансия удалённой работы",
      "Зарплата: $3000",
      "Подтвердите: https://remote-job-offer-hiring.com"
    ],
    options: [
      { text: "Открыть", next: "step1" },
      { text: "Проверить компанию", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Форма регистрации",
      "Просят паспортные данные"
    ],
    options: [
      { text: "Заполнить", next: "step2" },
      { text: "Отказаться", next: "good_end" }
    ]
  },

  step2: {
    from: "system",
    messages: [
      "Теперь просят оплатить 'верификацию'",
      "https://job-verification-pay.com"
    ],
    options: [
      { text: "Оплатить", next: "bad_end" },
      { text: "Закрыть", next: "step3" }
    ]
  },

  step3: {
    from: "system",
    messages: [
      "Ты ищешь компанию в интернете",
      "Её не существует",
      "Это мошеннический сайт"
    ],
    options: [
      { text: "Понятно", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Оплата произведена",
      "Работы не существует"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил компанию",
      "Фейковое трудоустройство раскрыто"
    ],
    end: true
  }
},

real_bank_security_check: {
  start: {
    from: "system",
    messages: [
      "Банк обнаружил подозрительную транзакцию",
      "Сумма: 1200€",
      "Это были вы?"
    ],
    options: [
      { text: "Да, это я", next: "good_end" },
      { text: "Нет, это не я", next: "verify" }
    ]
  },

  verify: {
    from: "system",
    messages: [
      "Операция временно заблокирована",
      "Для безопасности свяжитесь с банком через официальное приложение",
      "Или по номеру на карте"
    ],
    options: [
      { text: "Открыть приложение банка", next: "good_end" },
      { text: "Позвонить по номеру с карты", next: "good_end" }
    ]
  },

  good_end: {
    from: "system",
    messages: [
      "Ты использовал официальные каналы банка",
      "Аккаунт защищён",
      "Подозрительная операция остановлена"
    ],
    end: true
  }
},

two_factor_login_safety: {
  start: {
    from: "system",
    messages: [
      "Вход в аккаунт Google с нового устройства",
      "Локация: Берлин, Германия",
      "Это вы?"
    ],
    options: [
      { text: "Да, это я", next: "good_end" },
      { text: "Нет", next: "step1" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Попытка входа заблокирована",
      "Мы отправили уведомление в приложение Google Authenticator",
      "Подтвердите там"
    ],
    options: [
      { text: "Открыть приложение", next: "good_end" },
      { text: "Сменить пароль", next: "good_end" }
    ]
  },

  good_end: {
    from: "system",
    messages: [
      "Вы подтвердили вход через 2FA",
      "Неиспользованное устройство заблокировано",
      "Безопасность аккаунта сохранена"
    ],
    end: true
  }
},

software_update_legit: {
  start: {
    from: "system",
    messages: [
      "Доступно обновление Windows",
      "Версия: 24H2 Security Patch",
      "Рекомендуется установить"
    ],
    options: [
      { text: "Обновить сейчас", next: "good_end" },
      { text: "Отложить", next: "step1" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Отложенное обновление может снизить безопасность",
      "Уязвимости могут быть активны"
    ],
    options: [
      { text: "Установить обновление", next: "good_end" },
      { text: "Проверить детали", next: "good_end" }
    ]
  },

  good_end: {
    from: "system",
    messages: [
      "Система обновлена",
      "Уязвимости закрыты",
      "Устройство защищено"
    ],
    end: true
  }
},


official_support_case: {
  start: {
    from: "system",
    messages: [
      "Вы открыли тикет в официальной поддержке сервиса",
      "Ответ: мы проверили вашу проблему"
    ],
    options: [
      { text: "Продолжить диалог", next: "step1" },
      { text: "Закрыть тикет", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Поддержка просит уточнить детали",
      "Никогда не просят пароли или коды"
    ],
    options: [
      { text: "Отправить описание проблемы", next: "good_end" },
      { text: "Не отправлять чувствительные данные", next: "good_end" }
    ]
  },

  good_end: {
    from: "system",
    messages: [
      "Вы использовали только официальную поддержку",
      "Никакие личные данные не раскрыты",
      "Обращение закрыто безопасно"
    ],
    end: true
  }
},


device_security_scan: {
  start: {
    from: "system",
    messages: [
      "Запущено сканирование устройства",
      "Обнаружены подозрительные файлы"
    ],
    options: [
      { text: "Удалить угрозы", next: "good_end" },
      { text: "Проверить отчёт", next: "step1" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Файлы проверены антивирусом",
      "Это старые кэш-файлы браузера"
    ],
    options: [
      { text: "Очистить кэш", next: "good_end" },
      { text: "Игнорировать", next: "good_end" }
    ]
  },

  good_end: {
    from: "system",
    messages: [
      "Система проверена",
      "Угроз не обнаружено",
      "Устройство работает нормально"
    ],
    end: true
  }
},


email_account_takeover_chain: {
  start: {
    from: "system",
    messages: [
      "Обнаружен вход в вашу почту",
      "Устройство: iPhone 14",
      "Город: Варшава",
      "https://mail-security-check-login.com"
    ],
    options: [
      { text: "Это не я", next: "step1" },
      { text: "Это я", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Попытка входа заблокирована",
      "Для защиты аккаунта перейдите:",
      "https://mail-security-check-login.com/verify"
    ],
    options: [
      { text: "Перейти", next: "step2" },
      { text: "Открыть Gmail напрямую", next: "good_end" }
    ]
  },

  step2: {
    from: "system",
    messages: [
      "Введите пароль для подтверждения",
      "Также требуется код 2FA"
    ],
    options: [
      { text: "Ввести данные", next: "bad_end" },
      { text: "Закрыть страницу", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Доступ к почте получен злоумышленниками",
      "Используется для сброса других аккаунтов"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты не использовал фишинговую страницу",
      "Аккаунт защищён"
    ],
    end: true
  }
},

fake_telegram_support: {
  start: {
    from: "friend",
    messages: [
      "Срочно!",
      "Твой Telegram будет заблокирован",
      "Подтверди здесь: https://telegram-security-login.com"
    ],
    options: [
      { text: "Перейти по ссылке", next: "step1" },
      { text: "Игнорировать", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Форма входа Telegram",
      "Просят код из SMS"
    ],
    options: [
      { text: "Ввести код", next: "bad_end" },
      { text: "Закрыть сайт", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Аккаунт Telegram украден",
      "Сессия перехвачена"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты не перешёл по фишинговой ссылке",
      "Аккаунт защищён"
    ],
    end: true
  }
},


delivery_sms_chain_scam: {
  start: {
    from: "system",
    messages: [
      "Ваш заказ задержан на складе",
      "Требуется доплата 1.99€",
      "https://dhl-fast-track-pay.com"
    ],
    options: [
      { text: "Оплатить", next: "step1" },
      { text: "Проверить DHL", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Оплата прошла",
      "Но теперь требуется подтверждение карты"
    ],
    options: [
      { text: "Ввести данные карты", next: "bad_end" },
      { text: "Закрыть", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Данные карты украдены",
      "Происходит списание средств"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил официальный сайт доставки",
      "Фейковая SMS-страница заблокирована"
    ],
    end: true
  }
},


crypto_wallet_seed_attack: {
  start: {
    from: "system",
    messages: [
      "Ваш кошелёк MetaMask требует синхронизации",
      "Ошибка сети",
      "https://metamask-sync-wallet.com"
    ],
    options: [
      { text: "Войти", next: "step1" },
      { text: "Игнорировать", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Введите seed-фразу для восстановления",
      "Без неё доступ будет ограничен"
    ],
    options: [
      { text: "Ввести seed", next: "bad_end" },
      { text: "Проверить расширение MetaMask", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Seed-фраза передана злоумышленникам",
      "Кошелёк полностью опустошён"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил официальный MetaMask",
      "Фишинг предотвращён"
    ],
    end: true
  }
},

fake_hr_job_offer_chain: {
  start: {
    from: "system",
    messages: [
      "Вам одобрена вакансия",
      "Компания: RemoteSoft",
      "Зарплата: 4500€",
      "https://remotesoft-hiring-job.com"
    ],
    options: [
      { text: "Открыть форму", next: "step1" },
      { text: "Проверить компанию", next: "good_end" }
    ]
  },

  step1: {
    from: "system",
    messages: [
      "Форма регистрации",
      "Просят паспорт и адрес"
    ],
    options: [
      { text: "Заполнить", next: "step2" },
      { text: "Отказаться", next: "good_end" }
    ]
  },

  step2: {
    from: "system",
    messages: [
      "Теперь требуется 'проверочный взнос' 10€",
      "https://payment-hr-verification.com"
    ],
    options: [
      { text: "Оплатить", next: "bad_end" },
      { text: "Закрыть сайт", next: "step3" }
    ]
  },

  step3: {
    from: "system",
    messages: [
      "Компания не существует в реестрах",
      "Сайт — подделка вакансий"
    ],
    options: [
      { text: "Понятно", next: "good_end" }
    ]
  },

  bad_end: {
    from: "system",
    messages: [
      "Оплата выполнена",
      "Работы не существует",
      "Данные украдены"
    ],
    end: true
  },

  good_end: {
    from: "system",
    messages: [
      "Ты проверил компанию перед действием",
      "Фейковая вакансия выявлена"
    ],
    end: true
  }
},

security_login_alert: {
  start: {
    from: "system",
    messages: [
      "Обнаружен вход в ваш аккаунт",
      "Устройство: Windows / Chrome",
      "Локация: Нидерланды (Амстердам)",
      "Это были вы?"
    ],
    options: [
      { text: "Да, это я", next: "safe_confirm" },
      { text: "Нет, это не я", next: "panic" },
      { text: "Сменить пароль", next: "secure" },
      { text: "Игнорировать", next: "bad_end" }
    ]
  },

  panic: {
    from: "system",
    messages: [
      "Возможный взлом аккаунта",
      "Запущена проверка безопасности",
      "Рекомендуется срочно сменить пароль"
    ],
    options: [
      { text: "Сменить пароль", next: "secure" },
      { text: "Отключить сессии", next: "secure" },
      { text: "Игнорировать", next: "bad_end" }
    ]
  },

  secure: {
    from: "system",
    messages: [
      "Пароль обновлён",
      "Все активные сессии завершены",
      "Аккаунт защищён"
    ],
    end: true
  },

  safe_confirm: {
    from: "system",
    messages: [
      "Подтверждено безопасное устройство",
      "Никаких угроз не обнаружено"
    ],
    end: true
  },

  bad_end: {
    from: "system",
    messages: [
      "Вы проигнорировали подозрительную активность",
      "Возможен доступ третьих лиц"
    ],
    end: true
  }
},


bonus_scam: {
  start: {
    from: "system",
    messages: [
      "Вы получили бонус: 5000₽",
      "Активируйте его сейчас",
      "Ссылка истекает через 10 минут"
    ],
    options: [
      { text: "Активировать", next: "phishing_site" },
      { text: "Проверить источник", next: "check" },
      { text: "Игнорировать", next: "safe" },
      { text: "Удалить сообщение", next: "safe" }
    ]
  },

  phishing_site: {
    from: "system",
    messages: [
      "Сайт просит ввести данные карты",
      "И CVV код для активации бонуса",
      "Вы уверены?"
    ],
    options: [
      { text: "Ввести данные", next: "bad_end" },
      { text: "Закрыть сайт", next: "safe" },
      { text: "Назад", next: "start" }
    ]
  },

  check: {
    from: "system",
    messages: [
      "Официальный сайт не подтверждает акцию",
      "Это мошенническая рассылка"
    ],
    options: [
      { text: "Удалить", next: "safe" },
      { text: "Пожаловаться", next: "safe" }
    ]
  },

  safe: {
    from: "system",
    messages: [
      "Вы не попались на фишинг",
      "Данные в безопасности"
    ],
    end: true
  },

  bad_end: {
    from: "system",
    messages: [
      "Данные введены",
      "Доступ к карте скомпрометирован"
    ],
    end: true
  }
},

support_email_scam: {
  start: {
    from: "system",
    messages: [
      "Письмо от службы поддержки",
      "Ваш аккаунт будет заблокирован через 24 часа",
      "Подтвердите личность по ссылке"
    ],
    options: [
      { text: "Открыть ссылку", next: "phishing" },
      { text: "Проверить отправителя", next: "check" },
      { text: "Игнорировать", next: "safe" },
      { text: "Написать в поддержку вручную", next: "safe" }
    ]
  },

  phishing: {
    from: "system",
    messages: [
      "Сайт просит логин и пароль",
      "Также запрашивает SMS-код"
    ],
    options: [
      { text: "Ввести данные", next: "bad_end" },
      { text: "Закрыть страницу", next: "safe" },
      { text: "Вернуться назад", next: "start" }
    ]
  },

  check: {
    from: "system",
    messages: [
      "Домен отправителя подозрительный",
      "Это фишинговое письмо"
    ],
    options: [
      { text: "Удалить письмо", next: "safe" },
      { text: "Заблокировать отправителя", next: "safe" }
    ]
  },

  safe: {
    from: "system",
    messages: [
      "Ты не попался на фишинг",
      "Аккаунт в безопасности"
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
},

new_device_login: {
  start: {
    from: "system",
    messages: [
      "Обнаружен вход в ваш аккаунт",
      "Устройство: iPhone / Safari",
      "Местоположение: Германия"
    ],
    options: [
      { text: "Это я", next: "safe_confirm" },
      { text: "Сменить пароль", next: "secure" },
      { text: "Заблокировать доступ", next: "secure" },
      { text: "Игнорировать", next: "bad_end" }
    ]
  },

  safe_confirm: {
    from: "system",
    messages: [
      "Вход подтверждён",
      "Устройство добавлено в доверенные"
    ],
    end: true
  },

  secure: {
    from: "system",
    messages: [
      "Пароль изменён",
      "Все сессии завершены"
    ],
    end: true
  },

  bad_end: {
    from: "system",
    messages: [
      "Вы не отреагировали",
      "Возможен несанкционированный доступ"
    ],
    end: true
  }
},


gaming_giveaway: {
  start: {
    from: "system",
    messages: [
      "Вы выиграли 100$ в Steam",
      "Активируйте код до истечения времени",
      "Ссылка: steam-reward.claim-now.net"
    ],
    options: [
      { text: "Открыть ссылку", next: "phishing" },
      { text: "Проверить сайт", next: "check" },
      { text: "Игнорировать", next: "safe" },
      { text: "Пожаловаться", next: "safe" }
    ]
  },

  phishing: {
    from: "system",
    messages: [
      "Сайт просит Steam логин",
      "И код из email"
    ],
    options: [
      { text: "Ввести данные", next: "bad_end" },
      { text: "Закрыть вкладку", next: "safe" }
    ]
  },

  check: {
    from: "system",
    messages: [
      "Steam не проводит такие акции",
      "Это фишинговый сайт"
    ],
    options: [
      { text: "Удалить сообщение", next: "safe" }
    ]
  },

  safe: {
    from: "system",
    messages: [
      "Ты не попался на фейковый розыгрыш",
      "Данные в безопасности"
    ],
    end: true
  },

  bad_end: {
    from: "system",
    messages: [
      "Аккаунт украден",
      "Пароль изменён злоумышленником"
    ],
    end: true
  }
},


delivery_notice_fake: {
  start: {
    from: "system",
    messages: [
      "Посылка не может быть доставлена",
      "Необходимо оплатить 1.99€ пошлины",
      "Срок: 2 часа"
    ],
    options: [
      { text: "Оплатить", next: "pay" },
      { text: "Проверить трек-номер", next: "check" },
      { text: "Игнорировать", next: "safe" },
      { text: "Удалить сообщение", next: "safe" }
    ]
  },

  pay: {
    from: "system",
    messages: [
      "Введите данные карты",
      "Для подтверждения оплаты"
    ],
    options: [
      { text: "Ввести данные", next: "bad_end" },
      { text: "Закрыть сайт", next: "safe" }
    ]
  },

  check: {
    from: "system",
    messages: [
      "Официальный DHL не требует оплату через такие ссылки",
      "Это фишинг"
    ],
    options: [
      { text: "Понятно", next: "safe" }
    ]
  },

  safe: {
    from: "system",
    messages: [
      "Ты избежал мошенничества",
      "Никаких реальных платежей не требовалось"
    ],
    end: true
  },

  bad_end: {
    from: "system",
    messages: [
      "Данные карты украдены",
      "Произошли списания"
    ],
    end: true
  }
},









}

