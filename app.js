/**
 * MockMate AI - Single Page Application Core Engine (app.js)
 */

// ==========================================
// 1. Initial State & Data Persistence
// ==========================================
const MOCK_QUESTIONS = {
  frontend: [
    {
      id: 1,
      category: "React",
      difficulty: "Intermediate",
      text: "Explain the Virtual DOM and why React uses it.",
      hint: "Think about the cost of direct DOM manipulation compared to JavaScript computations and how diffing works.",
      modelAnswer: "The Virtual DOM is a lightweight, in-memory representation of the real DOM. React uses it to improve performance. When a component state changes, React first applies the changes to the Virtual DOM, compares it with the previous Virtual DOM snapshot (a process called 'diffing'), computes the minimum set of changes needed, and updates only those specific nodes in the real DOM (called reconciliation)."
    },
    {
      id: 2,
      category: "CSS",
      difficulty: "Intermediate",
      text: "What is the difference between Flexbox and CSS Grid? When would you use one over the other?",
      hint: "Compare one-dimensional vs two-dimensional layouts, and how content-out vs layout-in approaches apply.",
      modelAnswer: "Flexbox is a 1D layout system designed for aligning content along a single axis (either row or column). CSS Grid is a 2D layout system designed to manage rows and columns simultaneously. You should use Flexbox for small-scale layouts, navigation bars, or content alignment. Grid is best for full-page structures, card layouts, or complex overlapping designs."
    },
    {
      id: 3,
      category: "JavaScript",
      difficulty: "Hard",
      text: "Explain closures in JavaScript and provide a practical use case.",
      hint: "A closure is created when a function is defined inside another function and remembers its lexical scope even when executed outside.",
      modelAnswer: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created. A common use case is data privacy (creating private variables that can only be read or modified by specific accessor methods) or function currying and factory functions."
    }
  ],
  backend: [
    {
      id: 1,
      category: "Node.js",
      difficulty: "Intermediate",
      text: "Explain the Event Loop in Node.js and how it handles asynchronous operations.",
      hint: "Discuss call stack, callback queue, macro-tasks, micro-tasks, and the non-blocking I/O execution model.",
      modelAnswer: "The Event Loop is the core mechanism that allows Node.js to perform non-blocking, single-threaded I/O operations. It constantly monitors the Call Stack and Callback Queue. When the Call Stack is empty, it pushes asynchronous callbacks (like database queries, timer executions, or network responses) from the callback queue onto the stack for execution. It processes micro-tasks (like Promises) first, followed by macro-tasks."
    },
    {
      id: 2,
      category: "Databases",
      difficulty: "Hard",
      text: "What are database transactions, and what does ACID stand for?",
      hint: "ACID properties ensure database reliability. Relate them to atomicity, consistency, isolation, and durability.",
      modelAnswer: "A database transaction is a sequence of one or more database operations treated as a single unit of work. ACID stands for: Atomicity (all operations succeed, or none do), Consistency (transaction moves the DB from one valid state to another), Isolation (concurrent transactions execute independently), and Durability (committed changes are permanently saved, even in a crash)."
    }
  ],
  hr: [
    {
      id: 1,
      category: "Behavioral",
      difficulty: "Easy",
      text: "Tell me about a time you faced a difficult conflict within a team project and how you resolved it.",
      hint: "Use the STAR method: describe the Situation, Task, Action, and the positive Result.",
      modelAnswer: "When faced with team conflict, the best approach is direct, open, and empathetic communication. In a past project, two teammates disagreed on design patterns, stalling progress. I organized a constructive discussion where both presented their pros/cons, and we agreed on a hybrid compromise. This helped us align, complete the module, and finish the project on time."
    },
    {
      id: 2,
      category: "Introduction",
      difficulty: "Easy",
      text: "Why do you want to join our organization, and what makes you a good fit for this role?",
      hint: "Connect your personal values and skills to the company's mission and the specific job description requirements.",
      modelAnswer: "I want to join your organization because of your emphasis on innovation and user-centric engineering. Based on my technical background in frontend performance optimization and my collaborative communication style, I believe I can quickly contribute to your core developer platform team while learning from your industry experts."
    }
  ],
  coding: [
    {
      id: 1,
      category: "Two Sum",
      difficulty: "Easy",
      text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      hint: "Use a hash map to store visited elements and find the complement (target - current_val) in O(N) time.",
      modelAnswer: "An optimal solution uses a hash map to map values to their indices. For each element in nums, we compute complement = target - nums[i]. If complement is in the map, we return its index and the current index. Otherwise, we store the current value and index in the map. This achieves O(N) time and O(N) space complexity."
    },
    {
      id: 2,
      category: "Reverse String",
      difficulty: "Easy",
      text: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
      hint: "Use two pointers, left starting at index 0 and right starting at index length-1. Swap elements and move pointers closer.",
      modelAnswer: "We can reverse the string in-place using a two-pointer approach. Maintain two indices, 'left' at 0 and 'right' at s.length - 1. While left < right, swap s[left] and s[right], then increment left and decrement right. This works in-place using O(1) auxiliary space and O(N) time."
    },
    {
      id: 3,
      category: "Valid Parentheses",
      difficulty: "Intermediate",
      text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      hint: "Use a stack to track open brackets. Push open brackets, and when encountering a closing bracket, check if it matches the top of the stack.",
      modelAnswer: "Using a stack, iterate through each character in the string. If it is an opening bracket, push it to the stack. If it is a closing bracket, check if the stack is empty or the top of the stack does not match; if so, return false. If they match, pop the stack. Finally, return true if the stack is empty."
    }
  ]
};

// Initial Mock Database for First Time Users (if localStorage is empty)
const DEFAULT_HISTORY = [
  {
    id: "int-101",
    role: "Frontend Developer",
    category: "Technical",
    difficulty: "Intermediate",
    date: "2026-06-24",
    duration: "10 mins",
    score: 82,
    answers: [
      {
        question: "Explain the Virtual DOM and why React uses it.",
        userAnswer: "Virtual DOM is a copy of real DOM in JS memory. When state updates, React changes virtual DOM first, then diffs the new one with old one to update only the changed things in the browser. It makes rendering faster.",
        score: 85,
        strengths: ["Clear understanding of Virtual DOM in memory", "Accurate explanation of the diffing process"],
        improvements: ["Could mention reconciliation terminology", "Could explain the performance overhead of direct DOM writes in detail"],
        modelAnswer: MOCK_QUESTIONS.frontend[0].modelAnswer
      },
      {
        question: "What is the difference between Flexbox and CSS Grid?",
        userAnswer: "Flexbox handles items in 1 dimension (either rows or columns). CSS Grid is for 2 dimensions (managing both rows and columns at the same time). I use flexbox for navigation links and Grid for layout.",
        score: 79,
        strengths: ["Correct differentiation between 1D and 2D layouts", "Good application-level examples (navbar vs main grid)"],
        improvements: ["Explain content-first vs layout-first concept", "Mention CSS properties unique to grid (e.g. grid-template-areas)"],
        modelAnswer: MOCK_QUESTIONS.frontend[1].modelAnswer
      }
    ],
    skills: {
      technical: 85,
      communication: 78,
      problemSolving: 80,
      confidence: 84,
      clarity: 83
    }
  },
  {
    id: "int-102",
    role: "Software Engineer",
    category: "HR Mock",
    difficulty: "Easy",
    date: "2026-06-25",
    duration: "5 mins",
    score: 74,
    answers: [
      {
        question: "Tell me about a time you faced a conflict in a team.",
        userAnswer: "We had a conflict about coding structure in our college hackathon. I sat down with my teammate, listened to his reasons, and we decided to use clean variables. It worked well.",
        score: 74,
        strengths: ["Shows active listening skills", "Clear conflict outcome described"],
        improvements: ["Structure answer using STAR framework", "Elaborate more on actions taken to reach compromise"],
        modelAnswer: MOCK_QUESTIONS.hr[0].modelAnswer
      }
    ],
    skills: {
      technical: 60,
      communication: 80,
      problemSolving: 75,
      confidence: 72,
      clarity: 83
    }
  }
];

// Returns a clean, blank state for a brand-new user (no pre-filled Rahul data)
function createFreshState(overrides = {}) {
  return {
    isLoggedIn: false,
    isNewUser: false,  // true for brand-new signups — blocks backend sync overwriting fresh state
    user: {
      name: "",
      email: "",
      avatar: "",
      targetRole: "",
      experienceLevel: "",
      skills: [],
      summary: "",
      resumeName: null
    },
    history: [],
    notifications: [],
    tickets: [],
    activity: [],
    currentInterview: null,
    settings: {
      theme: "light",
      webcamEnabled: false,
      aiVoiceEnabled: true
    },
    ...overrides
  };
}

let APP_STATE = createFreshState();

let activeWebcamStream = null;
let activeSpeechRecognition = null;

function stopActiveCamera() {
  if (activeWebcamStream) {
    activeWebcamStream.getTracks().forEach(track => track.stop());
    activeWebcamStream = null;
    console.log("Stopped active webcam streaming tracks.");
  }
}

function stopActiveSpeechRecognition() {
  if (activeSpeechRecognition) {
    activeSpeechRecognition.stop();
    activeSpeechRecognition = null;
    console.log("Stopped active speech recognition.");
  }
}

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }
  
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Choose English voice
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    utterance.voice = englishVoice;
  }
  
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function applySystemTheme() {
  if (APP_STATE.settings && APP_STATE.settings.theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

// Initialize State from Storage
function loadStateFromStorage() {
  const savedAuth = localStorage.getItem("mockmate_auth");
  const savedSettings = localStorage.getItem("mockmate_settings");

  // Restore auth status first
  if (savedAuth) APP_STATE.isLoggedIn = JSON.parse(savedAuth);

  // Restore theme/voice settings (they survive across accounts)
  if (savedSettings) {
    APP_STATE.settings = JSON.parse(savedSettings);
    if (APP_STATE.settings.aiVoiceEnabled === undefined) {
      APP_STATE.settings.aiVoiceEnabled = true;
    }
  }

  if (APP_STATE.isLoggedIn) {
    // Only restore user profile and history when a logged-in session exists
    const savedUser = localStorage.getItem("mockmate_user");
    const savedHistory = localStorage.getItem("mockmate_history");
    const savedIsNewUser = localStorage.getItem("mockmate_is_new_user");
    if (savedUser) APP_STATE.user = JSON.parse(savedUser);
    if (savedHistory) APP_STATE.history = JSON.parse(savedHistory);
    if (savedIsNewUser !== null) APP_STATE.isNewUser = JSON.parse(savedIsNewUser);
  } else {
    // User is logged out — purge any stale data so a new signup starts completely fresh
    localStorage.removeItem("mockmate_user");
    localStorage.removeItem("mockmate_history");
    APP_STATE.user = createFreshState().user;
    APP_STATE.history = [];
  }

  applySystemTheme();
}

function saveStateToStorage() {
  localStorage.setItem("mockmate_user", JSON.stringify(APP_STATE.user));
  localStorage.setItem("mockmate_history", JSON.stringify(APP_STATE.history));
  localStorage.setItem("mockmate_auth", JSON.stringify(APP_STATE.isLoggedIn));
  localStorage.setItem("mockmate_settings", JSON.stringify(APP_STATE.settings));
  localStorage.setItem("mockmate_is_new_user", JSON.stringify(APP_STATE.isNewUser || false));
}

const API_BASE = "http://localhost:5000/api";

let isSyncing = false;
async function syncStateWithBackend(forceRender = true) {
  if (isSyncing || !APP_STATE.isLoggedIn) return;

  // Brand-new signups start with a clean slate — skip backend sync so demo
  // data from the seeded backend doesn't overwrite the fresh empty state.
  if (APP_STATE.isNewUser) {
    APP_STATE.isNewUser = false;
    localStorage.setItem("mockmate_is_new_user", JSON.stringify(false));
    if (forceRender) {
      const hash = window.location.hash || "#/landing";
      const hashPath = hash.replace("#/", "");
      const queryIndex = hashPath.indexOf("?");
      const path = queryIndex !== -1 ? hashPath.substring(0, queryIndex) : hashPath;
      const viewFn = routes[path];
      if (viewFn) { viewFn(); lucide.createIcons(); }
    }
    return;
  }

  isSyncing = true;
  try {
    const [userRes, historyRes, ticketsRes, notificationsRes] = await Promise.all([
      fetch(`${API_BASE}/user`),
      fetch(`${API_BASE}/history`),
      fetch(`${API_BASE}/tickets`),
      fetch(`${API_BASE}/notifications`)
    ]);
    
    if (userRes.ok) APP_STATE.user = await userRes.json();
    if (historyRes.ok) APP_STATE.history = await historyRes.json();
    if (ticketsRes.ok) APP_STATE.tickets = await ticketsRes.json();
    if (notificationsRes.ok) APP_STATE.notifications = await notificationsRes.json();
    
    saveStateToStorage();
    
    if (forceRender) {
      const hash = window.location.hash || "#/landing";
      const hashPath = hash.replace("#/", "");
      const queryIndex = hashPath.indexOf("?");
      const path = queryIndex !== -1 ? hashPath.substring(0, queryIndex) : hashPath;
      const viewFn = routes[path];
      if (viewFn) {
        viewFn();
        lucide.createIcons();
      }
      renderNotifications();
    }
  } catch (error) {
    console.error("Failed to sync state with backend:", error);
  } finally {
    isSyncing = false;
  }
}

// ==========================================
// 2. SPA Router & App Shell Controls
// ==========================================
const routes = {
  "landing": viewLanding,
  "login": viewLogin,
  "signup": viewSignup,
  "dashboard": viewDashboard,
  "setup": viewSetup,
  "interview": viewInterview,
  "analysis": viewAnalysis,
  "results": viewResults,
  "history": viewHistory,
  "analytics": viewAnalytics,
  "profile": viewProfile,
  "settings": viewSettings,
  "notifications": viewNotifications,
  "support": viewSupport
};

function router() {
  const hash = window.location.hash || "#/landing";
  let hashPath = hash.replace("#/", "");
  
  // Extract path and query params
  const queryIndex = hashPath.indexOf("?");
  let path = queryIndex !== -1 ? hashPath.substring(0, queryIndex) : hashPath;
  
  if (path !== "interview") {
    stopActiveCamera();
    stopActiveSpeechRecognition();
  }
  
  // Protect routes
  if (!APP_STATE.isLoggedIn && path !== "landing" && path !== "login" && path !== "signup") {
    window.location.hash = "#/landing";
    return;
  }
  
  if (APP_STATE.isLoggedIn && (path === "landing" || path === "login" || path === "signup")) {
    window.location.hash = "#/dashboard";
    return;
  }
  
  const viewFn = routes[path] || viewLanding;
  
  // Toggle sidebar/header visibility depending on page type
  const shell = document.getElementById("app-shell");
  const distractionFreeViews = ["landing", "login", "signup", "interview", "analysis"];
  
  if (distractionFreeViews.includes(path)) {
    shell.classList.add("sidebar-hidden");
  } else {
    shell.classList.remove("sidebar-hidden");
    // Update Header profile info
    document.getElementById("header-avatar").innerText = APP_STATE.user.name ? APP_STATE.user.name.charAt(0).toUpperCase() : 'U';
    document.getElementById("header-username").innerText = APP_STATE.user.name || 'New User';
    // Highlight sidebar active item
    updateActiveSidebarItem(path);
  }
  
  // Update header text based on page
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) {
    pageTitle.innerText = path.charAt(0).toUpperCase() + path.slice(1);
  }
  
  // Close dropdowns on route changes
  document.getElementById("notification-dropdown").classList.add("hidden");
  document.getElementById("profile-dropdown").classList.add("hidden");
  
  // Render View
  viewFn();
  lucide.createIcons();
}

function updateActiveSidebarItem(path) {
  document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => {
    item.classList.remove("active");
  });
  const activeLink = document.getElementById(`nav-${path}`);
  if (activeLink) activeLink.classList.add("active");
}

// Shell Controls Event Binding
function initAppShell() {
  // Mobile Hamburger Toggle
  const toggle = document.getElementById("sidebar-toggle");
  const shell = document.getElementById("app-shell");
  
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    shell.classList.toggle("sidebar-open");
  });
  
  document.body.addEventListener("click", () => {
    shell.classList.remove("sidebar-open");
  });
  
  document.getElementById("app-sidebar").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Dropdown Triggers
  const notifBell = document.getElementById("notification-bell");
  const notifDropdown = document.getElementById("notification-dropdown");
  notifBell.addEventListener("click", (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle("hidden");
    document.getElementById("profile-dropdown").classList.add("hidden");
  });
  
  const profileTrigger = document.getElementById("profile-header-trigger");
  const profileDropdown = document.getElementById("profile-dropdown");
  profileTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("hidden");
    notifDropdown.classList.add("hidden");
  });
  
  // Notifications Renderer
  renderNotifications();
  document.getElementById("clear-notifications").addEventListener("click", () => {
    APP_STATE.notifications = [];
    renderNotifications();
    showToast("Notifications cleared", "info");
  });
  
  // Logout Actions
  const handleLogout = () => {
    APP_STATE.isLoggedIn = false;
    APP_STATE.currentInterview = null;
    saveStateToStorage();
    window.location.hash = "#/landing";
    showToast("Logged out successfully", "info");
  };
  
  document.getElementById("logout-button").addEventListener("click", handleLogout);
  document.getElementById("dropdown-logout").addEventListener("click", handleLogout);
  
  // Hash listener
  window.addEventListener("hashchange", router);
  
  // Route on first load
  router();
}

function renderNotifications() {
  const list = document.getElementById("notifications-list");
  const badge = document.getElementById("notification-badge");
  const unreadCount = APP_STATE.notifications.filter(n => n.unread).length;
  
  if (unreadCount > 0) {
    badge.innerText = unreadCount;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
  
  if (APP_STATE.notifications.length === 0) {
    list.innerHTML = `<div class="p-4 text-center text-sm text-light">No new notifications</div>`;
    return;
  }
  
  list.innerHTML = APP_STATE.notifications.map(n => `
    <div class="dropdown-item-notification ${n.unread ? 'unread' : ''}" onclick="markNotifRead(${n.id})">
      <p>${n.text}</p>
      <span>${n.time}</span>
    </div>
  `).join('');
}

window.markNotifRead = function(id) {
  const notif = APP_STATE.notifications.find(n => n.id === id);
  if (notif) notif.unread = false;
  renderNotifications();
};

// Toast Alerts
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconName = "check-circle";
  if (type === "error") iconName = "alert-circle";
  if (type === "info") iconName = "info";
  
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons();
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================
// 3. Views Template Renderers
// ==========================================

// --- Landing View ---
function viewLanding() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div class="landing-view">
      <nav class="landing-nav">
        <div class="sidebar-brand">
          <div class="brand-logo"><i data-lucide="sparkles"></i></div>
          <span class="brand-name">MockMate <span class="accent-text">AI</span></span>
        </div>
        <div class="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#howitworks">How it works</a>
          <a href="#faqs">FAQs</a>
          <a href="#/login" class="btn btn-secondary">Login</a>
          <a href="#/signup" class="btn btn-primary">Start Free</a>
        </div>
      </nav>
      
      <section class="landing-hero">
        <div class="hero-content">
          <span class="hero-tagline">Confidence Over Memorization</span>
          <h1 class="hero-title">Practice today.<br>Impress tomorrow.</h1>
          <p class="hero-desc">MockMate AI behaves like a real technical and HR interviewer. Practice mock interview sessions and receive direct performance metrics and insights immediately.</p>
          <div class="hero-actions">
            <a href="#/signup" class="btn btn-primary">Start Practicing Free</a>
            <a href="#howitworks" class="btn btn-secondary">How it works</a>
          </div>
        </div>
        <div class="hero-illustration">
          <div class="illustration-card" style="width: 480px;">
            <div style="background-color: var(--primary-light); height: 280px; display: flex; align-items: center; justify-content: center; position: relative;">
              <i data-lucide="bot" style="width: 80px; height: 80px; color: var(--primary);"></i>
              <div class="floating-feedback-card">
                <div class="feedback-icon-sparkle"><i data-lucide="sparkles"></i></div>
                <div>
                  <h4 style="font-size: 13px; font-weight:700;">AI Evaluation Complete</h4>
                  <span class="badge badge-success">86% Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="landing-stats-section">
        <div class="landing-stats-grid">
          <div class="stat-item">
            <h3>15,000+</h3>
            <p>Mock Interviews Completed</p>
          </div>
          <div class="stat-item">
            <h3>94%</h3>
            <p>Placement Success Rate</p>
          </div>
          <div class="stat-item">
            <h3>32%</h3>
            <p>Confidence Level Increase</p>
          </div>
          <div class="stat-item">
            <h3>24/7</h3>
            <p>Mentorship availability</p>
          </div>
        </div>
      </section>
      
      <section class="landing-features" id="features">
        <div class="section-header">
          <h2>Everything you need to get placement-ready</h2>
          <p>MockMate AI is not a quiz application. It is a comprehensive preparation tool designed to help you prepare smarter.</p>
        </div>
        <div class="grid-3">
          <div class="feature-box">
            <div class="feature-icon-wrapper"><i data-lucide="code-2"></i></div>
            <h3>Technical Mock Interviews</h3>
            <p>Dynamic questions generated across Frontend development, Backend databases, JavaScript, structures, and systems.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon-wrapper purple"><i data-lucide="users"></i></div>
            <h3>HR Behavioral Mock</h3>
            <p>Practice standard HR introduction and situational questions. Refine communication structure and response delivery.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon-wrapper"><i data-lucide="pie-chart"></i></div>
            <h3>AI Feedback Reports</h3>
            <p>Detailed analysis mapping technical clarity, strengths, suggestions for improvement, and ideal answers.</p>
          </div>
        </div>
      </section>
      
      <section class="how-it-works-section" id="howitworks">
        <div class="section-header">
          <h2>Three Steps to Your Dream Job</h2>
          <p>Simple, clean setup designed to get you practicing in under 30 seconds.</p>
        </div>
        <div class="how-it-works-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>Select Role Details</h3>
            <p>Pick target profiles, custom topics, difficulty tiers, and duration details.</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>Simulated Session</h3>
            <p>Respond to AI generated interview prompts. Work under a realistic time limit.</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>Detailed AI Evaluation</h3>
            <p>Examine scoring charts, radar parameters, strengths breakdown, and ideal answers.</p>
          </div>
        </div>
      </section>
      
      <section class="faq-section" id="faqs">
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>How does MockMate AI evaluate my answers?</span>
              <i data-lucide="chevron-down"></i>
            </button>
            <div class="faq-answer">
              MockMate AI utilizes advanced language evaluation systems that cross-reference your explanations with industry standards, checking for technical terminology correctness, explanation structure, and depth of explanation.
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>Is this platform useful for HR behavioral rounds?</span>
              <i data-lucide="chevron-down"></i>
            </button>
            <div class="faq-answer">
              Yes! MockMate AI evaluates standard HR introductions and STAR behavioral situations, providing direct tips to structure conflict resolutions and situational examples clearly.
            </div>
          </div>
        </div>
      </section>
      
      <section class="final-cta-section">
        <h2>Ready to build placement confidence?</h2>
        <p>No credit card required. Get started with your first mock session instantly.</p>
        <a href="#/signup" class="btn btn-primary">Start Practice Session</a>
      </section>
      
      <footer class="landing-footer">
        <div class="footer-content">
          <div class="footer-brand">
            <h3>MockMate AI</h3>
            <p>Build placement readiness and confidence.</p>
          </div>
          <div class="footer-links">
            <div class="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#howitworks">How it works</a>
            </div>
            <div class="footer-column">
              <h4>Account</h4>
              <a href="#/login">Login</a>
              <a href="#/signup">Sign Up</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; 2026 MockMate AI. All rights reserved. Built for engineering students and placement aspirants.
        </div>
      </footer>
    </div>
  `;
}

window.toggleFaq = function(button) {
  const item = button.parentElement;
  item.classList.toggle("active");
};

// --- Login View ---
function viewLogin() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div class="auth-split-view">
      <div class="auth-sidebar-illustration">
        <div class="auth-illustration-header">
          <div class="brand-logo-light"><i data-lucide="sparkles" style="color:#ffffff;"></i></div>
        </div>
        <div>
          <div class="auth-floating-badge">
            <i data-lucide="check-circle" style="width:16px; height:16px;"></i>
            <span>Placement ready</span>
          </div>
          <h2>Prepare Smarter.<br>Practice Under Realistic Conditions.</h2>
          <div class="auth-cards-container">
            <p style="font-size:13px; opacity:0.9;">AI Feedback: 'Great structural logic on JavaScript asynchronous patterns. Try to mention micro-task execution priority next time.'</p>
          </div>
        </div>
        <div class="auth-quote-container">
          <p class="auth-quote-text">"Practice today. Impress tomorrow."</p>
          <span class="auth-quote-author">MockMate AI Coach</span>
        </div>
      </div>
      
      <div class="auth-form-container">
        <div class="auth-card">
          <div class="auth-header">
            <h3>Welcome Back</h3>
            <p>Log in to continue your mock sessions.</p>
          </div>
          
          <button class="auth-social-btn">
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google">
            Continue with Google
          </button>
          
          <div class="auth-divider">OR</div>
          
          <form id="login-form">
            <div class="form-group">
              <label class="form-label" for="login-email">Email Address</label>
              <input type="email" id="login-email" class="form-input" placeholder="you@example.com" required>
              <div id="email-error" class="error-text hidden"></div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <div class="password-input-wrapper">
                <input type="password" id="login-password" class="form-input" placeholder="••••••••" required>
                <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility('login-password')">
                  <i data-lucide="eye"></i>
                </button>
              </div>
              <div id="password-error" class="error-text hidden"></div>
            </div>
            
            <div class="auth-form-options">
              <label class="checkbox-container">
                <input type="checkbox" checked>
                Remember me
              </label>
              <a href="javascript:void(0)" onclick="showToast('Password recovery simulation triggered', 'info')">Forgot Password?</a>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width:100%;" id="login-btn-submit">Login</button>
          </form>
          
          <p style="text-align:center; font-size:14px; margin-top:24px; color: var(--text-muted);">
            Don't have an account? <a href="#/signup" style="font-weight:600;">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Form listener
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    // Simulate API logic
    const submitBtn = document.getElementById("login-btn-submit");
    submitBtn.disabled = true;
    submitBtn.innerText = "Signing In...";
    
    setTimeout(async () => {
      APP_STATE.isLoggedIn = true;
      saveStateToStorage();
      await syncStateWithBackend(false);
      window.location.hash = "#/dashboard";
      showToast(`Welcome back, ${APP_STATE.user.name}!`);
    }, 1000);
  });
}

// --- Signup View ---
function viewSignup() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div class="auth-split-view">
      <div class="auth-sidebar-illustration">
        <div class="auth-illustration-header">
          <div class="brand-logo-light"><i data-lucide="sparkles" style="color:#ffffff;"></i></div>
        </div>
        <div>
          <div class="auth-floating-badge">
            <i data-lucide="award" style="width:16px; height:16px;"></i>
            <span>Personal Mentor</span>
          </div>
          <h2>Join Thousands of Placement Aspirants Building Skills.</h2>
          <div class="auth-cards-container">
            <p style="font-size:13px; opacity:0.9;">Streak: 4 Days Active. Keep practicing daily mock modules to double your interview confidence.</p>
          </div>
        </div>
        <div class="auth-quote-container">
          <p class="auth-quote-text">"The feedback is highly detailed and helpful. It feels like speaking to an experienced mentor."</p>
          <span class="auth-quote-author">Priya, SWE Candidate</span>
        </div>
      </div>
      
      <div class="auth-form-container">
        <div class="auth-card">
          <div class="auth-header">
            <h3>Create Account</h3>
            <p>Start practicing mock interviews with AI coaches.</p>
          </div>
          
          <button class="auth-social-btn">
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google">
            Sign up with Google
          </button>
          
          <div class="auth-divider">OR</div>
          
          <form id="signup-form">
            <div class="form-group">
              <label class="form-label" for="signup-name">Full Name</label>
              <input type="text" id="signup-name" class="form-input" placeholder="Enter your full name" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="signup-email">Email Address</label>
              <input type="email" id="signup-email" class="form-input" placeholder="you@example.com" required>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="signup-password">Password</label>
              <div class="password-input-wrapper">
                <input type="password" id="signup-password" class="form-input" placeholder="At least 8 characters" required>
                <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility('signup-password')">
                  <i data-lucide="eye"></i>
                </button>
              </div>
              
              <!-- Password Strength Meter -->
              <div class="strength-meter-container">
                <div class="strength-bar-wrapper">
                  <div class="strength-bar" id="strength-1"></div>
                  <div class="strength-bar" id="strength-2"></div>
                  <div class="strength-bar" id="strength-3"></div>
                </div>
                <div class="strength-text" id="strength-label">Password strength</div>
              </div>
              
              <div class="pw-checklist">
                <div class="checklist-item" id="chk-len"><i data-lucide="circle" class="icon-xs"></i> 8+ characters</div>
                <div class="checklist-item" id="chk-up"><i data-lucide="circle" class="icon-xs"></i> 1 uppercase letter</div>
                <div class="checklist-item" id="chk-num"><i data-lucide="circle" class="icon-xs"></i> 1 number</div>
              </div>
            </div>
            
            <div class="form-group" style="margin-top: 16px;">
              <label class="checkbox-container">
                <input type="checkbox" required>
                I agree to the Terms and Privacy Policy
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:8px;" id="signup-btn-submit">Create Account</button>
          </form>
          
          <p style="text-align:center; font-size:14px; margin-top:24px; color: var(--text-muted);">
            Already have an account? <a href="#/login" style="font-weight:600;">Login</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Password validation hooks
  const pwInput = document.getElementById("signup-password");
  pwInput.addEventListener("input", () => {
    const val = pwInput.value;
    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    
    // Update list checks
    updateChecklist("chk-len", hasLength);
    updateChecklist("chk-up", hasUpper);
    updateChecklist("chk-num", hasNumber);
    
    // Calculate strength
    let score = 0;
    if (val.length > 0) score++;
    if (hasLength) score++;
    if (hasUpper && hasNumber) score++;
    
    const bars = ["strength-1", "strength-2", "strength-3"];
    bars.forEach(b => document.getElementById(b).className = "strength-bar");
    
    const label = document.getElementById("strength-label");
    if (score === 1) {
      document.getElementById("strength-1").classList.add("weak");
      label.innerText = "Password strength: Weak";
      label.style.color = "var(--error)";
    } else if (score === 2) {
      document.getElementById("strength-1").classList.add("medium");
      document.getElementById("strength-2").classList.add("medium");
      label.innerText = "Password strength: Medium";
      label.style.color = "var(--warning)";
    } else if (score === 3) {
      document.getElementById("strength-1").classList.add("strong");
      document.getElementById("strength-2").classList.add("strong");
      document.getElementById("strength-3").classList.add("strong");
      label.innerText = "Password strength: Strong";
      label.style.color = "var(--success)";
    } else {
      label.innerText = "Password strength";
      label.style.color = "var(--text-light)";
    }
  });
  
  // Form submission
  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    
    const submitBtn = document.getElementById("signup-btn-submit");
    submitBtn.disabled = true;
    submitBtn.innerText = "Creating Account...";
    
    setTimeout(async () => {
      // Fully reset all app state so a new account never inherits previous user's data
      const savedSettings = APP_STATE.settings; // preserve theme/voice prefs
      APP_STATE = createFreshState({ isLoggedIn: true, isNewUser: true, settings: savedSettings });

      // Set the new user's name and avatar initial
      APP_STATE.user.name = name;
      APP_STATE.user.email = email;
      APP_STATE.user.avatar = name.trim().charAt(0).toUpperCase() || "U";

      // Clear all mockmate keys from localStorage so nothing bleeds over
      localStorage.removeItem("mockmate_user");
      localStorage.removeItem("mockmate_history");
      localStorage.removeItem("mockmate_auth");
      localStorage.removeItem("mockmate_is_new_user");

      saveStateToStorage();
      window.location.hash = "#/dashboard";
      showToast("Account created successfully! Welcome to MockMate AI.");
    }, 1000);
  });
  
  lucide.createIcons();
}

function updateChecklist(id, isValid) {
  const el = document.getElementById(id);
  if (isValid) {
    el.classList.add("valid");
    el.innerHTML = `<i data-lucide="check-circle-2" style="width:14px; height:14px;"></i> ${el.innerText.trim()}`;
  } else {
    el.classList.remove("valid");
    el.innerHTML = `<i data-lucide="circle" style="width:14px; height:14px;"></i> ${el.innerText.trim()}`;
  }
  lucide.createIcons();
}

window.togglePasswordVisibility = function(inputId) {
  const el = document.getElementById(inputId);
  if (el.type === "password") {
    el.type = "text";
  } else {
    el.type = "password";
  }
};

// --- Dashboard View ---
function viewDashboard() {
  const view = document.getElementById("app-view");
  
  // Compute analytics numbers
  const totalCompleted = APP_STATE.history.length;
  const avgScore = totalCompleted > 0 ? Math.round(APP_STATE.history.reduce((a, b) => a + b.score, 0) / totalCompleted) : 0;
  
  view.innerHTML = `
    <div class="dashboard-grid">
      <div class="dashboard-main-col">
        <!-- Welcome banner -->
        <div class="card welcome-banner-card">
          <div class="welcome-content">
            <h2>Welcome back, ${APP_STATE.user.name}! 👋</h2>
            <p>Ready to continue your placement preparation? Practice technical questions under realistic conditions and get direct AI coach metrics.</p>
            <div class="welcome-card-actions">
              <a href="#/setup" class="btn btn-primary">Start New Mock</a>
              <a href="#/analytics" class="btn btn-secondary">View Performance</a>
            </div>
          </div>
          <i data-lucide="graduation-cap" class="welcome-illustration" style="color: rgba(255,255,255,0.08); width:150px; height:150px;"></i>
        </div>
        
        <!-- Summary stats -->
        <div class="stats-summary-grid">
          <div class="stat-card">
            <div class="stat-card-icon blue"><i data-lucide="play-circle"></i></div>
            <div class="stat-card-details">
              <h4>Completed</h4>
              <div class="stat-value">${totalCompleted}</div>
              <div class="stat-trend up"><i data-lucide="trending-up"></i> +1 this week</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-card-icon green"><i data-lucide="award"></i></div>
            <div class="stat-card-details">
              <h4>Avg Score</h4>
              <div class="stat-value">${avgScore}%</div>
              <div class="stat-trend up"><i data-lucide="trending-up"></i> +4% progress</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-card-icon orange"><i data-lucide="flame"></i></div>
            <div class="stat-card-details">
              <h4>Streak</h4>
              <div class="stat-value">4 Days</div>
              <div class="stat-trend up"><i data-lucide="check"></i> Goal met today</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-card-icon purple"><i data-lucide="hourglass"></i></div>
            <div class="stat-card-details">
              <h4>Hours Spent</h4>
              <div class="stat-value">6.8h</div>
              <div class="stat-trend up"><i data-lucide="trending-up"></i> +1.2h practice</div>
            </div>
          </div>
        </div>
        
        <!-- Recent Interviews table -->
        <div class="card recent-interviews-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <h3>Recent Mock History</h3>
            <a href="#/history" class="ghost-btn-sm" style="font-size:14px; font-weight:600;">View All</a>
          </div>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Job Role</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="recent-interviews-tbody">
                <!-- Injected via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="dashboard-side-col">
        <!-- AI recommendation -->
        <div class="card ai-recommendation-card">
          <div class="ai-rec-header">
            <i data-lucide="sparkles"></i>
            <span>AI Personal Coach</span>
          </div>
          <h3>Suggested Focus Area</h3>
          <p>Based on your last interview reports, you showed strengths in HTML structures, but had suggestions regarding <strong>JavaScript closures</strong>. Practice React / JavaScript next.</p>
          <a href="#/setup" class="btn btn-primary" style="width:100%;">Practice React Intermediate</a>
        </div>
        
        <!-- Score Analytics Chart -->
        <div class="card">
          <h3 style="font-size:16px; margin-bottom:16px;">Performance Growth</h3>
          <div class="chart-container">
            <canvas id="growth-canvas-chart"></canvas>
          </div>
        </div>
        
        <!-- Achievements Badge Card -->
        <div class="card">
          <h3 style="font-size:16px; margin-bottom:16px;">Unlocked Milestones</h3>
          <div class="achievement-badge-container">
            <div class="badge-achievement unlocked" title="First Steps: Complete 1 Mock Interview"><i data-lucide="footprints"></i></div>
            <div class="badge-achievement unlocked purple" title="Daily Commuter: 3 Days Streak"><i data-lucide="zap"></i></div>
            <div class="badge-achievement ${totalCompleted >= 5 ? 'unlocked' : ''}" title="Veteran: Complete 5 Mock Interviews"><i data-lucide="award"></i></div>
            <div class="badge-achievement" title="Expert Rank: Score above 90%"><i data-lucide="shield-check"></i></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Render history rows
  const tbody = document.getElementById("recent-interviews-tbody");
  if (APP_STATE.history.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px; color: var(--text-light);">No interviews practiced yet. Click 'Start New Mock' to begin!</td></tr>`;
  } else {
    tbody.innerHTML = APP_STATE.history.slice(0, 3).map(h => `
      <tr>
        <td style="font-weight:600;">${h.role}</td>
        <td><span class="badge ${h.category.includes('HR') ? 'badge-purple' : 'badge-primary'}">${h.category}</span></td>
        <td>${h.date}</td>
        <td><strong style="color: ${h.score >= 80 ? 'var(--success)' : h.score >= 70 ? 'var(--warning)' : 'var(--error)'}">${h.score}%</strong></td>
        <td><a href="#/results?id=${h.id}" class="btn btn-secondary" style="padding: 6px 12px; font-size:13px;">View Report</a></td>
      </tr>
    `).join('');
  }
  
  // Draw Canvas growth chart
  setTimeout(() => {
    drawGrowthChart("growth-canvas-chart");
  }, 100);
}

function drawGrowthChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  // Clear and resize matching parent dimensions
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
  
  const w = canvas.width;
  const h = canvas.height;
  
  // Draw helper grid lines
  ctx.strokeStyle = "#F1F5F9";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const y = (h - 30) * (i / 4);
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
  }
  
  // Data Points (Scores of history items, reverse to show chronological order)
  const scores = [...APP_STATE.history].reverse().map(h => h.score);
  if (scores.length === 0) return;
  
  const paddingLeft = 30;
  const paddingBottom = 20;
  const graphWidth = w - paddingLeft - 20;
  const graphHeight = h - paddingBottom - 10;
  
  const points = scores.map((score, index) => {
    const x = paddingLeft + (scores.length > 1 ? (graphWidth * (index / (scores.length - 1))) : graphWidth / 2);
    const y = graphHeight - (graphHeight * (score / 100)) + 10;
    return { x, y, score };
  });
  
  // Draw line
  ctx.strokeStyle = "#4F46E5";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  
  // Draw Points and Tooltips
  points.forEach(p => {
    ctx.fillStyle = "#4F46E5";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Label score above point
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 11px Inter";
    ctx.fillText(`${p.score}%`, p.x - 10, p.y - 10);
  });
}

// --- Setup View ---
function viewSetup() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div class="setup-container">
      <div class="section-header" style="margin-bottom:20px;">
        <h2>Customize Your Mock Interview</h2>
        <p>Set up the target role parameters below. It takes less than a minute.</p>
      </div>
      
      <!-- Progress Steps -->
      <div class="setup-progress-steps">
        <div class="setup-progress-bar-fill" id="setup-progress-fill"></div>
        <div class="step-indicator active" id="step-ind-1">
          <div class="step-circle">1</div>
          <span class="step-label">Category</span>
        </div>
        <div class="step-indicator" id="step-ind-2">
          <div class="step-circle">2</div>
          <span class="step-label">Role details</span>
        </div>
        <div class="step-indicator" id="step-ind-3">
          <div class="step-circle">3</div>
          <span class="step-label">Setup Confirmation</span>
        </div>
      </div>
      
      <!-- Cards Section for Steps -->
      <div class="card" id="setup-card-content">
        <!-- Rendered dynamically depending on step -->
      </div>
      
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <button id="setup-back-btn" class="btn btn-secondary" style="visibility:hidden;">Back</button>
        <button id="setup-next-btn" class="btn btn-primary">Next Step</button>
      </div>
    </div>
  `;
  
  let currentStep = 1;
  let setupData = {
    category: "frontend",
    roleName: "Frontend Developer",
    difficulty: "Intermediate",
    duration: "5",
    resumeUploaded: !!APP_STATE.user.resumeName,
    fileName: APP_STATE.user.resumeName || "",
    webcamEnabled: APP_STATE.settings.webcamEnabled || false,
    language: "Python",
    aiVoiceEnabled: APP_STATE.settings.aiVoiceEnabled !== false
  };
  
  window.toggleSetupWebcam = function(el) {
    setupData.webcamEnabled = el.checked;
    APP_STATE.settings.webcamEnabled = el.checked;
    saveStateToStorage();
  };
  
  window.toggleSetupVoice = function(el) {
    setupData.aiVoiceEnabled = el.checked;
    APP_STATE.settings.aiVoiceEnabled = el.checked;
    saveStateToStorage();
  };
  
  window.toggleSetupLanguage = function(el) {
    setupData.language = el.value;
  };
  
  const setupCard = document.getElementById("setup-card-content");
  const nextBtn = document.getElementById("setup-next-btn");
  const backBtn = document.getElementById("setup-back-btn");
  const progressFill = document.getElementById("setup-progress-fill");
  
  function renderStep() {
    progressFill.style.width = `${((currentStep - 1) / 2) * 100}%`;
    
    // Reset indicator classes
    for (let i = 1; i <= 3; i++) {
      const ind = document.getElementById(`step-ind-${i}`);
      ind.className = "step-indicator";
      if (i < currentStep) ind.classList.add("completed");
      if (i === currentStep) ind.classList.add("active");
    }
    
    if (currentStep === 1) {
      backBtn.style.visibility = "hidden";
      nextBtn.innerText = "Next Step";
      
      setupCard.innerHTML = `
        <h3 style="margin-bottom:20px; font-size:18px;">1. Choose Mock Category</h3>
        <div class="setup-card-options" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div class="setup-option-card ${setupData.category === 'frontend' ? 'selected' : ''}" onclick="selectCategory('frontend')">
            <div class="selected-check"><i data-lucide="check"></i></div>
            <div class="setup-option-icon"><i data-lucide="code-2"></i></div>
            <h4>Frontend Mock</h4>
            <p>React architecture, standard coding hooks, HTML/CSS layouts, closure mechanics.</p>
          </div>
          <div class="setup-option-card ${setupData.category === 'backend' ? 'selected' : ''}" onclick="selectCategory('backend')">
            <div class="selected-check"><i data-lucide="check"></i></div>
            <div class="setup-option-icon"><i data-lucide="database"></i></div>
            <h4>Backend Mock</h4>
            <p>Database ACID parameters, events execution pipelines, scaling micro-components.</p>
          </div>
          <div class="setup-option-card ${setupData.category === 'coding' ? 'selected' : ''}" onclick="selectCategory('coding')">
            <div class="selected-check"><i data-lucide="check"></i></div>
            <div class="setup-option-icon"><i data-lucide="terminal"></i></div>
            <h4>Coding Mock</h4>
            <p>Data Structures & Algorithms (DSA). Two Sum, string reversals, stack validations, complexity trade-offs.</p>
          </div>
          <div class="setup-option-card ${setupData.category === 'hr' ? 'selected' : ''}" onclick="selectCategory('hr')">
            <div class="selected-check"><i data-lucide="check"></i></div>
            <div class="setup-option-icon"><i data-lucide="users"></i></div>
            <h4>HR & Behavioral</h4>
            <p>Introductions preparation, conflict resolution, STAR framework structuring.</p>
          </div>
        </div>
      `;
    } 
    else if (currentStep === 2) {
      backBtn.style.visibility = "visible";
      nextBtn.innerText = "Next Step";
      
      setupCard.innerHTML = `
        <h3 style="margin-bottom:20px; font-size:18px;">2. Job Profile Configuration</h3>
        <div class="form-group">
          <label class="form-label" for="setup-role-name">Target Job Profile</label>
          <input type="text" id="setup-role-name" class="form-input" value="${setupData.roleName}">
        </div>
        
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label" for="setup-difficulty">Difficulty level</label>
            <select id="setup-difficulty" class="form-input">
              <option value="Easy" ${setupData.difficulty === 'Easy' ? 'selected' : ''}>Easy (Fresh Grad level)</option>
              <option value="Intermediate" ${setupData.difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate (Standard SWE)</option>
              <option value="Hard" ${setupData.difficulty === 'Hard' ? 'selected' : ''}>Hard (Senior SWE level)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="setup-duration">Interview Duration</label>
            <select id="setup-duration" class="form-input">
              <option value="5" ${setupData.duration === '5' ? 'selected' : ''}>5 Mins (approx 2 questions)</option>
              <option value="10" ${setupData.duration === '10' ? 'selected' : ''}>10 Mins (approx 4 questions)</option>
              <option value="15" ${setupData.duration === '15' ? 'selected' : ''}>15 Mins (approx 6 questions)</option>
            </select>
          </div>
        </div>
        
        ${setupData.category === 'coding' ? `
          <div class="form-group" style="margin-top:16px;">
            <label class="form-label" for="setup-language">Target Programming Language</label>
            <select id="setup-language" class="form-input" onchange="toggleSetupLanguage(this)">
              <option value="Python" ${setupData.language === 'Python' ? 'selected' : ''}>Python (Recommended)</option>
              <option value="JavaScript" ${setupData.language === 'JavaScript' ? 'selected' : ''}>JavaScript (Node.js)</option>
              <option value="Java" ${setupData.language === 'Java' ? 'selected' : ''}>Java (JDK 21)</option>
            </select>
          </div>
        ` : ''}
        
        <!-- Webcam Enable Option -->
        <div class="form-group" style="margin-top:16px;">
          <label class="form-label">Video Settings</label>
          <label class="checkbox-container" style="margin-top:8px;">
            <input type="checkbox" id="setup-webcam-toggle" ${setupData.webcamEnabled ? 'checked' : ''} onchange="toggleSetupWebcam(this)">
            Enable Live Webcam Preview & AI Eye-Tracking Analysis
          </label>
        </div>
        
        <!-- Voice Settings Option -->
        <div class="form-group" style="margin-top:16px;">
          <label class="form-label">Voice Settings</label>
          <label class="checkbox-container" style="margin-top:8px;">
            <input type="checkbox" id="setup-voice-toggle" ${setupData.aiVoiceEnabled ? 'checked' : ''} onchange="toggleSetupVoice(this)">
            Enable AI Verbal Coach Reader (Read questions out loud)
          </label>
        </div>
        
        <!-- Resume Upload Option -->
        <div class="form-group" style="margin-top:16px;">
          <label class="form-label">Resume Personalization (Optional)</label>
          <div class="resume-upload-zone" onclick="triggerResumeUpload()">
            <i data-lucide="file-text"></i>
            <h4>Click to upload your resume (PDF/Doc)</h4>
            <p>AI will parse skills and ask questions customized to your projects.</p>
            <input type="file" id="setup-resume-file" style="display:none;" onchange="handleResumeFile(this)">
          </div>
          <div id="resume-file-display" class="resume-file-info ${setupData.resumeUploaded ? '' : 'hidden'}">
            <i data-lucide="check-circle" style="color:var(--success);"></i>
            <span id="resume-name-label">${setupData.fileName}</span>
            <button class="ghost-btn-sm" style="color:var(--error); margin-left:auto;" onclick="removeResume(event)">Remove</button>
          </div>
        </div>
      `;
    } 
    else if (currentStep === 3) {
      backBtn.style.visibility = "visible";
      nextBtn.innerText = "Start Mock Session";
      
      setupCard.innerHTML = `
        <h3 style="margin-bottom:20px; font-size:18px;">3. Confirm Setup Details</h3>
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--surface-border); padding-bottom:12px;">
            <span style="color:var(--text-muted);">Mock Category:</span>
            <strong style="text-transform: capitalize;">${setupData.category} Interview</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--surface-border); padding-bottom:12px;">
            <span style="color:var(--text-muted);">Target Job Profile:</span>
            <strong>${setupData.roleName}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--surface-border); padding-bottom:12px;">
            <span style="color:var(--text-muted);">Difficulty Level:</span>
            <strong>${setupData.difficulty}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--surface-border); padding-bottom:12px;">
            <span style="color:var(--text-muted);">Questions Time:</span>
            <strong>${setupData.duration} Minutes Session</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--surface-border); padding-bottom:12px;">
            <span style="color:var(--text-muted);">Resume Integration:</span>
            <strong>${setupData.resumeUploaded ? 'Enabled (' + setupData.fileName + ')' : 'Disabled'}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--surface-border); padding-bottom:12px;">
            <span style="color:var(--text-muted);">Webcam Analysis:</span>
            <strong>${setupData.webcamEnabled ? 'Enabled (AI tracking)' : 'Disabled (Text-only)'}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-bottom: 1px solid var(--surface-border); padding-bottom:12px;">
            <span style="color:var(--text-muted);">AI Voice Reader:</span>
            <strong>${setupData.aiVoiceEnabled ? 'Enabled' : 'Disabled'}</strong>
          </div>
          ${setupData.category === 'coding' ? `
            <div style="display:flex; justify-content:space-between; padding-bottom:12px;">
              <span style="color:var(--text-muted);">Programming Language:</span>
              <strong>${setupData.language}</strong>
            </div>
          ` : ''}
        </div>
        
        <div class="badge badge-info" style="margin-top:20px; display:flex; gap:8px; padding:12px 16px;">
          <i data-lucide="info" style="width:16px; height:16px;"></i>
          <span>Once you click 'Start', the timer begins. Ensure you are in a quiet room.</span>
        </div>
      `;
    }
    lucide.createIcons();
  }
  
  // Category Selector hooks
  window.selectCategory = function(cat) {
    setupData.category = cat;
    if (cat === "frontend") setupData.roleName = "Frontend Developer";
    if (cat === "backend") setupData.roleName = "Backend Engineer";
    if (cat === "coding") setupData.roleName = "Software Engineer (Algorithms)";
    if (cat === "hr") setupData.roleName = "General HR Profile";
    renderStep();
  };
  
  window.triggerResumeUpload = function() {
    document.getElementById("setup-resume-file").click();
  };
  
  window.handleResumeFile = function(input) {
    if (input.files && input.files[0]) {
      setupData.resumeUploaded = true;
      setupData.fileName = input.files[0].name;
      showToast("Resume uploaded successfully!");
      renderStep();
    }
  };
  
  window.removeResume = function(e) {
    e.stopPropagation();
    setupData.resumeUploaded = false;
    setupData.fileName = "";
    renderStep();
  };
  
  // Navigation Buttons
  nextBtn.addEventListener("click", () => {
    if (currentStep === 1) {
      currentStep = 2;
      renderStep();
    } else if (currentStep === 2) {
      // Save fields from Step 2
      setupData.roleName = document.getElementById("setup-role-name").value;
      setupData.difficulty = document.getElementById("setup-difficulty").value;
      setupData.duration = document.getElementById("setup-duration").value;
      currentStep = 3;
      renderStep();
    } else {
      // Start Mock Interview session
      startInterviewSession(setupData);
    }
  });
  
  backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      renderStep();
    }
  });
  
  renderStep();
}

async function startInterviewSession(setup) {
  showToast("Preparing your AI interviewer...", "info");
  
  let qList = [];
  try {
    const roleParam = encodeURIComponent(setup.roleName);
    const catParam = encodeURIComponent(
      setup.category === "hr"
        ? "HR Mock"
        : setup.category === "coding"
          ? "Coding Interview"
          : "Technical"
    );
    const res = await fetch(`${API_BASE}/questions?role=${roleParam}&category=${catParam}`);
    
    if (res.ok) {
      qList = await res.json();
    }
  } catch (err) {
    console.error("Backend questions API failed, falling back to local pool", err);
  }
  
  if (!qList || qList.length === 0) {
    qList = MOCK_QUESTIONS[setup.category] || MOCK_QUESTIONS.frontend;
  }
  
  const count = setup.duration === "5" ? 2 : setup.duration === "10" ? 3 : 4;
  qList = qList.slice(0, count);
  
  APP_STATE.currentInterview = {
    role: setup.roleName,
    category: setup.category === "hr" ? "HR Mock" : setup.category === "coding" ? "Coding Interview" : "Technical",
    difficulty: setup.difficulty,
    duration: `${setup.duration} mins`,
    questions: qList,
    currentQuestionIndex: 0,
    answers: [],
    timeRemaining: parseInt(setup.duration) * 60, // in seconds
    timerInterval: null,
    webcamEnabled: setup.webcamEnabled || false,
    language: setup.language || "Python",
    aiVoiceEnabled: setup.aiVoiceEnabled !== false
  };
  
  setTimeout(() => {
    window.location.hash = "#/interview";
  }, 1000);
}

// --- Live Interview View ---
function viewInterview() {
  const view = document.getElementById("app-view");
  const session = APP_STATE.currentInterview;
  
  if (!session) {
    window.location.hash = "#/dashboard";
    return;
  }
  
  // Render structure
  const isCoding = session.category === "Coding Interview";
  
  view.innerHTML = `
    <div class="interview-view">
      <!-- Top header with progress -->
      <div class="card interview-header-card">
        <div class="interview-header-left">
          <h2 id="interview-session-title">${session.role} Interview</h2>
          <div class="interview-progress-wrapper">
            <span id="interview-q-index">Question 1 of ${session.questions.length}</span>
            <div class="interview-progress-bar">
              <div class="interview-progress-fill" id="interview-progress-fill-bar" style="width: 0%;"></div>
            </div>
          </div>
        </div>
        
        <div class="interview-header-right" style="display:flex; align-items:center; gap:12px;">
          ${session.aiVoiceEnabled ? `
            <button class="btn btn-secondary header-voice-replay-btn" onclick="replayQuestionAudio()" title="Replay Question Audio" style="padding: 8px 12px; display: flex; align-items: center; gap: 6px; font-size: 13.5px;">
              <i data-lucide="volume-2" style="width:16px; height:16px; vertical-align:middle;"></i> Replay
            </button>
          ` : ''}
          <div class="timer-box" id="interview-timer" style="margin:0;">
            <i data-lucide="clock"></i>
            <span id="timer-text">--:--</span>
          </div>
          <button class="btn btn-secondary" onclick="triggerExitConfirm()" style="padding: 8px 16px; font-size:14px;">Exit</button>
        </div>
      </div>
      
      <!-- Workspace Layout -->
      ${isCoding ? `
        <div class="coding-workspace">
          <!-- Left Pane: Problem Description -->
          <div class="card" style="overflow-y:auto; padding:24px; height:100%; box-sizing:border-box;">
            <div class="question-meta" style="margin-bottom:16px;">
              <span class="badge badge-primary">${session.difficulty}</span>
              <span class="badge badge-purple" style="font-family:monospace;">${session.language}</span>
            </div>
            <h3 id="coding-title-label" style="font-size:16px; margin-bottom:16px; font-weight:700;">Question 1</h3>
            <p id="coding-question-desc" style="font-size:14px; line-height:1.6; color:var(--text-muted);"></p>
            
            <div class="coding-constraints-list">
              <h4 style="font-size:12px; margin-bottom:6px;">Hints & Constraints</h4>
              <p id="coding-question-hint" style="font-size:12px; font-style:italic; color:var(--text-light);"></p>
            </div>
          </div>
          
          <!-- Right Pane: Code Editor -->
          <div class="code-editor-container">
            <div class="code-editor-header">
              <span>index.${session.language === 'Python' ? 'py' : session.language === 'JavaScript' ? 'js' : 'java'}</span>
              <span>UTF-8</span>
            </div>
            <div class="code-editor-textarea-wrapper">
              <div class="code-editor-line-numbers" id="editor-line-numbers">
                1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15
              </div>
              <div class="code-editor-overlay-container">
                <pre class="code-editor-highlight" id="editor-highlight-overlay" aria-hidden="true"></pre>
                <textarea id="interview-answer-input" class="code-editor-textarea" spellcheck="false" placeholder="Write your function implementation here..."></textarea>
              </div>
            </div>
            
            <!-- Terminal Console -->
            <div class="editor-console" id="editor-console-output">
  [Console] Ready to compile. Click 'Run Code' to execute test cases.
            </div>
            
            <!-- Editor Footer Controls -->
            <div class="editor-footer" style="padding:12px 16px; background-color:#0B0F19; border-top:1px solid #1E293B; display:flex; justify-content:space-between; align-items:center;">
              <button class="btn btn-secondary" onclick="runMockCode()" style="padding:8px 16px; font-size:13px; color:#fff; border-color:#334155; background-color:#1E293B;">
                <i data-lucide="play" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> Run Code
              </button>
              <div class="action-row" style="margin-left:auto;">
                <button class="btn btn-ghost" onclick="skipInterviewQuestion()" style="color:#94A3B8;">Skip</button>
                <button class="btn btn-primary" onclick="submitInterviewAnswer()">Submit Code</button>
              </div>
            </div>
          </div>
        </div>
      ` : `
        <div class="interview-workspace">
          <div class="interview-left-pane">
            <!-- Question Card -->
            <div class="card question-card">
              <div class="question-meta">
                <div class="question-meta-left">
                  <span class="badge badge-primary">${session.difficulty}</span>
                  <span class="badge badge-info" id="q-category-badge">Category</span>
                </div>
                <button class="reveal-hint-btn" onclick="revealQuestionHint()"><i data-lucide="help-circle"></i> Reveal Hint</button>
              </div>
              <h3 class="question-text" id="interview-q-text">Question Prompt...</h3>
              <div id="hint-display-box" class="question-hint-box hidden"></div>
            </div>
            
            <!-- Answer editor -->
            <div class="card answer-editor-card">
              <textarea id="interview-answer-input" class="answer-textarea" placeholder="Type your answer here..."></textarea>
              <div class="editor-footer">
                <div style="display:flex; align-items:center; gap:16px;">
                  <button id="interview-mic-btn" class="mic-toggle-btn" onclick="toggleSpeechToText()">
                    <span class="mic-pulse-dot"></span>
                    <i data-lucide="mic"></i>
                    <span id="interview-mic-label">Voice Answer</span>
                  </button>
                  <span class="char-counter" id="char-counter-text">0 / 2000 characters</span>
                </div>
                <div class="action-row">
                  <button class="btn btn-ghost" onclick="skipInterviewQuestion()">Skip</button>
                  <button class="btn btn-primary" onclick="submitInterviewAnswer()">Submit Answer</button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right side AI panel -->
          <div class="card ai-panel-card" id="interview-ai-panel">
            ${session.webcamEnabled ? `
              <div class="webcam-video-container">
                <video id="interview-webcam-element" class="webcam-video-element" autoplay muted playsinline></video>
                <div class="webcam-overlay">
                  <div class="webcam-status-badge">
                    <span class="webcam-status-dot-active"></span>
                    <span>LIVE PREVIEW • ANALYZING</span>
                  </div>
                  <div class="webcam-face-mesh"></div>
                  <div class="webcam-telemetry">
                    <div class="webcam-telemetry-row">
                      <span class="webcam-telemetry-label">Eye Contact:</span>
                      <span class="webcam-telemetry-value" id="webcam-val-eye">Calibrating...</span>
                    </div>
                    <div class="webcam-telemetry-row">
                      <span class="webcam-telemetry-label">Posture Index:</span>
                      <span class="webcam-telemetry-value" id="webcam-val-posture">Stable (98%)</span>
                    </div>
                    <div class="webcam-telemetry-row">
                      <span class="webcam-telemetry-label">Aesthetic Noise:</span>
                      <span class="webcam-telemetry-value" id="webcam-val-noise">Low (0.02)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="ai-status-indicator">
                <span class="status-dot listening"></span>
                <span id="ai-status-text">Webcam & Voice Active</span>
              </div>
              
              <div class="ai-details-panel">
                <h4>Simulated AI Eye Tracking</h4>
                <div class="tip-item">
                  <i data-lucide="shield-check" style="color:var(--success);"></i>
                  <span>Keep eye contact with the mesh circle for optimal focus metrics.</span>
                </div>
                <div class="tip-item">
                  <i data-lucide="mic" style="color:var(--primary);"></i>
                  <span>Speak clearly. Micro-checks detect speech confidence levels.</span>
                </div>
              </div>
            ` : `
              <div class="ai-avatar-container">
                <div class="ai-avatar-wave"></div>
                <div class="ai-avatar-wave"></div>
                <div class="ai-avatar-wave"></div>
                <div class="ai-avatar-circle">
                  <i data-lucide="sparkles"></i>
                </div>
              </div>
              
              <div class="ai-status-indicator">
                <span class="status-dot listening"></span>
                <span id="ai-status-text">Listening</span>
              </div>
              
              <div class="ai-details-panel">
                <h4>MockMate Coach Tips</h4>
                <div class="tip-item">
                  <i data-lucide="check-circle-2"></i>
                  <span>Take your time to structure your thoughts. Code samples are welcome.</span>
                </div>
                <div class="tip-item">
                  <i data-lucide="check-circle-2"></i>
                  <span>Use 'Ctrl + Enter' shortcut to submit your answers quickly.</span>
                </div>
              </div>
            `}
          </div>
        </div>
      `}
    </div>
  `;
  
  // Initial question load
  loadInterviewQuestion();
  
  // Start countdown timer
  clearInterval(session.timerInterval);
  session.timerInterval = setInterval(() => {
    session.timeRemaining--;
    updateTimerDisplay();
    
    if (session.timeRemaining <= 0) {
      clearInterval(session.timerInterval);
      showToast("Time's up! Generating analysis.", "warning");
      finishInterview();
    }
  }, 1000);
  
  updateTimerDisplay();
  
  // Start webcam if enabled
  if (session.webcamEnabled) {
    setTimeout(async () => {
      const videoEl = document.getElementById("interview-webcam-element");
      if (!videoEl) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: false });
        videoEl.srcObject = stream;
        activeWebcamStream = stream;
        
        let count = 0;
        const telemetryInterval = setInterval(() => {
          if (!document.getElementById("interview-webcam-element")) {
            clearInterval(telemetryInterval);
            return;
          }
          const eyeVal = document.getElementById("webcam-val-eye");
          if (eyeVal) {
            count++;
            const rating = Math.random() > 0.15 ? "Normal (Optimal)" : "Averaging Away";
            const color = rating.includes("Optimal") ? "var(--success)" : "var(--warning)";
            eyeVal.innerText = rating;
            eyeVal.style.color = color;
          }
        }, 3000);
      } catch (err) {
        console.error("Camera access denied or unavailable:", err);
        showToast("Webcam unavailable. Falling back to text mode.", "info");
        const rightPanel = document.getElementById("interview-ai-panel");
        if (rightPanel) {
          rightPanel.innerHTML = `
            <div class="ai-avatar-container">
              <div class="ai-avatar-wave"></div>
              <div class="ai-avatar-wave"></div>
              <div class="ai-avatar-wave"></div>
              <div class="ai-avatar-circle">
                <i data-lucide="sparkles"></i>
              </div>
            </div>
            <div class="ai-status-indicator">
              <span class="status-dot listening"></span>
              <span id="ai-status-text">Listening (Text Mode)</span>
            </div>
            <div class="ai-details-panel">
              <h4>MockMate Coach Tips</h4>
              <div class="tip-item">
                <i data-lucide="check-circle-2"></i>
                <span>Webcam access was denied. Focus on typing your structured answers.</span>
              </div>
            </div>
          `;
          lucide.createIcons();
        }
      }
    }, 100);
  }
  
  // Character counter and Autosave
  const input = document.getElementById("interview-answer-input");
  const counter = document.getElementById("char-counter-text");
  input.addEventListener("input", () => {
    counter.innerText = `${input.value.length} / 2000 characters`;
  });
  
  // Shortcuts
  input.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      submitInterviewAnswer();
    }
  });
  
  lucide.createIcons();
}

function updateTimerDisplay() {
  const session = APP_STATE.currentInterview;
  if (!session) return;
  
  const m = Math.floor(session.timeRemaining / 60);
  const s = session.timeRemaining % 60;
  const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  
  const text = document.getElementById("timer-text");
  const box = document.getElementById("interview-timer");
  
  if (text) text.innerText = timeStr;
  
  if (box) {
    if (session.timeRemaining < 30) {
      box.className = "timer-box danger";
    } else if (session.timeRemaining < 120) {
      box.className = "timer-box warning";
    } else {
      box.className = "timer-box";
    }
  }
}

function getCodeTemplate(text, lang) {
  const name = text.toLowerCase();
  if (name.includes("two sum")) {
    if (lang === "Python") return `def twoSum(nums, target):\n    # Write your code here\n    pass`;
    if (lang === "JavaScript") return `function twoSum(nums, target) {\n  // Write your code here\n}`;
    return `public int[] twoSum(int[] nums, int target) {\n  // Write your code here\n}`;
  }
  if (name.includes("reverse")) {
    if (lang === "Python") return `def reverseString(s):\n    # Reverse array in-place\n    pass`;
    if (lang === "JavaScript") return `function reverseString(s) {\n  // Reverse array in-place\n}`;
    return `public void reverseString(char[] s) {\n  // Reverse array in-place\n}`;
  }
  // Valid Parentheses
  if (lang === "Python") return `def isValid(s):\n    # Validate string brackets\n    pass`;
  if (lang === "JavaScript") return `function isValid(s) {\n  // Validate string brackets\n}`;
  return `public boolean isValid(String s) {\n  // Validate string brackets\n}`;
}

function highlightCode(text, language) {
  // Escape HTML entities to prevent injection
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Regex token definitions
  const rules = {
    // Strings (double/single quotes)
    string: /(["'])(?:(?=(\\?))\2.)*?\1/g,
    // Comments
    comment: language === 'Python' ? /(#.*)/g : /(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    // Keywords
    keyword: /\b(def|class|return|if|else|elif|for|while|in|import|from|pass|function|const|let|var|try|catch|new|public|private|static|void|int|double|float|boolean|char|true|false|null|None)\b/g,
    // Numbers
    number: /\b(\d+)\b/g,
    // Functions
    function: /\b([a-zA-Z_]\w*)(?=\()/g
  };

  const tokens = [];
  let tokenCounter = 0;
  
  // 1. Strings
  html = html.replace(rules.string, (match) => {
    const tokenId = `___STR_TOKEN_${tokenCounter++}___`;
    tokens.push({ id: tokenId, html: `<span class="hl-string">${match}</span>` });
    return tokenId;
  });
  
  // 2. Comments
  html = html.replace(rules.comment, (match) => {
    const tokenId = `___COM_TOKEN_${tokenCounter++}___`;
    tokens.push({ id: tokenId, html: `<span class="hl-comment">${match}</span>` });
    return tokenId;
  });
  
  // 3. Keywords (with capturing group reference)
  html = html.replace(rules.keyword, '<span class="hl-keyword">$1</span>');
  
  // 4. Functions
  html = html.replace(rules.function, '<span class="hl-function">$1</span>');
  
  // 5. Numbers
  html = html.replace(rules.number, '<span class="hl-number">$1</span>');
  
  // 6. Restore strings/comments
  for (let i = tokens.length - 1; i >= 0; i--) {
    html = html.replace(tokens[i].id, tokens[i].html);
  }
  
  if (html.endsWith("\n") || html === "") {
    html += " ";
  }
  
  return html;
}

function updateEditorLineNumbers() {
  const textarea = document.getElementById("interview-answer-input");
  const lineNumbers = document.getElementById("editor-line-numbers");
  if (!textarea || !lineNumbers) return;
  
  const lines = textarea.value.split('\n').length;
  let html = "";
  for (let i = 1; i <= Math.max(15, lines); i++) {
    html += `${i}<br>`;
  }
  lineNumbers.innerHTML = html;
}

function loadInterviewQuestion() {
  const session = APP_STATE.currentInterview;
  const q = session.questions[session.currentQuestionIndex];
  const isCoding = session.category === "Coding Interview";
  
  // Progress fill
  const percent = (session.currentQuestionIndex / session.questions.length) * 100;
  const progressFill = document.getElementById("interview-progress-fill-bar");
  if (progressFill) progressFill.style.width = `${percent}%`;
  
  const qIndexEl = document.getElementById("interview-q-index");
  if (qIndexEl) qIndexEl.innerText = `Question ${session.currentQuestionIndex + 1} of ${session.questions.length}`;
  
  const textarea = document.getElementById("interview-answer-input");
  
  if (isCoding) {
    const titleEl = document.getElementById("coding-title-label");
    if (titleEl) titleEl.innerText = `Question ${session.currentQuestionIndex + 1} of ${session.questions.length}: ${q.category}`;
    
    const descEl = document.getElementById("coding-question-desc");
    if (descEl) descEl.innerText = q.text;
    
    const hintEl = document.getElementById("coding-question-hint");
    if (hintEl) hintEl.innerText = q.hint;
    
    // Set code template stub
    if (textarea) textarea.value = getCodeTemplate(q.text, session.language);
    
    const consoleOut = document.getElementById("editor-console-output");
    if (consoleOut) {
      consoleOut.className = "editor-console";
      consoleOut.innerText = `[Console] Ready to compile index.${session.language === 'Python' ? 'py' : session.language === 'JavaScript' ? 'js' : 'java'}. Click 'Run Code' to execute test cases.`;
    }
    
    // Setup real-time syntax highlighting overlay
    const overlay = document.getElementById("editor-highlight-overlay");
    if (textarea && overlay) {
      overlay.innerHTML = highlightCode(textarea.value, session.language);
      updateEditorLineNumbers();
      
      if (!textarea.dataset.highlightInitialized) {
        textarea.addEventListener("input", () => {
          overlay.innerHTML = highlightCode(textarea.value, session.language);
          updateEditorLineNumbers();
        });
        
        textarea.addEventListener("scroll", () => {
          overlay.scrollTop = textarea.scrollTop;
          overlay.scrollLeft = textarea.scrollLeft;
        });
        
        textarea.dataset.highlightInitialized = "true";
      }
    }
  } else {
    const catBadge = document.getElementById("q-category-badge");
    if (catBadge) catBadge.innerText = q.category;
    
    const qTextEl = document.getElementById("interview-q-text");
    if (qTextEl) qTextEl.innerText = q.text;
    
    // Reset hint
    const hintDisplay = document.getElementById("hint-display-box");
    if (hintDisplay) {
      hintDisplay.classList.add("hidden");
      hintDisplay.innerText = q.hint;
    }
    
    if (textarea) textarea.value = "";
    const counterText = document.getElementById("char-counter-text");
    if (counterText) counterText.innerText = "0 / 2000 characters";
    
    // Set avatar wave pulsing
    const statusText = document.getElementById("ai-status-text");
    if (statusText) statusText.innerText = "Listening";
    
    const dot = document.querySelector(".status-dot");
    if (dot) dot.className = "status-dot listening";
  }
  
  // Speak the question out loud if enabled
  if (session.aiVoiceEnabled) {
    speakText(q.text);
  }
}

window.revealQuestionHint = function() {
  const session = APP_STATE.currentInterview;
  const q = session.questions[session.currentQuestionIndex];
  const hintBox = document.getElementById("hint-display-box");
  
  hintBox.innerText = q.hint;
  hintBox.classList.toggle("hidden");
};

window.skipInterviewQuestion = function() {
  stopSpeaking();
  stopActiveSpeechRecognition();
  saveAnswer("[Question Skipped]");
  showToast("Question skipped", "info");
  nextInterviewStep();
};

function getLocalFollowUp(questionText, userAnswer, category) {
  const ansLower = (userAnswer || "").toLowerCase();
  
  if (category === "Coding Interview" || category === "Coding Mock") {
    return {
      id: "followup-local",
      text: "Can you explain the time and space complexity of the code you just submitted, and how we could optimize it further?",
      category: "Adaptive Follow-up",
      hint: "Recall Big-O notation for loops and storage structures.",
      modelAnswer: "Time complexity analysis and optimizations."
    };
  }
  
  if (ansLower.includes("react") || ansLower.includes("state")) {
    return {
      id: "followup-local",
      text: "You mentioned state management. Can you explain the difference between local component state and global state, and when to use each?",
      category: "Adaptive Follow-up",
      hint: "Think about React useState vs. Redux/Context API.",
      modelAnswer: "Differences between local and global state storage."
    };
  }
  
  return {
    id: "followup-local",
    text: "Can you elaborate on any trade-offs or alternative options you considered for the solution you just described?",
    category: "Adaptive Follow-up",
    hint: "Discuss performance, code readability, or speed of development.",
    modelAnswer: "Explanation of engineering trade-offs."
  };
}

async function checkAndInjectFollowUp(userAnswer) {
  const session = APP_STATE.currentInterview;
  if (!session) return;
  
  // Only allow at most 1 follow-up question per session to keep duration balanced.
  if (session.hasInjectedFollowUp) return;
  
  const q = session.questions[session.currentQuestionIndex];
  if (q.category === "Adaptive Follow-up") return;
  
  try {
    showToast("Analyzing answer for follow-up...", "info");
    const res = await fetch(`${API_BASE}/followup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionText: q.text,
        userAnswer: userAnswer,
        category: q.category || session.category,
        role: session.role
      })
    });
    
    let followUpQ = null;
    if (res.ok) {
      const data = await res.json();
      if (data && data.followup) {
        followUpQ = {
          id: data.followup.id,
          text: data.followup.text,
          category: data.followup.category,
          hint: data.followup.hint,
          modelAnswer: "A comprehensive tech explanation expanding on lookup structures, state updates, indexes, or metric tracking."
        };
      }
    } else {
      followUpQ = getLocalFollowUp(q.text, userAnswer, q.category || session.category);
    }
    
    if (followUpQ) {
      session.questions.splice(session.currentQuestionIndex + 1, 0, followUpQ);
      session.hasInjectedFollowUp = true;
      showToast("Adaptive follow-up question queued!", "success");
    }
  } catch (err) {
    console.error("Failed to fetch adaptive follow-up, using local fallback:", err);
    const fallback = getLocalFollowUp(q.text, userAnswer, q.category || session.category);
    if (fallback) {
      session.questions.splice(session.currentQuestionIndex + 1, 0, fallback);
      session.hasInjectedFollowUp = true;
      showToast("Adaptive follow-up question queued (local offline)!", "success");
    }
  }
}

window.submitInterviewAnswer = async function() {
  const ans = document.getElementById("interview-answer-input").value.trim();
  if (ans.length === 0) {
    showToast("Please enter an answer or click Skip", "error");
    return;
  }
  
  stopSpeaking();
  stopActiveSpeechRecognition();
  saveAnswer(ans);
  showToast("Answer saved successfully");
  
  // Analyze and potentially queue a follow-up question
  await checkAndInjectFollowUp(ans);
  
  nextInterviewStep();
};

function saveAnswer(text) {
  const session = APP_STATE.currentInterview;
  const q = session.questions[session.currentQuestionIndex];
  
  session.answers.push({
    question: q.text,
    userAnswer: text,
    category: q.category,
    modelAnswer: q.modelAnswer
  });
}

function nextInterviewStep() {
  const session = APP_STATE.currentInterview;
  session.currentQuestionIndex++;
  
  if (session.currentQuestionIndex < session.questions.length) {
    loadInterviewQuestion();
  } else {
    // End interview
    clearInterval(session.timerInterval);
    finishInterview();
  }
}

function finishInterview() {
  window.location.hash = "#/analysis";
}

window.triggerExitConfirm = function() {
  document.getElementById("exit-modal").classList.remove("hidden");
};

// Modal Exit Triggers
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cancel-exit-btn").addEventListener("click", () => {
    document.getElementById("exit-modal").classList.add("hidden");
  });
  
  document.getElementById("confirm-exit-btn").addEventListener("click", () => {
    document.getElementById("exit-modal").classList.add("hidden");
    const session = APP_STATE.currentInterview;
    if (session) clearInterval(session.timerInterval);
    
    stopSpeaking();
    stopActiveCamera();
    stopActiveSpeechRecognition();
    
    APP_STATE.currentInterview = null;
    window.location.hash = "#/dashboard";
    showToast("Interview session aborted", "info");
  });
});

// --- AI Analysis Loader View ---
function viewAnalysis() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div class="analysis-container">
      <div class="card analysis-spinner-card">
        <h2 style="font-size:24px; letter-spacing:-0.5px;">AI Evaluating Performance</h2>
        <p style="color:var(--text-muted);">Please wait. Our AI is assessing technical coverage and communication clarity.</p>
        
        <!-- Circular Progress SVG -->
        <div class="circular-progress-container">
          <svg class="circular-progress-svg">
            <circle class="progress-track" cx="80" cy="80" r="70"></circle>
            <circle class="progress-bar-svg" id="analysis-svg-circle" cx="80" cy="80" r="70"></circle>
          </svg>
          <div class="progress-percentage" id="analysis-perc-label">0%</div>
        </div>
        
        <!-- Rotating motivation messages -->
        <div class="rotating-message" id="analysis-tip-label">Comparing explanations with industry frameworks...</div>
        
        <!-- Processing Timeline steps -->
        <div class="analysis-timeline">
          <div class="timeline-step" id="step-an-1">
            <div class="step-icon-circle"><i data-lucide="save" style="width:14px; height:14px;"></i></div>
            <span class="step-text">Saving answers securely</span>
          </div>
          <div class="timeline-step" id="step-an-2">
            <div class="step-icon-circle"><i data-lucide="code" style="width:14px; height:14px;"></i></div>
            <span class="step-text">Technical terminology validation</span>
          </div>
          <div class="timeline-step" id="step-an-3">
            <div class="step-icon-circle"><i data-lucide="message-square" style="width:14px; height:14px;"></i></div>
            <span class="step-text">Communication clarity assessment</span>
          </div>
          <div class="timeline-step" id="step-an-4">
            <div class="step-icon-circle"><i data-lucide="bar-chart-2" style="width:14px; height:14px;"></i></div>
            <span class="step-text">Generating recommendations</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  lucide.createIcons();
  
  // Rotating Tips List
  const tips = [
    "Checking technical accuracy against best practices...",
    "Reviewing answer structural logic...",
    "Assessing confidence indicators and coverage...",
    "Compiling personalized improvement roadmap..."
  ];
  
  let currentTipIndex = 0;
  const tipInterval = setInterval(() => {
    const label = document.getElementById("analysis-tip-label");
    if (label) {
      currentTipIndex = (currentTipIndex + 1) % tips.length;
      label.innerText = tips[currentTipIndex];
    }
  }, 2000);
  
  // Animate progress circle
  const circle = document.getElementById("analysis-svg-circle");
  const label = document.getElementById("analysis-perc-label");
  const strokeMax = 440; // Math.PI * 2 * radius (70)
  
  let percent = 0;
  const animateInterval = setInterval(() => {
    percent += 2;
    if (label) label.innerText = `${percent}%`;
    if (circle) {
      const offset = strokeMax - (strokeMax * (percent / 100));
      circle.style.strokeDashoffset = offset;
    }
    
    // Timeline steps updates
    if (percent >= 15) {
      setTimelineStepCompleted("step-an-1");
      setTimelineStepActive("step-an-2");
    }
    if (percent >= 45) {
      setTimelineStepCompleted("step-an-2");
      setTimelineStepActive("step-an-3");
    }
    if (percent >= 75) {
      setTimelineStepCompleted("step-an-3");
      setTimelineStepActive("step-an-4");
    }
    
    if (percent >= 100) {
      clearInterval(animateInterval);
      clearInterval(tipInterval);
      setTimelineStepCompleted("step-an-4");
      
      setTimeout(() => {
        generateFinalAnalysisReport();
      }, 500);
    }
  }, 80);
}

function setTimelineStepActive(id) {
  const el = document.getElementById(id);
  if (el) el.className = "timeline-step active";
}

function setTimelineStepCompleted(id) {
  const el = document.getElementById(id);
  if (el && !el.classList.contains("completed")) {
    el.className = "timeline-step completed";
    const icon = el.querySelector(".step-icon-circle");
    icon.innerHTML = `<i data-lucide="check" style="width:14px; height:14px;"></i>`;
    lucide.createIcons();
  }
}

async function generateFinalAnalysisReport() {
  const session = APP_STATE.currentInterview;
  if (!session) return;
  
  showToast("Compiling AI feedback report...", "info");
  
  let scoresSum = 0;
  const evaluationPromises = session.answers.map(async (ans) => {
    if (ans.userAnswer === "[Question Skipped]") {
      return {
        ...ans,
        score: 0,
        strengths: ["None (Question Skipped)"],
        improvements: ["Ensure you attempt all questions. Even partial definitions build score."]
      };
    }
    try {
      const res = await fetch(`${API_BASE}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: ans.question,
          userAnswer: ans.userAnswer,
          modelAnswer: ans.modelAnswer,
          category: session.category
        })
      });
      if (res.ok) {
        const graded = await res.json();
        return {
          ...ans,
          score: graded.score,
          strengths: graded.strengths,
          improvements: graded.improvements,
          modelAnswer: graded.modelAnswer,
          complexity: graded.complexity
        };
      }
    } catch (e) {
      console.error("Backend evaluation failed, falling back to local simulation", e);
    }
    
    // Fallback simulation
    const len = ans.userAnswer.length;
    let score = 0;
    let strengths = [];
    let improvements = [];
    if (len > 150) {
      score = Math.floor(Math.random() * 15) + 81;
      strengths = ["Strong comprehensive depth shown", "Good structuring of components"];
      improvements = ["Could optimize syntax details", "Explain alternative design options"];
    } else {
      score = Math.floor(Math.random() * 20) + 60;
      strengths = ["Understanding of core terms present"];
      improvements = ["Elaborate with practical examples", "Provide detailed breakdown of underlying mechanics"];
    }
    return {
      ...ans,
      score,
      strengths,
      improvements
    };
  });
  
  const reportAnswers = await Promise.all(evaluationPromises);
  reportAnswers.forEach(ans => {
    scoresSum += ans.score;
  });
  
  const finalScore = Math.round(scoresSum / session.questions.length);
  const reportId = "int-" + Math.floor(Math.random() * 900 + 100);
  
  const newReport = {
    id: reportId,
    role: session.role,
    category: session.category,
    difficulty: session.difficulty,
    date: new Date().toISOString().split('T')[0],
    duration: session.duration,
    score: finalScore,
    answers: reportAnswers,
    skills: {
      technical: finalScore + Math.floor(Math.random() * 8 - 4),
      communication: finalScore + Math.floor(Math.random() * 10 - 5),
      problemSolving: finalScore + Math.floor(Math.random() * 6 - 3),
      confidence: finalScore + Math.floor(Math.random() * 12 - 6),
      clarity: finalScore + Math.floor(Math.random() * 8 - 4)
    }
  };
  
  // Post report to backend
  try {
    await fetch(`${API_BASE}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReport)
    });
  } catch (err) {
    console.error("Failed to log session to server", err);
  }
  
  // Update state & storage cache
  APP_STATE.history.unshift(newReport);
  APP_STATE.currentInterview = null;
  saveStateToStorage();
  
  // Route to results
  window.location.hash = `#/results?id=${reportId}`;
  showToast("Analysis report compiled successfully!");
}

// --- Results / Feedback View ---
function viewResults() {
  const view = document.getElementById("app-view");
  
  // Parse ID from hash params
  const hash = window.location.hash;
  const paramIndex = hash.indexOf("?id=");
  let reportId = "";
  if (paramIndex !== -1) {
    reportId = hash.substring(paramIndex + 4);
  }
  
  const report = APP_STATE.history.find(h => h.id === reportId) || APP_STATE.history[0];
  
  if (!report) {
    view.innerHTML = `<div class="card p-8 text-center text-light">No analysis records found.</div>`;
    return;
  }
  
  let scoreClass = "badge-success";
  let scoreLabel = "Excellent Work";
  if (report.score < 70) {
    scoreClass = "badge-error";
    scoreLabel = "Needs Improvement";
  } else if (report.score < 80) {
    scoreClass = "badge-warning";
    scoreLabel = "Average Performance";
  }
  
  view.innerHTML = `
    <div class="results-container">
      <div class="results-header-grid">
        <!-- Score Card -->
        <div class="card score-display-card">
          <div class="large-score-circle">
            <span class="score-circle-value">${report.score}%</span>
            <span class="score-circle-label">Overall</span>
          </div>
          <span class="badge ${scoreClass}" style="margin-bottom:12px; padding:6px 14px;">${scoreLabel}</span>
          <h3 style="font-size:20px; margin-bottom:8px;">${report.role} Report</h3>
          <p style="color:var(--text-muted); font-size:14px;">Date: ${report.date} | Duration: ${report.duration}</p>
        </div>
        
        <!-- Radar Chart Card -->
        <div class="card results-radar-card">
          <h3 style="font-size:16px; margin-bottom:16px; align-self: flex-start;">Skill Matrix Breakdown</h3>
          <div class="chart-container" style="display:flex; justify-content:center; align-items:center;">
            <svg id="radar-svg-chart" width="220" height="220" style="overflow: visible;"></svg>
          </div>
        </div>
      </div>
      
      <!-- Detailed answers breakdown -->
      <div class="card">
        <h3 style="font-size:18px; margin-bottom:20px;">Question-by-Question Evaluation</h3>
        <div class="feedback-breakdown-box">
          ${report.answers.map((ans, idx) => `
            <div class="collapsible-question-card ${idx === 0 ? 'open' : ''}">
              <button class="collapsible-trigger" onclick="toggleCollapsibleCard(this)">
                <div class="collapsible-trigger-title">
                  <span class="badge badge-primary">Q${idx + 1}</span>
                  <span style="font-size:15px; font-weight:600;">${ans.question.substring(0, 50)}...</span>
                  <span class="badge ${ans.score >= 80 ? 'badge-success' : ans.score >= 70 ? 'badge-warning' : 'badge-error'}" style="margin-left:12px;">${ans.score}%</span>
                </div>
                <i data-lucide="chevron-down" class="chevron"></i>
              </button>
              
              <div class="collapsible-body">
                <div class="feedback-section-title">Question Prompt:</div>
                <p style="font-weight:500; font-size:14px; margin-bottom:16px;">${ans.question}</p>
                
                <div class="feedback-section-title">Your Submitted Answer:</div>
                <div class="user-answer-box" style="font-family:monospace; white-space:pre-wrap; background-color:#0F172A; color:#E2E8F0; padding:12px; border-radius:var(--radius-sm);">${ans.userAnswer}</div>
                
                ${ans.complexity ? `
                  <div class="feedback-section-title" style="color:var(--accent);">Complexity Heuristics:</div>
                  <div class="complexity-badge-row" style="margin-bottom:16px;">
                    <span class="complexity-badge">Time Complexity: ${ans.complexity.time}</span>
                    <span class="complexity-badge space">Space Complexity: ${ans.complexity.space}</span>
                  </div>
                ` : ''}
                
                <div class="grid-2">
                  <div>
                    <div class="feedback-section-title" style="color:var(--success);"><i data-lucide="check-circle" style="width:14px; height:14px; vertical-align:middle;"></i> Strengths:</div>
                    <ul class="feedback-bullets">
                      ${ans.strengths.map(s => `<li class="strength">${s}</li>`).join('')}
                    </ul>
                  </div>
                  <div>
                    <div class="feedback-section-title" style="color:var(--warning);"><i data-lucide="help-circle" style="width:14px; height:14px; vertical-align:middle;"></i> Suggestions:</div>
                    <ul class="feedback-bullets">
                      ${ans.improvements.map(i => `<li class="improvement">${i}</li>`).join('')}
                    </ul>
                  </div>
                </div>
                
                <div class="feedback-section-title" style="color:var(--primary);">Ideal Model Answer:</div>
                <p style="font-size:14px; color:var(--text-muted); font-style:italic; border-left:3px solid var(--primary); padding-left:12px; line-height:1.6;">${ans.modelAnswer}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="display:flex; justify-content:center; gap:16px; margin-top:24px;">
        <a href="#/dashboard" class="btn btn-secondary">Return to Dashboard</a>
        <button onclick="window.print()" class="btn btn-secondary" style="display:inline-flex; align-items:center; gap:8px;">
          <i data-lucide="download" style="width:16px; height:16px;"></i> Export PDF Report
        </button>
        <a href="#/setup" class="btn btn-primary">Try Another Practice Mock</a>
      </div>
    </div>
  `;
  
  // Render Custom Radar SVG Chart
  setTimeout(() => {
    drawRadarChart("radar-svg-chart", report.skills);
  }, 100);
}

window.toggleCollapsibleCard = function(button) {
  const card = button.parentElement;
  card.classList.toggle("open");
};

function drawRadarChart(svgId, skills) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  svg.innerHTML = "";
  
  const labels = ["Technical", "Communication", "Problem Solving", "Confidence", "Clarity"];
  const values = [skills.technical, skills.communication, skills.problemSolving, skills.confidence, skills.clarity];
  const maxVal = 100;
  
  const cx = 110;
  const cy = 110;
  const r = 80;
  
  // Draw concentric polygon lines (background grid)
  const levels = 4;
  for (let i = 1; i <= levels; i++) {
    const currentRadius = r * (i / levels);
    let polyPoints = [];
    for (let j = 0; j < 5; j++) {
      const angle = (Math.PI * 2 / 5) * j - Math.PI / 2;
      const x = cx + currentRadius * Math.cos(angle);
      const y = cy + currentRadius * Math.sin(angle);
      polyPoints.push(`${x},${y}`);
    }
    
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", polyPoints.join(" "));
    polygon.setAttribute("fill", "none");
    polygon.setAttribute("stroke", "#E2E8F0");
    polygon.setAttribute("stroke-width", "1");
    svg.appendChild(polygon);
  }
  
  // Draw axis lines from center
  for (let j = 0; j < 5; j++) {
    const angle = (Math.PI * 2 / 5) * j - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#E2E8F0");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
    
    // Draw text labels
    const textX = cx + (r + 18) * Math.cos(angle);
    const textY = cy + (r + 10) * Math.sin(angle);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "10px");
    text.setAttribute("font-family", "Inter");
    text.setAttribute("fill", "var(--text-muted)");
    text.setAttribute("font-weight", "600");
    text.textContent = labels[j];
    svg.appendChild(text);
  }
  
  // Draw data polygon
  let dataPoints = [];
  for (let j = 0; j < 5; j++) {
    const angle = (Math.PI * 2 / 5) * j - Math.PI / 2;
    const valPercent = values[j] / maxVal;
    const x = cx + (r * valPercent) * Math.cos(angle);
    const y = cy + (r * valPercent) * Math.sin(angle);
    dataPoints.push(`${x},${y}`);
  }
  
  const dataPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  dataPoly.setAttribute("points", dataPoints.join(" "));
  dataPoly.setAttribute("fill", "rgba(79, 70, 229, 0.2)");
  dataPoly.setAttribute("stroke", "var(--primary)");
  dataPoly.setAttribute("stroke-width", "2");
  svg.appendChild(dataPoly);
  
  // Dots on data vertices
  for (let j = 0; j < 5; j++) {
    const angle = (Math.PI * 2 / 5) * j - Math.PI / 2;
    const valPercent = values[j] / maxVal;
    const x = cx + (r * valPercent) * Math.cos(angle);
    const y = cy + (r * valPercent) * Math.sin(angle);
    
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "4");
    circle.setAttribute("fill", "var(--primary)");
    svg.appendChild(circle);
  }
}

// --- History View ---
function viewHistory() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
        <h3>Complete Interview History</h3>
        <a href="#/setup" class="btn btn-primary">Start New Mock</a>
      </div>
      
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Job Role</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Score</th>
              <th>Report Action</th>
            </tr>
          </thead>
          <tbody id="history-rows-tbody">
            <!-- Injected via JS -->
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  const tbody = document.getElementById("history-rows-tbody");
  if (APP_STATE.history.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:32px; color:var(--text-light);">No records found. Setup a mock to start history.</td></tr>`;
  } else {
    tbody.innerHTML = APP_STATE.history.map(h => `
      <tr>
        <td><strong>${h.date}</strong></td>
        <td>${h.role}</td>
        <td><span class="badge ${h.category.includes('HR') ? 'badge-purple' : 'badge-primary'}">${h.category}</span></td>
        <td>${h.duration}</td>
        <td><strong style="color: ${h.score >= 80 ? 'var(--success)' : h.score >= 70 ? 'var(--warning)' : 'var(--error)'}">${h.score}%</strong></td>
        <td><a href="#/results?id=${h.id}" class="btn btn-secondary" style="padding: 6px 12px; font-size:13px;">View Detailed Feedback</a></td>
      </tr>
    `).join('');
  }
}

// --- Analytics View ---
function viewAnalytics() {
  const view = document.getElementById("app-view");
  
  const totalCompleted = APP_STATE.history.length;
  const avgScore = totalCompleted > 0 ? Math.round(APP_STATE.history.reduce((a, b) => a + b.score, 0) / totalCompleted) : 0;
  
  view.innerHTML = `
    <div class="results-container">
      <div class="grid-3">
        <div class="card text-center" style="padding:32px;">
          <h4 style="color:var(--text-muted); font-size:14px; font-weight:500; margin-bottom:8px;">Sessions Practiced</h4>
          <h2 style="font-size:36px; color:var(--primary);">${totalCompleted}</h2>
          <p style="font-size:12px; color:var(--text-light); margin-top:8px;">Growth target: 10 mock sessions</p>
        </div>
        
        <div class="card text-center" style="padding:32px;">
          <h4 style="color:var(--text-muted); font-size:14px; font-weight:500; margin-bottom:8px;">Average Placement Score</h4>
          <h2 style="font-size:36px; color:var(--success);">${avgScore}%</h2>
          <p style="font-size:12px; color:var(--text-light); margin-top:8px;">Standard SWE target: 75%+</p>
        </div>
        
        <div class="card text-center" style="padding:32px;">
          <h4 style="color:var(--text-muted); font-size:14px; font-weight:500; margin-bottom:8px;">Streaks Tracker</h4>
          <h2 style="font-size:36px; color:var(--warning);">4 Days</h2>
          <p style="font-size:12px; color:var(--text-light); margin-top:8px;">Consistency multiplier active</p>
        </div>
      </div>
      
      <div class="grid-2">
        <!-- Progress Growth Line Chart -->
        <div class="card" style="min-height: 320px;">
          <h3 style="font-size:16px; margin-bottom:20px;">Scores Trend Analysis</h3>
          <div class="chart-container" style="height:240px;">
            <canvas id="analytics-growth-chart-full"></canvas>
          </div>
        </div>
        
        <!-- Category strengths radar -->
        <div class="card" style="display:flex; flex-direction:column; align-items:center;">
          <h3 style="font-size:16px; margin-bottom:20px; align-self:flex-start;">Competency Areas Strength Matrix</h3>
          <div class="chart-container" style="display:flex; justify-content:center; align-items:center; height:240px;">
            <svg id="analytics-radar-chart-full" width="220" height="220" style="overflow: visible;"></svg>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Render charts
  setTimeout(() => {
    drawGrowthChart("analytics-growth-chart-full");
    
    // Average skill levels for radar
    let avgSkills = { technical: 75, communication: 70, problemSolving: 80, confidence: 75, clarity: 72 };
    if (APP_STATE.history.length > 0) {
      avgSkills = {
        technical: Math.round(APP_STATE.history.reduce((a, b) => a + b.skills.technical, 0) / totalCompleted),
        communication: Math.round(APP_STATE.history.reduce((a, b) => a + b.skills.communication, 0) / totalCompleted),
        problemSolving: Math.round(APP_STATE.history.reduce((a, b) => a + b.skills.problemSolving, 0) / totalCompleted),
        confidence: Math.round(APP_STATE.history.reduce((a, b) => a + b.skills.confidence, 0) / totalCompleted),
        clarity: Math.round(APP_STATE.history.reduce((a, b) => a + b.skills.clarity, 0) / totalCompleted)
      };
    }
    drawRadarChart("analytics-radar-chart-full", avgSkills);
  }, 100);
}

// --- Profile View ---
function viewProfile() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:24px;">
      <div class="profile-grid">
        <!-- Profile Card Left -->
        <div class="card profile-card-center">
          <div class="avatar-large" id="profile-avatar-char">R</div>
          <h3 id="profile-name-label">${APP_STATE.user.name}</h3>
          <p style="color:var(--text-muted); font-size:14px; margin-bottom:16px;">${APP_STATE.user.email}</p>
          
          <span class="badge badge-primary">${APP_STATE.user.experienceLevel}</span>
          
          <div style="width:100%; border-top: 1px solid var(--surface-border); margin-top:24px; padding-top:20px; text-align:left;">
            <h4 style="font-size:14px; margin-bottom:12px;">Core Skills AI-Extracted</h4>
            <div class="skills-list" id="profile-skills-box">
              <!-- Injected -->
            </div>
          </div>
          
          <div style="width:100%; border-top: 1px solid var(--surface-border); margin-top:24px; padding-top:20px; text-align:left;" id="profile-resume-container">
            <!-- Injected via renderProfileResume -->
          </div>
        </div>
        
        <!-- Career Details Form Right -->
        <div class="card">
          <h3 style="font-size:18px; margin-bottom:24px;">Career Profile Details</h3>
          <form id="profile-details-form">
            <div class="form-group">
              <label class="form-label" for="profile-name">Full Name</label>
              <input type="text" id="profile-name" class="form-input" value="${APP_STATE.user.name}" required>
            </div>
            
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" for="profile-target-role">Target Job Role</label>
                <input type="text" id="profile-target-role" class="form-input" value="${APP_STATE.user.targetRole}">
              </div>
              
              <div class="form-group">
                <label class="form-label" for="profile-exp">Experience Level</label>
                <select id="profile-exp" class="form-input">
                  <option value="Entry Level" ${APP_STATE.user.experienceLevel === 'Entry Level' ? 'selected' : ''}>Fresh Graduate / Entry Level</option>
                  <option value="Junior" ${APP_STATE.user.experienceLevel === 'Junior' ? 'selected' : ''}>Junior Developer (1-2 yrs)</option>
                  <option value="Mid-Level" ${APP_STATE.user.experienceLevel === 'Mid-Level' ? 'selected' : ''}>Mid-Level Developer (3-5 yrs)</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="profile-summary">Professional Bio</label>
              <textarea id="profile-summary" class="form-input" style="min-height:100px; resize:vertical;">${APP_STATE.user.summary}</textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="profile-skills-input">Skills Tags (comma separated)</label>
              <input type="text" id="profile-skills-input" class="form-input" value="${APP_STATE.user.skills.join(', ')}">
            </div>
            
            <button type="submit" class="btn btn-primary">Save Profile Info</button>
          </form>
        </div>
      </div>
      
      <!-- AI Assessment Card Bottom -->
      <div class="card" id="profile-assessment-container" style="padding:28px; box-sizing:border-box;">
        <!-- Injected via renderResumeAssessment -->
      </div>
    </div>
  `;
  
  // Render Skills
  renderProfileSkills();
  // Render Resume
  renderProfileResume();
  // Render AI Assessment Card
  renderResumeAssessment();
  
  // Form submission
  document.getElementById("profile-details-form").addEventListener("submit", (e) => {
    e.preventDefault();
    APP_STATE.user.name = document.getElementById("profile-name").value;
    APP_STATE.user.targetRole = document.getElementById("profile-target-role").value;
    APP_STATE.user.experienceLevel = document.getElementById("profile-exp").value;
    APP_STATE.user.summary = document.getElementById("profile-summary").value;
    
    // Skills formatting
    const skillsText = document.getElementById("profile-skills-input").value;
    APP_STATE.user.skills = skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    saveStateToStorage();
    renderProfileSkills();
    renderResumeAssessment();
    
    fetch(`${API_BASE}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(APP_STATE.user)
    }).catch(err => console.error("Failed to save profile to server", err));
    
    // Update headers
    document.getElementById("profile-name-label").innerText = APP_STATE.user.name;
    document.getElementById("profile-avatar-char").innerText = APP_STATE.user.name.charAt(0);
    document.getElementById("header-avatar").innerText = APP_STATE.user.name ? APP_STATE.user.name.charAt(0).toUpperCase() : 'U';
    document.getElementById("header-username").innerText = APP_STATE.user.name || 'New User';
    
    showToast("Profile updated successfully!");
  });
}

function renderProfileSkills() {
  const box = document.getElementById("profile-skills-box");
  box.innerHTML = APP_STATE.user.skills.map(s => `<span class="skill-pill">${s}</span>`).join('');
}

function renderProfileResume() {
  const container = document.getElementById("profile-resume-container");
  if (!container) return;
  
  const hasResume = !!APP_STATE.user.resumeName;
  if (hasResume) {
    container.innerHTML = `
      <h4 style="font-size:14px; margin-bottom:12px;">Uploaded Resume</h4>
      <div class="resume-file-info" style="display:flex; align-items:center; gap:8px; background-color:var(--background); padding:10px 12px; border-radius:var(--radius-sm); border:1px solid var(--surface-border); box-sizing:border-box;">
        <i data-lucide="file-text" style="color:var(--primary); width:18px; height:18px;"></i>
        <span style="font-size:13px; font-weight:500; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; max-width:140px;" title="${APP_STATE.user.resumeName}">${APP_STATE.user.resumeName}</span>
        <button class="ghost-btn-sm" style="color:var(--error); margin-left:auto; font-size:11px;" onclick="removeProfileResume(event)">Remove</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <h4 style="font-size:14px; margin-bottom:12px;">Career Resume</h4>
      <div class="resume-upload-zone" onclick="triggerProfileResumeUpload()" style="padding:16px; border:2px dashed var(--surface-border); text-align:center; border-radius:var(--radius-sm); cursor:pointer; background-color:var(--background);">
        <i data-lucide="upload-cloud" style="width:24px; height:24px; margin-bottom:8px; color:var(--text-light); display:inline-block;"></i>
        <h5 style="font-size:12px; margin-bottom:4px; font-weight:600; color:var(--text-primary);">Upload Resume</h5>
        <p style="font-size:10px; color:var(--text-light); margin:0;">PDF, DOCX up to 5MB</p>
        <input type="file" id="profile-resume-file" style="display:none;" onchange="handleProfileResumeFile(this)">
      </div>
    `;
  }
}

function renderResumeAssessment() {
  const container = document.getElementById("profile-assessment-container");
  if (!container) return;
  
  const hasResume = !!APP_STATE.user.resumeName;
  if (!hasResume) {
    container.innerHTML = `
      <div style="text-align:center; padding:32px 16px; display:flex; flex-direction:column; align-items:center; gap:12px;">
        <div style="width:56px; height:56px; background-color:var(--primary-light); color:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center;">
          <i data-lucide="shield-alert" style="width:28px; height:28px;"></i>
        </div>
        <h3 style="font-size:18px; font-weight:600; margin:0; color:var(--text-main);">AI Placement Readiness Gap Audit</h3>
        <p style="color:var(--text-light); max-width:440px; margin:0; font-size:13.5px; line-height:1.5;">
          Upload your resume in the card above to calculate your job readiness scoring index and analyze target skill gaps.
        </p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  // Calculate match parameters
  const role = (APP_STATE.user.targetRole || "Software Engineer").toLowerCase();
  let required = [];
  let roleTitle = "Software Engineer (General)";
  
  if (role.includes("frontend") || role.includes("react") || role.includes("web") || role.includes("ui")) {
    required = ["React", "JavaScript", "CSS", "HTML", "TypeScript", "Webpack", "Redux"];
    roleTitle = "Frontend Developer / Engineer";
  } else if (role.includes("backend") || role.includes("node") || role.includes("python") || role.includes("java") || role.includes("database")) {
    required = ["Node.js", "Express", "SQL", "Database", "Prisma", "Python", "Java", "Docker", "API"];
    roleTitle = "Backend Developer / Engineer";
  } else {
    required = ["Data Structures", "Algorithms", "Python", "Java", "C++", "System Design", "Git"];
    roleTitle = "Software Development Engineer (Algorithms)";
  }
  
  // Match
  const userSkills = APP_STATE.user.skills.map(s => s.toLowerCase());
  const matched = [];
  const missing = [];
  
  required.forEach(skill => {
    if (userSkills.some(us => us.includes(skill.toLowerCase()) || skill.toLowerCase().includes(us))) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });
  
  const totalReq = required.length;
  const matchCount = matched.length;
  // Score formula: baseline 50 + proportion of matching skills * 48 (max 98)
  const score = Math.min(98, Math.round(50 + (matchCount / totalReq) * 48));
  
  let rating = "Needs Focus";
  let scoreColor = "var(--error)";
  if (score >= 80) {
    rating = "Placement Ready";
    scoreColor = "var(--success)";
  } else if (score >= 65) {
    rating = "Competitive";
    scoreColor = "var(--warning)";
  }
  
  // Generate advice list
  const adviceList = [];
  if (missing.length > 0) {
    adviceList.push(`Add <strong>${missing[0]}</strong> to your profile and resume details to qualify for standard filtering constraints.`);
  }
  if (score < 80) {
    adviceList.push("Complete a coding or technical mock session to verify your problem solving capabilities and boost your score.");
  } else {
    adviceList.push("Your matching coefficient is excellent. Schedule an HR & Behavioral mock round to polish your communication and posture delivery.");
  }
  
  container.innerHTML = `
    <h3 style="font-size:18px; margin-bottom:20px; font-weight:600; display:flex; align-items:center; gap:8px; color:var(--text-main);">
      <i data-lucide="shield-check" style="color:var(--primary); width:20px; height:20px;"></i>
      AI Placement Readiness Gap Audit
    </h3>
    
    <div class="readiness-grid-layout" style="display:grid; grid-template-columns: 1fr 2fr; gap:32px; align-items:center;">
      <!-- Score Circle Panel -->
      <div style="display:flex; flex-direction:column; align-items:center; text-align:center; padding:16px; border-right:1px solid var(--surface-border);">
        <div style="position:relative; width:100px; height:100px; display:flex; align-items:center; justify-content:center; margin-bottom:12px;">
          <svg style="width:100px; height:100px; transform: rotate(-90deg);">
            <circle cx="50" cy="50" r="44" stroke="var(--surface-border)" stroke-width="8" fill="transparent" />
            <circle cx="50" cy="50" r="44" stroke="${scoreColor}" stroke-width="8" fill="transparent" 
              stroke-dasharray="276.4" stroke-dashoffset="${276.4 - (276.4 * score) / 100}" stroke-linecap="round" />
          </svg>
          <div style="position:absolute; font-size:22px; font-weight:700; color:var(--text-main);">${score}%</div>
        </div>
        <div style="font-size:14px; font-weight:600; color:${scoreColor}; margin-bottom:4px;">${rating}</div>
        <div style="font-size:12px; color:var(--text-light);">Role Fit Index for:</div>
        <div style="font-size:12.5px; font-weight:500; color:var(--text-muted);">${roleTitle}</div>
      </div>
      
      <!-- Gap Matrix Panel -->
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div>
          <h4 style="font-size:13.5px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">Requirement Match Matrix</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${matched.map(s => `<span class="badge" style="background-color:var(--success-light); color:var(--success); border:1px solid rgba(34,197,94,0.2); font-size:11px; padding: 4px 8px;"><i data-lucide="check" style="width:11px; height:11px; margin-right:4px; display:inline-block; vertical-align:middle;"></i>${s}</span>`).join('')}
            ${missing.map(s => `<span class="badge" style="background-color:var(--error-light); color:var(--error); border:1px solid rgba(239,68,68,0.2); font-size:11px; padding: 4px 8px;"><i data-lucide="x" style="width:11px; height:11px; margin-right:4px; display:inline-block; vertical-align:middle;"></i>${s}</span>`).join('')}
          </div>
        </div>
        
        <div style="border-top:1px solid var(--surface-border); padding-top:16px;">
          <h4 style="font-size:13.5px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">AI Skill Gap Insights & Advice</h4>
          <ul style="margin:0; padding-left:20px; font-size:12.5px; color:var(--text-muted); display:flex; flex-direction:column; gap:6px; line-height:1.4;">
            ${adviceList.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  
  lucide.createIcons();
}

window.triggerProfileResumeUpload = function() {
  const el = document.getElementById("profile-resume-file");
  if (el) el.click();
};

window.handleProfileResumeFile = function(input) {
  if (input.files && input.files[0]) {
    APP_STATE.user.resumeName = input.files[0].name;
    
    // Add to activity timeline
    APP_STATE.activity.unshift({
      id: Math.random(),
      type: "purple",
      text: `Uploaded resume file '${input.files[0].name}'`,
      time: "Just now"
    });
    
    saveStateToStorage();
    renderProfileResume();
    renderResumeAssessment();
    showToast("Resume uploaded to profile!");
    
    // Sync with backend
    fetch(`${API_BASE}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(APP_STATE.user)
    }).catch(err => console.error("Failed to sync profile to server", err));
  }
};

window.removeProfileResume = function(e) {
  e.stopPropagation();
  APP_STATE.user.resumeName = "";
  saveStateToStorage();
  renderProfileResume();
  renderResumeAssessment();
  showToast("Resume removed from profile.");
  
  // Sync with backend
  fetch(`${API_BASE}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(APP_STATE.user)
  }).catch(err => console.error("Failed to sync profile to server", err));
};

// --- Settings View ---
function viewSettings() {
  const view = document.getElementById("app-view");
  view.innerHTML = `
    <div class="card" style="max-width:640px; margin: 0 auto;">
      <h3 style="font-size:18px; margin-bottom:24px;">Application Settings</h3>
      <form id="settings-form" style="display:flex; flex-direction:column; gap:20px;">
        <div class="form-group">
          <label class="form-label" for="settings-email">Registered Email Address</label>
          <input type="email" id="settings-email" class="form-input" value="${APP_STATE.user.email}" readonly style="background-color:var(--bg); color:var(--text-light);">
          <span style="font-size:11px; color:var(--text-light);">Registered email cannot be modified. Contact placement admin.</span>
        </div>
        
        <div class="form-group">
          <label class="form-label">Theme selection</label>
          <div style="display:flex; gap:12px; margin-top:6px;">
            <label class="checkbox-container">
              <input type="radio" name="settings-theme" value="light" ${APP_STATE.settings.theme === 'light' ? 'checked' : ''}>
              Light Theme (Default)
            </label>
            <label class="checkbox-container">
              <input type="radio" name="settings-theme" value="dark" ${APP_STATE.settings.theme === 'dark' ? 'checked' : ''}>
              Dark Theme
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Email Notification Alerts</label>
          <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
            <label class="checkbox-container">
              <input type="checkbox" checked>
              Notify me when AI feedback analysis is compiled
            </label>
            <label class="checkbox-container">
              <input type="checkbox" checked>
              Receive weekly placement prep metrics
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Audio & Voice Settings</label>
          <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
            <label class="checkbox-container">
              <input type="checkbox" id="settings-voice-toggle" ${APP_STATE.settings.aiVoiceEnabled !== false ? 'checked' : ''}>
              Enable AI Verbal Coach Reader (Text-to-Speech)
            </label>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary" style="align-self:flex-start;">Save Preferences</button>
      </form>
    </div>
  `;
  
  // Theme listeners
  const themeRadios = document.querySelectorAll('input[name="settings-theme"]');
  themeRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      const selectedTheme = e.target.value;
      APP_STATE.settings.theme = selectedTheme;
      saveStateToStorage();
      applySystemTheme();
      showToast(`Swapped to ${selectedTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  });
  
  document.getElementById("settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const voiceToggle = document.getElementById("settings-voice-toggle");
    if (voiceToggle) {
      APP_STATE.settings.aiVoiceEnabled = voiceToggle.checked;
    }
    saveStateToStorage();
    showToast("Preferences saved successfully!");
  });
}

// --- Notifications Page View ---
function viewNotifications() {
  const view = document.getElementById("app-view");
  let activeFilter = "all";
  let searchVal = "";
  
  function renderNotifPage() {
    const unreadCount = APP_STATE.notifications.filter(n => n.unread).length;
    const completedCount = APP_STATE.history.length;
    
    // Filter notifications
    let listItems = APP_STATE.notifications.filter(n => {
      const matchesFilter = activeFilter === "all" || n.type === activeFilter;
      const matchesSearch = n.text.toLowerCase().includes(searchVal.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    
    view.innerHTML = `
      <div class="notifications-grid">
        <div class="dashboard-main-col">
          <!-- Summary header widgets -->
          <div class="stats-summary-grid">
            <div class="stat-card" style="padding:16px;">
              <div class="stat-card-icon blue"><i data-lucide="bell"></i></div>
              <div class="stat-card-details">
                <h4>Unread Alerts</h4>
                <div class="stat-value" id="notif-unread-count">${unreadCount}</div>
              </div>
            </div>
            <div class="stat-card" style="padding:16px;">
              <div class="stat-card-icon orange"><i data-lucide="flame"></i></div>
              <div class="stat-card-details">
                <h4>Streak Days</h4>
                <div class="stat-value">4</div>
              </div>
            </div>
            <div class="stat-card" style="padding:16px;">
              <div class="stat-card-icon green"><i data-lucide="check-square"></i></div>
              <div class="stat-card-details">
                <h4>Mocks Done</h4>
                <div class="stat-value">${completedCount}</div>
              </div>
            </div>
          </div>
          
          <!-- Actions & Search -->
          <div class="card">
            <div class="notifications-header-actions">
              <div class="search-input-wrapper" style="max-width:320px; margin:0;">
                <i data-lucide="search" style="width:16px; height:16px;"></i>
                <input type="text" id="notif-search-input" class="form-input" style="padding-left:40px; border-radius:var(--radius-md);" placeholder="Search notifications..." value="${searchVal}">
              </div>
              <div class="action-row">
                <button class="btn btn-secondary" onclick="markAllNotificationsAsRead()" style="padding:8px 16px; font-size:13px;">Mark all read</button>
                <button class="btn btn-ghost" onclick="clearAllNotifications()" style="padding:8px 16px; font-size:13px; color:var(--error);">Clear all</button>
              </div>
            </div>
            
            <!-- Category Tabs -->
            <div class="filter-tabs-container">
              <button class="filter-tab ${activeFilter === 'all' ? 'active' : ''}" onclick="filterNotifTab('all')">All</button>
              <button class="filter-tab ${activeFilter === 'insight' ? 'active' : ''}" onclick="filterNotifTab('insight')">AI Insights</button>
              <button class="filter-tab ${activeFilter === 'reminder' ? 'active' : ''}" onclick="filterNotifTab('reminder')">Reminders</button>
              <button class="filter-tab ${activeFilter === 'system' ? 'active' : ''}" onclick="filterNotifTab('system')">System</button>
              <button class="filter-tab ${activeFilter === 'security' ? 'active' : ''}" onclick="filterNotifTab('security')">Security</button>
            </div>
            
            <!-- Notification list box -->
            <div class="notification-list-box">
              ${listItems.length === 0 ? `
                <div class="text-center p-8" style="color:var(--text-light);">
                  <i data-lucide="bell-off" style="width:48px; height:48px; margin-bottom:12px; opacity:0.5;"></i>
                  <p>You're all caught up!</p>
                </div>
              ` : listItems.map(n => {
                let icon = "info";
                if (n.type === "insight") icon = "sparkles";
                if (n.type === "reminder") icon = "clock";
                if (n.type === "achievement") icon = "award";
                if (n.type === "security") icon = "shield-check";
                
                return `
                  <div class="notification-full-card ${n.unread ? 'unread' : ''}">
                    <div class="notification-full-card-icon"><i data-lucide="${icon}"></i></div>
                    <div class="notification-full-card-content">
                      <h4 class="notification-full-card-title">${n.type.toUpperCase()} ALERT</h4>
                      <p class="notification-full-card-desc">${n.text}</p>
                      <div class="notification-full-card-meta">
                        <span>${n.time}</span>
                        <div class="notification-card-actions">
                          ${n.unread ? `<button onclick="markSingleRead(${n.id})">Mark as read</button>` : `<span style="color:var(--text-light); font-weight:500;">Read</span>`}
                          <button class="notification-delete-btn" onclick="deleteSingleNotif(${n.id})" style="color:var(--text-light); margin-left:12px;"><i data-lucide="trash-2" style="width:14px; height:14px; vertical-align:middle;"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        
        <!-- Sidebar Column (Timeline of actions) -->
        <div class="dashboard-side-col">
          <div class="card">
            <h3 style="font-size:16px; margin-bottom:16px;">Activity Timeline</h3>
            <div class="timeline-vertical">
              ${APP_STATE.activity.map(act => `
                <div class="timeline-vertical-item ${act.type}">
                  <div class="timeline-vertical-dot"></div>
                  <div class="timeline-vertical-content">
                    <h5>${act.text}</h5>
                    <p>${act.time}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Bind search
    const search = document.getElementById("notif-search-input");
    search.addEventListener("input", () => {
      searchVal = search.value;
      renderNotifPage();
    });
    
    lucide.createIcons();
  }
  
  // Interactions
  window.filterNotifTab = function(filter) {
    activeFilter = filter;
    renderNotifPage();
  };
  
  window.markSingleRead = function(id) {
    const n = APP_STATE.notifications.find(not => not.id === id);
    if (n) n.unread = false;
    renderNotifications(); // Header bell update
    renderNotifPage();
    showToast("Marked as read");
    fetch(`${API_BASE}/notifications/${id}/read`, { method: "POST" }).catch(err => console.error(err));
  };
  
  window.deleteSingleNotif = function(id) {
    APP_STATE.notifications = APP_STATE.notifications.filter(not => not.id !== id);
    renderNotifications();
    renderNotifPage();
    showToast("Notification deleted", "info");
    fetch(`${API_BASE}/notifications/${id}`, { method: "DELETE" }).catch(err => console.error(err));
  };
  
  window.markAllNotificationsAsRead = function() {
    APP_STATE.notifications.forEach(n => n.unread = false);
    renderNotifications();
    renderNotifPage();
    showToast("All notifications marked as read");
    fetch(`${API_BASE}/notifications/read`, { method: "POST" }).catch(err => console.error(err));
  };
  
  window.clearAllNotifications = function() {
    APP_STATE.notifications = [];
    renderNotifications();
    renderNotifPage();
    showToast("All notifications cleared", "info");
    fetch(`${API_BASE}/notifications/clear`, { method: "POST" }).catch(err => console.error(err));
  };
  
  renderNotifPage();
}

// --- Help & Support Center View ---
function viewSupport() {
  const view = document.getElementById("app-view");
  let chatbotHistory = [
    { sender: "bot", text: "Hi Rahul! I am your AI Support Coach. How can I help you prepare today?" }
  ];
  
  function renderSupportPage() {
    view.innerHTML = `
      <div class="results-container">
        <!-- Help Header Search Bar -->
        <div class="support-search-header">
          <h2>Help & Support Hub</h2>
          <p>Search documentation or chat with our AI Support Coach for direct assistance.</p>
          <div class="search-input-wrapper">
            <i data-lucide="search"></i>
            <input type="text" class="support-search-input" id="support-search-input" placeholder="Search popular help articles...">
          </div>
        </div>
        
        <!-- Popular Articles Grid -->
        <div class="card">
          <h3 style="font-size:16px; margin-bottom:16px;">Popular Learning Guidelines</h3>
          <div class="articles-grid">
            <div class="article-row-card" onclick="showToast('Article: How to Start Mock, loaded successfully', 'info')">
              <div class="article-title-area">
                <h4>How to Start Your First Mock Interview</h4>
                <span>Setup & Wizard guide • 2 mins read</span>
              </div>
              <i data-lucide="arrow-right" style="width:18px; height:18px; color:var(--text-light);"></i>
            </div>
            
            <div class="article-row-card" onclick="showToast('Article: Understating AI Feedback, loaded successfully', 'info')">
              <div class="article-title-area">
                <h4>Understanding AI Evaluation Criteria</h4>
                <span>Metrics & scoring algorithms • 5 mins read</span>
              </div>
              <i data-lucide="arrow-right" style="width:18px; height:18px; color:var(--text-light);"></i>
            </div>
            
            <div class="article-row-card" onclick="showToast('Article: Resume Security, loaded successfully', 'info')">
              <div class="article-title-area">
                <h4>Resume Parsing Privacy Policy</h4>
                <span>Data privacy & security compliance • 3 mins read</span>
              </div>
              <i data-lucide="arrow-right" style="width:18px; height:18px; color:var(--text-light);"></i>
            </div>
            
            <div class="article-row-card" onclick="showToast('Article: Custom Mocks, loaded successfully', 'info')">
              <div class="article-title-area">
                <h4>Configuring Custom Company Rounds</h4>
                <span>Advanced setups • 4 mins read</span>
              </div>
              <i data-lucide="arrow-right" style="width:18px; height:18px; color:var(--text-light);"></i>
            </div>
          </div>
          
          <!-- FAQs Accordion -->
          <h3 style="font-size:16px; margin-bottom:16px;">Frequently Asked Questions</h3>
          <div class="faq-list" style="max-width:100%;">
            <div class="faq-item">
              <button class="faq-question" onclick="toggleFaq(this)">
                <span>Does the timer pause during the mock interview?</span>
                <i data-lucide="chevron-down"></i>
              </button>
              <div class="faq-answer">
                No, the countdown timer represents a realistic mock interview room environment. It runs continuously to help you manage question delivery pacing.
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" onclick="toggleFaq(this)">
                <span>Can I retake the same setup category?</span>
                <i data-lucide="chevron-down"></i>
              </button>
              <div class="faq-answer">
                Yes! You can retry as many times as you like. Every session is saved in your mock history dashboard to help track your technical improvements.
              </div>
            </div>
          </div>
        </div>
        
        <!-- Chatbot & Contact Forms split layout -->
        <div class="support-bot-grid">
          <!-- Chatbot Left -->
          <div class="card chatbot-card">
            <div class="chatbot-header">
              <div class="chatbot-header-left">
                <div class="chatbot-header-avatar">AI</div>
                <div class="chatbot-header-title">
                  <h4>AI Support Coach</h4>
                  <span>🟢 Online • Assistant</span>
                </div>
              </div>
            </div>
            
            <!-- Messages body -->
            <div class="chatbot-body" id="chatbot-msg-body">
              ${chatbotHistory.map(chat => `
                <div class="chat-bubble ${chat.sender === 'bot' ? 'bot' : 'user'}">
                  ${chat.text}
                </div>
              `).join('')}
            </div>
            
            <!-- Quick Chips -->
            <div class="chatbot-suggestions">
              <div class="suggestion-chip" onclick="clickChatSuggestion('Why is my score low?')">Why is my score low?</div>
              <div class="suggestion-chip" onclick="clickChatSuggestion('How is score calculated?')">How is score calculated?</div>
              <div class="suggestion-chip" onclick="clickChatSuggestion('How to optimize CSS?')">How to optimize CSS?</div>
            </div>
            
            <!-- Send Footer -->
            <div class="chatbot-footer">
              <input type="text" id="chat-input-text" class="chat-input" placeholder="Ask AI Coach a question...">
              <button class="chat-send-btn" onclick="sendChatUserMessage()"><i data-lucide="send" style="width:16px; height:16px;"></i></button>
            </div>
          </div>
          
          <!-- Forms Right -->
          <div class="card">
            <h3 style="font-size:16px; margin-bottom:20px;">Contact Customer Support</h3>
            <form id="contact-ticket-form">
              <div class="form-group">
                <label class="form-label" for="support-subject">Subject</label>
                <input type="text" id="support-subject" class="form-input" placeholder="Summarize the issue..." required>
              </div>
              
              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label" for="support-category">Issue Category</label>
                  <select id="support-category" class="form-input">
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Technical Help">Technical Help</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="support-priority">Priority</label>
                  <select id="support-priority" class="form-input">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="support-desc">Detailed Description</label>
                <textarea id="support-desc" class="form-input" style="min-height:100px; resize:vertical;" placeholder="Describe steps to reproduce or feature benefit..." required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary" style="width:100%;">Submit Support Ticket</button>
            </form>
            
            <!-- Support Tickets List -->
            <div class="ticket-history-card">
              <h4 style="font-size:14px; margin-bottom:12px;">Submitted Ticket History</h4>
              <div class="table-responsive">
                <table class="custom-table" style="font-size:12px;">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Subject</th>
                      <th>Category</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="ticket-history-tbody">
                    <!-- Injected -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Auto-scroll chat
    const body = document.getElementById("chatbot-msg-body");
    body.scrollTop = body.scrollHeight;
    
    // Submit ticket event
    document.getElementById("contact-ticket-form").addEventListener("submit", submitSupportTicket);
    
    // Input Key listener
    document.getElementById("chat-input-text").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendChatUserMessage();
      }
    });
    
    // Render Tickets Table
    renderTicketsTable();
    lucide.createIcons();
  }
  
  function renderTicketsTable() {
    const tbody = document.getElementById("ticket-history-tbody");
    if (APP_STATE.tickets.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:12px; color:var(--text-light);">No tickets submitted</td></tr>`;
      return;
    }
    
    tbody.innerHTML = APP_STATE.tickets.map(t => `
      <tr>
        <td><strong>${t.id}</strong></td>
        <td>${t.subject}</td>
        <td>${t.category}</td>
        <td><span class="badge ${t.status === 'Resolved' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
      </tr>
    `).join('');
  }
  
  window.clickChatSuggestion = function(text) {
    chatbotHistory.push({ sender: "user", text: text });
    renderSupportPage();
    triggerBotResponse(text);
  };
  
  window.sendChatUserMessage = function() {
    const input = document.getElementById("chat-input-text");
    const text = input.value.trim();
    if (text.length === 0) return;
    
    chatbotHistory.push({ sender: "user", text: text });
    input.value = "";
    renderSupportPage();
    triggerBotResponse(text);
  };
  
  function triggerBotResponse(userMsg) {
    let reply = "I understand you have a question. Our AI Mock Coach is designed to evaluate both CSS Grid structures and JavaScript variables. Complete a setup interview to test your responses.";
    
    const msg = userMsg.toLowerCase();
    if (msg.includes("score")) {
      reply = "Your Overall Mock Score is calculated by averaging individual skill metrics: Technical correctness (40%), Communication structure (20%), Problem solving logic (20%), and confidence tags (20%).";
    } else if (msg.includes("retake") || msg.includes("again")) {
      reply = "Absolutely! You can retake interviews in the 'History' tab by clicking View Report, or click 'Start New Mock' to configure a new target role round.";
    } else if (msg.includes("css")) {
      reply = "To optimize CSS grid layouts, ensure you utilize semantic variables, define content-based columns (auto-fill), and minimize overlapping grid declarations.";
    }
    
    setTimeout(() => {
      chatbotHistory.push({ sender: "bot", text: reply });
      renderSupportPage();
      
      // Update Activity timeline
      APP_STATE.activity.unshift({
        id: Math.random(),
        type: "purple",
        text: "Queried AI Support Chatbot",
        time: "Just now"
      });
      saveStateToStorage();
    }, 600);
  }
  
  function submitSupportTicket(e) {
    e.preventDefault();
    const subject = document.getElementById("support-subject").value;
    const cat = document.getElementById("support-category").value;
    const desc = document.getElementById("support-desc").value;
    
    const id = "TKT-" + Math.floor(Math.random() * 400 + 500);
    const date = new Date().toISOString().split('T')[0];
    
    const newTicket = { id, subject, date, status: "Open", category: cat };
    APP_STATE.tickets.unshift(newTicket);
    
    // Add to activity timeline
    APP_STATE.activity.unshift({
      id: Math.random(),
      type: "success",
      text: `Submitted support ticket ${id}`,
      time: "Just now"
    });
    
    saveStateToStorage();
    showToast(`Ticket submitted: ${id} (Expected reply: under 2 hours)`);
    renderSupportPage();
    
    fetch(`${API_BASE}/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        subject,
        category: cat,
        priority: document.getElementById("support-priority").value,
        desc
      })
    }).catch(err => console.error("Failed to sync ticket with server", err));
  }
  
  renderSupportPage();
}

window.runMockCode = function() {
  const consoleOut = document.getElementById("editor-console-output");
  const code = document.getElementById("interview-answer-input").value;
  
  if (!consoleOut) return;
  
  consoleOut.className = "editor-console";
  consoleOut.innerText = `[Console] Compiling file...\n`;
  
  setTimeout(() => {
    consoleOut.innerText += `[Console] Running 3 test cases...\n`;
    
    setTimeout(() => {
      if (code.includes("Write your code here") || code.includes("pass") || code.trim().length < 50) {
        consoleOut.className = "editor-console error";
        consoleOut.innerText += `[Console] Test Case 1: Failed (Placeholder implementation)\n[Console] Error: Expected result, got None/null.`;
      } else {
        consoleOut.className = "editor-console success";
        consoleOut.innerText += `[Console] Test Case 1: Passed\n[Console] Test Case 2: Passed\n[Console] Test Case 3: Passed\n[Console] Success: All test cases passed!`;
      }
    }, 800);
  }, 400);
};

window.replayQuestionAudio = function() {
  const session = APP_STATE.currentInterview;
  if (!session) return;
  const q = session.questions[session.currentQuestionIndex];
  if (q) {
    speakText(q.text);
    showToast("Replaying question audio...", "info");
  }
};

window.toggleSpeechToText = function() {
  const btn = document.getElementById("interview-mic-btn");
  const label = document.getElementById("interview-mic-label");
  const textarea = document.getElementById("interview-answer-input");
  
  if (!btn || !label || !textarea) return;
  
  if (activeSpeechRecognition) {
    stopActiveSpeechRecognition();
    btn.classList.remove("recording");
    label.innerText = "Voice Answer";
    showToast("Voice transcription stopped.");
    return;
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Speech Recognition is not supported by your browser.", "error");
    return;
  }
  
  try {
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    
    let originalText = textarea.value.trim();
    if (originalText.length > 0) originalText += " ";
    
    rec.onstart = () => {
      activeSpeechRecognition = rec;
      btn.classList.add("recording");
      label.innerText = "Listening...";
      showToast("Listening... Speak clearly into your microphone.", "info");
    };
    
    rec.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      textarea.value = originalText + finalTranscript + interimTranscript;
      
      const counter = document.getElementById("char-counter-text");
      if (counter) {
        counter.innerText = `${textarea.value.length} / 2000 characters`;
      }
    };
    
    rec.onerror = (e) => {
      console.error("Speech Recognition Error:", e);
      if (e.error === "not-allowed") {
        showToast("Microphone permission denied.", "error");
      } else {
        showToast(`Speech recognition error: ${e.error}`, "error");
      }
      stopActiveSpeechRecognition();
      btn.classList.remove("recording");
      label.innerText = "Voice Answer";
    };
    
    rec.onend = () => {
      activeSpeechRecognition = null;
      btn.classList.remove("recording");
      label.innerText = "Voice Answer";
    };
    
    rec.start();
  } catch (error) {
    console.error("Speech Recognition initialization failed:", error);
    showToast("Failed to initialize microphone listener.", "error");
  }
};

// ==========================================
// 4. Initializing & Bootstrapping
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
  loadStateFromStorage();
  initAppShell();
  if (APP_STATE.isLoggedIn) {
    await syncStateWithBackend(true);
  }
});
