import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// LLM Config (Groq — OpenAI-compatible API)
// ==========================================
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

// Call Groq chat completion and return the assistant message content as parsed JSON.
// Throws on missing key, HTTP error, empty content, or unparseable JSON.
async function callGroqJSON(
  systemPrompt: string,
  userPrompt: string
): Promise<any> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not configured');
  }

  const resp = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => '');
    throw new Error(`Groq API error ${resp.status}: ${detail.slice(0, 300)}`);
  }

  const data: any = await resp.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Groq API returned empty content');
  }

  // Strip ```json ... ``` fences if present, then parse.
  const cleaned = content
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  return JSON.parse(cleaned);
}

app.use(cors());
app.use(express.json());

// ==========================================
// Database Seeder (Initial State Sync)
// ==========================================
async function seedDatabase() {
  try {
    // 1. Seed User
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      await prisma.user.create({
        data: {
          id: 'user-1',
          name: 'Rahul',
          email: 'rahul@example.com',
          avatar: 'R',
          targetRole: 'Frontend Developer',
          experienceLevel: 'Entry Level',
          skills: 'JavaScript, HTML/CSS, React, Git, SaaS UX',
          summary: 'Aspiring software engineer focusing on building highly responsive, accessible web applications.',
          resumeName: 'Rahul_SWE_Resume.pdf'
        }
      });
      console.log('Seeded default User profile details.');
    }

    // 2. Seed Interview Sessions & Answers
    const historyCount = await prisma.interviewSession.count();
    if (historyCount === 0) {
      // Seed first interview (int-101)
      const session1 = await prisma.interviewSession.create({
        data: {
          id: 'int-101',
          role: 'Frontend Developer',
          category: 'Technical',
          difficulty: 'Intermediate',
          date: '2026-06-24',
          duration: '10 mins',
          score: 82,
          skills: JSON.stringify({
            technical: 85,
            communication: 78,
            problemSolving: 80,
            confidence: 84,
            clarity: 83
          })
        }
      });

      await prisma.questionAnswer.createMany({
        data: [
          {
            sessionId: session1.id,
            question: 'Explain the Virtual DOM and why React uses it.',
            userAnswer: 'Virtual DOM is a copy of real DOM in JS memory. When state updates, React changes virtual DOM first, then diffs the new one with old one to update only the changed things in the browser. It makes rendering faster.',
            score: 85,
            strengths: JSON.stringify(['Clear understanding of Virtual DOM in memory', 'Accurate explanation of the diffing process']),
            improvements: JSON.stringify(['Could mention reconciliation terminology', 'Could explain the performance overhead of direct DOM writes in detail']),
            modelAnswer: 'The Virtual DOM is a lightweight, in-memory representation of the real DOM. React uses it to improve performance. When a component state changes, React first applies the changes to the Virtual DOM, compares it with the previous Virtual DOM snapshot, computes the minimum set of changes needed, and updates only those specific nodes in the real DOM.'
          },
          {
            sessionId: session1.id,
            question: 'What is the difference between Flexbox and CSS Grid?',
            userAnswer: 'Flexbox handles items in 1 dimension (either rows or columns). CSS Grid is for 2 dimensions (managing both rows and columns at the same time). I use flexbox for navigation links and Grid for layout.',
            score: 79,
            strengths: JSON.stringify(['Correct differentiation between 1D and 2D layouts', 'Good application-level examples (navbar vs main grid)']),
            improvements: JSON.stringify(['Explain content-first vs layout-first concept', 'Mention CSS properties unique to grid (e.g. grid-template-areas)']),
            modelAnswer: 'Flexbox is a 1D layout system designed for aligning content along a single axis. CSS Grid is a 2D layout system designed to manage rows and columns simultaneously. You should use Flexbox for small-scale layouts, navigation bars, or content alignment. Grid is best for full-page structures, card layouts, or complex overlapping designs.'
          }
        ]
      });

      // Seed second interview (int-102)
      const session2 = await prisma.interviewSession.create({
        data: {
          id: 'int-102',
          role: 'Software Engineer',
          category: 'HR Mock',
          difficulty: 'Easy',
          date: '2026-06-25',
          duration: '5 mins',
          score: 74,
          skills: JSON.stringify({
            technical: 60,
            communication: 80,
            problemSolving: 75,
            confidence: 72,
            clarity: 83
          })
        }
      });

      await prisma.questionAnswer.createMany({
        data: [
          {
            sessionId: session2.id,
            question: 'Tell me about a time you faced a conflict in a team.',
            userAnswer: 'We had a conflict about coding structure in our college hackathon. I sat down with my teammate, listened to his reasons, and we decided to use clean variables. It worked well.',
            score: 74,
            strengths: JSON.stringify(['Shows active listening skills', 'Clear conflict outcome described']),
            improvements: JSON.stringify(['Structure answer using STAR framework', 'Elaborate more on actions taken to reach compromise']),
            modelAnswer: 'When faced with team conflict, the best approach is direct, open, and empathetic communication. Use the STAR method: describe the Situation, Task, Action, and the positive Result. Discuss how you actively listened, compromised on technical implementation details, and aligned goals for project delivery.'
          }
        ]
      });

      console.log('Seeded default mock interview history logs.');
    }

    // 3. Seed Notifications
    const notifCount = await prisma.notification.count();
    if (notifCount === 0) {
      await prisma.notification.createMany({
        data: [
          { text: 'AI Analysis ready for your Frontend Mock Interview.', time: '2 hours ago', unread: true, type: 'insight' },
          { text: 'Placement season starts in 5 days. Keep practicing!', time: '1 day ago', unread: false, type: 'reminder' },
          { text: "New achievement unlocked: 'Zap' - 3 Days Practice Streak!", time: '1 day ago', unread: true, type: 'achievement' },
          { text: 'Scheduled system maintenance on June 29th, 02:00-04:00 AM.', time: '2 days ago', unread: false, type: 'system' },
          { text: 'Your account password was successfully updated.', time: '3 days ago', unread: false, type: 'security' }
        ]
      });
      console.log('Seeded default notifications database.');
    }

    // 4. Seed Support Tickets
    const ticketCount = await prisma.supportTicket.count();
    if (ticketCount === 0) {
      await prisma.supportTicket.createMany({
        data: [
          { id: 'TKT-481', subject: 'Resume parsing error with PDF', category: 'Bug Report', priority: 'Medium', desc: 'Attempted uploading SweetResume.pdf, got code 500 error parsing lists.', status: 'Resolved', date: '2026-06-25' },
          { id: 'TKT-502', subject: 'Requesting Python coding mock round', category: 'Feature Request', priority: 'Low', desc: 'Requesting standard DSA coding panel with code editor capability.', status: 'Resolved', date: '2026-06-26' }
        ]
      });
      console.log('Seeded default customer support ticket history logs.');
    }
  } catch (error) {
    console.error('Seeder exception caught:', error);
  }
}

// ==========================================
// API Endpoints
// ==========================================

// --- 1. User Profile Routes ---
app.get('/api/user', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: 'user-1' } });
    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    // Parse skills back into array
    const skillsArray = user.skills ? user.skills.split(',').map(s => s.trim()) : [];
    res.json({ ...user, skills: skillsArray });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/api/user', async (req: Request, res: Response) => {
  try {
    const { name, targetRole, experienceLevel, summary, skills, resumeName } = req.body;
    const skillsString = Array.isArray(skills) ? skills.join(', ') : skills || '';
    
    const updatedUser = await prisma.user.update({
      where: { id: 'user-1' },
      data: {
        name,
        targetRole,
        experienceLevel,
        summary,
        skills: skillsString,
        resumeName
      }
    });
    
    const skillsArray = updatedUser.skills ? updatedUser.skills.split(',').map(s => s.trim()) : [];
    res.json({ ...updatedUser, skills: skillsArray });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// --- 2. History & Analysis Routes ---
app.get('/api/history', async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.interviewSession.findMany({
      include: { answers: true },
      orderBy: { createdAt: 'desc' }
    });
    
    // Format JSON fields back to arrays/objects
    const formatted = sessions.map(s => ({
      ...s,
      skills: JSON.parse(s.skills),
      roundScores: s.roundScores ? JSON.parse(s.roundScores) : null,
      answers: s.answers.map(a => ({
        ...a,
        strengths: JSON.parse(a.strengths),
        improvements: JSON.parse(a.improvements),
        complexity: a.complexity ? JSON.parse(a.complexity) : null
      }))
    }));
    
    res.json(formatted);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch history logs' });
  }
});

app.post('/api/history', async (req: Request, res: Response) => {
  try {
    const { id, role, category, difficulty, duration, score, skills, answers, mode, level, roundScores } = req.body;

    const session = await prisma.interviewSession.create({
      data: {
        id,
        role,
        category,
        difficulty,
        date: new Date().toISOString().split('T')[0],
        duration,
        score,
        skills: JSON.stringify(skills),
        mode: mode || 'full',
        level: level || 'easy',
        roundScores: roundScores ? JSON.stringify(roundScores) : null
      }
    });

    if (answers && Array.isArray(answers)) {
      const qas = answers.map(ans => ({
        sessionId: session.id,
        question: ans.question,
        userAnswer: ans.userAnswer,
        score: ans.score,
        strengths: JSON.stringify(ans.strengths),
        improvements: JSON.stringify(ans.improvements),
        modelAnswer: ans.modelAnswer,
        complexity: ans.complexity ? JSON.stringify(ans.complexity) : null,
        roundType: ans.roundType || null
      }));
      
      await prisma.questionAnswer.createMany({ data: qas });
    }

    res.status(201).json({ message: 'Interview session logged successfully', id });
  } catch (e) {
    res.status(500).json({ error: 'Failed to log interview session' });
  }
});

// --- 3. Notifications Routes ---
app.get('/api/notifications', async (req: Request, res: Response) => {
  try {
    const notifs = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifs);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.post('/api/notifications/read', async (req: Request, res: Response) => {
  try {
    await prisma.notification.updateMany({
      data: { unread: false }
    });
    res.json({ message: 'All notifications marked as read' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to mark read' });
  }
});

app.post('/api/notifications/:id/read', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.notification.update({
      where: { id },
      data: { unread: false }
    });
    res.json({ message: `Notification ${id} marked as read` });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update notification status' });
  }
});

app.delete('/api/notifications/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.notification.delete({
      where: { id }
    });
    res.json({ message: `Notification ${id} deleted` });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

app.post('/api/notifications/clear', async (req: Request, res: Response) => {
  try {
    await prisma.notification.deleteMany();
    res.json({ message: 'All notifications cleared' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to clear notifications' });
  }
});

// --- 4. Support Tickets Routes ---
app.get('/api/tickets', async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tickets);
  } catch (e) {
    res.status(500).json({ error: 'Failed to retrieve support tickets' });
  }
});

app.post('/api/tickets', async (req: Request, res: Response) => {
  try {
    const { id, subject, category, priority, desc } = req.body;
    const newTicket = await prisma.supportTicket.create({
      data: {
        id,
        subject,
        category,
        priority,
        desc,
        status: 'Open',
        date: new Date().toISOString().split('T')[0]
      }
    });
    res.status(201).json(newTicket);
  } catch (e) {
    res.status(500).json({ error: 'Failed to submit support ticket' });
  }
});

// --- 5. Question Generator API ---
// Static library of technical & HR questions to query based on role and category
const INTERVIEW_LIBRARY: Record<string, Array<{ text: string, category: string, hint: string, modelAnswer: string }>> = {
  frontend: [
    {
      category: 'React',
      text: 'Explain the Virtual DOM and why React uses it.',
      hint: 'Think about the cost of direct DOM manipulation compared to JavaScript computations and how diffing works.',
      modelAnswer: 'The Virtual DOM is a lightweight, in-memory representation of the real DOM. React uses it to improve performance. When a component state changes, React first applies the changes to the Virtual DOM, compares it with the previous Virtual DOM snapshot (a process called \'diffing\'), computes the minimum set of changes needed, and updates only those specific nodes in the real DOM (called reconciliation).'
    },
    {
      category: 'CSS',
      text: 'What is the difference between Flexbox and CSS Grid? When would you use one over the other?',
      hint: 'Compare one-dimensional vs two-dimensional layouts, and how content-out vs layout-in approaches apply.',
      modelAnswer: 'Flexbox is a 1D layout system designed for aligning content along a single axis (either row or column). CSS Grid is a 2D layout system designed to manage rows and columns simultaneously. You should use Flexbox for small-scale layouts, navigation bars, or content alignment. Grid is best for full-page structures, card layouts, or complex overlapping designs.'
    },
    {
      category: 'JavaScript',
      text: 'Explain closures in JavaScript and provide a practical use case.',
      hint: 'A closure is created when a function is defined inside another function and remembers its lexical scope even when executed outside.',
      modelAnswer: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created. A common use case is data privacy (creating private variables that can only be read or modified by specific accessor methods) or function currying and factory functions.'
    }
  ],
  backend: [
    {
      category: 'Node.js',
      text: 'Explain the Event Loop in Node.js and how it handles asynchronous operations.',
      hint: 'Discuss call stack, callback queue, macro-tasks, micro-tasks, and the non-blocking I/O execution model.',
      modelAnswer: 'The Event Loop is the core mechanism that allows Node.js to perform non-blocking, single-threaded I/O operations. It constantly monitors the Call Stack and Callback Queue. When the Call Stack is empty, it pushes asynchronous callbacks (like database queries, timer executions, or network responses) from the callback queue onto the stack for execution. It processes micro-tasks (like Promises) first, followed by macro-tasks.'
    },
    {
      category: 'Databases',
      text: 'What are database transactions, and what does ACID stand for?',
      hint: 'ACID properties ensure database reliability. Relate them to atomicity, consistency, isolation, and durability.',
      modelAnswer: 'A database transaction is a sequence of one or more database operations treated as a single unit of work. ACID stands for: Atomicity (all operations succeed, or none do), Consistency (transaction moves the DB from one valid state to another), Isolation (concurrent transactions execute independently), and Durability (committed changes are permanently saved, even in a crash).'
    }
  ],
  hr: [
    {
      category: 'Behavioral',
      text: 'Tell me about a time you faced a difficult conflict within a team project and how you resolved it.',
      hint: 'Use the STAR method: describe the Situation, Task, Action, and the positive Result.',
      modelAnswer: 'When faced with team conflict, the best approach is direct, open, and empathetic communication. In a past project, two teammates disagreed on design patterns, stalling progress. I organized a constructive discussion where both presented their pros/cons, and we agreed on a hybrid compromise. This helped us align, complete the module, and finish the project on time.'
    },
    {
      category: 'Introduction',
      text: 'Why do you want to join our organization, and what makes you a good fit for this role?',
      hint: 'Connect your personal values and skills to the company\'s mission and the specific job description requirements.',
      modelAnswer: 'I want to join your organization because of your emphasis on innovation and user-centric engineering. Based on my technical background in frontend performance optimization and my collaborative communication style, I believe I can quickly contribute to your core developer platform team while learning from your industry experts.'
    }
  ],
  coding: [
    {
      category: 'Algorithms',
      text: 'Two Sum: Given an array of integers \"nums\" and an integer \"target\", return indices of the two numbers such that they add up to \"target\". You may assume that each input would have exactly one solution, and you may not use the same element twice. Provide a function \"twoSum(nums, target)\".',
      hint: 'Try using a Hash Map to store the complement of each number as you iterate. This reduces search time from O(N^2) to O(N).',
      modelAnswer: 'Python solution:\ndef twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []'
    },
    {
      category: 'Algorithms',
      text: 'Reverse a String: Write a function that reverses a string. The input string is given as an array of characters. You must do this by modifying the input array in-place with O(1) extra memory. Provide a function \"reverseString(s)\".',
      hint: 'Use a two-pointer approach. Place one pointer at the start and one pointer at the end of the array, and swap their values while incrementing the start and decrementing the end.',
      modelAnswer: 'JavaScript solution:\nfunction reverseString(s) {\n  let left = 0;\n  let right = s.length - 1;\n  while (left < right) {\n    let temp = s[left];\n    s[left] = s[right];\n    s[right] = temp;\n    left++;\n    right--;\n  }\n}'
    },
    {
      category: 'Algorithms',
      text: 'Valid Parentheses: Given a string \"s\" containing just the characters \"(\", \")\", \"{\", \"}\", \"[\" and \"]\", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, and closed in the correct order. Provide a function \"isValid(s)\".',
      hint: 'Use a Stack data structure. When you see an opening bracket, push its corresponding closing bracket onto the stack. When you see a closing bracket, pop from the stack and verify it matches.',
      modelAnswer: 'Java solution:\npublic boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == \'(\') stack.push(\')\');\n        else if (c == \'{\') stack.push(\'}\');\n        else if (c == \'[\') stack.push(\']\');\n        else if (stack.isEmpty() || stack.pop() != c) return false;\n    }\n    return stack.isEmpty();\n}'
    }
  ]
};

app.get('/api/questions', (req: Request, res: Response) => {
  const { role, category } = req.query;
  
  let key = 'frontend';
  if (category === 'HR Mock') {
    key = 'hr';
  } else if (category === 'Coding Interview') {
    key = 'coding';
  } else if (role && String(role).toLowerCase().includes('backend')) {
    key = 'backend';
  }
  
  const pool = INTERVIEW_LIBRARY[key] || INTERVIEW_LIBRARY.frontend;
  
  // Return list with randomized IDs for frontend processing
  const mapped = pool.map((q, idx) => ({
    id: idx + 1,
    category: q.category,
    difficulty: key === 'hr' ? 'Easy' : 'Intermediate',
    text: q.text,
    hint: q.hint,
    modelAnswer: q.modelAnswer
  }));
  
  res.json(mapped);
});

// --- 6. AI Answer Evaluation API (Groq LLM) ---
app.post('/api/evaluate', async (req: Request, res: Response) => {
  const { question, userAnswer, modelAnswer, category, language } = req.body;

  // Skipped questions score zero without spending an API call.
  if (userAnswer === '[Question Skipped]') {
    res.json({
      score: 0,
      strengths: [],
      improvements: ['Question was skipped. Attempt every question — partial answers still earn credit.'],
      modelAnswer,
      complexity: null,
      feedback: 'No answer submitted.'
    });
    return;
  }

  const isCode = category === 'Coding Interview';

  const systemPrompt = `You are a strict senior technical interviewer evaluating a candidate's answer.
Score honestly and consistently — a vague or wrong answer scores low, a precise and complete answer scores high.
${isCode
    ? 'This is a coding answer. Judge correctness, edge-case handling, and efficiency, and report Big-O in "complexity".'
    : 'This is a spoken/written technical or behavioral answer. Judge accuracy, depth, and clarity. Set "complexity" to null.'}
Return ONLY valid JSON, no prose, in exactly this shape:
{"score": <integer 0-100>, "strengths": [<string>...], "improvements": [<string>...], "complexity": ${isCode ? '"<Big-O time/space summary>"' : 'null'}, "feedback": "<2-3 sentence overall assessment>"}`;

  const userPrompt = `Question:
${question}
${isCode && language ? `\nLanguage: ${language}` : ''}

Candidate's answer:
${userAnswer}`;

  try {
    const result = await callGroqJSON(systemPrompt, userPrompt);
    res.json({
      score: result.score,
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      improvements: Array.isArray(result.improvements) ? result.improvements : [],
      modelAnswer,
      complexity: result.complexity ?? null,
      feedback: result.feedback ?? ''
    });
  } catch (e) {
    console.error('Evaluation failed:', e);
    res.status(502).json({
      error: 'AI evaluation failed',
      detail: e instanceof Error ? e.message : 'Unknown error'
    });
  }
});

app.post('/api/followup', async (req: Request, res: Response) => {
  const { questionText, userAnswer, category, role } = req.body;

  if (userAnswer === '[Question Skipped]') {
    res.json({ followup: null });
    return;
  }

  const systemPrompt = `You are a senior technical interviewer conducting a live interview${role ? ` for a ${role} role` : ''}.
Given the previous question and the candidate's answer, ask ONE relevant, probing follow-up question that digs deeper into what they said.
Return ONLY valid JSON, no prose, in exactly this shape:
{"followup": "<the single follow-up question>", "hint": "<one short hint on what a strong answer covers>"}`;

  const userPrompt = `Category: ${category || 'Technical'}

Previous question:
${questionText}

Candidate's answer:
${userAnswer}`;

  try {
    const result = await callGroqJSON(systemPrompt, userPrompt);
    if (!result.followup) {
      res.json({ followup: null });
      return;
    }
    res.json({
      followup: {
        id: 'followup-' + Date.now(),
        text: result.followup,
        category: 'Adaptive Follow-up',
        hint: result.hint || ''
      }
    });
  } catch (e) {
    console.error('Follow-up generation failed:', e);
    res.status(502).json({
      error: 'AI follow-up failed',
      detail: e instanceof Error ? e.message : 'Unknown error'
    });
  }
});

// --- 8. Level-aware AI Recommendations (Groq LLM) ---
// Replaces any static "score x level" lookup table with a real model call.
app.post('/api/recommend', async (req: Request, res: Response) => {
  const { role, level, overallScore, roundScores, weakAreas } = req.body;

  const systemPrompt = `You are a career interview coach reviewing a candidate's mock-interview results for a ${role || 'tech'} role at "${level || 'easy'}" difficulty.
The pass thresholds are: easy 50%, medium 60%, advanced 70%.
Give honest, specific, encouraging guidance. Reference the actual round scores.
Return ONLY valid JSON, no prose, in exactly this shape:
{"strengths": [<string>...], "focusAreas": [<string>...], "levelAdvice": "<one sentence: should they move up a level, repeat, or drop down>", "nextSteps": "<one concrete sentence naming topics to study next>"}`;

  const userPrompt = `Overall score: ${overallScore}%
Per-round scores: ${JSON.stringify(roundScores || {})}
Weakest areas / topics: ${JSON.stringify(weakAreas || [])}`;

  try {
    const result = await callGroqJSON(systemPrompt, userPrompt);
    res.json({
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      focusAreas: Array.isArray(result.focusAreas) ? result.focusAreas : [],
      levelAdvice: result.levelAdvice || '',
      nextSteps: result.nextSteps || ''
    });
  } catch (e) {
    console.error('Recommendation generation failed:', e);
    res.status(502).json({
      error: 'AI recommendation failed',
      detail: e instanceof Error ? e.message : 'Unknown error'
    });
  }
});

// ==========================================
// Bootstrap Server
// ==========================================
app.listen(PORT, async () => {
  console.log(`MockMate Backend server running on http://localhost:${PORT}`);
  await seedDatabase();
});
