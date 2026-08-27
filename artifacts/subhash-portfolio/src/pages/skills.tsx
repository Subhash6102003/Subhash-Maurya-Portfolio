import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Code2, Cpu, Database, Layers, Server, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

const skillGroups = [
  {
    category: 'Android & Mobile Engineering',
    icon: Cpu,
    lede: 'Native mobile engineering with modern declarative UI and offline-first architecture.',
    items: [
      { name: 'Kotlin', desc: 'Primary language for modern native Android development' },
      { name: 'Java', desc: 'Core OOP, legacy codebase maintenance & JVM interoperability' },
      { name: 'Jetpack Compose', desc: 'Modern declarative UI framework for Android' },
      { name: 'Room Database', desc: 'Offline-first SQLite abstraction layer with Flow/LiveData' },
      { name: 'Retrofit', desc: 'Type-safe REST HTTP client for Android & Kotlin' },
      { name: 'Coroutines', desc: 'Asynchronous concurrency & reactive state management' },
      { name: 'MVVM Architecture', desc: 'Clean separation of UI, ViewModel, and Repository layers' },
      { name: 'Clean Architecture', desc: 'Decoupled domain business logic & data interfaces' },
      { name: 'Firebase Firestore', desc: 'NoSQL cloud database with real-time sync' },
      { name: 'Firebase FCM', desc: 'Cloud Messaging for push notification delivery' },
      { name: 'Firebase Auth', desc: 'Authentication, OAuth, and user identity management' },
      { name: 'Play Store Publishing', desc: 'APK/AAB signing, release tracks, and Vitals monitoring' },
    ],
  },
  {
    category: 'Frontend & Web Platform',
    icon: Code2,
    lede: 'Responsive, high-performance single-page applications and interactive web systems.',
    items: [
      { name: 'React.js', desc: 'UI library for component-driven web applications' },
      { name: 'Next.js', desc: 'Full-stack React framework with SSR, SSG, and App Router' },
      { name: 'TypeScript', desc: 'Strictly typed JavaScript for scalable codebases' },
      { name: 'Redux Toolkit', desc: 'Predictable state container for complex web apps' },
      { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for custom responsive UI' },
      { name: 'Framer Motion', desc: 'Production-ready fluid physics animations and gestures' },
      { name: 'JavaScript ES6+', desc: 'Modern async/await, DOM APIs, and ES Modules' },
      { name: 'HTML5 & CSS3', desc: 'Semantic layout, accessibility (a11y), and CSS variables' },
    ],
  },
  {
    category: 'Backend & Cloud Infrastructure',
    icon: Server,
    lede: 'Scalable server microservices, relational/NoSQL databases, and cloud DevOps.',
    items: [
      { name: 'Node.js', desc: 'Event-driven server runtime for REST APIs' },
      { name: 'Express.js', desc: 'Lightweight web framework for API routing and middleware' },
      { name: 'Nginx', desc: 'Reverse proxy, load balancing, and static asset caching' },
      { name: 'PostgreSQL', desc: 'Robust relational database management system & SQL' },
      { name: 'SQL', desc: 'Relational schema design, queries, joins, and indexing' },
      { name: 'MongoDB', desc: 'Document-based NoSQL database for flexible data schemas' },
      { name: 'AWS EC2', desc: 'Virtual server deployment and security group configuration' },
      { name: 'Amazon Web Services', desc: 'Cloud infrastructure (EC2, S3, CloudFront, IAM)' },
      { name: 'Docker', desc: 'Containerization for consistent deployment environments' },
      { name: 'GitHub Actions', desc: 'Automated CI/CD pipelines for testing and deployment' },
    ],
  },
  {
    category: 'AI Tooling & Generative Stack',
    icon: Bot,
    lede: 'AI-assisted software development, LLM API integration, and intelligent automation.',
    items: [
      { name: 'Claude AI', desc: 'LLM API integration for automated screening & code generation' },
      { name: 'Google AI & Gemini', desc: 'Generative AI models and API integrations' },
      { name: 'ChatGPT & OpenAI', desc: 'Prompt engineering, code refactoring, and logic prototyping' },
      { name: 'Codex', desc: 'Code generation and automated test creation' },
      { name: 'Stitch AI', desc: 'AI-powered workflow automation and UI generation' },
      { name: 'GitHub Copilot', desc: 'Context-aware inline code completion and productivity' },
    ],
  },
  {
    category: 'IDEs, Prototyping & Dev Tools',
    icon: Terminal,
    lede: 'Professional development environments, design handoff tools, and utilities.',
    items: [
      { name: 'Android Studio', desc: 'Primary IDE for native Android development & profiling' },
      { name: 'IntelliJ IDEA', desc: 'Full-featured IDE for Kotlin, Java, and JVM projects' },
      { name: 'VS Code', desc: 'Lightweight code editor for web, TypeScript, and Node' },
      { name: 'Antigravity IDE', desc: 'Advanced AI agentic coding environment' },
      { name: 'Antigravity 2.0', desc: 'Next-generation agentic developer workflow platform' },
      { name: 'Replit', desc: 'Cloud-based collaborative prototyping & rapid execution' },
      { name: 'Figma', desc: 'UI/UX design handoff, vector graphics, and component specs' },
      { name: 'Git', desc: 'Distributed version control, branching, and PR workflows' },
      { name: 'Postman', desc: 'REST API testing, endpoint documentation, and automation' },
    ],
  },
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = [
    'All',
    'Android & Mobile Engineering',
    'Frontend & Web Platform',
    'Backend & Cloud Infrastructure',
    'AI Tooling & Generative Stack',
    'IDEs, Prototyping & Dev Tools',
  ];

  const filteredGroups = skillGroups.filter(
    (group) => activeCategory === 'All' || group.category === activeCategory
  );

  return (
    <div className="skills-page-container">
      <section className="skills section-frame" aria-labelledby="skills-title">
        <div className="section-kicker"><span>04</span> Comprehensive Toolbox</div>
        <div className="skills-layout">
          <div>
            <h2 id="skills-title">Sharp tools.<br /><i>Soft edges.</i></h2>
            <p className="skills-lede">
              A comprehensive breakdown of mobile development frameworks, full-stack web platforms, cloud services, and AI developer tooling. Click or drag any skill node to view technical details.
            </p>

            {/* Category Filter Pills */}
            <div className="category-filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`pill-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="skill-grid interactive-board skills-expanded-board">
            {filteredGroups.map((group) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.category}
                  className="skill-group skill-group-expanded"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="group-header">
                    <Icon size={22} strokeWidth={1.7} className="group-icon" />
                    <h3>{group.category}</h3>
                  </div>
                  <p className="group-lede">{group.lede}</p>

                  <div className="skill-tags interactive-tags">
                    {group.items.map((item) => (
                      <motion.span
                        key={item.name}
                        drag
                        dragConstraints={{ left: -8, right: 8, top: -8, bottom: 8 }}
                        dragElastic={0.08}
                        whileHover={{ scale: 1.08, cursor: 'grab' }}
                        whileTap={{ scale: 0.95, cursor: 'grabbing' }}
                        onClick={() => setSelectedSkill(selectedSkill === item.name ? null : item.name)}
                        className={`skill-tag-item ${selectedSkill === item.name ? 'is-selected' : ''}`}
                        title={item.desc}
                      >
                        {item.name}
                      </motion.span>
                    ))}
                  </div>

                  {/* Active Skill Details */}
                  {selectedSkill && group.items.some((i) => i.name === selectedSkill) && (
                    <motion.div
                      className="skill-detail-note"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Sparkles size={14} />
                      <span>
                        <strong>{selectedSkill}:</strong>{' '}
                        {group.items.find((i) => i.name === selectedSkill)?.desc}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </section>
    </div>
  );
}
