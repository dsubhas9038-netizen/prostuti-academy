import { Question } from '@/types';

export const sampleQuestions: Question[] = [
    // ============ BENGALI QUESTIONS - পথের দাবী ============
    {
        id: 'q-bengali-pd-1',
        chapterId: 'bengali-sem1-ch1',
        subjectId: 'bengali',
        semester: 1,
        type: 'saq',
        marks: 3,
        question: 'Describe the character of Apurba from "Pather Dabi".',
        questionBn: '"পথের দাবী" গল্পে অপূর্ব চরিত্রটি বর্ণনা করো।',
        options: null,
        answer: 'Apurba is a young Bengali man living in Burma. He is patriotic, educated, and works as a clerk. He represents the common educated youth of that era who secretly admires revolutionary activities but is bound by his circumstances. He is honest and law-abiding but has deep respect for freedom fighters.',
        answerBn: 'অপূর্ব হলেন একজন বাঙালি যুবক যিনি বার্মায় বাস করেন। তিনি দেশপ্রেমিক, শিক্ষিত এবং কেরানি হিসেবে কাজ করেন। তিনি সেই যুগের সাধারণ শিক্ষিত যুবকদের প্রতিনিধিত্ব করেন যারা গোপনে বিপ্লবী কর্মকান্ডের প্রশংসা করেন কিন্তু পরিস্থিতির কারণে আবদ্ধ থাকেন। তিনি সৎ এবং আইন মান্যকারী কিন্তু স্বাধীনতা সংগ্রামীদের প্রতি গভীর শ্রদ্ধা রাখেন।',
        wordCount: { actual: 85, min: 80, max: 120 },
        markingStrategy: {
            total: 3,
            breakdown: [
                { point: 'Basic description', pointBn: 'মৌলিক বর্ণনা', marks: 1 },
                { point: 'Character traits', pointBn: 'চরিত্রের বৈশিষ্ট্য', marks: 1 },
                { point: 'Significance in story', pointBn: 'গল্পে গুরুত্ব', marks: 1 },
            ],
            tips: ['Start with identity', 'Mention profession', 'Highlight patriotism'],
            tipsBn: ['পরিচয় দিয়ে শুরু করো', 'পেশা উল্লেখ করো', 'দেশপ্রেম তুলে ধরো'],
        },
        keyPoints: [
            { point: 'Young Bengali man', pointBn: 'তরুণ বাঙালি' },
            { point: 'Works as clerk in Burma', pointBn: 'বার্মায় কেরানি' },
            { point: 'Patriotic but cautious', pointBn: 'দেশপ্রেমিক কিন্তু সতর্ক' },
        ],
        hints: [
            { hint: 'Think about his job', hintBn: 'তার চাকরির কথা ভাবো' },
            { hint: 'Consider his attitude towards Sabyasachi', hintBn: 'সব্যসাচীর প্রতি তার মনোভাব বিবেচনা করো' },
        ],
        examinerTips: 'Always mention his dual nature - law-abiding yet admiring revolutionaries.',
        examinerTipsBn: 'সবসময় তার দ্বৈত প্রকৃতি উল্লেখ করো - আইন মান্যকারী তবুও বিপ্লবীদের প্রশংসক।',
        yearsAsked: [2023, 2022, 2020, 2019],
        isPYQ: true,
        importance: 5,
        difficulty: 'medium',
        isImportant: true,
        tags: ['character', 'analysis', 'protagonist'],
        order: 1,
        isActive: true,
    },
    {
        id: 'q-bengali-pd-2',
        chapterId: 'bengali-sem1-ch1',
        subjectId: 'bengali',
        semester: 1,
        type: 'laq',
        marks: 5,
        question: 'Discuss the significance of title "Pather Dabi".',
        questionBn: '"পথের দাবী" নামকরণের সার্থকতা আলোচনা করো।',
        options: null,
        answer: 'The title "Pather Dabi" meaning "Demand of the Path" symbolizes the revolutionary movement and the sacrifices required for freedom. It represents the call of duty for the motherland. Sabyasachi embodies this demand as he sacrifices everything for independence. The path represents the journey to freedom, and the demand is the sacrifice one must make. The title encapsulates the central theme of patriotism, sacrifice, and the price of freedom that every citizen must be willing to pay.',
        answerBn: '"পথের দাবী" শিরোনামটি "পথের দাবি" অর্থে বিপ্লবী আন্দোলন এবং স্বাধীনতার জন্য প্রয়োজনীয় আত্মত্যাগকে প্রতীকিত করে। এটি মাতৃভূমির প্রতি কর্তব্যের আহ্বান উপস্থাপন করে। সব্যসাচী এই দাবিকে মূর্ত করে তোলেন কারণ তিনি স্বাধীনতার জন্য সবকিছু ত্যাগ করেন। পথ স্বাধীনতার যাত্রাকে প্রতিনিধিত্ব করে এবং দাবি হল সেই ত্যাগ যা করতে হবে। শিরোনামটি দেশপ্রেম, ত্যাগ এবং স্বাধীনতার মূল্যের কেন্দ্রীয় বিষয়কে ধারণ করে যা প্রতিটি নাগরিককে দিতে রাজি থাকতে হবে।',
        wordCount: { actual: 220, min: 200, max: 300 },
        markingStrategy: {
            total: 5,
            breakdown: [
                { point: 'Meaning of title', pointBn: 'শিরোনামের অর্থ', marks: 1 },
                { point: 'Connection to theme', pointBn: 'থিমের সাথে সংযোগ', marks: 1.5 },
                { point: 'Character connection', pointBn: 'চরিত্রের সংযোগ', marks: 1.5 },
                { point: 'Conclusion', pointBn: 'উপসংহার', marks: 1 },
            ],
            tips: ['Define the title literally first', 'Connect to Sabyasachi'],
            tipsBn: ['প্রথমে শিরোনামের আক্ষরিক অর্থ দাও', 'সব্যসাচীর সাথে যুক্ত করো'],
        },
        keyPoints: [
            { point: 'Meaning: Demand of Path', pointBn: 'অর্থ: পথের দাবি' },
            { point: 'Symbolizes revolutionary sacrifice', pointBn: 'বিপ্লবী ত্যাগের প্রতীক' },
            { point: 'Sabyasachi embodies the title', pointBn: 'সব্যসাচী শিরোনাম মূর্ত করেন' },
        ],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2023, 2021, 2019, 2017],
        isPYQ: true,
        importance: 5,
        difficulty: 'medium',
        isImportant: true,
        tags: ['title', 'significance', 'theme'],
        order: 2,
        isActive: true,
    },
    {
        id: 'q-bengali-pd-3',
        chapterId: 'bengali-sem1-ch1',
        subjectId: 'bengali',
        semester: 1,
        type: 'vsaq',
        marks: 1,
        question: 'Where does Apurba work?',
        questionBn: 'অপূর্ব কোথায় কাজ করেন?',
        options: null,
        answer: 'Apurba works as a clerk in Burma (Myanmar).',
        answerBn: 'অপূর্ব বার্মায় (মায়ানমার) কেরানি হিসেবে কাজ করেন।',
        wordCount: { actual: 12, min: 10, max: 30 },
        markingStrategy: {
            total: 1,
            breakdown: [
                { point: 'Correct location and job', pointBn: 'সঠিক স্থান ও চাকরি', marks: 1 },
            ],
            tips: ['Direct answer needed'],
            tipsBn: ['সরাসরি উত্তর দাও'],
        },
        keyPoints: [],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2022],
        isPYQ: true,
        importance: 3,
        difficulty: 'easy',
        isImportant: false,
        tags: ['factual', 'character'],
        order: 3,
        isActive: true,
    },
    {
        id: 'q-bengali-pd-4',
        chapterId: 'bengali-sem1-ch1',
        subjectId: 'bengali',
        semester: 1,
        type: 'mcq',
        marks: 1,
        question: 'Who is the author of "Pather Dabi"?',
        questionBn: '"পথের দাবী" এর লেখক কে?',
        options: [
            { text: 'Rabindranath Tagore', textBn: 'রবীন্দ্রনাথ ঠাকুর', isCorrect: false },
            { text: 'Sarat Chandra Chattopadhyay', textBn: 'শরৎচন্দ্র চট্টোপাধ্যায়', isCorrect: true },
            { text: 'Bankim Chandra', textBn: 'বঙ্কিমচন্দ্র', isCorrect: false },
            { text: 'Manik Bandopadhyay', textBn: 'মানিক বন্দ্যোপাধ্যায়', isCorrect: false },
        ],
        answer: 'Sarat Chandra Chattopadhyay',
        answerBn: 'শরৎচন্দ্র চট্টোপাধ্যায়',
        wordCount: { actual: 0, min: 0, max: 0 },
        markingStrategy: null,
        keyPoints: [],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2021, 2019],
        isPYQ: true,
        importance: 4,
        difficulty: 'easy',
        isImportant: false,
        tags: ['author', 'mcq'],
        order: 4,
        isActive: true,
    },

    // ============ BENGALI QUESTIONS - বহিরাগত ============
    {
        id: 'q-bengali-bh-1',
        chapterId: 'bengali-sem1-ch2',
        subjectId: 'bengali',
        semester: 1,
        type: 'saq',
        marks: 3,
        question: 'What is the central theme of "Bohiragoto"?',
        questionBn: '"বহিরাগত" নাটকের মূল বিষয়বস্তু কী?',
        options: null,
        answer: 'The central theme of "Bohiragoto" is the conflict between the insider and outsider perspectives in society. It explores how a stranger can disrupt the established order and reveal hidden truths. The play also examines themes of identity, belonging, and social harmony versus individual truth.',
        answerBn: '"বহিরাগত" নাটকের মূল বিষয়বস্তু হল সমাজে অভ্যন্তরীণ এবং বাহ্যিক দৃষ্টিভঙ্গির মধ্যে দ্বন্দ্ব। এটি অন্বেষণ করে কীভাবে একজন অপরিচিত প্রতিষ্ঠিত শৃঙ্খলাকে বিঘ্নিত করতে পারে এবং লুকানো সত্য প্রকাশ করতে পারে। নাটকটি পরিচয়, অন্তর্গত হওয়া এবং সামাজিক সম্প্রীতি বনাম ব্যক্তিগত সত্যের বিষয়গুলিও পরীক্ষা করে।',
        wordCount: { actual: 75, min: 70, max: 100 },
        markingStrategy: {
            total: 3,
            breakdown: [
                { point: 'Main theme identification', pointBn: 'মূল থিম চিহ্নিতকরণ', marks: 1.5 },
                { point: 'Examples or elaboration', pointBn: 'উদাহরণ বা বিস্তারিত', marks: 1.5 },
            ],
            tips: ['Start with the insider-outsider conflict'],
            tipsBn: ['ভিতরের-বাইরের দ্বন্দ্ব দিয়ে শুরু করো'],
        },
        keyPoints: [
            { point: 'Insider vs outsider conflict', pointBn: 'ভিতরের বনাম বাইরের দ্বন্দ্ব' },
            { point: 'Social disruption', pointBn: 'সামাজিক বিঘ্ন' },
        ],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2023, 2020],
        isPYQ: true,
        importance: 4,
        difficulty: 'medium',
        isImportant: true,
        tags: ['theme', 'analysis'],
        order: 1,
        isActive: true,
    },

    // ============ ENGLISH QUESTIONS - The Eyes Have It ============
    {
        id: 'q-english-eh-1',
        chapterId: 'english-sem1-ch1',
        subjectId: 'english',
        semester: 1,
        type: 'saq',
        marks: 3,
        question: 'What is the irony in "The Eyes Have It"?',
        questionBn: '"দ্য আইজ হ্যাভ ইট" গল্পে বিড়ম্বনা কী?',
        options: null,
        answer: 'The irony in "The Eyes Have It" is that both the narrator and the girl on the train are blind, but neither realizes the other is visually impaired. The narrator pretends to see and describes the girl based on imagination, while the girl also appears to have normal conversation. The story ends with the revelation that both were creating an illusion of sight.',
        answerBn: '"দ্য আইজ হ্যাভ ইট" গল্পে বিড়ম্বনা হল যে বর্ণনাকারী এবং ট্রেনে মেয়ে উভয়েই অন্ধ, কিন্তু কেউই বুঝতে পারে না যে অন্যজনও দৃষ্টি প্রতিবন্ধী। বর্ণনাকারী দেখার ভান করে এবং কল্পনার ভিত্তিতে মেয়েট��কে বর্ণনা করে, যখন মেয়েটিও স্বাভাবিক কথোপকথন করছে বলে মনে হয়। গল্পটি এই প্রকাশ দিয়ে শেষ হয় যে উভয়ই দৃষ্টির একটি মায়া তৈরি করছিল।',
        wordCount: { actual: 90, min: 80, max: 120 },
        markingStrategy: {
            total: 3,
            breakdown: [
                { point: 'Identify the irony', pointBn: 'বিড়ম্বনা চিহ্নিত করো', marks: 1.5 },
                { point: 'Explain with examples', pointBn: 'উদাহরণ সহ ব্যাখ্যা', marks: 1.5 },
            ],
            tips: ['Focus on both characters being blind'],
            tipsBn: ['দুই চরিত্রই অন্ধ এই বিষয়ে ফোকাস করো'],
        },
        keyPoints: [
            { point: 'Both are blind', pointBn: 'দুজনেই অন্ধ' },
            { point: 'Neither knows about the other', pointBn: 'কেউই অন্যজনকে জানে না' },
            { point: 'Creates illusion of sight', pointBn: 'দৃষ্টির মায়া তৈরি করে' },
        ],
        hints: [],
        examinerTips: 'Always mention the dual blindness and the mutual deception.',
        examinerTipsBn: 'সবসময় দ্বৈত অন্ধত্ব এবং পারস্পরিক প্রতারণা উল্লেখ করো।',
        yearsAsked: [2023, 2022, 2021, 2020],
        isPYQ: true,
        importance: 5,
        difficulty: 'medium',
        isImportant: true,
        tags: ['irony', 'theme', 'analysis'],
        order: 1,
        isActive: true,
    },
    {
        id: 'q-english-eh-2',
        chapterId: 'english-sem1-ch1',
        subjectId: 'english',
        semester: 1,
        type: 'laq',
        marks: 5,
        question: 'Discuss the theme of perception vs reality in "The Eyes Have It".',
        questionBn: '"দ্য আইজ হ্যাভ ইট" গল্পে উপলব্ধি বনাম বাস্তবতার থিম আলোচনা করো।',
        options: null,
        answer: 'In "The Eyes Have It," Ruskin Bond masterfully explores the theme of perception versus reality. The narrator, who is blind, creates a vivid mental image of the girl based on her voice, perfume, and manner of speaking. He imagines her beauty, her dress, and her eyes without actually seeing her. Similarly, the girl seems to perceive the narrator as a sighted person. The story demonstrates how our senses can deceive us and how we often construct reality based on limited information. The final revelation that both characters are blind shatters the readers perception and forces us to question what is real. This theme reflects on human tendency to make assumptions and the gap between appearance and reality.',
        answerBn: '"দ্য আইজ হ্যাভ ইট" গল্পে রাস্কিন বন্ড দক্ষতার সাথে উপলব্ধি বনাম বাস্তবতার থিম অন্বেষণ করেন। বর্ণনাকারী, যিনি অন্ধ, মেয়েটির কণ্ঠস্বর, সুগন্ধি এবং কথা বলার ধরনের ভিত্তিতে তার একটি প্রাণবন্ত মানসিক চিত্র তৈরি করেন। তিনি প্রকৃতপক্ষে না দেখেই তার সৌন্দর্য, তার পোশাক এবং তার চোখ কল্পনা করেন। একইভাবে, মেয়েটি বর্ণনাকারীকে একজন দৃষ্টিসম্পন্ন ব্যক্তি হিসেবে উপলব্ধি করে বলে মনে হয়। গল্পটি দেখায় কীভাবে আমাদের ইন্দ্রিয় আমাদের প্রতারিত করতে পারে এবং আমরা প্রায়ই সীমিত তথ্যের ভিত্তিতে বাস্তবতা নির্মাণ করি। উভয় চরিত্রই অন্ধ এই চূড়ান্ত প্রকাশ পাঠকের উপলব্ধি ভেঙে দেয় এবং আমাদের প্রশ্ন করতে বাধ্য করে কোনটি সত্য। এই থিমটি মানুষের অনুমান করার প্রবণতা এবং চেহারা ও বাস্তবতার মধ্যে ব্যবধানকে প্রতিফলিত করে।',
        wordCount: { actual: 250, min: 200, max: 300 },
        markingStrategy: {
            total: 5,
            breakdown: [
                { point: 'Introduction to theme', pointBn: 'থিমের পরিচয়', marks: 1 },
                { point: 'Narrator perspective', pointBn: 'বর্ণনাকারীর দৃষ্টিভঙ্গি', marks: 1.5 },
                { point: 'Girl perspective', pointBn: 'মেয়ের দৃষ্টিভঙ্গি', marks: 1 },
                { point: 'Conclusion and significance', pointBn: 'উপসংহার ও গুরুত্ব', marks: 1.5 },
            ],
            tips: ['Define perception and reality first', 'Give examples from story'],
            tipsBn: ['প্রথমে উপলব্ধি ও বাস্তবতা সংজ্ঞায়িত করো', 'গল্প থেকে উদাহরণ দাও'],
        },
        keyPoints: [],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2022, 2020, 2018],
        isPYQ: true,
        importance: 5,
        difficulty: 'hard',
        isImportant: true,
        tags: ['theme', 'analysis', 'detailed'],
        order: 2,
        isActive: true,
    },
    {
        id: 'q-english-eh-3',
        chapterId: 'english-sem1-ch1',
        subjectId: 'english',
        semester: 1,
        type: 'vsaq',
        marks: 1,
        question: 'Who is the author of "The Eyes Have It"?',
        questionBn: '"দ্য আইজ হ্যাভ ইট" এর লেখক কে?',
        options: null,
        answer: 'Ruskin Bond is the author of "The Eyes Have It".',
        answerBn: 'রাস্কিন বন্ড "দ্য আইজ হ্যাভ ইট" এর লেখক।',
        wordCount: { actual: 12, min: 10, max: 25 },
        markingStrategy: null,
        keyPoints: [],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2021],
        isPYQ: true,
        importance: 3,
        difficulty: 'easy',
        isImportant: false,
        tags: ['author', 'factual'],
        order: 3,
        isActive: true,
    },

    // ============ HISTORY QUESTIONS - Renaissance ============
    {
        id: 'q-history-ren-1',
        chapterId: 'history-sem1-ch1',
        subjectId: 'history',
        semester: 1,
        type: 'saq',
        marks: 3,
        question: 'What do you mean by Renaissance?',
        questionBn: 'রেনেসাঁস বলতে কী বোঝ?',
        options: null,
        answer: 'Renaissance means "rebirth" or "revival". It refers to the cultural and intellectual movement that began in Italy in the 14th century and spread across Europe. It marked the transition from medieval to modern times, characterized by renewed interest in classical Greek and Roman culture, art, science, and humanist thinking. Key figures include Leonardo da Vinci, Michelangelo, and Machiavelli.',
        answerBn: 'রেনেসাঁস অর্থ "পুনর্জন্ম" বা "পুনরুজ্জীবন"। এটি ১৪শ শতকে ইতালিতে শুরু হওয়া এবং ইউরোপ জুড়ে ছড়িয়ে পড়া সাংস্কৃতিক ও বৌদ্ধিক আন্দোলনকে বোঝায়। এটি মধ্যযুগ থেকে আধুনিক যুগে উত্তরণ চিহ্নিত করে, যা ধ্রুপদী গ্রিক ও রোমান সংস্কৃতি, শিল্প, বিজ্ঞান এবং মানবতাবাদী চিন্তার প্রতি নতুন আগ্রহ দ্বারা ��ৈশিষ্ট্যযুক্ত। প্রধান ব্যক্তিত্বের মধ্যে রয়েছেন লিওনার্দো দা ভিঞ্চি, মাইকেলেঞ্জেলো এবং মাকিয়াভেলি।',
        wordCount: { actual: 85, min: 80, max: 120 },
        markingStrategy: {
            total: 3,
            breakdown: [
                { point: 'Meaning of Renaissance', pointBn: 'রেনেসাঁসের অর্থ', marks: 1 },
                { point: 'Origin and spread', pointBn: 'উৎপত্তি ও বিস্তার', marks: 1 },
                { point: 'Main features', pointBn: 'প্রধান বৈশিষ্ট্য', marks: 1 },
            ],
            tips: ['Start with literal meaning', 'Mention Italy', 'Give 2-3 features'],
            tipsBn: ['আক্ষরিক অর্থ দিয়ে শুরু করো', 'ইতালির কথা বলো', '২-৩টি বৈশিষ্ট্য দাও'],
        },
        keyPoints: [
            { point: 'Meaning: Rebirth', pointBn: 'অর্থ: পুনর্জন্ম' },
            { point: 'Started in Italy, 14th century', pointBn: '১৪শ শতকে ইতালিতে শুরু' },
            { point: 'Revival of classical culture', pointBn: 'ধ্রুপদী সংস্কৃতির পুনরুজ্জীবন' },
        ],
        hints: [],
        examinerTips: 'Always mention it started in Italy and give at least one famous name.',
        examinerTipsBn: 'সবসময় বলো যে এটি ইতালিতে শুরু হয়েছিল এবং অন্তত একটি বিখ্যাত নাম দাও।',
        yearsAsked: [2023, 2022, 2021, 2020, 2019],
        isPYQ: true,
        importance: 5,
        difficulty: 'easy',
        isImportant: true,
        tags: ['definition', 'important'],
        order: 1,
        isActive: true,
    },
    {
        id: 'q-history-ren-2',
        chapterId: 'history-sem1-ch1',
        subjectId: 'history',
        semester: 1,
        type: 'laq',
        marks: 8,
        question: 'Discuss the causes of Renaissance.',
        questionBn: 'রেনেসাঁসের কারণগুলি আলোচনা করো।',
        options: null,
        answer: 'The Renaissance was caused by multiple interconnected factors:\n\n1. **Fall of Constantinople (1453)**: Greek scholars fled to Italy, bringing classical manuscripts and knowledge.\n\n2. **Growth of Trade and Commerce**: Italian city-states like Florence, Venice became wealthy through trade, funding arts and education.\n\n3. **Decline of Feudalism**: Weakening of feudal system allowed new ideas to flourish.\n\n4. **Invention of Printing Press**: Gutenberg\'s printing press (1450) made books accessible, spreading new ideas rapidly.\n\n5. **Patronage**: Wealthy families like the Medici supported artists and scholars.\n\n6. **Spirit of Inquiry**: Growing curiosity about nature and human potential replaced blind faith.\n\n7. **Geographic Position of Italy**: Italy\'s location facilitated trade with the East, bringing new ideas and wealth.\n\nThese factors combined to create an environment ripe for cultural and intellectual revolution.',
        answerBn: 'রেনেসাঁস বহু আন্তঃসংযুক্ত কারণে ঘটেছিল:\n\n১. **কনস্টান্টিনোপলের পতন (১৪৫৩)**: গ্রিক পণ্ডিতরা ধ্রুপদী পান্ডুলিপি ও জ্ঞান নিয়ে ইতালিতে পালিয়ে আসেন।\n\n২. **বাণিজ্য ও বাণিজ্যের বৃদ্ধি**: ফ্লোরেন্স, ভেনিসের মতো ইতালীয় নগর-রাষ্ট্রগুলি বাণিজ্যের মাধ্যমে সমৃদ্ধ হয়, শিল্প ও শিক্ষায় অর্থায়ন করে।\n\n৩. **সামন্তবাদের পতন**: সামন্তব্যবস্থার দুর্বলতা নতুন ধারণার বিকাশ ঘটায়।\n\n৪. **মুদ্রণযন্ত্র আবিষ্কার**: গুটেনবার্গের মুদ্রণযন্ত্র (১৪৫০) বইকে সহজলভ্য করে, নতুন ধারণা দ্রুত ছড়িয়ে দেয়।\n\n৫. **পৃষ্ঠপোষকতা**: মেডিচির মতো ধনী পরিবার শিল্পী ও পণ্ডিতদের পৃষ্ঠপোষকতা করে।\n\n৬. **অনুসন্ধান চেতনা**: প্রকৃতি ও মানব সম্ভাবনা সম্পর্কে ক্রমবর্ধমান কৌতূহল অন্ধ বিশ্বাসকে প্রতিস্থাপন করে।\n\n৭. **ইতালির ভৌগোলিক অবস্থান**: ইতালির অবস্থান পূর্বের সাথে বাণিজ্য সুগম করে, নতুন ধারণা ও সম্পদ নিয়ে আসে।',
        wordCount: { actual: 320, min: 280, max: 400 },
        markingStrategy: {
            total: 8,
            breakdown: [
                { point: 'Fall of Constantinople', pointBn: 'কনস্টান্টিনোপলের পতন', marks: 1.5 },
                { point: 'Trade & Commerce', pointBn: 'বাণিজ্য ও বাণিজ্য', marks: 1.5 },
                { point: 'Printing Press', pointBn: 'মুদ্রণযন্ত্র', marks: 1.5 },
                { point: 'Patronage', pointBn: 'পৃষ্ঠপোষকতা', marks: 1.5 },
                { point: 'Other causes & conclusion', pointBn: 'অন্যান্য কারণ ও উপসংহার', marks: 2 },
            ],
            tips: ['Minimum 5 causes with explanation', 'Use headings for each point'],
            tipsBn: ['ব্যাখ্যা সহ কমপক্ষে ৫টি কারণ', 'প্রতিটি পয়েন্টের জন্য শিরোনাম ব্যবহার করো'],
        },
        keyPoints: [],
        hints: [],
        examinerTips: 'Mention at least 5 causes with brief explanations. Draw conclusion.',
        examinerTipsBn: 'সংক্ষিপ্ত ব্যাখ্যা সহ কমপক্ষে ৫টি কারণ উল্লেখ করো। উপসংহার টানো।',
        yearsAsked: [2023, 2022, 2020],
        isPYQ: true,
        importance: 5,
        difficulty: 'hard',
        isImportant: true,
        tags: ['causes', 'detailed', 'important'],
        order: 2,
        isActive: true,
    },

    // ============ GEOGRAPHY QUESTIONS ============
    {
        id: 'q-geo-atm-1',
        chapterId: 'geography-sem1-ch2',
        subjectId: 'geography',
        semester: 1,
        type: 'saq',
        marks: 3,
        question: 'What are the layers of atmosphere?',
        questionBn: 'বায়ুমণ্ডলের স্তরগুলি কী কী?',
        options: null,
        answer: 'The atmosphere has five main layers from bottom to top:\n1. **Troposphere** (0-12 km): Weather phenomena occur here\n2. **Stratosphere** (12-50 km): Contains ozone layer\n3. **Mesosphere** (50-80 km): Meteors burn here\n4. **Thermosphere** (80-700 km): Aurora occurs here\n5. **Exosphere** (700+ km): Outermost layer, merges with space',
        answerBn: 'বায়ুমণ্ডলে নিচ থেকে উপরে পাঁচটি প্রধান স্তর আছে:\n১. **ট্রপোস্ফিয়ার** (০-১২ কিমি): আবহাওয়ার ঘটনা এখানে ঘটে\n২. **স্ট্রাটোস্ফিয়ার** (১২-৫০ কিমি): ওজোন স্তর ধারণ করে\n৩. **মেসোস্ফিয়ার** (৫০-৮০ কিমি): উল্কা এখানে জ্বলে\n৪. **থার্মোস্ফিয়ার** (৮০-৭০০ কিমি): মেরুজ্যোতি এখানে ঘটে\n৫. **এক্সোস্ফিয়ার** (৭০০+ কিমি): বাইরের স্তর, মহাকাশের সাথে মিশে যায়',
        wordCount: { actual: 95, min: 80, max: 120 },
        markingStrategy: {
            total: 3,
            breakdown: [
                { point: 'Correct layers named', pointBn: 'সঠিক স্তর নাম', marks: 1.5 },
                { point: 'Height or features', pointBn: 'উচ্চতা বা বৈশিষ্ট্য', marks: 1.5 },
            ],
            tips: ['List all 5 layers', 'Add one feature for each'],
            tipsBn: ['৫টি স্তর তালিকা করো', 'প্রতিটির জন্য একটি বৈশিষ্ট্য যোগ করো'],
        },
        keyPoints: [
            { point: '5 layers total', pointBn: 'মোট ৫টি স্তর' },
            { point: 'Troposphere is lowest', pointBn: 'ট্রপোস্ফিয়ার সবচেয়ে নিচে' },
        ],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2023, 2021, 2020],
        isPYQ: true,
        importance: 4,
        difficulty: 'medium',
        isImportant: true,
        tags: ['layers', 'atmosphere'],
        order: 1,
        isActive: true,
    },

    // ============ PHILOSOPHY QUESTIONS ============
    {
        id: 'q-phil-log-1',
        chapterId: 'philosophy-sem1-ch2',
        subjectId: 'philosophy',
        semester: 1,
        type: 'saq',
        marks: 2,
        question: 'Define Logic.',
        questionBn: 'যুক্তিবিদ্যার সংজ্ঞা দাও।',
        options: null,
        answer: 'Logic is the science of valid reasoning and correct inference. It studies the principles and methods by which we distinguish correct reasoning from incorrect reasoning. Logic helps us evaluate arguments systematically and reach sound conclusions from given premises.',
        answerBn: 'যুক্তিবিদ্যা হল বৈধ যুক্তি এবং সঠিক অনুমানের বিজ্ঞান। এটি সেই নীতি এবং পদ্ধতিগুলি অধ্যয়ন করে যার দ্বারা আমরা সঠিক যুক্তিকে ভুল যুক্তি থেকে আলাদা করি। যুক্তিবিদ্যা আমাদের পদ্ধতিগতভাবে যুক্তি মূল্যায়ন করতে এবং প্রদত্ত ভিত্তি থেকে সঠিক সিদ্ধান্তে পৌঁছাতে সাহায্য করে।',
        wordCount: { actual: 55, min: 50, max: 80 },
        markingStrategy: {
            total: 2,
            breakdown: [
                { point: 'Basic definition', pointBn: 'মৌলিক সংজ্ঞা', marks: 1 },
                { point: 'Purpose/function', pointBn: 'উদ্দেশ্য/কাজ', marks: 1 },
            ],
            tips: ['Give meaning then explain its purpose'],
            tipsBn: ['অর্থ দিয়ে তারপর এর উদ্দেশ্য ব্যাখ্যা করো'],
        },
        keyPoints: [],
        hints: [],
        examinerTips: null,
        examinerTipsBn: null,
        yearsAsked: [2022, 2020],
        isPYQ: true,
        importance: 4,
        difficulty: 'easy',
        isImportant: true,
        tags: ['definition', 'logic'],
        order: 1,
        isActive: true,
    },
];

// Get questions by chapter ID
export function getQuestionsByChapterId(chapterId: string): Question[] {
    return sampleQuestions
        .filter((q) => q.chapterId === chapterId && q.isActive)
        .sort((a, b) => a.order - b.order);
}

// Get questions by chapter and type
export function getQuestionsByChapterAndType(
    chapterId: string,
    type: string
): Question[] {
    if (type === 'all') return getQuestionsByChapterId(chapterId);
    if (type === 'pyq') {
        return sampleQuestions
            .filter((q) => q.chapterId === chapterId && q.isPYQ && q.isActive)
            .sort((a, b) => a.order - b.order);
    }
    return sampleQuestions
        .filter((q) => q.chapterId === chapterId && q.type === type && q.isActive)
        .sort((a, b) => a.order - b.order);
}

// Get question by ID
export function getQuestionById(questionId: string): Question | undefined {
    return sampleQuestions.find((q) => q.id === questionId);
}

// Get important questions by subject
export function getImportantQuestionsBySubject(subjectId: string): Question[] {
    return sampleQuestions
        .filter((q) => q.subjectId === subjectId && q.isImportant && q.isActive)
        .sort((a, b) => b.importance - a.importance);
}

// Get PYQ questions by subject
export function getPYQQuestionsBySubject(subjectId: string): Question[] {
    return sampleQuestions
        .filter((q) => q.subjectId === subjectId && q.isPYQ && q.isActive)
        .sort((a, b) => b.yearsAsked[0] - a.yearsAsked[0]);
}

// Count questions by chapter
export function getQuestionCountsByChapter(chapterId: string): {
    all: number;
    saq: number;
    laq: number;
    mcq: number;
    vsaq: number;
    pyq: number;
} {
    const questions = sampleQuestions.filter(
        (q) => q.chapterId === chapterId && q.isActive
    );
    return {
        all: questions.length,
        saq: questions.filter((q) => q.type === 'saq').length,
        laq: questions.filter((q) => q.type === 'laq').length,
        mcq: questions.filter((q) => q.type === 'mcq').length,
        vsaq: questions.filter((q) => q.type === 'vsaq').length,
        pyq: questions.filter((q) => q.isPYQ).length,
    };
}
