import { QuestionData } from "./questions-data";

const PASSAGE_76_80 = `The metamorphosis of a butterfly epitomizes one of nature's most intricate and captivating transformations. The life cycle initiates with the deposition of fragile eggs, often hidden on the underside of leaves, ensuring immediate access to nourishment upon hatching.

Once emerged, the larva — or caterpillar — enters a phase of relentless consumption, devouring foliage to fuel its rapid growth. During this stage, it undergoes multiple molts, shedding its rigid exoskeleton to accommodate its expanding form. This insatiable feeding period is essential for amassing the energy required for the subsequent, dramatic metamorphosis.

The transition into the pupal stage, encapsulated within a chrysalis, marks an extraordinary biological phenomenon. Inside, the caterpillar's structures are enzymatically dismantled and reconstructed into entirely new forms — wings, antennae, and compound eyes emerge through a sophisticated process known as histogenesis.

Upon completing this hidden transformation, the adult butterfly struggles free, its crumpled wings needing to be inflated with hemolymph and dried before flight is possible. Once airborne, the butterfly's existence centres on reproduction, perpetuating the species before its ephemeral life concludes.

Though often romanticized, the butterfly's life cycle underscores a rigorous narrative of survival, adaptation, and evolutionary precision, offering profound insights into the fragile balance of ecosystems.`;

const PASSAGE_Q16 = `Eight persons Dhruv, Dipak, Khush, Sapna, Sudhir, Vaibhav, Vimal and Vivek lives on eight different floors of 8-storey building from bottom to top such as ground floor is numbered as 1st and top floor is numbered as 8th. Vaibhav lives on even numbered floor but not on 6th floor. Vivek lives below Khush's floor. Sudhir lives two floors above Dipak's floor. Dhruv lives on an even numbered floor but not adjacent to Sudhir's floor. Vaibhav lives just above Vimal's floor. Khush lives on 3rd floor. Sudhir does not live on topmost floor. Sapna's floor is not adjacent to Dipak's floor.`;

const PASSAGE_Q17 = `There are 7 family members: P, Q, R, S, T, U and V going to a party. There are three generations in which only two are married couples. P is the grandfather of U who is a male. R is the son in law of S. V is the son of Q. S has only two children, both of the same gender. T is the sister in law of R.`;

export const paper21Sep: QuestionData[] = [
  // ===== PART A: General Intelligence and Reasoning (Q.1-Q.25) =====
  {
    questionNo: 1,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "If in the word ELECTRIC, all vowels are removed, which letter will be the 3rd from the left?",
    options: [
      { label: "A", text: "L" },
      { label: "B", text: "C" },
      { label: "C", text: "T" },
      { label: "D", text: "R" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 2,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Choose the address that is the same as the one given below.\nSample Address: Flat 3C, White Lily Tower, Rajendra Nagar, Patna, Bihar - 800016",
    options: [
      {
        label: "A",
        text: "Flat 3C, White Lily Towers, Rajendra Nagar, Patna, Bihar - 800016",
      },
      {
        label: "B",
        text: "Flat 3C, White Lilly Tower, Rajendra Nagar, Patna, Bihar - 800016",
      },
      {
        label: "C",
        text: "Flat 3C, White Lily Tower, Rajendra Nagar, Patna, Bihar - 800016",
      },
      {
        label: "D",
        text: "Flat 3B, White Lily Tower, Rajendra Nagar, Patna, Bihar - 800016",
      },
    ],
    correctOption: "C",
  },
  {
    questionNo: 3,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Consider the following statement and choose the option that follows.\n\nStatement: The interest rates on fixed deposits have been lowered.\nInferences:\nI. Investors may shift to alternative investment options.\nII. Fixed deposits are no longer considered safe.",
    options: [
      { label: "A", text: "Only I follows" },
      { label: "B", text: "Only II follows" },
      { label: "C", text: "Both follow" },
      { label: "D", text: "Neither follows" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 4,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Replace special characters with mathematical signs as given in options to make it meaningful equation.\n12 $ 4 & 2 = 50",
    options: [
      { label: "A", text: "×, +" },
      { label: "B", text: "+, ×" },
      { label: "C", text: "−, ×" },
      { label: "D", text: "÷, +" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 5,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Select the letter-cluster from among the given options that can replace the question mark (?) in the following series:\nBEY, BIU, BMQ, BQM, ?",
    options: [
      { label: "A", text: "BCA" },
      { label: "B", text: "BVA" },
      { label: "C", text: "BUI" },
      { label: "D", text: "BHA" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 6,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText: "What is the remainder when 987654321 is divided by 9?",
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "3" },
      { label: "C", text: "0" },
      { label: "D", text: "9" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 7,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Identify the correct pair of signs to interchange.\n12 × 2 + 6 ÷ 3 − 8 = 8",
    options: [
      { label: "A", text: "+ and −" },
      { label: "B", text: "× and ÷" },
      { label: "C", text: "÷ and −" },
      { label: "D", text: "× and +" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 8,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Identify the pattern.\n111×222, 222×333, 333×444, ______. Which fits next?",
    options: [
      { label: "A", text: "444×555" },
      { label: "B", text: "432×321" },
      { label: "C", text: "345×654" },
      { label: "D", text: "555×666" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 9,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText: "Identify the word that is different.",
    options: [
      { label: "A", text: "Hooghly" },
      { label: "B", text: "Tapti" },
      { label: "C", text: "Indian Ocean" },
      { label: "D", text: "Mahanadi" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 10,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText: "Choose the odd one out.",
    options: [
      { label: "A", text: "Feathers" },
      { label: "B", text: "Claw" },
      { label: "C", text: "Ear" },
      { label: "D", text: "Lung" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 11,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "A is B's father. C is B's sister. D is A's wife. How is D related to C?",
    options: [
      { label: "A", text: "Mother" },
      { label: "B", text: "Grandmother" },
      { label: "C", text: "Aunt" },
      { label: "D", text: "Cousin" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 12,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "If A is the father of B, but B is not the son of A, then how is B related to A?",
    options: [
      { label: "A", text: "Sister" },
      { label: "B", text: "Mother" },
      { label: "C", text: "Cousin" },
      { label: "D", text: "Daughter" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 13,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Find the next number in the series: **3, 9, 27, 81, ?, 729**",
    options: [
      { label: "A", text: "243" },
      { label: "B", text: "218" },
      { label: "C", text: "270" },
      { label: "D", text: "261" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 14,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Your team misses a major deadline. What do you do as team lead?",
    options: [
      { label: "A", text: "Quit the project" },
      { label: "B", text: "Stay silent" },
      { label: "C", text: "Analyze reasons and communicate next steps" },
      { label: "D", text: "Blame someone" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 15,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "If\n2 = 12\n3 = 36\n4 = 80\n5 = 150\n6 = 252\n7 = 392\nThen 8 = ?",
    options: [
      { label: "A", text: "576" },
      { label: "B", text: "625" },
      { label: "C", text: "484" },
      { label: "D", text: "925" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 16,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "How many persons live between Vaibhav's and Dipak's floor?",
    options: [
      { label: "A", text: "Three" },
      { label: "B", text: "Five" },
      { label: "C", text: "Four" },
      { label: "D", text: "Six" },
    ],
    correctOption: "B",
    passage: PASSAGE_Q16,
  },
  {
    questionNo: 17,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText: "How many males are there?",
    options: [
      { label: "A", text: "4" },
      { label: "B", text: "5" },
      { label: "C", text: "3" },
      { label: "D", text: "2" },
    ],
    correctOption: "A",
    passage: PASSAGE_Q17,
  },
  {
    questionNo: 18,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "Read the following statement carefully and identify the conclusion that follows.\n\nStatement:\nAll musicians are artists. Some artists are dancers. No dancer is blind.\n\nConclusions:\nI. Some artists are not blind.\nII. All blind are not dancers.",
    options: [
      { label: "A", text: "Only I follows" },
      { label: "B", text: "Only II follows" },
      { label: "C", text: "Both I and II follow" },
      { label: "D", text: "Neither I nor II follows" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 19,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "The letters given below, when are arranged, form an appropriate (Meaningful) word:\nA V S E B O R I N T O\n\nWhat is the position of letter A in the word formed from the left?",
    options: [
      { label: "A", text: "5" },
      { label: "B", text: "7" },
      { label: "C", text: "8" },
      { label: "D", text: "9" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 20,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText: "What comes next in the series?\nA, D, G, J, ?",
    options: [
      { label: "A", text: "M" },
      { label: "B", text: "N" },
      { label: "C", text: "O" },
      { label: "D", text: "P" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 21,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText: "What comes next?\nCE, EG, GI, ?",
    options: [
      { label: "A", text: "KN" },
      { label: "B", text: "KM" },
      { label: "C", text: "JL" },
      { label: "D", text: "IK" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 22,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "If '×' = '+', '+' = '−', '−' = '×', and '/' = '÷', then which equation is correct?",
    options: [
      { label: "A", text: "10 × 2 + 4 − 1 = 21" },
      { label: "B", text: "12 + 6 − 2 × 2 = 28" },
      { label: "C", text: "8 − 2 × 3 + 1 = 15" },
      { label: "D", text: "14 − 3 + 5 × 2 = 39" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 23,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "What should come at the place of question mark?\n**2, 5, 11, 23, 47, ?**",
    options: [
      { label: "A", text: "95" },
      { label: "B", text: "97" },
      { label: "C", text: "93" },
      { label: "D", text: "99" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 24,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "In a room of 6 people, how many different handshakes are possible if each person shakes hands once with every other?",
    options: [
      { label: "A", text: "10" },
      { label: "B", text: "12" },
      { label: "C", text: "15" },
      { label: "D", text: "20" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 25,
    part: "A",
    partName: "General Intelligence and Reasoning",
    questionText:
      "If BRICK is coded as CSJDL, how is CSJDL coded?",
    options: [
      { label: "A", text: "DTKEM" },
      { label: "B", text: "DSKEL" },
      { label: "C", text: "DTKFL" },
      { label: "D", text: "CSKDL" },
    ],
    correctOption: "A",
  },

  // ===== PART B: General Awareness (Q.26-Q.50) =====
  {
    questionNo: 26,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which of the following is a main goal of the Chabahar port project?",
    options: [
      { label: "A", text: "To increase military presence in the region" },
      { label: "B", text: "To mine for undersea minerals" },
      { label: "C", text: "To increase tourism in Iran" },
      { label: "D", text: "To boost regional trade" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 27,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which government initiative focuses on improving the road infrastructure in rural areas of India?",
    options: [
      { label: "A", text: "Bharatmala Pariyojana" },
      { label: "B", text: "Pradhan Mantri Gram Sadak Yojana (PMGSY)" },
      {
        label: "C",
        text: "National Highways Development Project (NHDP)",
      },
      { label: "D", text: "Setu Bharatam Programme" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 28,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which major legal framework does the Bharatiya Sakshya Adhiniyam, 2023, seek to align with in recognizing electronic evidence?",
    options: [
      { label: "A", text: "The Information Technology Act, 2000" },
      { label: "B", text: "The Indian Evidence Act, 1872" },
      { label: "C", text: "The National Investigation Agency Act, 2008" },
      {
        label: "D",
        text: "The Protection of Women from Domestic Violence Act, 2005",
      },
    ],
    correctOption: "A",
  },
  {
    questionNo: 29,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which Indian state has become the first to implement the Uniform Civil Code (UCC)?",
    options: [
      { label: "A", text: "Uttarakhand" },
      { label: "B", text: "Goa" },
      { label: "C", text: "Maharashtra" },
      { label: "D", text: "Gujarat" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 30,
    part: "B",
    partName: "General Awareness",
    questionText:
      "'Permaculture', a term often seen in the news, pertains to:",
    options: [
      {
        label: "A",
        text: "Cropping and vegetation in permafrost regions.",
      },
      {
        label: "B",
        text: "Ex-situ growth of organisms facilitated in a semi-solid medium.",
      },
      {
        label: "C",
        text: "A bioremediation technique to remove oil spills.",
      },
      {
        label: "D",
        text: "Development of sustainable agricultural ecosystems.",
      },
    ],
    correctOption: "D",
  },
  {
    questionNo: 31,
    part: "B",
    partName: "General Awareness",
    questionText: "Chambal Ravines are found in which Indian states?",
    options: [
      { label: "A", text: "Rajasthan, Gujarat, Madhya Pradesh" },
      { label: "B", text: "Rajasthan, Madhya Pradesh, Uttar Pradesh" },
      { label: "C", text: "Madhya Pradesh, Uttar Pradesh, Gujarat" },
      { label: "D", text: "Punjab, Haryana, Madhya Pradesh" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 32,
    part: "B",
    partName: "General Awareness",
    questionText:
      "The first recorded origin of Bonalu festival is traced back to which disease outbreak in Hyderabad?",
    options: [
      { label: "A", text: "Smallpox" },
      { label: "B", text: "Cholera" },
      { label: "C", text: "Plague" },
      { label: "D", text: "Malaria" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 33,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Consider the following statements about Chittorgarh Fort:\n1. The fort features iconic structures like the Vijay Stambha and Kirti Stambha.\n2. The fort complex includes nineteen main temples.\n3. Its main entrance was established in the 5th century.\nWhich of the statements given above is/are correct?",
    options: [
      { label: "A", text: "1 and 2 only" },
      { label: "B", text: "2 and 3 only" },
      { label: "C", text: "1 and 3 only" },
      { label: "D", text: "1, 2 and 3" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 34,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Elite long jumpers typically use how many strides in their approach run?",
    options: [
      { label: "A", text: "10–14" },
      { label: "B", text: "14–18" },
      { label: "C", text: "18–22" },
      { label: "D", text: "22–26" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 35,
    part: "B",
    partName: "General Awareness",
    questionText:
      "In ancient India, **Chanhudaro** was primarily a centre for:",
    options: [
      { label: "A", text: "Agriculture" },
      { label: "B", text: "Metalworking" },
      { label: "C", text: "Bead-making" },
      { label: "D", text: "Textile weaving" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 36,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Consider the following statements regarding political rivalries in early medieval India:\nStatement I: The Rashtrakutas launched several campaigns to gain control over the region of Kanauj.\nStatement II: The Pratiharas were primarily based in eastern India, while the Palas were established in the western and central regions.\nWhich of the statements given above is/are correct?",
    options: [
      { label: "A", text: "Only Statement I is correct" },
      { label: "B", text: "Only Statement II is correct" },
      { label: "C", text: "Both Statement I and II are correct" },
      {
        label: "D",
        text: "Neither Statement I nor Statement II is correct",
      },
    ],
    correctOption: "A",
  },
  {
    questionNo: 37,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Who introduced the law that abolished the practice of Sati in British India in 1829?",
    options: [
      { label: "A", text: "Lord Dalhousie" },
      { label: "B", text: "Lord Curzon" },
      { label: "C", text: "Lord William Bentinck" },
      { label: "D", text: "Lord Canning" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 38,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which of the following statements about India's participation in the 2008 Beijing Olympics is correct?\n1) India won medals in Shooting, Boxing, and Wrestling, including its first-ever individual Olympic Gold.\n2) Saina Nehwal participated in the women's singles badminton event representing India.\nWhich of the above statements are correct?",
    options: [
      { label: "A", text: "Only 1 is Correct" },
      { label: "B", text: "Only 2 is Correct" },
      { label: "C", text: "1 and 2 are Correct" },
      { label: "D", text: "Neither 1 nor 2 are Correct" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 39,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which of the following best encapsulates the core philosophy presented in Shane Watson's book 'The Winner's Mindset'?",
    options: [
      { label: "A", text: "Technical manual on cricket techniques" },
      { label: "B", text: "Sociological study of sports and gender" },
      {
        label: "C",
        text: "Psychological resilience and strategic adaptability in elite sports",
      },
      {
        label: "D",
        text: "Biography of Shane Watson's cricket career",
      },
    ],
    correctOption: "C",
  },
  {
    questionNo: 40,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Read the statements below and choose the correct option regarding the 38th National Games:\nStatement 1: The 38th National Games were held in Uttarakhand.\nStatement 2: It was the first edition of the National Games held across multiple cities in the state.",
    options: [
      { label: "A", text: "Only Statement 1 is correct" },
      { label: "B", text: "Only Statement 2 is correct" },
      {
        label: "C",
        text: "Both Statement 1 and Statement 2 are correct",
      },
      {
        label: "D",
        text: "Neither Statement 1 nor Statement 2 is correct",
      },
    ],
    correctOption: "C",
  },
  {
    questionNo: 41,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Fill in the blanks:\nThe Rajya Sabha's special power under Art 249 allows it to authorise Parliament to legislate on a ______ List subject.",
    options: [
      { label: "A", text: "State" },
      { label: "B", text: "Union" },
      { label: "C", text: "Concurrent" },
      { label: "D", text: "Residuary" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 42,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Read the following statements marked as Assertion (A) and Reason (R). Choose the correct option.\nAssertion (A): The development of Spark Torch Igniters is essential for the feasibility of fully reusable rocket booster stages and spacecraft requiring multiple engine firings in orbit.\nReason (R): Spark Torch Igniters provide highly reliable and repeatable ignition capability in vacuum conditions, a critical requirement for successive engine restarts during complex mission profiles.",
    options: [
      {
        label: "A",
        text: "Both A and R are true, and R is the correct explanation of A",
      },
      {
        label: "B",
        text: "Both A and R are true, but R is not the correct explanation of A",
      },
      { label: "C", text: "A is true, but R is false" },
      { label: "D", text: "A is false, but R is true" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 43,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which of the following statements about the Inter-State Council (ISC) is/are correct?\nA) The Inter-State Council is headed by the Prime Minister of India.\nB) It functions as a recommendatory body rather than a tribunal for dispute resolution.",
    options: [
      { label: "A", text: "Only 1" },
      { label: "B", text: "Only 2" },
      { label: "C", text: "Both 1 and 2" },
      { label: "D", text: "Neither 1 nor 2" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 44,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which Indian state launched the 'Gruha Lakshmi' scheme providing financial assistance to women heads of households?",
    options: [
      { label: "A", text: "Kerala" },
      { label: "B", text: "Karnataka" },
      { label: "C", text: "Tamil Nadu" },
      { label: "D", text: "Andhra Pradesh" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 45,
    part: "B",
    partName: "General Awareness",
    questionText:
      "The Kuki-Zo tribal community is predominantly found in which Indian state?",
    options: [
      { label: "A", text: "Nagaland" },
      { label: "B", text: "Manipur" },
      { label: "C", text: "Mizoram" },
      { label: "D", text: "Meghalaya" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 46,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Read the below statements marked as Assertion (A) and Reason (R). Mark the correct option:\nAssertion (A): Increase in autonomous investment leads to a multiplied rise in national income.\nReason (R): This happens because of the marginal propensity to save being less than one.",
    options: [
      {
        label: "A",
        text: "Both A and R are true, and R is the correct explanation of A.",
      },
      {
        label: "B",
        text: "Both A and R are true, but R is not the correct explanation of A.",
      },
      { label: "C", text: "A is true, but R is false." },
      { label: "D", text: "A is false, but R is true." },
    ],
    correctOption: "A",
  },
  {
    questionNo: 47,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Read the below statements marked as Assertion (A) and Reason (R). Mark the correct options:\nAssertion (A): The Global Ease of Doing Business (EoDB) rankings gave maximum weightage to starting a business.\nReason (R): Starting a business was one of the 10 indicators considered.",
    options: [
      {
        label: "A",
        text: "Both A and R are true, and R is the correct explanation of A.",
      },
      {
        label: "B",
        text: "Both A and R are true, but R is not the correct explanation of A.",
      },
      { label: "C", text: "A is true, but R is false." },
      { label: "D", text: "A is false, but R is true." },
    ],
    correctOption: "D",
  },
  {
    questionNo: 48,
    part: "B",
    partName: "General Awareness",
    questionText:
      "What led to regional disparity despite the overall success of the Green Revolution?",
    options: [
      { label: "A", text: "Uneven price controls" },
      { label: "B", text: "Unequal land ownership" },
      {
        label: "C",
        text: "HYV seed access restricted to well-irrigated regions",
      },
      { label: "D", text: "Neglect of fertilizers" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 49,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Consider the following statements regarding India's Ramsar Sites:\n1. India has the highest number of Ramsar sites in South Asia.\n2. Keibul Lamjao is the only floating National Park in the world and is also a Ramsar site.\n3. All Ramsar sites in India are located in coastal regions.",
    options: [
      { label: "A", text: "Only 1 and 2 are correct" },
      { label: "B", text: "Only 2 and 3 are correct" },
      { label: "C", text: "Only 1 and 3 are correct" },
      { label: "D", text: "All 1, 2 and 3 are correct" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 50,
    part: "B",
    partName: "General Awareness",
    questionText:
      "Which type of sale allows partial transfer of PSU ownership to private hands?",
    options: [
      { label: "A", text: "Minority sale" },
      { label: "B", text: "Complete sale" },
      { label: "C", text: "Auction" },
      { label: "D", text: "Leasing" },
    ],
    correctOption: "A",
  },

  // ===== PART C: Quantitative Aptitude (Q.51-Q.75) =====
  {
    questionNo: 51,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "What is the smallest number that must be added to 2378 to make it a perfect square?",
    options: [
      { label: "A", text: "23" },
      { label: "B", text: "24" },
      { label: "C", text: "25" },
      { label: "D", text: "26" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 52,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A bakery produced 5000 cakes at a total cost of ₹250,000. They gave away 500 cakes for a promotional event. For the remaining cakes, they offered a 20% discount on the market price of ₹75 per cake. Additionally, they gave one cake free with every 9 cakes bought. If all 5000 cakes were distributed, what is their overall gain or loss percentage?",
    options: [
      { label: "A", text: "4.5% profit" },
      { label: "B", text: "2.8% profit" },
      { label: "C", text: "2.8% loss" },
      { label: "D", text: "4.5% loss" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 53,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "What is the compound interest on Rs. 8000 for 2 year at 10% per annum?",
    options: [
      { label: "A", text: "1600" },
      { label: "B", text: "1680" },
      { label: "C", text: "1650" },
      { label: "D", text: "1700" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 54,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A certain sum becomes 4 times itself in 8 years at simple interest. In how many years will it become 12 times itself at the same rate?",
    options: [
      { label: "A", text: "29⅓ years" },
      { label: "B", text: "30⅙ years" },
      { label: "C", text: "28⅖ years" },
      { label: "D", text: "27³⁄₇ years" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 55,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "Which of the following is a perfect square and an Integer?",
    options: [
      { label: "A", text: "Square root of 5" },
      { label: "B", text: "Square root of 9" },
      { label: "C", text: "3.2" },
      { label: "D", text: "3.4" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 56,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "The speed of a train is 110 kmph. Find the distance covered by the train in 100 seconds.",
    options: [
      { label: "A", text: "3051 m" },
      { label: "B", text: "3055.56 m" },
      { label: "C", text: "3011.56 m" },
      { label: "D", text: "3000.56 m" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 57,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "If the ratio of capital of A and B is 3:2 and the time for which they invested is in the ratio 2:3, then the profit ratio is:",
    options: [
      { label: "A", text: "1:1" },
      { label: "B", text: "2:1" },
      { label: "C", text: "3:2" },
      { label: "D", text: "3:1" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 58,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A company designs a new chocolate box in the shape of a regular right pyramid with a square base. The base side of the box is 10 cm and its height is 12 cm. Due to packaging constraints, the box can only be filled up to 90% of its total volume. If the company wants to estimate the total cost of chocolate, knowing that 1 cm³ of chocolate costs ₹0.50, what is the cost of chocolate to fill one such box?",
    options: [
      { label: "A", text: "₹180" },
      { label: "B", text: "₹225" },
      { label: "C", text: "₹270" },
      { label: "D", text: "₹300" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 59,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "Consider a right trapezoidal field. Its two parallel sides are 30 meters and 50 meters long. One of its non-parallel sides, which acts as the height, measures 20 meters. What is the area of this field?",
    options: [
      { label: "A", text: "700 square meters" },
      { label: "B", text: "800 square meters" },
      { label: "C", text: "840 square meters" },
      { label: "D", text: "900 square meters" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 60,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A hexagon is drawn inside a circle with a radius of 21 cm. Determine the approximate area of the hexagon.",
    options: [
      { label: "A", text: "1145 cm²" },
      { label: "B", text: "1845 cm²" },
      { label: "C", text: "165 cm²" },
      { label: "D", text: "172 cm²" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 61,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A town has males and females in a ratio of 3:2. After 5 years, the male population increases by 10%, and the female population by 25%. What is the new ratio?",
    options: [
      { label: "A", text: "3:2.5" },
      { label: "B", text: "33:25" },
      { label: "C", text: "66:65" },
      { label: "D", text: "6:5" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 62,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A triangle has sides 8 cm and 10 cm, and the angle between them is 120°. What is its area?",
    options: [
      { label: "A", text: "40 cm²" },
      { label: "B", text: "20√3 cm²" },
      { label: "C", text: "40√3 cm²" },
      { label: "D", text: "20 cm²" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 63,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A man spends 80% of his income. His income has increased by 25%, but his expenditure remains the same. By what percent have his savings increased?",
    options: [
      { label: "A", text: "125%" },
      { label: "B", text: "150%" },
      { label: "C", text: "100%" },
      { label: "D", text: "200%" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 64,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "Sameer can complete a work in 16 days. In how many days will the work be completed by Ajay, if his efficiency is 60% more than that of Sameer?",
    options: [
      { label: "A", text: "12 days" },
      { label: "B", text: "10 days" },
      { label: "C", text: "13 days" },
      { label: "D", text: "15 days" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 65,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A right prism has a base in the shape of a trapezium with parallel sides 10 cm and 6 cm, and height 4 cm. If the prism height is 15 cm, what is the volume?",
    options: [
      { label: "A", text: "480 cm³" },
      { label: "B", text: "240 cm³" },
      { label: "C", text: "520 cm³" },
      { label: "D", text: "680 cm³" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 66,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "The average of a group of 11 numbers is 61. If the first six numbers have an average of 57 and the last six numbers have an average of 65, what is the sixth number?",
    options: [
      { label: "A", text: "62" },
      { label: "B", text: "61" },
      { label: "C", text: "64" },
      { label: "D", text: "60" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 67,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "A chemist prepares 60 liters of antiseptic solution by mixing two liquids 'A' and 'B' in the ratio 2:3. If the cost of 'A' is Rs. 45/liter and 'B' is Rs. 30/liter, what is the average cost per liter of the final solution?",
    options: [
      { label: "A", text: "Rs. 36" },
      { label: "B", text: "Rs. 38" },
      { label: "C", text: "Rs. 37" },
      { label: "D", text: "Rs. 39" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 68,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "If sinA + cosA = 1, then find the value of sin⁴A + cos⁴A.",
    options: [
      { label: "A", text: "1" },
      { label: "B", text: "1/2" },
      { label: "C", text: "3/4" },
      { label: "D", text: "5/8" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 69,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "If sinA = 0.6 and cosA = 0.8, what is tanA?",
    options: [
      { label: "A", text: "0.56" },
      { label: "B", text: "0.75" },
      { label: "C", text: "0.45" },
      { label: "D", text: "0.52" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 70,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "If y = mx + 1 passes through (2,5), find m.",
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "1" },
      { label: "C", text: "0" },
      { label: "D", text: "3" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 71,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "If sinA = 4/5 and A is acute, find cot(90° − A).",
    options: [
      { label: "A", text: "3/4" },
      { label: "B", text: "4/3" },
      { label: "C", text: "5/3" },
      { label: "D", text: "5/4" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 72,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "If the measure of an exterior angle of a regular polygon is 20°, determine the total number of its sides.",
    options: [
      { label: "A", text: "15" },
      { label: "B", text: "18" },
      { label: "C", text: "20" },
      { label: "D", text: "36" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 73,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "In a triangle with vertices P(x, y), Q(5, -1), and R(2, 6), the Centroid is at G(4, 2). What are the coordinates of vertex P?",
    options: [
      { label: "A", text: "(5, 1)" },
      { label: "B", text: "(5, -1)" },
      { label: "C", text: "(4, 1)" },
      { label: "D", text: "(4, 2)" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 74,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText: "If x = √2 + 1, find x² − 2.",
    options: [
      { label: "A", text: "1 + 2√2" },
      { label: "B", text: "3 + 2√2" },
      { label: "C", text: "2 + √2" },
      { label: "D", text: "1 + √2" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 75,
    part: "C",
    partName: "Quantitative Aptitude",
    questionText:
      "In △ABC, a median AD is drawn to side BC. What is the ratio of the area of △ABD to the area of △ACD?",
    options: [
      { label: "A", text: "1:1" },
      { label: "B", text: "1:2" },
      { label: "C", text: "2:1" },
      { label: "D", text: "1:3" },
    ],
    correctOption: "A",
  },

  // ===== PART D: English Comprehension (Q.76-Q.100) =====
  {
    questionNo: 76,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Identify the sentence from the passage which is in the **passive voice**:",
    options: [
      {
        label: "A",
        text: '"The caterpillar sheds its rigid exoskeleton."',
      },
      {
        label: "B",
        text: '"The metamorphosis of a butterfly epitomizes transformation."',
      },
      {
        label: "C",
        text: '"The caterpillar\'s structures are enzymatically dismantled."',
      },
      {
        label: "D",
        text: '"The butterfly inflates its wings with hemolymph."',
      },
    ],
    correctOption: "C",
    passage: PASSAGE_76_80,
  },
  {
    questionNo: 77,
    part: "D",
    partName: "English Comprehension",
    questionText: "Which sentence contains a **relative clause**?",
    options: [
      {
        label: "A",
        text: '"Its crumpled wings need to be inflated."',
      },
      {
        label: "B",
        text: '"Eggs are often hidden on the underside of leaves."',
      },
      {
        label: "C",
        text: '"A caterpillar devours foliage to fuel its growth."',
      },
      {
        label: "D",
        text: '"The larva, which undergoes multiple molts, grows rapidly."',
      },
    ],
    correctOption: "D",
    passage: PASSAGE_76_80,
  },
  {
    questionNo: 78,
    part: "D",
    partName: "English Comprehension",
    questionText:
      'Which word from the passage is derived by adding a **Greek-origin suffix** meaning "formation" or "origin"?',
    options: [
      { label: "A", text: "Metamorphosis" },
      { label: "B", text: "Chrysalis" },
      { label: "C", text: "Hemolymph" },
      { label: "D", text: "Histogenesis" },
    ],
    correctOption: "D",
    passage: PASSAGE_76_80,
  },
  {
    questionNo: 79,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "According to the passage, what crucial biological activity occurs within the chrysalis?",
    options: [
      {
        label: "A",
        text: "Strengthening of the caterpillar's exoskeleton",
      },
      {
        label: "B",
        text: "Rebuilding of the caterpillar into a butterfly through histogenesis",
      },
      { label: "C", text: "Increase in leaf consumption" },
      { label: "D", text: "Inflammation of butterfly wings" },
    ],
    correctOption: "B",
    passage: PASSAGE_76_80,
  },
  {
    questionNo: 80,
    part: "D",
    partName: "English Comprehension",
    questionText:
      'In the passage, the word **"ephemeral"** most nearly means:',
    options: [
      { label: "A", text: "Everlasting" },
      { label: "B", text: "Transient" },
      { label: "C", text: "Powerful" },
      { label: "D", text: "Fragile" },
    ],
    correctOption: "B",
    passage: PASSAGE_76_80,
  },
  {
    questionNo: 81,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Fill in the blank with the correctly spelt word.\nDespite overwhelming evidence, he remained ________ in his beliefs.",
    options: [
      { label: "A", text: "obstinatte" },
      { label: "B", text: "obstinate" },
      { label: "C", text: "obsteinate" },
      { label: "D", text: "obbstinate" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 82,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Choose the correct one-word substitution for the italicized part:\nRavi has always been *a person who vehemently opposes authority, control, or tradition, often challenging every rule set before him*.",
    options: [
      { label: "A", text: "Conformist" },
      { label: "B", text: "Anarchist" },
      { label: "C", text: "Optimist" },
      { label: "D", text: "Traditionalist" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 83,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Select the most appropriate synonym of the given word: **GRUMPY**",
    options: [
      { label: "A", text: "Irritable" },
      { label: "B", text: "Friendly" },
      { label: "C", text: "Polite" },
      { label: "D", text: "Calm" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 84,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Select the most appropriate antonym of the given word. **Transitory**",
    options: [
      { label: "A", text: "Fleeting" },
      { label: "B", text: "Eternal" },
      { label: "C", text: "Momentary" },
      { label: "D", text: "Temporary" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 85,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Choose the correct meaning of idiom:\n**Eat crow**",
    options: [
      { label: "A", text: "Enjoy luxurious food" },
      { label: "B", text: "Give lavish charity" },
      { label: "C", text: "Suffer physical punishment" },
      {
        label: "D",
        text: "Admit one's error and endure humiliation",
      },
    ],
    correctOption: "D",
  },
  {
    questionNo: 86,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Choose the correct meaning of idiom:\n**To draw the long bow**",
    options: [
      { label: "A", text: "To romanticize historical events" },
      {
        label: "B",
        text: "To fabricate or exaggerate with little credibility",
      },
      { label: "C", text: "To delay justice deliberately" },
      { label: "D", text: "To conflate myth with realism" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 87,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Which spelling is correct for a word meaning 'a formal agreement between nations'?",
    options: [
      { label: "A", text: "Treaty" },
      { label: "B", text: "Trety" },
      { label: "C", text: "Treety" },
      { label: "D", text: "Tretye" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 88,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Find the word that is **spelled correctly** and refers to complex and obscure knowledge.",
    options: [
      { label: "A", text: "Esoterica" },
      { label: "B", text: "Esoterrica" },
      { label: "C", text: "Esottirica" },
      { label: "D", text: "Esotorica" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 89,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Choose the correct **one-word substitute** for: 'A record of one's own life written by oneself'.",
    options: [
      { label: "A", text: "Biography" },
      { label: "B", text: "Memorandum" },
      { label: "C", text: "Memoir" },
      { label: "D", text: "Autobiography" },
    ],
    correctOption: "D",
  },
  {
    questionNo: 90,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Select the correct option:**\n___ the enormity of the challenge, the volunteers pressed on resolutely.",
    options: [
      { label: "A", text: "Given" },
      { label: "B", text: "For" },
      { label: "C", text: "Because" },
      { label: "D", text: "Granted" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 91,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Find the part of the sentence that contains an error:**\nIt is the uncertainty of how the council intends to proceed (1)/ that seem to have created (2)/ the most unrest among those (3)/ waiting for regulatory clearance. (4)",
    options: [
      { label: "A", text: "(1)" },
      { label: "B", text: "(2)" },
      { label: "C", text: "(3)" },
      { label: "D", text: "(4)" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 92,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Change the following from active to passive:**\nThey will have opened the new airport by 2026.",
    options: [
      {
        label: "A",
        text: "The new airport will have been opened by 2026.",
      },
      {
        label: "B",
        text: "The new airport will be opened by 2026.",
      },
      {
        label: "C",
        text: "The new airport has been opened by 2026.",
      },
      {
        label: "D",
        text: "The new airport will being opened by 2026.",
      },
    ],
    correctOption: "A",
  },
  {
    questionNo: 93,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Find the part of the sentence that contains an error:**\nThe protest, though peaceful in nature, (1)/ were portrayed by official channels (2)/ as instigated by external forces (3)/ and ideologically driven groups. (4)",
    options: [
      { label: "A", text: "(1)" },
      { label: "B", text: "(2)" },
      { label: "C", text: "(3)" },
      { label: "D", text: "(4)" },
    ],
    correctOption: "B",
  },
  {
    questionNo: 94,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Select the sentence containing the homonym of the highlighted word:**\nThe philosopher's **tenure** at the institution was legendary.",
    options: [
      {
        label: "A",
        text: "He lost tenure due to academic misconduct.",
      },
      {
        label: "B",
        text: "The lease agreement defines tenure by clause.",
      },
      {
        label: "C",
        text: "The sculptor captured the tenure of pain in marble.",
      },
      {
        label: "D",
        text: "Colonial tenure laws were challenged by activists.",
      },
    ],
    correctOption: "C",
  },
  {
    questionNo: 95,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Convert the sentence provided below from its passive voice structure to an active voice structure:**\nThe evidence was presumed to have been fabricated before being presented in court.",
    options: [
      {
        label: "A",
        text: "It is presumed that someone had fabricated the evidence before presenting it in court.",
      },
      {
        label: "B",
        text: "The court presumed the evidence to be fabricated.",
      },
      {
        label: "C",
        text: "The evidence had been fabricated, the court presumed.",
      },
      {
        label: "D",
        text: "Fabrication of evidence was presumed to occur.",
      },
    ],
    correctOption: "A",
  },
  {
    questionNo: 96,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "Choose the most suitable option to replace the highlighted part of the sentence:\nShe is good **in dancing**.",
    options: [
      { label: "A", text: "at dance" },
      { label: "B", text: "with dancing" },
      { label: "C", text: "at dancing" },
      { label: "D", text: "on dancing" },
    ],
    correctOption: "C",
  },
  {
    questionNo: 97,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "A sentence is provided in indirect speech. From the four given options, choose the one that most accurately conveys the sentence in its corresponding direct speech.\nThe mentor noted that the fellow had persevered even after his hypotheses were repeatedly falsified.",
    options: [
      {
        label: "A",
        text: 'The mentor said, "The fellow persevered even after your hypotheses were repeatedly falsified."',
      },
      {
        label: "B",
        text: 'The mentor said, "The fellow persevered even after his hypotheses were repeatedly falsified."',
      },
      {
        label: "C",
        text: 'The mentor said, "The fellow preserve though hypotheses are falsified."',
      },
      {
        label: "D",
        text: 'The mentor remarked, "The fellow had persevered though his hypotheses were repeatedly falsified."',
      },
    ],
    correctOption: "B",
  },
  {
    questionNo: 98,
    part: "D",
    partName: "English Comprehension",
    questionText:
      'A sentence is provided in direct speech. From the four given options, choose the one that most accurately conveys the sentence in its corresponding indirect speech.\nHe said, "It may rain today."',
    options: [
      { label: "A", text: "He said it might rain that day." },
      { label: "B", text: "He said it may rain that day." },
      { label: "C", text: "He said it can rain today." },
      { label: "D", text: "He said it might raining today." },
    ],
    correctOption: "A",
  },
  {
    questionNo: 99,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Rearrange the following sentences to form a coherent paragraph:**\n1. The most critical component is the central processing unit (CPU), which acts as the \"brain\" of the machine.\n2. The architecture of a modern computer is a complex arrangement of various hardware and software components.\n3. This complex interplay of components allows the computer to execute a wide range of tasks, from simple calculations to complex simulations.\n4. The CPU works in tandem with memory, storage devices, and input/output peripherals to process data.",
    options: [
      { label: "A", text: "2, 1, 4, 3" },
      { label: "B", text: "1, 4, 2, 3" },
      { label: "C", text: "4, 3, 1, 2" },
      { label: "D", text: "3, 2, 1, 4" },
    ],
    correctOption: "A",
  },
  {
    questionNo: 100,
    part: "D",
    partName: "English Comprehension",
    questionText:
      "**Rearrange the following sentences in correct order to make a logical passage.**\n1. This provides real-time information for decision-making.\n2. Data analytics is transforming modern business.\n3. It involves collecting, processing, and interpreting large datasets.\n4. Companies leverage data to identify trends and predict consumer behavior.",
    options: [
      { label: "A", text: "2-1-3-4" },
      { label: "B", text: "2-3-1-4" },
      { label: "C", text: "2-4-1-3" },
      { label: "D", text: "3-4-2-1" },
    ],
    correctOption: "B",
  },
];
