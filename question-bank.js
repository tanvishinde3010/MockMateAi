/* ============================================================
   MockMate AI — Question Bank
   Structure: QUESTION_BANK[roleId][level][round]
     round ∈ { mcq, interview, coding }
     level ∈ { easy, medium, advanced }
   MCQ:       { text, options:[4], correct:index, explanation }
   Interview: { text, hint, modelAnswer }
   Coding:    { text, hint, modelAnswer }   (case study reuses this shape)

   Only flagship roles are authored so far (authored:true in ROLES).
   Un-authored roles fall back to a related authored role via getRoundQuestions().
   ============================================================ */

// --- 14 roles (setup grid metadata) ---
const ROLES = [
  { id: "frontend",  name: "Frontend Developer",     icon: "code-2",      domain: "Web",         hasCoding: true,  authored: true,  fallback: "frontend" },
  { id: "backend",   name: "Backend Developer",      icon: "database",    domain: "Web",         hasCoding: true,  authored: true,  fallback: "backend"  },
  { id: "fullstack", name: "Full Stack Developer",   icon: "layers",      domain: "Web",         hasCoding: true,  authored: false, fallback: "frontend" },
  { id: "data-analyst", name: "Data Analyst",        icon: "bar-chart-3", domain: "Data",        hasCoding: true,  authored: false, fallback: "backend"  },
  { id: "data-scientist", name: "Data Scientist",    icon: "brain",       domain: "Data/ML",     hasCoding: true,  authored: false, fallback: "genai"    },
  { id: "genai",     name: "GenAI / LLM Engineer",   icon: "sparkles",    domain: "AI",          hasCoding: true,  authored: true,  fallback: "genai"    },
  { id: "agentic",   name: "Agentic AI Engineer",    icon: "bot",         domain: "AI",          hasCoding: true,  authored: false, fallback: "genai"    },
  { id: "devops",    name: "DevOps / SRE",           icon: "server",      domain: "Infra",       hasCoding: true,  authored: false, fallback: "backend"  },
  { id: "cyber",     name: "Cybersecurity Analyst",  icon: "shield",      domain: "Infra",       hasCoding: true,  authored: false, fallback: "backend"  },
  { id: "mobile",    name: "Mobile Developer",       icon: "smartphone",  domain: "App",         hasCoding: true,  authored: false, fallback: "frontend" },
  { id: "uiux",      name: "UI/UX Designer",         icon: "palette",     domain: "Design",      hasCoding: false, authored: false, fallback: "hr"       },
  { id: "cloud",     name: "Cloud / AWS Engineer",   icon: "cloud",       domain: "Infra",       hasCoding: true,  authored: false, fallback: "backend"  },
  { id: "pm",        name: "Product Manager",        icon: "briefcase",   domain: "Product",     hasCoding: false, authored: false, fallback: "hr"       },
  { id: "hr",        name: "HR & Behavioral",        icon: "users",       domain: "Soft Skills", hasCoding: false, authored: true,  fallback: "hr"       }
];

// --- Level scaling rules (plan Part A table) ---
const LEVEL_RULES = {
  easy:     { label: "Easy",     tag: "Fresher / Entry Level", color: "green",
              mcqCount: 5,  mcqTimer: 60, interviewCount: 2, interviewTimer: 8 * 60,  codingCount: 1, codingTimer: 8 * 60,  pass: 50 },
  medium:   { label: "Medium",   tag: "Mid-Level / 1-3 Years", color: "amber",
              mcqCount: 7,  mcqTimer: 45, interviewCount: 3, interviewTimer: 12 * 60, codingCount: 1, codingTimer: 12 * 60, pass: 60 },
  advanced: { label: "Advanced", tag: "Senior / 3+ Years",     color: "red",
              mcqCount: 10, mcqTimer: 30, interviewCount: 4, interviewTimer: 15 * 60, codingCount: 2, codingTimer: 20 * 60, pass: 70 }
};

// Short topic preview strings for the level-selection cards (per role).
const LEVEL_TOPICS = {
  frontend: { easy: "HTML tags, CSS selectors, JS basics, DOM", medium: "React hooks, closures, Flexbox/Grid, state", advanced: "SSR/CSR, Webpack, performance APIs, micro-frontends" },
  backend:  { easy: "HTTP methods, REST, JSON, status codes",   medium: "Middleware, JWT/OAuth, SQL joins, indexing",   advanced: "Microservices, queues, CQRS, rate limiting" },
  genai:    { easy: "Transformers, tokenization, prompt types", medium: "Attention, RAG, embeddings, vector DBs",       advanced: "LoRA/QLoRA, RLHF, agents, eval at scale" },
  hr:       { easy: "Etiquette, teamwork, self-intro",          medium: "Conflict resolution, STAR, leadership",       advanced: "Org culture, exec communication, negotiation" }
};

const QUESTION_BANK = {
  // ===================== FRONTEND =====================
  frontend: {
    easy: {
      mcq: [
        { text: "What does HTML stand for?", options: ["Hyperlinks Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language", "HyperText Machine Language"], correct: 1, explanation: "HTML = HyperText Markup Language — the standard markup language for web pages." },
        { text: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], correct: 2, explanation: "`color` sets the foreground (text) color of an element." },
        { text: "Which HTML tag creates the largest heading?", options: ["<h6>", "<head>", "<heading>", "<h1>"], correct: 3, explanation: "`<h1>` is the top-level and visually largest heading by default." },
        { text: "Which method selects an element by its id in JavaScript?", options: ["document.querySelectorAll()", "document.getElementById()", "document.getElement()", "document.selectId()"], correct: 1, explanation: "`getElementById` returns the single element with the matching id." },
        { text: "What is the DOM?", options: ["A database of markup", "A CSS preprocessor", "A tree representation of the page the browser builds", "A JavaScript engine"], correct: 2, explanation: "The DOM is a tree structure the browser builds from HTML that scripts can read and modify." }
      ],
      interview: [
        { text: "What is the DOM and how does JavaScript interact with it?", hint: "Tree of nodes; getElementById / querySelector; event listeners.", modelAnswer: "The DOM (Document Object Model) is a tree representation of the HTML document. Each element, attribute, and text node is an object. JavaScript reads and mutates it via APIs like getElementById, querySelector, createElement, and addEventListener, and the browser re-renders when it changes." },
        { text: "Explain the CSS box model.", hint: "content, padding, border, margin; box-sizing.", modelAnswer: "Every element is a box made of content, padding, border, and margin from inside out. Width/height apply to the content box by default; `box-sizing: border-box` makes width/height include padding and border, which is easier to reason about." }
      ],
      coding: [
        { text: "Write JavaScript to toggle the CSS class 'active' on a button each time it is clicked.", hint: "addEventListener('click') + classList.toggle.", modelAnswer: "const btn = document.querySelector('button');\nbtn.addEventListener('click', () => {\n  btn.classList.toggle('active');\n});" }
      ]
    },
    medium: {
      mcq: [
        { text: "In React, what triggers a component re-render?", options: ["Editing the DOM directly", "A change to state or props", "Importing a module", "Adding a CSS class"], correct: 1, explanation: "React re-renders a component when its state or props change." },
        { text: "What does the `useEffect` dependency array control?", options: ["The render order", "When the effect re-runs", "The component name", "CSS specificity"], correct: 1, explanation: "The effect re-runs only when a value in its dependency array changes; `[]` runs once on mount." },
        { text: "Which is TRUE about props?", options: ["Props are mutable inside the child", "Props flow parent → child and are read-only", "Props replace state", "Props are global"], correct: 1, explanation: "Props are passed down and treated as read-only by the receiving component." },
        { text: "What is a closure?", options: ["A closed HTML tag", "A function that remembers its lexical scope", "A CSS reset", "A finished promise"], correct: 1, explanation: "A closure is a function bundled with references to its surrounding lexical state." },
        { text: "Which Flexbox property distributes space along the main axis?", options: ["align-items", "justify-content", "flex-wrap", "order"], correct: 1, explanation: "`justify-content` aligns/space items along the main axis; `align-items` is the cross axis." },
        { text: "Why do lists in React need a stable `key`?", options: ["For CSS styling", "To help the reconciler match elements between renders", "To sort the list", "It is required by HTML"], correct: 1, explanation: "Keys let React's diffing algorithm identify which items changed, were added, or removed." },
        { text: "What does the Virtual DOM primarily reduce?", options: ["Bundle size", "Direct, expensive real-DOM writes", "Network requests", "Memory usage"], correct: 1, explanation: "React diffs the Virtual DOM and applies the minimal set of real-DOM mutations." }
      ],
      interview: [
        { text: "Explain the Virtual DOM and why React uses it.", hint: "In-memory tree, diffing, reconciliation, minimal real-DOM writes.", modelAnswer: "The Virtual DOM is a lightweight in-memory copy of the real DOM. On a state change React builds a new virtual tree, diffs it against the previous one, computes the minimal set of changes, and applies only those to the real DOM (reconciliation). This avoids costly repeated direct DOM manipulation." },
        { text: "Walk through the useEffect lifecycle including cleanup.", hint: "runs after paint; deps; cleanup function on unmount/re-run.", modelAnswer: "useEffect runs after the render is committed to the screen. It re-runs when a dependency changes. If it returns a function, React runs that cleanup before the next effect run and on unmount — used to clear timers, subscriptions, or listeners to avoid leaks." },
        { text: "What are the trade-offs of CSS-in-JS versus plain stylesheets?", hint: "scoping, dynamic styles vs runtime cost, SSR complexity.", modelAnswer: "CSS-in-JS gives component-scoped, dynamic styles co-located with logic, avoiding global-namespace collisions. Trade-offs are a runtime/bundle cost, extra SSR setup, and potential critical-CSS extraction complexity versus the simplicity and caching of static stylesheets." }
      ],
      coding: [
        { text: "Implement a `debounce(fn, delay)` function that delays calling `fn` until `delay` ms have passed since the last invocation.", hint: "Store a timer id; clearTimeout on each call; preserve args.", modelAnswer: "function debounce(fn, delay) {\n  let t;\n  return function (...args) {\n    clearTimeout(t);\n    t = setTimeout(() => fn.apply(this, args), delay);\n  };\n}" }
      ]
    },
    advanced: {
      mcq: [
        { text: "What is the main benefit of server-side rendering (SSR)?", options: ["Smaller JS bundles always", "Faster first meaningful paint and better SEO", "No need for hydration", "It removes the need for a server"], correct: 1, explanation: "SSR sends rendered HTML so content is visible sooner and is crawlable, at the cost of hydration." },
        { text: "What is hydration?", options: ["Fetching data on the server", "Attaching client JS/event handlers to server-rendered HTML", "Caching CSS", "Compressing images"], correct: 1, explanation: "Hydration makes static server HTML interactive by wiring up React on the client." },
        { text: "Code splitting primarily improves…", options: ["Type safety", "Initial load by deferring non-critical JS", "SEO ranking directly", "CSS specificity"], correct: 1, explanation: "Splitting bundles lets the browser load only what a route needs, shrinking the initial payload." },
        { text: "Web Workers are used to…", options: ["Render the DOM faster", "Run scripts off the main thread", "Replace service workers", "Style components"], correct: 1, explanation: "Web Workers run CPU-heavy work on a separate thread, keeping the UI responsive." },
        { text: "Which Performance API measures layout shift?", options: ["PerformanceObserver with 'layout-shift'", "Date.now()", "requestIdleCallback", "IntersectionObserver"], correct: 0, explanation: "CLS is observed via PerformanceObserver on the 'layout-shift' entry type." },
        { text: "A micro-frontend architecture mainly enables…", options: ["Smaller CSS", "Independent team deployment of app slices", "Faster hydration by default", "Removing the build step"], correct: 1, explanation: "Micro-frontends let teams build/deploy parts of a UI independently." }
      ],
      interview: [
        { text: "Compare code-splitting strategies (route-based, component-based, vendor). When do you reach for each?", hint: "dynamic import, React.lazy, chunking heuristics, prefetch.", modelAnswer: "Route-based splitting (React.lazy + Suspense on route boundaries) gives the biggest wins with the least effort. Component-based splitting defers heavy widgets (charts, editors) until needed. Vendor splitting isolates rarely-changing libraries for cache stability. Combine with prefetch on intent (hover/idle) to hide latency." },
        { text: "How would you implement and reason about hydration mismatches in SSR?", hint: "server/client render must match; guards for browser-only APIs.", modelAnswer: "A mismatch happens when server HTML differs from the first client render (e.g. using window, Date.now, or random values during render). Fixes: render deterministically, defer browser-only logic to useEffect, use suppressHydrationWarning sparingly, and gate non-deterministic values behind a mounted flag." }
      ],
      coding: [
        { text: "Write a custom React hook `useFetch(url)` that caches responses by URL in a module-level Map and returns { data, loading, error }.", hint: "Module Map for cache; useEffect; abort on unmount.", modelAnswer: "const cache = new Map();\nfunction useFetch(url) {\n  const [state, setState] = React.useState({ data: cache.get(url) ?? null, loading: !cache.has(url), error: null });\n  React.useEffect(() => {\n    if (cache.has(url)) { setState({ data: cache.get(url), loading: false, error: null }); return; }\n    let alive = true;\n    fetch(url).then(r => r.json()).then(d => { cache.set(url, d); if (alive) setState({ data: d, loading: false, error: null }); })\n      .catch(e => alive && setState({ data: null, loading: false, error: e }));\n    return () => { alive = false; };\n  }, [url]);\n  return state;\n}" },
        { text: "Implement a windowed (virtual) list: given itemHeight, container height, and scrollTop, return the [startIndex, endIndex] of rows to render.", hint: "start = floor(scrollTop/itemHeight); count = ceil(containerH/itemHeight)+overscan.", modelAnswer: "function visibleRange(scrollTop, itemHeight, containerHeight, total, overscan = 3) {\n  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);\n  const visible = Math.ceil(containerHeight / itemHeight) + overscan * 2;\n  const end = Math.min(total - 1, start + visible);\n  return [start, end];\n}" }
      ]
    }
  },

  // ===================== BACKEND =====================
  backend: {
    easy: {
      mcq: [
        { text: "Which HTTP method is idempotent and used to fetch data?", options: ["POST", "GET", "PATCH", "CONNECT"], correct: 1, explanation: "GET retrieves data and is safe/idempotent — repeating it has no side effects." },
        { text: "What does HTTP status 404 mean?", options: ["Server error", "Unauthorized", "Not Found", "Created"], correct: 2, explanation: "404 = the requested resource was not found." },
        { text: "REST APIs commonly exchange data in which format?", options: ["XML only", "JSON", "CSV", "YAML"], correct: 1, explanation: "JSON is the de-facto payload format for REST APIs." },
        { text: "Which status code indicates a successfully created resource?", options: ["200", "201", "204", "302"], correct: 1, explanation: "201 Created signals a new resource was created, usually with a Location header." },
        { text: "What is the difference between GET and POST?", options: ["GET writes, POST reads", "GET carries data in the body", "GET reads (params in URL), POST sends data in the body", "They are identical"], correct: 2, explanation: "GET is for retrieval with query params; POST submits data in the request body." }
      ],
      interview: [
        { text: "What is a REST API and what makes an endpoint RESTful?", hint: "resources, HTTP verbs, statelessness, representations.", modelAnswer: "A REST API models the server as resources addressed by URLs and manipulated with standard HTTP verbs (GET/POST/PUT/PATCH/DELETE). It is stateless — each request carries all needed context — returns appropriate status codes, and represents resources (usually JSON) rather than exposing RPC-style actions." },
        { text: "Explain GET vs POST and when to use each.", hint: "safe/idempotent vs side effects; caching; body.", modelAnswer: "GET retrieves data, is safe and idempotent, cacheable, and puts parameters in the URL. POST creates or triggers side effects, is not idempotent, and carries a request body. Use GET for reads and POST for mutations that create resources or run non-repeatable actions." }
      ],
      coding: [
        { text: "Write an Express route `GET /health` that responds with JSON `{ status: 'ok' }` and HTTP 200.", hint: "app.get + res.json.", modelAnswer: "app.get('/health', (req, res) => {\n  res.status(200).json({ status: 'ok' });\n});" }
      ]
    },
    medium: {
      mcq: [
        { text: "In Express, middleware functions receive which signature?", options: ["(req, res)", "(req, res, next)", "(next)", "(err)"], correct: 1, explanation: "Middleware is (req, res, next); calling next() passes control onward." },
        { text: "A JWT is composed of which three parts?", options: ["Header, Body, Footer", "Header, Payload, Signature", "Key, Value, Hash", "User, Role, Token"], correct: 1, explanation: "A JWT is header.payload.signature, base64url-encoded and dot-separated." },
        { text: "Which SQL join returns only rows matching in both tables?", options: ["LEFT JOIN", "FULL OUTER JOIN", "INNER JOIN", "CROSS JOIN"], correct: 2, explanation: "INNER JOIN returns only rows with a match in both tables." },
        { text: "A database index primarily speeds up…", options: ["INSERT operations", "Reads/lookups on the indexed column", "Backups", "Schema migrations"], correct: 1, explanation: "Indexes accelerate reads/filters at the cost of extra write and storage overhead." },
        { text: "What does connection pooling avoid?", options: ["Writing SQL", "Opening a new DB connection per request", "Using indexes", "Caching"], correct: 1, explanation: "Pooling reuses established connections instead of paying setup cost per request." },
        { text: "OAuth 2.0 is primarily a framework for…", options: ["Encryption at rest", "Delegated authorization", "Load balancing", "Schema design"], correct: 1, explanation: "OAuth 2.0 grants third parties scoped access without sharing credentials." },
        { text: "Which is a benefit of parameterized queries?", options: ["Faster joins", "Prevents SQL injection", "Smaller tables", "Automatic indexing"], correct: 1, explanation: "Bound parameters separate code from data, preventing SQL injection." }
      ],
      interview: [
        { text: "Explain the Node.js event loop and how it handles async I/O.", hint: "single thread, call stack, callback/micro-task queues, non-blocking I/O.", modelAnswer: "Node runs JS on a single thread with an event loop. Async I/O (network, disk) is offloaded; when it completes, callbacks are queued. When the call stack empties, the loop drains microtasks (Promises) first, then macrotasks (timers, I/O callbacks), enabling non-blocking concurrency without threads per request." },
        { text: "What are the ACID properties of a transaction?", hint: "Atomicity, Consistency, Isolation, Durability.", modelAnswer: "Atomicity: all operations commit or none do. Consistency: the DB moves between valid states honoring constraints. Isolation: concurrent transactions don't interfere (governed by isolation levels). Durability: once committed, changes survive crashes." },
        { text: "How do you optimize a slow SQL query?", hint: "EXPLAIN, indexes, avoid SELECT *, reduce N+1, pagination.", modelAnswer: "Start with EXPLAIN/ANALYZE to find full scans. Add indexes on filter/join columns, select only needed columns, eliminate N+1 with joins or batching, add LIMIT/pagination, and consider denormalization or caching for hot read paths." }
      ],
      coding: [
        { text: "Write a parameterized SQL query (any dialect) to fetch users older than a given age, and show how you'd call it safely from Node.", hint: "Use placeholders, never string concatenation.", modelAnswer: "-- SQL\nSELECT id, name FROM users WHERE age > $1 ORDER BY name;\n\n// Node (pg)\nconst { rows } = await pool.query('SELECT id, name FROM users WHERE age > $1 ORDER BY name', [minAge]);" }
      ]
    },
    advanced: {
      mcq: [
        { text: "The CAP theorem says a distributed system can guarantee at most two of…", options: ["Cost, Availability, Performance", "Consistency, Availability, Partition tolerance", "Caching, Atomicity, Persistence", "Concurrency, Access, Partitioning"], correct: 1, explanation: "Under a network partition you must trade Consistency against Availability." },
        { text: "A message queue primarily provides…", options: ["Stronger SQL joins", "Asynchronous decoupling and load leveling between services", "Faster indexes", "Client-side caching"], correct: 1, explanation: "Queues decouple producers/consumers and absorb bursts (load leveling)." },
        { text: "CQRS separates…", options: ["Cache and RAM", "Read and write models", "Client and server", "Columns and rows"], correct: 1, explanation: "CQRS uses distinct models for commands (writes) and queries (reads)." },
        { text: "Which is a common rate-limiting algorithm?", options: ["Bubble sort", "Token bucket", "Two-phase commit", "MapReduce"], correct: 1, explanation: "Token bucket allows bursts up to a capacity while enforcing an average rate." },
        { text: "Database sharding is used to…", options: ["Encrypt data", "Horizontally partition data across nodes", "Normalize schemas", "Cache queries"], correct: 1, explanation: "Sharding splits a dataset across nodes by a shard key to scale writes/storage." },
        { text: "A distributed transaction across services often uses…", options: ["A single SQL COMMIT", "The Saga pattern with compensating actions", "A CSS grid", "DNS round-robin"], correct: 1, explanation: "Sagas coordinate local transactions with compensations instead of a global lock." }
      ],
      interview: [
        { text: "Design a rate limiter for a public API. Discuss algorithm, storage, and distribution.", hint: "token/leaky bucket, Redis counters, sliding window, per-key.", modelAnswer: "I'd use a token-bucket or sliding-window counter keyed by client/API key. State lives in a fast shared store (Redis) so all app instances agree; atomic INCR + TTL or a Lua script avoids races. Return 429 with Retry-After. For fairness add per-endpoint tiers and burst capacity, and degrade gracefully if Redis is unavailable." },
        { text: "Explain the CAP theorem and a real design decision it forced.", hint: "partition → choose C or A; examples.", modelAnswer: "During a network partition you can't have both consistency and availability. A payments ledger chooses consistency (reject writes rather than diverge); a social feed chooses availability (serve possibly-stale data). The theorem forces you to state which failure mode is acceptable per feature." }
      ],
      coding: [
        { text: "Implement a token-bucket rate limiter class with `allow()` returning true/false based on refill rate and capacity.", hint: "Track tokens + lastRefill timestamp; refill lazily on each call.", modelAnswer: "class TokenBucket {\n  constructor(capacity, refillPerSec) {\n    this.capacity = capacity;\n    this.tokens = capacity;\n    this.refill = refillPerSec;\n    this.last = Date.now();\n  }\n  allow(cost = 1) {\n    const now = Date.now();\n    this.tokens = Math.min(this.capacity, this.tokens + ((now - this.last) / 1000) * this.refill);\n    this.last = now;\n    if (this.tokens >= cost) { this.tokens -= cost; return true; }\n    return false;\n  }\n}" },
        { text: "Implement a minimal in-process pub/sub with `subscribe(topic, fn)` and `publish(topic, msg)`.", hint: "Map<topic, Set<fn>>; iterate subscribers on publish.", modelAnswer: "class PubSub {\n  constructor() { this.topics = new Map(); }\n  subscribe(topic, fn) {\n    if (!this.topics.has(topic)) this.topics.set(topic, new Set());\n    this.topics.get(topic).add(fn);\n    return () => this.topics.get(topic).delete(fn);\n  }\n  publish(topic, msg) {\n    (this.topics.get(topic) || []).forEach(fn => fn(msg));\n  }\n}" }
      ]
    }
  },

  // ===================== GENAI / LLM =====================
  genai: {
    easy: {
      mcq: [
        { text: "What is tokenization in an LLM pipeline?", options: ["Encrypting the prompt", "Splitting text into sub-word units the model processes", "Compressing the model", "Ranking answers"], correct: 1, explanation: "Tokenization converts text into tokens (often sub-words) that map to embeddings." },
        { text: "A transformer's core mechanism is…", options: ["Convolution", "Self-attention", "Recurrence", "Pooling"], correct: 1, explanation: "Transformers rely on self-attention to weigh relationships between all tokens." },
        { text: "'Zero-shot' prompting means…", options: ["No model weights", "Asking a task with no examples in the prompt", "Training from scratch", "Using zero tokens"], correct: 1, explanation: "Zero-shot gives only instructions, no worked examples; few-shot adds examples." },
        { text: "What does an LLM's context window limit?", options: ["Model accuracy", "How many tokens it can attend to at once", "Number of GPUs", "Output language"], correct: 1, explanation: "The context window caps the total tokens (prompt + output) the model can consider." },
        { text: "A 'hallucination' is when a model…", options: ["Crashes", "Produces confident but incorrect/fabricated output", "Runs out of tokens", "Refuses to answer"], correct: 1, explanation: "Hallucination = fluent output that is factually wrong or unsupported." }
      ],
      interview: [
        { text: "Explain at a high level how a chat LLM like ChatGPT produces a response.", hint: "tokenize → attention layers → next-token prediction → decode.", modelAnswer: "The prompt is tokenized and embedded, passed through stacked transformer layers that use self-attention to build contextual representations, and the model predicts the next token probability distribution. It samples/greedy-decodes tokens one at a time, feeding each back in, until a stop condition. Instruction tuning and RLHF shape it toward helpful chat behavior." },
        { text: "What is a system prompt and why does it matter?", hint: "sets role/constraints; steers behavior; precedence.", modelAnswer: "A system prompt is a high-priority instruction that sets the model's role, tone, and constraints before user input. It steers behavior consistently across a conversation and generally takes precedence over user messages, which is why it's used for guardrails and persona." }
      ],
      coding: [
        { text: "Write a prompt-template function `buildPrompt(context, question)` that inserts context and question into a clear instruction template string.", hint: "Template literal; label the sections; instruct to use only the context.", modelAnswer: "function buildPrompt(context, question) {\n  return `You are a helpful assistant. Use ONLY the context to answer.\\n\\nContext:\\n${context}\\n\\nQuestion: ${question}\\n\\nIf the answer is not in the context, say you don't know.`;\n}" }
      ]
    },
    medium: {
      mcq: [
        { text: "In RAG, what does the 'retrieval' step do?", options: ["Fine-tunes the model", "Fetches relevant documents/chunks to ground the answer", "Tokenizes output", "Ranks GPUs"], correct: 1, explanation: "Retrieval pulls semantically relevant chunks (via embeddings) to inject as context." },
        { text: "An embedding is…", options: ["A compressed image", "A dense vector representing meaning of text", "A prompt template", "A fine-tuning method"], correct: 1, explanation: "Embeddings map text to vectors where semantic similarity ≈ geometric closeness." },
        { text: "A vector database is optimized for…", options: ["SQL joins", "Approximate nearest-neighbor similarity search", "Image resizing", "Model training"], correct: 1, explanation: "Vector DBs do fast ANN search over high-dimensional embeddings." },
        { text: "Which metric commonly compares embeddings?", options: ["MSE", "Cosine similarity", "F1 score", "BLEU"], correct: 1, explanation: "Cosine similarity measures the angle between vectors, ignoring magnitude." },
        { text: "Fine-tuning differs from RAG in that it…", options: ["Never needs data", "Updates model weights on task data", "Only changes the prompt", "Requires a vector DB"], correct: 1, explanation: "Fine-tuning adjusts weights; RAG keeps weights fixed and augments the prompt with retrieved context." },
        { text: "Chunking documents before embedding helps because…", options: ["It trains the model", "Smaller units retrieve more precisely and fit the context window", "It encrypts data", "It removes tokens"], correct: 1, explanation: "Right-sized chunks improve retrieval precision and control context length." },
        { text: "A good way to reduce hallucination is…", options: ["Higher temperature", "Grounding answers in retrieved sources and citing them", "Longer outputs", "Removing the system prompt"], correct: 1, explanation: "Grounding with retrieval + citations constrains the model to supported facts." }
      ],
      interview: [
        { text: "Compare fine-tuning versus RAG. When would you choose each?", hint: "knowledge freshness, cost, style vs facts.", modelAnswer: "RAG injects external, up-to-date knowledge at query time without retraining — ideal for changing facts and citations. Fine-tuning bakes behavior/format/domain style into weights — ideal for consistent tone, structured output, or narrow tasks. Often you combine: fine-tune for style, RAG for facts. RAG is cheaper to keep fresh; fine-tuning reduces prompt size and latency." },
        { text: "Walk through building a RAG pipeline end to end.", hint: "ingest → chunk → embed → store → retrieve → rerank → prompt → generate.", modelAnswer: "Ingest documents, clean and chunk them, embed each chunk and store vectors + metadata in a vector DB. At query time, embed the question, retrieve top-k similar chunks (optionally rerank), assemble a grounded prompt with those chunks and instructions to cite/abstain, then call the LLM. Add evaluation on retrieval hit-rate and answer faithfulness." },
        { text: "How do you mitigate hallucination in a production assistant?", hint: "grounding, citations, abstention, guardrails, eval.", modelAnswer: "Ground answers with retrieval and require citations, instruct the model to say 'I don't know' when context is insufficient, lower temperature for factual tasks, add validation/guardrails on outputs, and continuously evaluate faithfulness with a held-out set or an LLM-judge." }
      ],
      coding: [
        { text: "Write a `chunkText(text, size, overlap)` function that splits text into overlapping character windows for embedding.", hint: "Step by (size - overlap); slice; stop at end.", modelAnswer: "function chunkText(text, size = 800, overlap = 100) {\n  const chunks = [];\n  const step = Math.max(1, size - overlap);\n  for (let i = 0; i < text.length; i += step) {\n    chunks.push(text.slice(i, i + size));\n    if (i + size >= text.length) break;\n  }\n  return chunks;\n}" }
      ]
    },
    advanced: {
      mcq: [
        { text: "LoRA reduces fine-tuning cost by…", options: ["Training all weights faster", "Learning small low-rank adapter matrices while freezing base weights", "Removing attention", "Quantizing the tokenizer"], correct: 1, explanation: "LoRA injects trainable low-rank matrices, freezing the large base model." },
        { text: "QLoRA additionally…", options: ["Uses two GPUs", "Quantizes the base model (e.g. 4-bit) to cut memory", "Removes the adapters", "Skips backprop"], correct: 1, explanation: "QLoRA fine-tunes LoRA adapters on top of a 4-bit quantized base to save VRAM." },
        { text: "RLHF uses a reward model to…", options: ["Tokenize faster", "Score outputs so the policy is optimized toward human preferences", "Compress weights", "Retrieve documents"], correct: 1, explanation: "A reward model trained on human preferences guides policy optimization (e.g. PPO/DPO)." },
        { text: "Which is a sound way to evaluate LLM quality at scale?", options: ["Only manual spot checks", "Automated eval sets + LLM-as-judge with human calibration", "Counting tokens", "Measuring GPU temp"], correct: 1, explanation: "Scaled eval combines curated test sets, LLM-judge scoring, and periodic human calibration." },
        { text: "A key lever to reduce inference cost is…", options: ["Always using the largest model", "Routing easy queries to smaller/cheaper models", "Disabling caching", "Longer prompts"], correct: 1, explanation: "Model routing/cascades send only hard queries to expensive models." },
        { text: "Multi-modal models process…", options: ["Only text", "Multiple input types such as text and images", "Only images", "Only audio"], correct: 1, explanation: "Multi-modal models accept/emit more than one modality (e.g. text + vision)." }
      ],
      interview: [
        { text: "How would you evaluate an LLM feature's quality and cost at scale?", hint: "offline eval sets, LLM-judge, human calibration, latency/$ dashboards.", modelAnswer: "Build a versioned offline eval set covering real query distribution and edge cases, score with automated metrics plus an LLM-judge calibrated against human labels, and track faithfulness/helpfulness/safety. In production, log traces, sample for human review, and dashboard latency, tokens, and cost per request. Use model routing and caching to control spend, and gate releases on eval regressions." },
        { text: "Design a multi-step agent chain that can call tools. What are the failure modes?", hint: "planning, tool schema, loops, guardrails, cost control.", modelAnswer: "The agent plans, selects a tool by a typed schema, executes, observes the result, and iterates until done (ReAct-style). Failure modes: infinite loops (cap steps), malformed tool args (validate/repair), hallucinated tools (whitelist), runaway cost (budget), and unsafe actions (human-in-the-loop for high-impact steps). Add tracing and per-step evals." }
      ],
      coding: [
        { text: "Implement cosine similarity `cosine(a, b)` for two equal-length numeric embedding arrays.", hint: "dot / (||a|| * ||b||); guard zero norm.", modelAnswer: "function cosine(a, b) {\n  let dot = 0, na = 0, nb = 0;\n  for (let i = 0; i < a.length; i++) {\n    dot += a[i] * b[i];\n    na += a[i] * a[i];\n    nb += b[i] * b[i];\n  }\n  const denom = Math.sqrt(na) * Math.sqrt(nb);\n  return denom === 0 ? 0 : dot / denom;\n}" },
        { text: "Write a bounded agent loop `runAgent(plan, tools, maxSteps)` that dispatches tool calls and stops on a 'final' action or step cap.", hint: "Loop with step guard; look up tool by name; break on final.", modelAnswer: "function runAgent(planFn, tools, maxSteps = 8) {\n  let obs = null;\n  for (let step = 0; step < maxSteps; step++) {\n    const action = planFn(obs); // { tool, args } or { final }\n    if (action.final !== undefined) return action.final;\n    const tool = tools[action.tool];\n    if (!tool) throw new Error(`Unknown tool: ${action.tool}`);\n    obs = tool(action.args);\n  }\n  return obs; // hit step cap\n}" }
      ]
    }
  },

  // ===================== HR & BEHAVIORAL (non-coding → case study) =====================
  hr: {
    easy: {
      mcq: [
        { text: "Which behavior best reflects good workplace etiquette?", options: ["Ignoring meeting invites", "Communicating delays proactively", "Taking credit for others' work", "Skipping standups silently"], correct: 1, explanation: "Proactive communication about delays builds trust and reliability." },
        { text: "A key ingredient of effective teamwork is…", options: ["Working in isolation", "Clear, respectful communication", "Withholding information", "Avoiding feedback"], correct: 1, explanation: "Teams thrive on open, respectful communication and shared context." },
        { text: "When you don't know an answer in an interview, you should…", options: ["Make something up confidently", "Stay silent", "Reason aloud and state assumptions honestly", "Change the subject"], correct: 2, explanation: "Interviewers value honest reasoning and structured thinking over bluffing." },
        { text: "The STAR framework stands for…", options: ["Story, Task, Answer, Result", "Situation, Task, Action, Result", "Skill, Team, Ask, Review", "Setup, Timing, Action, Reward"], correct: 1, explanation: "STAR = Situation, Task, Action, Result — a structure for behavioral answers." },
        { text: "A strength presented well in interviews is…", options: ["Vague and generic", "Backed by a concrete example", "Actually a weakness", "Unrelated to the role"], correct: 1, explanation: "Concrete, role-relevant examples make a strength credible." }
      ],
      interview: [
        { text: "Tell me about yourself.", hint: "Present → past → future; tie to the role; ~60-90 seconds.", modelAnswer: "A strong answer is a tight narrative: who you are now and what you focus on, a highlight or two from your background that's relevant to the role, and why this role/company is the logical next step. Keep it to about a minute, lead with relevance, and end with forward intent rather than listing your whole résumé." },
        { text: "What are your greatest strengths and one real weakness?", hint: "Strength + evidence; weakness + active improvement.", modelAnswer: "Name a role-relevant strength and back it with a concrete result. For the weakness, pick a genuine one, avoid clichés, and describe the concrete steps you're taking to improve — showing self-awareness and growth rather than a humble-brag." }
      ],
      coding: [
        { text: "Case study: How would you onboard a new team member in their first two weeks? Outline a concrete plan.", hint: "access + setup, buddy, small first task, docs, check-ins.", modelAnswer: "Week 1: pre-arrange access/hardware, assign a buddy, walk through the codebase/architecture and team rituals, and give a small, shippable first task to build momentum. Week 2: gradually increase scope, pair on a real feature, gather feedback in a mid-point check-in, and point them to docs/owners. Success = they've shipped something small and know who to ask." }
      ]
    },
    medium: {
      mcq: [
        { text: "The best first step in resolving a team conflict is…", options: ["Escalate to the manager immediately", "Listen to understand each side", "Pick a winner quickly", "Ignore it"], correct: 1, explanation: "Understanding each perspective first enables a fair, durable resolution." },
        { text: "A 'servant leadership' style emphasizes…", options: ["Command and control", "Enabling and unblocking the team", "Micromanagement", "Individual glory"], correct: 1, explanation: "Servant leaders prioritize removing blockers and growing the team." },
        { text: "In STAR, the 'Action' should focus on…", options: ["What the team did", "What YOU specifically did", "The company's mission", "Future plans"], correct: 1, explanation: "Interviewers assess your individual contribution, so emphasize your actions." },
        { text: "Constructive feedback is best delivered…", options: ["Publicly and vaguely", "Privately, specifically, and timely", "Only in annual reviews", "Anonymously"], correct: 1, explanation: "Specific, timely, private feedback is actionable and preserves trust." },
        { text: "When describing a failure, you should emphasize…", options: ["Blaming others", "What you learned and changed", "That it wasn't your fault", "Avoiding the question"], correct: 1, explanation: "Ownership plus a concrete lesson signals maturity and growth." },
        { text: "A sign of psychological safety on a team is…", options: ["No one asks questions", "People admit mistakes without fear", "Only seniors speak", "Blame culture"], correct: 1, explanation: "Safety shows when members can raise problems and admit errors openly." },
        { text: "Aligning two experts who disagree works best by…", options: ["Voting instantly", "Finding shared goals and evaluating trade-offs on evidence", "Deferring to seniority always", "Avoiding the topic"], correct: 1, explanation: "Grounding the debate in shared goals and evidence de-personalizes it." }
      ],
      interview: [
        { text: "Describe a time you failed and what you learned.", hint: "STAR; own it; concrete lesson applied later.", modelAnswer: "Pick a real failure, set the situation and your responsibility briefly, explain the specific misstep, and then spend most of the answer on what you changed afterward and the evidence it worked. The point is ownership plus a durable lesson you now apply." },
        { text: "How do you handle disagreement with a peer on a technical decision?", hint: "shared goals, data, disagree-and-commit.", modelAnswer: "I separate the person from the problem, restate the shared goal, and compare options on concrete criteria (risk, cost, maintainability) with data or a spike. If we still differ, I escalate to a tie-breaker or disagree-and-commit, then support the chosen path fully and revisit if evidence changes." }
      ],
      coding: [
        { text: "Case study: Two senior engineers are blocking a release over an architecture disagreement. As their lead, how do you resolve it this week?", hint: "listen, define decision criteria, timebox a spike, decide, document.", modelAnswer: "Meet each 1:1 to understand positions and the real risk each fears. Bring them together around the shared goal and agreed decision criteria (deadline, risk, reversibility). If it's reversible, pick the cheaper option and move; if not, timebox a spike to gather evidence, then decide as the tie-breaker. Document the decision and rationale, and commit to revisiting if data changes — so the release ships without lingering resentment." }
      ]
    },
    advanced: {
      mcq: [
        { text: "Shaping org culture is most influenced by…", options: ["Posters and slogans", "What leaders consistently reward and tolerate", "The office layout", "Headcount"], correct: 1, explanation: "Culture is defined by behaviors leaders model, reward, and tolerate." },
        { text: "Executive communication should be…", options: ["Long and exhaustive", "Concise, outcome-first, with the ask up front", "Highly technical", "Ambiguous to stay flexible"], correct: 1, explanation: "Execs want the outcome and ask first, with detail available on demand." },
        { text: "A principled negotiation focuses on…", options: ["Positions and winning", "Interests and objective criteria", "Emotions only", "Splitting the difference blindly"], correct: 1, explanation: "Interest-based negotiation seeks mutual gains via objective standards." },
        { text: "Leading a team through a major pivot requires first…", options: ["Silence until it's done", "A clear narrative of why and what changes", "Firing dissenters", "Ignoring morale"], correct: 1, explanation: "People follow a change they understand; start with a credible why." },
        { text: "Retaining senior talent depends most on…", options: ["Free snacks", "Growth, autonomy, and meaningful impact", "Longer hours", "Strict rules"], correct: 1, explanation: "Senior people stay for growth, autonomy, and impact more than perks." },
        { text: "Measuring culture health is best done via…", options: ["Gut feeling only", "Regular signals: attrition, eNPS, and behavioral observation", "Headcount growth", "Number of meetings"], correct: 1, explanation: "Combine quantitative signals (attrition, eNPS) with observed behavior." }
      ],
      interview: [
        { text: "How would you lead a team through a major strategic pivot?", hint: "why-narrative, transparency, quick wins, protect morale, measure.", modelAnswer: "Start with an honest, compelling narrative of why we're pivoting and what stays constant. Be transparent about the unknowns, involve the team in shaping the how, and sequence quick wins to build belief. Protect morale by acknowledging loss, redeploying people to their strengths, over-communicating in both directions, and tracking leading indicators so we can course-correct fast." },
        { text: "How do you communicate a high-risk decision to executives?", hint: "outcome-first, the ask, options + recommendation, risks, mitigation.", modelAnswer: "Lead with the decision and the ask, then the expected outcome. Present two or three options with a clear recommendation, the key risks and how they're mitigated, and the cost of inaction. Keep it concise with detail in an appendix, and be explicit about what you need from them (approval, resources, a call)." }
      ],
      coding: [
        { text: "Case study: Draft the core of a team-culture document for a fast-growing 50-person startup. What principles and mechanisms do you include?", hint: "values → behaviors → mechanisms (rituals, decisions, feedback), anti-patterns.", modelAnswer: "Anchor on 4-5 values, each translated into observable behaviors (not slogans) and an anti-pattern it rejects. Add mechanisms that make them real: how decisions are made and documented, feedback and recognition rituals, meeting/async norms, on-call and quality bars, and how disagreement/escalation works. Include how the culture is hired for, onboarded, and reviewed, so it scales beyond the founders rather than diluting as headcount grows." }
      ]
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TODO — remaining 10 roles are NOT authored yet:
  //   fullstack, data-analyst, data-scientist, agentic, devops,
  //   cyber, mobile, uiux, cloud, pm
  // Until authored, getRoundQuestions() falls back to a related role (see the
  // `fallback` field in ROLES). To author one, add a key below following EXACTLY
  // this shape (every role needs all 3 levels × 3 rounds; counts must be ≥ the
  // level's rule count: easy 5 MCQ/2 int/1 code, medium 7/3/1, advanced 10/4/2):
  //
  //   devops: {
  //     easy: {
  //       mcq: [
  //         { text: "…?", options: ["A","B","C","D"], correct: 2, explanation: "…" },
  //         // …5 total for easy
  //       ],
  //       interview: [
  //         { text: "…?", hint: "…", modelAnswer: "…" },
  //         // …2 total for easy
  //       ],
  //       coding: [   // non-coding roles (hasCoding:false) use this same shape as a CASE STUDY
  //         { text: "…", hint: "…", modelAnswer: "…" }
  //         // …1 for easy, 2 for advanced
  //       ]
  //     },
  //     medium: { mcq: [...7], interview: [...3], coding: [...1] },
  //     advanced: { mcq: [...10], interview: [...4], coding: [...2] }
  //   },
  // ─────────────────────────────────────────────────────────────────────────
};

/* ---------- Helpers ---------- */

function getRole(roleId) {
  return ROLES.find(r => r.id === roleId) || ROLES[0];
}

function getLevelRules(level) {
  return LEVEL_RULES[level] || LEVEL_RULES.easy;
}

// Returns the authored question array for a role/level/round, following the
// fallback chain when a role hasn't been authored yet. May return [] if even
// the fallback lacks that round (caller must handle empty).
function getRoundQuestions(roleId, level, round) {
  const role = getRole(roleId);
  const sourceId = QUESTION_BANK[roleId] ? roleId : role.fallback;
  const lvl = QUESTION_BANK[sourceId] && QUESTION_BANK[sourceId][level];
  const arr = lvl && lvl[round];
  return Array.isArray(arr) ? arr : [];
}

// Expose for both browser (script tag) and any Node-side test harness.
if (typeof window !== "undefined") {
  window.ROLES = ROLES;
  window.LEVEL_RULES = LEVEL_RULES;
  window.LEVEL_TOPICS = LEVEL_TOPICS;
  window.QUESTION_BANK = QUESTION_BANK;
  window.getRole = getRole;
  window.getLevelRules = getLevelRules;
  window.getRoundQuestions = getRoundQuestions;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ROLES, LEVEL_RULES, LEVEL_TOPICS, QUESTION_BANK, getRole, getLevelRules, getRoundQuestions };
}
