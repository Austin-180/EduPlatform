import { createContext, useContext, useEffect, useState } from 'react'

const TRANSLATIONS = {
  'zh-TW': {
    // Nav
    home: '首頁',
    dashboard: '學習頁',
    courses: '課程',
    aiTutor: 'AI 助理',
    sandbox: '練習區',
    settings: '設定',

    // Common
    back: '← 返回',
    continue: '繼續 →',
    edit: '編輯',

    // Dashboard toolbar
    summary: '摘要',
    concepts: '概念',
    mindMap: '心智圖',
    skipChapter: '跳過章節 →',
    lastChapter: '最後章節',
    codeSandbox: '程式沙盒',
    runDebug: '▶ 執行並除錯',
    aiTutorTool: 'AI 助理',
    sandboxTool: '沙盒',
    settingsTool: '設定',

    // Home
    homeTitle: '歡迎使用 AI 學習平台',
    homeSubtitle: '你的個人化 AI 學習體驗。透過智能導師、互動練習和程式沙盒掌握程式設計。',
    getStarted: '立即開始',

    // Login
    loginTitle: '歡迎',
    loginSubtitle: '開始你的個人化 AI 學習旅程',
    signInGoogle: '使用 Google 登入',
    signInApple: '使用 Apple 登入',
    signInFacebook: '使用 Facebook 登入',
    continueAsGuest: '以訪客身分繼續',

    // Courses
    chooseYourPath: '選擇你的學習路徑',
    selectCourseSubtitle: '選擇課程，開始你的個人化 AI 學習旅程。',

    // Questionnaire
    tellUsAboutYou: '告訴我們關於你的事',
    customizeExperience: '幫助我們個人化你的程式學習體驗',
    currentLevel: '你目前的程度是？',
    learningGoalsQ: '你的學習目標是什麼？',
    weeklyCommitment: '你每週能投入多少時間？',

    // LearningPathConfirm
    yourPersonalizedPath: '你的個人化學習路徑',
    basedOnResponses: '根據你的回答，我們為你量身打造了課程',
    recommendedTrack: '推薦路徑：',
    yourGoals: '你的目標',
    whatYouLearn: '你將學習的內容',
    viewStudyPlan: '查看學習計畫',
    difficultyLevel: '難度等級',
    studyTime: '學習時間',
    duration: '時長',
    estimatedDuration: '預計時長',
    weeklyCommitmentLabel: '每週投入',

    // LearningRoadmap
    yourRoadmap: '你的學習路線圖',
    customized4Week: '為你的程式學習旅程設計的 4 週路線圖',
    learningRoadmapCard: '學習路線圖',
    startLearning: '開始學習 →',
    upcoming: '即將到來',

    // Settings page (/settings route)
    settingsTitle: '設定',
    preferencesTag: 'Preferences',
    settingsSubtitle: '管理你的帳號、外觀與學習偏好。',
    accountSection: '👤 帳號資訊',
    username: '使用者名稱',
    joinDate: '加入時間',
    currentPlan: '目前方案',
    accountStatus: '帳號狀態',
    appearanceSection: '🎨 外觀',
    darkMode: '深色模式',
    darkModeCurrentDark: '目前：深色模式',
    darkModeCurrentLight: '目前：淺色模式',
    interfaceLanguage: '介面語言',
    interfaceLanguageHint: '影響按鈕與說明文字',
    learningPrefsSection: '📚 學習偏好',
    defaultDifficulty: '預設難度',
    defaultDifficultyHint: '影響推薦課程與題目',
    difficultyBeginner: '入門',
    difficultyIntermediate: '進階',
    difficultyAdvanced: '挑戰',
    autoplayLabel: '自動播放下一堂',
    autoplayHint: '完成後自動跳到下一章節',
    soundEffectsLabel: '答題音效',
    soundEffectsHint: '完成與答對時播放音效',
    notificationsSection: '🔔 通知',
    emailNotifLabel: '電子郵件通知',
    emailNotifHint: '學習提醒與課程更新',
    weeklyReportLabel: '每週學習報告',
    weeklyReportHint: '每週日寄送學習摘要至信箱',
    dangerZoneSection: '⚠️ 危險區域',
    dangerZoneNote: '以下操作無法還原，請謹慎操作。',
    resetProgress: '重設學習進度',
    deleteAccount: '刪除帳號',

    // Dashboard inner settings panel
    dashboardAccountSection: '帳號',
    dashboardAppearanceSection: '外觀',
    dashboardLearningSection: '學習偏好',
    accountName: '姓名',
    accountEmail: '信箱',
    accountPlan: '方案',
    dashboardDarkModeHint: '請使用右上角的切換按鈕',
    learningSpeedLabel: '學習速度',
    learningSpeedRelaxed: '輕鬆',
    learningSpeedStandard: '標準',
    learningSpeedIntensive: '密集',

    // Tutor
    newChat: '✦ 新對話',
    suggestedTopics: '學習建議',
    chatHistory: '歷史對話',
    online: 'Online',
    poweredBy: 'Powered by EduPlatform AI',
    askQuestion: '問你的 AI Tutor 任何問題...',

    // Sandbox
    exercises: '練習題目',
    runCode: '▶ Run Code',
    runningCode: '⏳ Running...',
    outputLabel: 'Output',
    clickToRun: 'Click Run Code to execute...',
  },
  en: {
    // Nav
    home: 'Home',
    dashboard: 'Dashboard',
    courses: 'Courses',
    aiTutor: 'AI Tutor',
    sandbox: 'Sandbox',
    settings: 'Settings',

    // Common
    back: '← Back',
    continue: 'Continue →',
    edit: 'Edit',

    // Dashboard toolbar
    summary: 'Summary',
    concepts: 'Concepts',
    mindMap: 'Mind Map',
    skipChapter: 'Skip Chapter →',
    lastChapter: 'Last Chapter',
    codeSandbox: 'Code Sandbox',
    runDebug: '▶ Run & Debug',
    aiTutorTool: 'AI Tutor',
    sandboxTool: 'Sandbox',
    settingsTool: 'Settings',

    // Home
    homeTitle: 'Welcome to AI Learning Platform',
    homeSubtitle: 'Your personalized AI-powered learning experience. Master programming with an intelligent tutor, interactive exercises, and a built-in code sandbox.',
    getStarted: 'Get Started',

    // Login
    loginTitle: 'Welcome',
    loginSubtitle: 'Begin your personalized AI learning journey',
    signInGoogle: 'Sign in with Google',
    signInApple: 'Sign in with Apple',
    signInFacebook: 'Sign in with Facebook',
    continueAsGuest: 'Continue as Guest',

    // Courses
    chooseYourPath: 'Choose Your Learning Path',
    selectCourseSubtitle: 'Select a course to begin your personalized AI learning journey.',

    // Questionnaire
    tellUsAboutYou: 'Tell Us About Yourself',
    customizeExperience: 'Help us customize your learning experience in programming',
    currentLevel: 'What is your current level?',
    learningGoalsQ: 'What are your learning goals?',
    weeklyCommitment: 'How much time can you commit weekly?',

    // LearningPathConfirm
    yourPersonalizedPath: 'Your Personalized Learning Path',
    basedOnResponses: "Based on your responses, we've crafted a custom curriculum for you",
    recommendedTrack: 'Recommended Track:',
    yourGoals: 'Your Goals',
    whatYouLearn: "What You'll Learn",
    viewStudyPlan: 'View Study Plan',
    difficultyLevel: 'Difficulty Level',
    studyTime: 'Study Time',
    duration: 'Duration',
    estimatedDuration: 'Estimated Duration',
    weeklyCommitmentLabel: 'Weekly Commitment',

    // LearningRoadmap
    yourRoadmap: 'Your Learning Roadmap',
    customized4Week: 'A customized 4-week roadmap designed for your programming learning journey',
    learningRoadmapCard: 'Learning Roadmap',
    startLearning: 'Start Learning →',
    upcoming: 'upcoming',

    // Settings page (/settings route)
    settingsTitle: 'Settings',
    preferencesTag: 'Preferences',
    settingsSubtitle: 'Manage your account, appearance, and learning preferences.',
    accountSection: '👤 Account',
    username: 'Username',
    joinDate: 'Join Date',
    currentPlan: 'Current Plan',
    accountStatus: 'Account Status',
    appearanceSection: '🎨 Appearance',
    darkMode: 'Dark Mode',
    darkModeCurrentDark: 'Currently: dark mode',
    darkModeCurrentLight: 'Currently: light mode',
    interfaceLanguage: 'Language',
    interfaceLanguageHint: 'Affects buttons and labels',
    learningPrefsSection: '📚 Learning Preferences',
    defaultDifficulty: 'Default Difficulty',
    defaultDifficultyHint: 'Affects recommended courses and exercises',
    difficultyBeginner: 'Beginner',
    difficultyIntermediate: 'Intermediate',
    difficultyAdvanced: 'Advanced',
    autoplayLabel: 'Auto-play Next Lesson',
    autoplayHint: 'Automatically advance to the next chapter',
    soundEffectsLabel: 'Sound Effects',
    soundEffectsHint: 'Play sounds on completion and correct answers',
    notificationsSection: '🔔 Notifications',
    emailNotifLabel: 'Email Notifications',
    emailNotifHint: 'Learning reminders and course updates',
    weeklyReportLabel: 'Weekly Learning Report',
    weeklyReportHint: 'Receive a weekly summary every Sunday',
    dangerZoneSection: '⚠️ Danger Zone',
    dangerZoneNote: 'The following actions cannot be undone. Proceed with caution.',
    resetProgress: 'Reset Progress',
    deleteAccount: 'Delete Account',

    // Dashboard inner settings panel
    dashboardAccountSection: 'Account',
    dashboardAppearanceSection: 'Appearance',
    dashboardLearningSection: 'Learning Preferences',
    accountName: 'Name',
    accountEmail: 'Email',
    accountPlan: 'Plan',
    dashboardDarkModeHint: 'Use the toggle in the top-right header',
    learningSpeedLabel: 'Learning Speed',
    learningSpeedRelaxed: 'Relaxed',
    learningSpeedStandard: 'Standard',
    learningSpeedIntensive: 'Intensive',

    // Tutor
    newChat: '✦ New Chat',
    suggestedTopics: 'Suggested Topics',
    chatHistory: 'History',
    online: 'Online',
    poweredBy: 'Powered by EduPlatform AI',
    askQuestion: 'Ask your AI Tutor anything...',

    // Sandbox
    exercises: 'Exercises',
    runCode: '▶ Run Code',
    runningCode: '⏳ Running...',
    outputLabel: 'Output',
    clickToRun: 'Click Run Code to execute...',
  },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('edu-language') || 'zh-TW'
  )

  useEffect(() => {
    localStorage.setItem('edu-language', language)
  }, [language])

  function t(key) {
    return TRANSLATIONS[language]?.[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

const FALLBACK = { language: 'zh-TW', setLanguage: () => {}, t: k => k }
export const useLanguage = () => useContext(LanguageContext) ?? FALLBACK
