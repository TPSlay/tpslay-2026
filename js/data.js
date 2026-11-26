/**
 * TPSLAY 2026 — База номинаций и кандидатов
 * Группа ТПС-108
 *
 * 18 официальных номинаций.
 */

const NOMINATIONS = [
  {
    "id": 1,
    "title": "Соня года",
    "badge": "Sleep Master",
    "description": "Легенда задних парт, способный уснуть под стук колёс и любую лекцию.",
    "icon": "moon",
    "nominees": [
      {
        "id": "nom_1_1",
        "name": "Виктор Бакалёв",
        "tagline": "Засыпает ещё до того, как лектор открыл презентацию",
        "photo": "assets/nominees/Bakalev.png",
        "video": "assets/nominees/jopa.mp4",
        "videoTitle": "Сон в позе мыслителя"
      },
      {
        "id": "nom_1_2",
        "name": "Бауржан Нурмашев",
        "tagline": "Спит с открытыми глазами и кивает в такт словам препода",
        "photo": "assets/nominees/Nurmashev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_1_3",
        "name": "Алексей Бурыкин",
        "tagline": "Просыпается ровно со звонком, даже если шла пара по высшей математике",
        "photo": "assets/nominees/Burikin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_1_4",
        "name": "Богдан Морозов",
        "tagline": "Приносит в аудиторию анатомическую подушку и плед",
        "photo": "assets/nominees/nom1_4.jpg",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 2,
    "title": "Обжора года",
    "badge": "Food Lover",
    "description": "Главный ценитель столовой, буфета и перекусов на каждой паре.",
    "icon": "utensils",
    "nominees": [
      {
        "id": "nom_2_1",
        "name": "Кирилл Скрыпников",
        "tagline": "Знает точное расписание свежих сосисок в тесте до секунды",
        "photo": "assets/nominees/Skrypnikov.png",
        "video": null,
        "videoTitle": "Тайный обед на задней парте"
      },
      {
        "id": "nom_2_2",
        "name": "Максим Рыжов",
        "tagline": "Приносит на пары контейнер с тремя сменами блюд",
        "photo": "assets/nominees/Ryzhov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_2_3",
        "name": "Дмитрий Воропаев",
        "tagline": "Слышит хруст пачки чипсов через две аудитории",
        "photo": "assets/nominees/Voropaev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_2_4",
        "name": "Егор Попов",
        "tagline": "Оставил в буфете половину стипендии за один семестр",
        "photo": "assets/nominees/nom2_4.jpg",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 3,
    "title": "Пиздабол года",
    "badge": "Fairy Tales",
    "description": "Мастер сказок, историй про «я завтра точно буду к первой паре» и невероятных легенд.",
    "icon": "ghost",
    "nominees": [
      {
        "id": "nom_3_1",
        "name": "Артём Ковалёв",
        "tagline": "«Брат, я уже выхожу, через пять минут буду» (ещё спит)",
        "photo": "assets/nominees/nom3_1.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_3_2",
        "name": "Дмитрий Воропаев",
        "tagline": "они пиздят",
        "photo": "assets/nominees/Voropaev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_3_3",
        "name": "Марсель Хисамов",
        "tagline": "Рассказывает такие истории, что даже препод заслушался",
        "photo": "assets/nominees/Hisamov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_3_4",
        "name": "Максим Владимиров",
        "tagline": "«Я не пил, я просто устал и глаза слипаются»",
        "photo": "assets/nominees/Vladimirov.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 4,
    "title": "Подлиза года",
    "badge": "Chief Diplomat",
    "description": "Мастер дипломатии и переговоров с преподавателями на высшем уровне.",
    "icon": "handshake",
    "nominees": [
      {
        "id": "nom_4_1",
        "name": "Иван Смирнов",
        "tagline": "«А ваша статья 2008 года — это шедевр научной мысли!»",
        "photo": "assets/nominees/nom3_1.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_4_2",
        "name": "Марсель Хисамов",
        "tagline": "Первый вызывается стереть с доски и включить проектор",
        "photo": "assets/nominees/Hisamov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_4_3",
        "name": "Кирилл Скрыпников",
        "tagline": "Знает клички всех кошек преподавателя по электромеханике",
        "photo": "assets/nominees/Skrypnikov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_4_4",
        "name": "Кирилл Дергач",
        "tagline": "Умеет так кивать на лекции, что препод читает только для него",
        "photo": "assets/nominees/Dergach.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 5,
    "title": "Мажор года",
    "badge": "Luxury Vibe",
    "description": "Человек на роскошном движении, чьи покупки и вайб вызывают белую зависть.",
    "icon": "gem",
    "nominees": [
      {
        "id": "nom_5_1",
        "name": "Максим Петров",
        "tagline": "Приезжает на пары на такси категории Ultima",
        "photo": "assets/nominees/nom4_1.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_5_2",
        "name": "Матвей Веснин",
        "tagline": "Каждый месяц новый гаджет с яблоком на крышке",
        "photo": "assets/nominees/Vesnin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_5_3",
        "name": "Бауржан Нурмашев",
        "tagline": "Кофе только из спешелти-кофеен, обед — только в ресторанах",
        "photo": "assets/nominees/Nurmashev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_5_4",
        "name": "Максим Рыжов",
        "tagline": "Вайб будущего топ-менеджера РЖД уже на третьем курсе",
        "photo": "assets/nominees/Ryzhov.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 6,
    "title": "Мразь года",
    "badge": "Pure Menace",
    "description": "Главный токсик и тролль группы: мастер подколов, спойлеров и коварных подстав.",
    "icon": "skull",
    "nominees": [
      {
        "id": "nom_6_1",
        "name": "Максим Владимиров",
        "tagline": "Напомнил преподу спросить домашку, которую никто не сделал",
        "photo": "assets/nominees/Vladimirov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_6_2",
        "name": "Данил Соколов",
        "tagline": "Сдаёт лабораторную последним и забирает все оставшиеся варианты",
        "photo": "assets/nominees/Sokolov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_6_3",
        "name": "Дмитрий Воропаев",
        "tagline": "это неправда я не мразь голосуйте в соколова",
        "photo": "assets/nominees/Voropaev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_6_4",
        "name": "Максим Рыжов",
        "tagline": "Скидывает в чат ответы с ошибками и смотрит на реакцию",
        "photo": "assets/nominees/Ryzhov.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 7,
    "title": "Сплетник года",
    "badge": "Insider 24/7",
    "description": "Главный инсайдер ТПС-108, который узнаёт все новости раньше деканата.",
    "icon": "message",
    "nominees": [
      {
        "id": "nom_7_1",
        "name": "Данил Соколов",
        "tagline": "Знает расписание сессии до того, как его составили на кафедре",
        "photo": "assets/nominees/Sokolov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_7_2",
        "name": "Дмитрий Воропаев",
        "tagline": "Сеть информаторов по всем факультетам и общежитиям",
        "photo": "assets/nominees/Voropaev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_7_3",
        "name": "Марсель Хисамов",
        "tagline": "«Девочки, вы сейчас упадёте, что мне только что рассказали…»",
        "photo": "assets/nominees/Hisamov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_7_4",
        "name": "Артём Ковалёв",
        "tagline": "Главный узел связи всех чатов и пересылок института",
        "photo": "assets/nominees/nom5_4.jpg",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 8,
    "title": "Стиляга года",
    "badge": "Fashion Icon",
    "description": "Икона стиля группы: всегда безупречный внешний вид и лучшие образы.",
    "icon": "glasses",
    "nominees": [
      {
        "id": "nom_8_1",
        "name": "Дарья Андреева",
        "tagline": "Коридоры универа — её личный подиум Paris Fashion Week",
        "photo": "assets/nominees/nom6_1.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_8_2",
        "name": "Кирилл Дергач",
        "tagline": "Обувь всегда чище, чем совесть перед сессией",
        "photo": "assets/nominees/Dergach.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_8_3",
        "name": "Екатерина Зайцева",
        "tagline": "Эстетика в деталях: украшения, парфюм и идеальный оверсайз",
        "photo": "assets/nominees/nom6_3.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_8_4",
        "name": "Виктор Бакалев",
        "tagline": "Кастомный стритвир и самый свежий дроп кроссовок",
        "photo": "assets/nominees/Bakalev.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 9,
    "title": "Пара года",
    "badge": "Best Duo",
    "description": "Самый гармоничный и запоминающийся дуэт нашей группы.",
    "icon": "heart",
    "nominees": [
      {
        "id": "nom_9_1",
        "name": "Дергач Кирилл & Максим Рыжов",
        "tagline": "Синхронное закатывание глаз на первой паре в субботу",
        "photo": "assets/nominees/Dergach_Ryzhov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_9_2",
        "name": "Павел Штакин & Сергей Шахов",
        "tagline": "Идеальный тандем по разделению конспектов и домашек",
        "photo": "assets/nominees/Shtakin_Shahov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_9_3",
        "name": "Дмитрий Стрельников & Матвей Веснин",
        "tagline": "Бро-союз, неразлучный со времен первой линейки первого курса",
        "photo": "assets/nominees/Strelnikov_Vesnin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_9_4",
        "name": "Максим Рыжов & Кирилл Скрыпников",
        "tagline": "Главная романтическая интрига весеннего семестра",
        "photo": "assets/nominees/Ryzhov_Skrypnikov.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 10,
    "title": "Еблан года",
    "badge": "Zero Logic",
    "description": "Человек, чьи гениальные решения и поступки не поддаются никаким законам физики и логики.",
    "icon": "alertTriangle",
    "nominees": [
      {
        "id": "nom_10_1",
        "name": "Алексей Бурыкин",
        "tagline": "Пришёл на пару не в тот корпус и понял это только к концу лекции",
        "photo": "assets/nominees/Burikin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_10_2",
        "name": "Марсель Хисамов",
        "tagline": "Забыл выключить микрофон в зуме в самый неподходящий момент",
        "photo": "assets/nominees/Hisamov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_10_3",
        "name": "Максим Владимиров",
        "tagline": "Поставил будильник на 07:00 вечера вместо утра и удивился",
        "photo": "assets/nominees/Vladimirov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_10_4",
        "name": "Бауржан Нурмашев",
        "tagline": "Случайно удалил курсач за 5 минут до отправки и создал новый",
        "photo": "assets/nominees/Nurmashev.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 11,
    "title": "Голос группы",
    "badge": "Big Voice",
    "description": "Самый громкий, узнаваемый или музыкальный голос, без которого не проходит ни один день.",
    "icon": "mic",
    "nominees": [
      {
        "id": "nom_11_1",
        "name": "Матвей Веснин",
        "tagline": "Бас, от которого вибрируют стекла в аудитории 402",
        "photo": "assets/nominees/Vesnin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_11_2",
        "name": "Дмитрий Стрельников",
        "tagline": "Слышно с любого конца коридора даже во время перемены",
        "photo": "assets/nominees/Strelnikov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_11_3",
        "name": "Кирилл Дергач",
        "tagline": "Главный вокалист на всех спонтанных гитарных сходках",
        "photo": "assets/nominees/Dergach.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_11_4",
        "name": "Кирилл Скрыпников",
        "tagline": "Умеет одним выкриком вернуть внимание всей аудитории",
        "photo": "assets/nominees/Skrypnikov.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 12,
    "title": "Гений года",
    "badge": "Big Brain",
    "description": "Мозговой центр группы, спасающий всех на зачётах, экзаменах и сложных парах.",
    "icon": "cpu",
    "nominees": [
      {
        "id": "nom_12_1",
        "name": "Дмитрий Кузнецов",
        "tagline": "Пишет расчёты тяги тепловоза в уме быстрее калькулятора",
        "photo": "assets/nominees/nom9_1.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_12_2",
        "name": "Виктория Макарова",
        "tagline": "Хранительница идеальных конспектов, на которые молится вся группа",
        "photo": "assets/nominees/nom9_2.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_12_3",
        "name": "Максим Владимиров",
        "tagline": "Решает задачу повышенной сложности пока препод чертит схему",
        "photo": "assets/nominees/Vladimirov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_12_4",
        "name": "Павел Штакин",
        "tagline": "Тот самый человек, чьи голосовые с объяснениями слушают ночью перед экзаменом",
        "photo": "assets/nominees/Shtakin.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 13,
    "title": "Мем года",
    "badge": "Meme Generator",
    "description": "Человек-генератор локальных шуток, фраз и ситуаций, которые разошлись на цитаты.",
    "icon": "masks",
    "nominees": [
      {
        "id": "nom_13_1",
        "name": "Илья Лебедев",
        "tagline": "Автор стикерпака, за который можно вылететь из института",
        "photo": "assets/nominees/nom10_1.jpg",
        "video": null,
        "videoTitle": "Легендарный ответ на коллоквиуме"
      },
      {
        "id": "nom_13_2",
        "name": "Матвей Веснин",
        "tagline": "Одной фразой срывает пары и отправляет всю группу под стол",
        "photo": "assets/nominees/Vesnin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_13_3",
        "name": "Максим Николаев",
        "tagline": "Превратил сдачу лабораторных по электровозам в стендап",
        "photo": "assets/nominees/Nikolaev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_13_4",
        "name": "Максим Владимиров",
        "tagline": "Живой шаблон мема в любой жизненной ситуации",
        "photo": "assets/nominees/Vladimirov.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 14,
    "title": "Харизма года",
    "badge": "Main Character",
    "description": "Человек, который притягивает внимание и заряжает атмосферу в любой компании.",
    "icon": "flame",
    "nominees": [
      {
        "id": "nom_14_1",
        "name": "Михаил Семёнов",
        "tagline": "Заходит в аудиторию как рок-звезда на стадион",
        "photo": "assets/nominees/nom11_1.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_14_2",
        "name": "Богдан Морозов",
        "tagline": "Его смех эхом разносится по всему третьему этажу",
        "photo": "assets/nominees/nom11_2.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_14_3",
        "name": "Кирилл Дергач",
        "tagline": "Любой скучный день превращает в праздничный ивент",
        "photo": "assets/nominees/Dergach.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_14_4",
        "name": "Матвей Веснин",
        "tagline": "Обаяние 100-го уровня: даже строгие преподы улыбаются",
        "photo": "assets/nominees/Vesnin.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 15,
    "title": "Фотограф года",
    "badge": "Archive King",
    "description": "Главный архивариус группы, у которого есть компромат и лучшие кадры со всех событий.",
    "icon": "camera",
    "nominees": [
      {
        "id": "nom_15_1",
        "name": "Кирилл Дергач",
        "tagline": "Снимет тебя так, что сразу поставишь на аватарку во всех соцсетях",
        "photo": "assets/nominees/Dergach.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_15_2",
        "name": "Алексей Соколов",
        "tagline": "Хранит 128 ГБ спящих одногруппников для шантажа перед дипломом",
        "photo": "assets/nominees/nom12_2.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_15_3",
        "name": "Дмитрий Воропаев",
        "tagline": "фото нахуй фотограф",
        "photo": "assets/nominees/Voropaev.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_15_4",
        "name": "Полина Соловьёва",
        "tagline": "Главный хроникёр сторис и кружочков в Telegram-чате группы",
        "photo": "assets/nominees/nom12_4.jpg",
        "video": null,
        "videoTitle": null
      }
    ],
    "gallery": [
      {
        "src": "assets/gallery/photo_1.jpg",
        "title": "Легендарный кадр с первой пары",
        "author": "Кирилл Дергач",
        "subtitle": "Архив ТПС-108",
        "meta": [
          { "label": "Автор", "value": "Кирилл Дергач" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_2.jpg",
        "title": "Сон на задней парте",
        "author": "Алексей Соколов",
        "subtitle": "Компромат",
        "meta": [
          { "label": "Автор", "value": "Алексей Соколов" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_3.jpg",
        "title": "Выезд в депо",
        "author": "Дмитрий Воропаев",
        "subtitle": "Репортаж",
        "meta": [
          { "label": "Автор", "value": "Дмитрий Воропаев" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_4.jpg",
        "title": "Перемена в буфете",
        "author": "Полина Соловьёва",
        "subtitle": "Сторис",
        "meta": [
          { "label": "Автор", "value": "Полина Соловьёва" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_5.jpg",
        "title": "Настроение перед зачётом",
        "author": "Кирилл Дергач",
        "subtitle": "Портрет",
        "meta": [
          { "label": "Автор", "value": "Кирилл Дергач" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_6.jpg",
        "title": "Пойман с поличным",
        "author": "Дмитрий Воропаев",
        "subtitle": "Скрытая камера",
        "meta": [
          { "label": "Автор", "value": "Дмитрий Воропаев" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_7.jpg",
        "title": "Общий движ после пар",
        "author": "Алексей Соколов",
        "subtitle": "Вечер",
        "meta": [
          { "label": "Автор", "value": "Алексей Соколов" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_8.jpg",
        "title": "Эстетика коридора",
        "author": "Полина Соловьёва",
        "subtitle": "Стиль",
        "meta": [
          { "label": "Автор", "value": "Полина Соловьёва" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_9.jpg",
        "title": "Ночная подготовка к курсачу",
        "author": "Кирилл Дергач",
        "subtitle": "Дедлайн",
        "meta": [
          { "label": "Автор", "value": "Кирилл Дергач" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_10.jpg",
        "title": "Рандомный кадр года",
        "author": "Дмитрий Воропаев",
        "subtitle": "Без фильтров",
        "meta": [
          { "label": "Автор", "value": "Дмитрий Воропаев" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_11.jpg",
        "title": "Легендарная улыбка",
        "author": "Алексей Соколов",
        "subtitle": "Архив",
        "meta": [
          { "label": "Автор", "value": "Алексей Соколов" },
          { "label": "Год", "value": "2026" }
        ]
      },
      {
        "src": "assets/gallery/photo_12.jpg",
        "title": "Финал третьего курса",
        "author": "Полина Соловьёва",
        "subtitle": "ТПС-108",
        "meta": [
          { "label": "Автор", "value": "Полина Соловьёва" },
          { "label": "Год", "value": "2026" }
        ]
      }
    ]
  },
  {
    "id": 16,
    "title": "Перевоплощение года",
    "badge": "Total Upgrade",
    "description": "Самый яркий апгрейд, смена имиджа или раскрытие с совершенно новой стороны.",
    "icon": "sparkles",
    "nominees": [
      {
        "id": "nom_16_1",
        "name": "Алексей Бурыкин",
        "tagline": "От скромного парня с задней парты до души любой вечеринки",
        "photo": "assets/nominees/Burikin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_16_2",
        "name": "Сергей Шахов",
        "tagline": "Кардинальная смена причёски, стиля и взгляда на жизнь",
        "photo": "assets/nominees/Shahov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_16_3",
        "name": "Артур Абызов",
        "tagline": "Неожиданно начала закрывать все хвосты с первой попытки",
        "photo": "assets/nominees/Abyzov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_16_4",
        "name": "Бауржан Нурмашев",
        "tagline": "Прокачался в качалке так, что парты трещат",
        "photo": "assets/nominees/Nurmashev.png",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 17,
    "title": "Завоз года",
    "badge": "Big Drop",
    "description": "Самый эпичный, неожиданный или легендарный поступок за весь учебный год.",
    "icon": "zap",
    "nominees": [
      {
        "id": "nom_17_1",
        "name": "Владислав Новиков",
        "tagline": "Сдал курсач за 15 минут до дедлайна после бессонной недели",
        "photo": "assets/nominees/nom14_1.jpg",
        "video": null,
        "videoTitle": "Финальный клик перед закрытием ведомости"
      },
      {
        "id": "nom_17_2",
        "name": "Кирилл Козлов",
        "tagline": "Завёз колонку и устроил рейв в пустой лекционной",
        "photo": "assets/nominees/nom14_2.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_17_3",
        "name": "Матвей Павлов",
        "tagline": "Договорился об автомате для всей подгруппы за 2 шутки",
        "photo": "assets/nominees/nom14_3.jpg",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_17_4",
        "name": "Артём Ковалёв",
        "tagline": "Пришёл на пересдачу в костюме-тройке и спасся на 3.0",
        "photo": "assets/nominees/nom14_4.jpg",
        "video": null,
        "videoTitle": null
      }
    ]
  },
  {
    "id": 18,
    "title": "TPS KING",
    "badge": "The Ultimate Crown",
    "description": "Главная награда премии: абсолютный король и легенда группы ТПС-108 в 2026 году.",
    "icon": "crown",
    "nominees": [
      {
        "id": "nom_18_1",
        "name": "Дмитрий Стрельников",
        "tagline": "Бессменный двигатель группы, душа компании и человек-оркестр",
        "photo": "assets/nominees/Strelnikov.png",
        "video": null,
        "videoTitle": "Тронная речь кандидата"
      },
      {
        "id": "nom_18_2",
        "name": "Абызов Артур",
        "tagline": "Надежный как советский тепловоз 2ТЭ10М и верный друг",
        "photo": "assets/nominees/Abyzov.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_18_3",
        "name": "Павел Штакин",
        "tagline": "Король атмосферы и зачинщик всех лучших воспоминаний третьего курса",
        "photo": "assets/nominees/Shtakin.png",
        "video": null,
        "videoTitle": null
      },
      {
        "id": "nom_18_4",
        "name": "Дмитрий Воропаев",
        "tagline": "Абсолютный авторитет и главный харизматик потока",
        "photo": "assets/nominees/Voropaev.png",
        "video": null,
        "videoTitle": null
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = NOMINATIONS;
}
