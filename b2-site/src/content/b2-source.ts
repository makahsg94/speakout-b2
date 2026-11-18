// Unit and lesson metadata transcribed from the B2 Student's Book contents pages.
// This file is preserved as the source-of-truth seed data for src/content/book.ts.

type LessonLabels = {
  grammar?: string
  vocabulary?: string
  pronunciation?: string
  skills?: string
}

type LessonSeed = {
  code: string
  title: string
  pages: [number, number]
  labels: LessonLabels
  objectives: string[]
  isReview?: boolean
}

type UnitSeed = {
  number: number
  title: string
  phrase: string
  question: string
  intro: string
  pages: [number, number]
  objectives: string[]
  lessons: LessonSeed[]
}

/** Unit/lesson metadata transcribed from the B2 Student's Book contents pages. */
export const unitSeeds: UnitSeed[] = [
  {
    "number": 1,
    "title": "identity",
    "phrase": "Who do you take after in your family?",
    "question": "Who do you take after in your family?",
    "intro": "Unit 1: identity — Who do you take after in your family?",
    "pages": [
      6,
      18
    ],
    "objectives": [
      "1A My ID — present perfect simple and continuous; personality adjectives; suffixes; weak forms of have and been",
      "1B Memory — infinitive and -ing forms; collocations about memory; idioms: memory; connected speech: chunking; two-part collocations",
      "1C I’d much rather … — How to … express personal preferences; emotions and feelings; word stress; dependent prepositions",
      "1D Personality — while, whereas and whilst"
    ],
    "lessons": [
      {
        "code": "1A",
        "title": "My ID",
        "pages": [
          8,
          10
        ],
        "labels": {
          "grammar": "present perfect simple and continuous",
          "vocabulary": "personality adjectives; suffixes",
          "pronunciation": "weak forms of have and been",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: present perfect simple and continuous",
          "Vocabulary: personality adjectives; suffixes",
          "Pronunciation: weak forms of have and been",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "1B",
        "title": "Memory",
        "pages": [
          11,
          13
        ],
        "labels": {
          "grammar": "infinitive and -ing forms",
          "vocabulary": "collocations about memory; idioms: memory",
          "pronunciation": "connected speech: chunking; two-part collocations",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: infinitive and -ing forms",
          "Vocabulary: collocations about memory; idioms: memory",
          "Pronunciation: connected speech: chunking; two-part collocations",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "1C",
        "title": "I’d much rather …",
        "pages": [
          14,
          15
        ],
        "labels": {
          "grammar": "How to … express personal preferences",
          "vocabulary": "emotions and feelings",
          "pronunciation": "word stress; dependent prepositions",
          "skills": "how to"
        },
        "objectives": [
          "Grammar / function: How to … express personal preferences",
          "Vocabulary: emotions and feelings",
          "Pronunciation: word stress; dependent prepositions",
          "Skills: how to"
        ],
        "isReview": false
      },
      {
        "code": "1D",
        "title": "Personality",
        "pages": [
          16,
          17
        ],
        "labels": {
          "grammar": "while, whereas and whilst",
          "skills": "BBC street interviews"
        },
        "objectives": [
          "Grammar / function: while, whereas and whilst",
          "Skills: BBC street interviews"
        ],
        "isReview": false
      },
      {
        "code": "1R",
        "title": "Review 1",
        "pages": [
          18,
          18
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  },
  {
    "number": 2,
    "title": "different worlds",
    "phrase": "What impact does social media have on your life?",
    "question": "What impact does social media have on your life?",
    "intro": "Unit 2: different worlds — What impact does social media have on your life?",
    "pages": [
      19,
      30
    ],
    "objectives": [
      "2A Real or virtual? — future probability; science and technology; word families; connected speech: future probability",
      "2B Closer to nature — quantifiers; nature; connected speech: quantifiers",
      "2C Amazing lives — How to … speculate; lifestyle adjectives; stress to show certainty",
      "2D The time traveller — extreme adjectives"
    ],
    "lessons": [
      {
        "code": "2A",
        "title": "Real or virtual?",
        "pages": [
          20,
          22
        ],
        "labels": {
          "grammar": "future probability",
          "vocabulary": "science and technology; word families",
          "pronunciation": "connected speech: future probability",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: future probability",
          "Vocabulary: science and technology; word families",
          "Pronunciation: connected speech: future probability",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "2B",
        "title": "Closer to nature",
        "pages": [
          23,
          25
        ],
        "labels": {
          "grammar": "quantifiers",
          "vocabulary": "nature",
          "pronunciation": "connected speech: quantifiers",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: quantifiers",
          "Vocabulary: nature",
          "Pronunciation: connected speech: quantifiers",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "2C",
        "title": "Amazing lives",
        "pages": [
          26,
          27
        ],
        "labels": {
          "grammar": "How to … speculate",
          "vocabulary": "lifestyle adjectives",
          "pronunciation": "stress to show certainty",
          "skills": "speaking"
        },
        "objectives": [
          "Grammar / function: How to … speculate",
          "Vocabulary: lifestyle adjectives",
          "Pronunciation: stress to show certainty",
          "Skills: speaking"
        ],
        "isReview": false
      },
      {
        "code": "2D",
        "title": "The time traveller",
        "pages": [
          28,
          29
        ],
        "labels": {
          "vocabulary": "extreme adjectives",
          "skills": "BBC programme"
        },
        "objectives": [
          "Vocabulary: extreme adjectives",
          "Skills: BBC programme"
        ],
        "isReview": false
      },
      {
        "code": "2R",
        "title": "Review 2",
        "pages": [
          30,
          30
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  },
  {
    "number": 3,
    "title": "showtime",
    "phrase": "What live events or performances do you enjoy and why?",
    "question": "What live events or performances do you enjoy and why?",
    "intro": "Unit 3: showtime — What live events or performances do you enjoy and why?",
    "pages": [
      31,
      42
    ],
    "objectives": [
      "3A Festival — relative clauses; festivals; the environment; pitch in non-defining relative clauses",
      "3B Performers — cleft sentences; phrasal verbs: performing; communication; emphatic stress",
      "3C Binge-watch — How to … use vague language; film and TV; linking and elision",
      "3D Music lover? — do and did for emphasis"
    ],
    "lessons": [
      {
        "code": "3A",
        "title": "Festival",
        "pages": [
          32,
          34
        ],
        "labels": {
          "grammar": "relative clauses",
          "vocabulary": "festivals; the environment",
          "pronunciation": "pitch in non-defining relative clauses",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: relative clauses",
          "Vocabulary: festivals; the environment",
          "Pronunciation: pitch in non-defining relative clauses",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "3B",
        "title": "Performers",
        "pages": [
          35,
          37
        ],
        "labels": {
          "grammar": "cleft sentences",
          "vocabulary": "phrasal verbs: performing; communication",
          "pronunciation": "emphatic stress",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: cleft sentences",
          "Vocabulary: phrasal verbs: performing; communication",
          "Pronunciation: emphatic stress",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "3C",
        "title": "Binge-watch",
        "pages": [
          38,
          39
        ],
        "labels": {
          "grammar": "How to … use vague language",
          "vocabulary": "film and TV",
          "pronunciation": "linking and elision",
          "skills": "speaking"
        },
        "objectives": [
          "Grammar / function: How to … use vague language",
          "Vocabulary: film and TV",
          "Pronunciation: linking and elision",
          "Skills: speaking"
        ],
        "isReview": false
      },
      {
        "code": "3D",
        "title": "Music lover?",
        "pages": [
          40,
          41
        ],
        "labels": {
          "grammar": "do and did for emphasis",
          "skills": "BBC street interviews"
        },
        "objectives": [
          "Grammar / function: do and did for emphasis",
          "Skills: BBC street interviews"
        ],
        "isReview": false
      },
      {
        "code": "3R",
        "title": "Review 3",
        "pages": [
          42,
          42
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  },
  {
    "number": 4,
    "title": "lifestyle",
    "phrase": "Name one change you could make to your life to improve your health.",
    "question": "Name one change you could make to your life to improve your health.",
    "intro": "Unit 4: lifestyle — Name one change you could make to your life to improve your health.",
    "pages": [
      43,
      54
    ],
    "objectives": [
      "4A Making changes — future continuous and future perfect; health and lifestyle; illness and treatment; connected speech: future perfect",
      "4B Sleep — passives; sleep; sentence stress: content and function words",
      "4C Keep moving — How to … express agreement and disagreement; exercise; sport; motivation and benefits; stress in phrases for partial agreement",
      "4D Ancient traditions — phrases related to time"
    ],
    "lessons": [
      {
        "code": "4A",
        "title": "Making changes",
        "pages": [
          44,
          46
        ],
        "labels": {
          "grammar": "future continuous and future perfect",
          "vocabulary": "health and lifestyle; illness and treatment",
          "pronunciation": "connected speech: future perfect",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: future continuous and future perfect",
          "Vocabulary: health and lifestyle; illness and treatment",
          "Pronunciation: connected speech: future perfect",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "4B",
        "title": "Sleep",
        "pages": [
          47,
          49
        ],
        "labels": {
          "grammar": "passives",
          "vocabulary": "sleep",
          "pronunciation": "sentence stress: content and function words",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: passives",
          "Vocabulary: sleep",
          "Pronunciation: sentence stress: content and function words",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "4C",
        "title": "Keep moving",
        "pages": [
          50,
          51
        ],
        "labels": {
          "grammar": "How to … express agreement and disagreement",
          "vocabulary": "exercise; sport; motivation and benefits",
          "pronunciation": "stress in phrases for partial agreement",
          "skills": "speaking"
        },
        "objectives": [
          "Grammar / function: How to … express agreement and disagreement",
          "Vocabulary: exercise; sport; motivation and benefits",
          "Pronunciation: stress in phrases for partial agreement",
          "Skills: speaking"
        ],
        "isReview": false
      },
      {
        "code": "4D",
        "title": "Ancient traditions",
        "pages": [
          52,
          53
        ],
        "labels": {
          "vocabulary": "phrases related to time",
          "skills": "BBC programme"
        },
        "objectives": [
          "Vocabulary: phrases related to time",
          "Skills: BBC programme"
        ],
        "isReview": false
      },
      {
        "code": "4R",
        "title": "Review 4",
        "pages": [
          54,
          54
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  },
  {
    "number": 5,
    "title": "work",
    "phrase": "Which professions do you admire and why?",
    "question": "Which professions do you admire and why?",
    "intro": "Unit 5: work — Which professions do you admire and why?",
    "pages": [
      55,
      66
    ],
    "objectives": [
      "5A First day! — past perfect simple and continuous; time expressions; connected speech: past perfect continuous",
      "5B Change of plan — past plans and intentions; work and careers; areas of work; connected speech: intrusive /w/ sounds",
      "5C You’re on mute! — How to … describe problems and suggest solutions; video conference calls; intonation to show degrees of certainty",
      "5D Are you a team player? — non-defining relative clauses for comments"
    ],
    "lessons": [
      {
        "code": "5A",
        "title": "First day!",
        "pages": [
          56,
          58
        ],
        "labels": {
          "grammar": "past perfect simple and continuous",
          "vocabulary": "time expressions",
          "pronunciation": "connected speech: past perfect continuous",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: past perfect simple and continuous",
          "Vocabulary: time expressions",
          "Pronunciation: connected speech: past perfect continuous",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "5B",
        "title": "Change of plan",
        "pages": [
          59,
          61
        ],
        "labels": {
          "grammar": "past plans and intentions",
          "vocabulary": "work and careers; areas of work",
          "pronunciation": "connected speech: intrusive /w/ sounds",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: past plans and intentions",
          "Vocabulary: work and careers; areas of work",
          "Pronunciation: connected speech: intrusive /w/ sounds",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "5C",
        "title": "You’re on mute!",
        "pages": [
          62,
          63
        ],
        "labels": {
          "grammar": "How to … describe problems and suggest solutions",
          "vocabulary": "video conference calls",
          "pronunciation": "intonation to show degrees of certainty",
          "skills": "speaking"
        },
        "objectives": [
          "Grammar / function: How to … describe problems and suggest solutions",
          "Vocabulary: video conference calls",
          "Pronunciation: intonation to show degrees of certainty",
          "Skills: speaking"
        ],
        "isReview": false
      },
      {
        "code": "5D",
        "title": "Are you a team player?",
        "pages": [
          64,
          65
        ],
        "labels": {
          "grammar": "non-defining relative clauses for comments",
          "skills": "BBC street interviews"
        },
        "objectives": [
          "Grammar / function: non-defining relative clauses for comments",
          "Skills: BBC street interviews"
        ],
        "isReview": false
      },
      {
        "code": "5R",
        "title": "Review 5",
        "pages": [
          66,
          66
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  },
  {
    "number": 6,
    "title": "psychology",
    "phrase": "What things do you never find the time to get done?",
    "question": "What things do you never find the time to get done?",
    "intro": "Unit 6: psychology — What things do you never find the time to get done?",
    "pages": [
      67,
      78
    ],
    "objectives": [
      "6A Pay attention! — necessity, prohibition and permission; prefixes; word stress: prefixes",
      "6B Quiet — reported orders, requests and advice; reporting verbs; consonant clusters",
      "6C Here’s my advice — How to … ask for advice and give advice tactfully; collocations with get and take; pitch for sounding tactful",
      "6D Would I lie to you? — fillers"
    ],
    "lessons": [
      {
        "code": "6A",
        "title": "Pay attention!",
        "pages": [
          68,
          70
        ],
        "labels": {
          "grammar": "necessity, prohibition and permission",
          "vocabulary": "prefixes",
          "pronunciation": "word stress: prefixes",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: necessity, prohibition and permission",
          "Vocabulary: prefixes",
          "Pronunciation: word stress: prefixes",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "6B",
        "title": "Quiet",
        "pages": [
          71,
          73
        ],
        "labels": {
          "grammar": "reported orders, requests and advice",
          "vocabulary": "reporting verbs",
          "pronunciation": "consonant clusters",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: reported orders, requests and advice",
          "Vocabulary: reporting verbs",
          "Pronunciation: consonant clusters",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "6C",
        "title": "Here’s my advice",
        "pages": [
          74,
          75
        ],
        "labels": {
          "grammar": "How to … ask for advice and give advice tactfully",
          "vocabulary": "collocations with get and take",
          "pronunciation": "pitch for sounding tactful",
          "skills": "speaking"
        },
        "objectives": [
          "Grammar / function: How to … ask for advice and give advice tactfully",
          "Vocabulary: collocations with get and take",
          "Pronunciation: pitch for sounding tactful",
          "Skills: speaking"
        ],
        "isReview": false
      },
      {
        "code": "6D",
        "title": "Would I lie to you?",
        "pages": [
          76,
          77
        ],
        "labels": {
          "vocabulary": "fillers",
          "skills": "BBC programme"
        },
        "objectives": [
          "Vocabulary: fillers",
          "Skills: BBC programme"
        ],
        "isReview": false
      },
      {
        "code": "6R",
        "title": "Review 6",
        "pages": [
          78,
          78
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  },
  {
    "number": 7,
    "title": "talent",
    "phrase": "Do you have any hidden talents?",
    "question": "Do you have any hidden talents?",
    "intro": "Unit 7: talent — Do you have any hidden talents?",
    "pages": [
      79,
      90
    ],
    "objectives": [
      "7A An unexpected passion — past modals of deduction; compound adjectives; chance; connected speech: past modals of deduction",
      "7B I wish! — wish, if only, should have; idioms: regrets; chunking in idioms",
      "7C Let me explain — How to … describe a process; phrasal verbs: explaining; stress in phrasal verbs",
      "7D Hard work or talent? — adverbials of concession"
    ],
    "lessons": [
      {
        "code": "7A",
        "title": "An unexpected passion",
        "pages": [
          80,
          82
        ],
        "labels": {
          "grammar": "past modals of deduction",
          "vocabulary": "compound adjectives; chance",
          "pronunciation": "connected speech: past modals of deduction",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: past modals of deduction",
          "Vocabulary: compound adjectives; chance",
          "Pronunciation: connected speech: past modals of deduction",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "7B",
        "title": "I wish!",
        "pages": [
          83,
          85
        ],
        "labels": {
          "grammar": "wish, if only, should have",
          "vocabulary": "idioms: regrets",
          "pronunciation": "chunking in idioms",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: wish, if only, should have",
          "Vocabulary: idioms: regrets",
          "Pronunciation: chunking in idioms",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "7C",
        "title": "Let me explain",
        "pages": [
          86,
          87
        ],
        "labels": {
          "grammar": "How to … describe a process",
          "vocabulary": "phrasal verbs: explaining",
          "pronunciation": "stress in phrasal verbs",
          "skills": "speaking"
        },
        "objectives": [
          "Grammar / function: How to … describe a process",
          "Vocabulary: phrasal verbs: explaining",
          "Pronunciation: stress in phrasal verbs",
          "Skills: speaking"
        ],
        "isReview": false
      },
      {
        "code": "7D",
        "title": "Hard work or talent?",
        "pages": [
          88,
          89
        ],
        "labels": {
          "grammar": "adverbials of concession",
          "skills": "BBC street interviews"
        },
        "objectives": [
          "Grammar / function: adverbials of concession",
          "Skills: BBC street interviews"
        ],
        "isReview": false
      },
      {
        "code": "7R",
        "title": "Review 7",
        "pages": [
          90,
          90
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  },
  {
    "number": 8,
    "title": "community",
    "phrase": "What does 'community' mean to you?",
    "question": "What does 'community' mean to you?",
    "intro": "Unit 8: community — What does 'community' mean to you?",
    "pages": [
      91,
      103
    ],
    "objectives": [
      "8A A new way of living — participle clauses; collocations with go, have and make; describing homes and living conditions; pitch in participle clauses",
      "8B If the world … — conditionals with conjunctions; world issues; stress in conditional sentences",
      "8C Online communities — How to … develop an argument; prepositional phrases; sounding persuasive",
      "8D Second shot — phrases with get"
    ],
    "lessons": [
      {
        "code": "8A",
        "title": "A new way of living",
        "pages": [
          92,
          94
        ],
        "labels": {
          "grammar": "participle clauses",
          "vocabulary": "collocations with go, have and make; describing homes and living conditions",
          "pronunciation": "pitch in participle clauses",
          "skills": "reading"
        },
        "objectives": [
          "Grammar / function: participle clauses",
          "Vocabulary: collocations with go, have and make; describing homes and living conditions",
          "Pronunciation: pitch in participle clauses",
          "Skills: reading"
        ],
        "isReview": false
      },
      {
        "code": "8B",
        "title": "If the world …",
        "pages": [
          95,
          97
        ],
        "labels": {
          "grammar": "conditionals with conjunctions",
          "vocabulary": "world issues",
          "pronunciation": "stress in conditional sentences",
          "skills": "listening"
        },
        "objectives": [
          "Grammar / function: conditionals with conjunctions",
          "Vocabulary: world issues",
          "Pronunciation: stress in conditional sentences",
          "Skills: listening"
        ],
        "isReview": false
      },
      {
        "code": "8C",
        "title": "Online communities",
        "pages": [
          98,
          99
        ],
        "labels": {
          "grammar": "How to … develop an argument",
          "vocabulary": "prepositional phrases",
          "pronunciation": "sounding persuasive",
          "skills": "speaking"
        },
        "objectives": [
          "Grammar / function: How to … develop an argument",
          "Vocabulary: prepositional phrases",
          "Pronunciation: sounding persuasive",
          "Skills: speaking"
        ],
        "isReview": false
      },
      {
        "code": "8D",
        "title": "Second shot",
        "pages": [
          100,
          101
        ],
        "labels": {
          "vocabulary": "phrases with get",
          "skills": "BBC programme"
        },
        "objectives": [
          "Vocabulary: phrases with get",
          "Skills: BBC programme"
        ],
        "isReview": false
      },
      {
        "code": "8R",
        "title": "Review 8",
        "pages": [
          102,
          103
        ],
        "labels": {
          "skills": "review"
        },
        "objectives": [
          "Review the grammar and vocabulary from this unit."
        ],
        "isReview": true
      }
    ]
  }
]
