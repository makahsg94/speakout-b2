type VocabItem = {
  word: string
  meaning?: string
  translation?: string
  note?: string
  example?: string
}

type VocabGroup = {
  id: string
  title: string
  lessonCode: string
  page: number
  intro?: string
  items: VocabItem[]
}

// Vocabulary Bank from the Speakout 3rd Edition B2 Student's Book
// (printed pages 136-141). All words, examples and definitions are taken
// from the book; the source provides no Arabic translations or accent audio.
export const vocabGroups: VocabGroup[] = [
  {
    "id": "1a",
    "title": "suffixes",
    "lessonCode": "1A",
    "page": 8,
    "intro": "Vocabulary Bank, page 136 · Audio VB1.01",
    "items": [
      {
        "word": "reliable",
        "translation": "موثوق",
"example": "We can depend on Sam to be here on time. He’s very reliable."
      },
      {
        "word": "emotional",
        "translation": "عاطفي",
"example": "Melissa became quite emotional as she was watching the film."
      },
      {
        "word": "practical",
        "translation": "عملي",
"example": "Al will need some help setting up the new printer. He’s not very practical."
      },
      {
        "word": "optimistic",
        "translation": "متفائل",
"example": "I love the fact that Leo is always so optimistic about life!"
      },
      {
        "word": "talented",
        "translation": "موهوب",
"example": "Sasha is a really talented musician."
      },
      {
        "word": "helpful",
        "translation": "مُعين / مفيد",
"example": "Thanks for moving those boxes – it was really helpful."
      },
      {
        "word": "thoughtful",
        "translation": "راعٍ ومهتم",
"example": "It was very thoughtful of you to send those flowers to cheer me up!"
      },
      {
        "word": "sociable",
        "translation": "اجتماعي",
"example": "I don’t think I’ll go to the party – I’m not feeling very sociable today."
      },
      {
        "word": "adventurous",
        "translation": "مغامر",
"example": "I’m not adventurous enough to go paragliding!"
      },
      {
        "word": "ambitious",
        "translation": "طموح",
"example": "I’m sure she’ll be prime minister one day. She’s incredibly ambitious."
      },
      {
        "word": "experienced",
        "translation": "ذو خبرة",
"note": "experience + -ed"
      },
      {
        "word": "relaxed",
        "translation": "مرتاح / هادئ",
"note": "relax + -ed"
      },
      {
        "word": "optimistic",
        "translation": "متفائل",
"note": "optimist + -ic"
      },
      {
        "word": "pessimistic",
        "translation": "متشائم",
"note": "pessimist + -ic"
      },
      {
        "word": "realistic",
        "translation": "واقعي",
"note": "realist + -ic"
      },
      {
        "word": "generous",
        "translation": "كريم",
"note": "gener + -ous"
      },
      {
        "word": "reliable",
        "translation": "موثوق",
"note": "reli + -able"
      },
      {
        "word": "thoughtful",
        "translation": "راعٍ ومهتم",
"note": "thought + -ful"
      },
      {
        "word": "cheerful",
        "translation": "مبتهج",
"note": "cheer + -ful"
      },
      {
        "word": "practical",
        "translation": "عملي",
"note": "practic + -al"
      },
      {
        "word": "musical",
        "translation": "موسيقي",
"note": "music + -al"
      }
    ]
  },
  {
    "id": "1b",
    "title": "idioms: memory",
    "lessonCode": "1B",
    "page": 12,
    "intro": "Vocabulary Bank, page 136 · Audio VB1.02",
    "items": [
      {
        "word": "go in one ear and out the other",
        "translation": "يدخل من أذن ويخرج من الأخرى",
"example": "He never remembers anything I tell him! Things go in one ear and out the other."
      },
      {
        "word": "slip my mind",
        "translation": "ينساني / يغيب عن ذهني",
"example": "Sorry, it totally slipped my mind."
      },
      {
        "word": "refresh my memory",
        "translation": "ينعش ذاكرتي",
"example": "I’ll need to look at my notes again to refresh my memory."
      },
      {
        "word": "on the tip of my tongue",
        "translation": "على طرف لساني",
"example": "The answer is on the tip of my tongue!"
      },
      {
        "word": "ring a bell",
        "translation": "يبدو مألوفًا",
"example": "I’m sure I’ve heard that name before. It definitely rings a bell."
      },
      {
        "word": "play tricks on me",
        "translation": "تخدعني (ذاكرتي)",
"example": "My memory is playing tricks on me."
      }
    ]
  },
  {
    "id": "2a",
    "title": "word families",
    "lessonCode": "2A",
    "page": 20,
    "intro": "Vocabulary Bank, page 137",
    "items": [
      {
        "word": "research",
        "translation": "بحث / يبحث"
},
      {
        "word": "predict",
        "translation": "يتنبأ"
},
      {
        "word": "prediction",
        "translation": "تنبؤ"
},
      {
        "word": "predictably",
        "translation": "كما هو متوقع"
},
      {
        "word": "virtual",
        "translation": "افتراضي"
},
      {
        "word": "virtually",
        "translation": "تقريبًا / افتراضيًا"
},
      {
        "word": "remotely",
        "translation": "عن بُعد"
},
      {
        "word": "analyse",
        "translation": "يحلل"
},
      {
        "word": "analyst",
        "translation": "محلل"
},
      {
        "word": "analytical",
        "translation": "تحليلي"
},
      {
        "word": "analytically",
        "translation": "بشكل تحليلي"
},
      {
        "word": "science",
        "translation": "علم"
},
      {
        "word": "scientist",
        "translation": "عالم"
},
      {
        "word": "scientific",
        "translation": "علمي"
}
    ]
  },
  {
    "id": "3a",
    "title": "the environment",
    "lessonCode": "3A",
    "page": 32,
    "intro": "Vocabulary Bank, page 137 · Audio VB3.01",
    "items": [
      {
        "word": "solar power",
        "translation": "طاقة شمسية",
"meaning": "Electricity produced using energy from the sun."
      },
      {
        "word": "(natural) resources",
        "translation": "موارد (طبيعية)",
"meaning": "Things that a country, person or organisation has that they can use."
      },
      {
        "word": "clean-up",
        "translation": "حملة تنظيف",
"meaning": "An event which is organised in order to make a place clean."
      },
      {
        "word": "carbon emissions",
        "translation": "انبعاثات كربونية",
"meaning": "When gases responsible for global warming are released into the air."
      },
      {
        "word": "sustainable",
        "translation": "مستدام",
"meaning": "Used to describe an activity that you can continue without causing damage to the environment."
      },
      {
        "word": "renewable",
        "translation": "متجدد",
"meaning": "Used to describe something which can replace itself naturally, or be easily replaced."
      },
      {
        "word": "carbon footprint",
        "translation": "البصمة الكربونية"
},
      {
        "word": "recycling",
        "translation": "إعادة التدوير"
}
    ]
  },
  {
    "id": "3b",
    "title": "phrasal verbs: communication",
    "lessonCode": "3B",
    "page": 35,
    "intro": "Vocabulary Bank, page 138",
    "items": [
      {
        "word": "speak up",
        "translation": "يتكلم بصوت أعلى / يعبر بوضوح"
},
      {
        "word": "point out",
        "translation": "يشير إلى / ينبه إلى"
},
      {
        "word": "spell out",
        "translation": "يشرح بوضوح وتفصيل"
},
      {
        "word": "move on",
        "translation": "ينتقل (لموضوع آخر) / يمضي قدمًا"
},
      {
        "word": "keep quiet",
        "translation": "يلتزم الصمت"
},
      {
        "word": "bring up",
        "translation": "يطرح (موضوعًا)"
},
      {
        "word": "come back",
        "translation": "يعود / يرجع للموضوع"
},
      {
        "word": "come across",
        "translation": "يبدو / يُفهَم على أنه"
},
      {
        "word": "get my message across",
        "translation": "يوصل رسالته بوضوح"
}
    ]
  },
  {
    "id": "4a",
    "title": "illness and treatment",
    "lessonCode": "4A",
    "page": 44,
    "intro": "Vocabulary Bank, page 138",
    "items": [
      {
        "word": "antibiotics",
        "translation": "مضادات حيوية"
},
      {
        "word": "first aid",
        "translation": "إسعافات أولية"
},
      {
        "word": "medication",
        "translation": "دواء / علاج"
},
      {
        "word": "vaccine",
        "translation": "لقاح"
},
      {
        "word": "asthma",
        "translation": "ربو"
},
      {
        "word": "allergies",
        "translation": "حساسية"
}
    ]
  },
  {
    "id": "4c",
    "title": "sport, motivation and benefits",
    "lessonCode": "4C",
    "page": 50,
    "intro": "Vocabulary Bank, page 139",
    "items": [
      {
        "word": "confidence",
        "translation": "ثقة بالنفس",
"meaning": "the feeling that you are able to do something"
      },
      {
        "word": "teamwork",
        "translation": "عمل جماعي",
"meaning": "working together with other people"
      },
      {
        "word": "benefit",
        "translation": "فائدة / ميزة",
"meaning": "an advantage of doing something"
      },
      {
        "word": "habit",
        "translation": "عادة",
"meaning": "something that you do regularly"
      },
      {
        "word": "motivation",
        "translation": "دافع / حافز",
"meaning": "the feeling of wanting to do something"
      },
      {
        "word": "encouragement",
        "translation": "تشجيع",
"meaning": "gently persuading someone to do something"
      },
      {
        "word": "incentive",
        "translation": "حافز",
"meaning": "something which makes you want to do or achieve something"
      },
      {
        "word": "discipline",
        "translation": "انضباط",
"meaning": "the ability to continue doing something, even when you don’t really want to do it"
      },
      {
        "word": "challenge",
        "translation": "تحدٍ",
"meaning": "something which is difficult to achieve"
      },
      {
        "word": "stamina",
        "translation": "قوة تحمل"
},
      {
        "word": "opponent",
        "translation": "خصم / منافس"
},
      {
        "word": "trophies",
        "translation": "كؤوس / جوائز"
},
      {
        "word": "cooperation",
        "translation": "تعاون"
},
      {
        "word": "fitness",
        "translation": "لياقة بدنية"
}
    ]
  },
  {
    "id": "5b",
    "title": "areas of work",
    "lessonCode": "5B",
    "page": 59,
    "intro": "Vocabulary Bank, page 140 · Audio VB5.01",
    "items": [
      {
        "word": "accountancy",
        "translation": "محاسبة"
},
      {
        "word": "agriculture",
        "translation": "زراعة"
},
      {
        "word": "banking",
        "translation": "أعمال مصرفية"
},
      {
        "word": "construction",
        "translation": "بناء / تشييد"
},
      {
        "word": "consultancy",
        "translation": "استشارات"
},
      {
        "word": "journalism",
        "translation": "صحافة"
},
      {
        "word": "medicine",
        "translation": "طب"
},
      {
        "word": "publishing",
        "translation": "نشر"
},
      {
        "word": "research",
        "translation": "بحث / يبحث"
},
      {
        "word": "social work",
        "translation": "عمل اجتماعي"
}
    ]
  },
  {
    "id": "6a",
    "title": "prefixes",
    "lessonCode": "6A",
    "page": 68,
    "intro": "Vocabulary Bank, page 140 · prefixes: dis-, im-, mis-, re-, sub-",
    "items": [
      {
        "word": "imperfect",
        "translation": "غير كامل / ناقص",
"note": "im- + perfect"
      },
      {
        "word": "impatient",
        "translation": "غير صبور",
"note": "im- + patient"
      },
      {
        "word": "dishonest",
        "translation": "غير أمين",
"note": "dis- + honest"
      },
      {
        "word": "disappear",
        "translation": "يختفي",
"note": "dis- + appear"
      },
      {
        "word": "retrain",
        "translation": "يعيد التدريب",
"note": "re- + train"
      },
      {
        "word": "rewrite",
        "translation": "يعيد الكتابة",
"note": "re- + write"
      },
      {
        "word": "misheard",
        "translation": "سمع خطأ",
"note": "mis- + hear"
      },
      {
        "word": "misread",
        "translation": "قرأ خطأ / أساء الفهم",
"note": "mis- + read"
      },
      {
        "word": "subheading",
        "translation": "عنوان فرعي",
"note": "sub- + heading"
      },
      {
        "word": "sub-zero",
        "translation": "دون الصفر",
"note": "sub- + zero"
      }
    ]
  },
  {
    "id": "6b",
    "title": "reporting verbs",
    "lessonCode": "6B",
    "page": 72,
    "intro": "Vocabulary Bank, page 140 · Audio VB6.01",
    "items": [
      {
        "word": "admit",
        "translation": "يعترف",
"example": "She admitted taking the money."
      },
      {
        "word": "insist on",
        "translation": "يصر على",
"example": "He insisted on driving me to the station."
      },
      {
        "word": "claim",
        "translation": "يدعي / يزعم",
"example": "They claimed that the story wasn’t true."
      },
      {
        "word": "refuse",
        "translation": "يرفض",
"example": "She refused to leave."
      },
      {
        "word": "persuade",
        "translation": "يقنع",
"example": "He persuaded her to apply for the promotion."
      },
      {
        "word": "criticise ... for",
        "translation": "ينتقد ... على",
"example": "She criticised him for being late."
      }
    ]
  },
  {
    "id": "7a",
    "title": "chance",
    "lessonCode": "7A",
    "page": 80,
    "intro": "Vocabulary Bank, page 141 · Audio VB7.01",
    "items": [
      {
        "word": "random",
        "translation": "عشوائي"
},
      {
        "word": "accidental",
        "translation": "عرضي / غير مقصود"
},
      {
        "word": "fortunate",
        "translation": "محظوظ"
},
      {
        "word": "unfortunate",
        "translation": "مؤسف / سيئ الحظ"
},
      {
        "word": "by chance",
        "translation": "بالصدفة"
},
      {
        "word": "freak",
        "translation": "شاذ / غير معتاد"
}
    ]
  },
  {
    "id": "8a",
    "title": "describing homes and living conditions",
    "lessonCode": "8A",
    "page": 93,
    "intro": "Vocabulary Bank, page 141 · Audio VB8.01",
    "items": [
      {
        "word": "character",
        "translation": "طابع / سمة مميزة",
"meaning": "a combination of qualities that makes a place different to others"
      },
      {
        "word": "exclusive",
        "translation": "حصري / فاخر جدًا",
"meaning": "so expensive that most people cannot afford it"
      },
      {
        "word": "stylish",
        "translation": "أنيق"
},
      {
        "word": "elegant",
        "translation": "راقٍ"
},
      {
        "word": "secure",
        "translation": "آمن"
},
      {
        "word": "spacious",
        "translation": "واسع / فسيح"
},
      {
        "word": "fashionable",
        "translation": "على الموضة"
},
      {
        "word": "condition",
        "translation": "حالة (المكان)"
}
    ]
  }
]

export const vocabByCode: Record<string, VocabGroup | undefined> = Object.fromEntries(vocabGroups.map((g) => [g.lessonCode, g]))
