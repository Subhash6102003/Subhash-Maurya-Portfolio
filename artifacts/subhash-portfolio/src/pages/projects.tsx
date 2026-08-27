import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Download, ExternalLink, Github, Globe, Search } from 'lucide-react';

export const ETERNITY_APK_URL = 'https://drive.google.com/file/d/1_EternityFitness_APK_Download/view?usp=sharing';

export interface VerifiedProject {
  id: string;
  title: string;
  kind: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl: string;
  isAppUrl?: boolean;
}

export const verifiedProjects: VerifiedProject[] = [
  {
    id: 'eternity_gym_web',
    title: 'Eternity Gym Web Platform',
    kind: 'Full-stack gym management web application',
    description: 'Modern, feature-rich web application built with React & Supabase featuring real-time BMI calculator with BMR calorie recommendations, member check-in system with PostgreSQL data, admin stats dashboard, and automated EmailJS notifications.',
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'EmailJS'],
    liveUrl: 'https://www.eternityfitnessclub.com/',
    githubUrl: 'https://github.com/Subhash6102003/EternityGym',
  },
  {
    id: 'eternity_fitness_app',
    title: 'Eternity Fitness App',
    kind: 'Cross-platform Mobile Application (Android & iOS)',
    description: 'Feature-rich mobile application for Eternity Fitness Club built with Flutter. Features AI fitness & diet chart generation, smart home-ingredient recipe creator, calorie counter, step counter, and activity log.',
    stack: ['Flutter', 'Dart', 'Android', 'iOS', 'AI Generator'],
    liveUrl: ETERNITY_APK_URL,
    githubUrl: 'https://github.com/Subhash6102003/Eternity-Fitness-App',
    isAppUrl: true,
  },
  {
    id: 'rkm_development',
    title: 'RKM Development',
    kind: 'Premium digital solutions platform',
    description: 'One-stop destination for cutting-edge technology solutions to transform business growth. From mobile applications to AI integration, delivering high-performance digital tools.',
    stack: ['React', 'TypeScript', 'Next.js', 'Vercel', 'Tailwind'],
    liveUrl: 'https://rkm-development.vercel.app/',
    githubUrl: 'https://github.com/Subhash6102003/rkm-development',
  },
  {
    id: 'stealth_vault',
    title: 'Stealth Vault — Privacy App Manager',
    kind: 'Sophisticated native Android privacy app',
    description: 'Allows users to hide selected installed apps from home screen and recent apps with custom gesture authentication, biometric security (fingerprint/face unlock), encrypted local storage, and Jetpack Compose UI.',
    stack: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Biometrics', 'Encrypted DB'],
    githubUrl: 'https://github.com/Subhash6102003/Stealth-Vault---Privacy-App-Manager',
  },
  {
    id: 'egovtalent',
    title: 'eGovTalent Platform',
    kind: "India's first AI-powered e-governance job portal",
    description: 'Full-stack recruitment ecosystem solo-built from architecture to AWS deployment. Claude AI handles resume extraction, screening, shortlisting, invitations, and assessments.',
    stack: ['React', 'TypeScript', 'Node.js', 'AWS', 'Claude AI'],
    liveUrl: 'https://egovtalent.com',
    githubUrl: 'https://github.com/Subhash6102003/eGovTalent',
  },
  {
    id: 'mgb_heights',
    title: 'Society Management App (MGB Heights)',
    kind: 'Residential society management app (Freelance)',
    description: 'Production Android application built for MGB Heights residential society featuring RBAC roles, offline-first Firestore architecture, visitor capture, automated billing, FCM notifications, and Razorpay integration.',
    stack: ['Kotlin', 'Compose', 'Firestore', 'FCM', 'Razorpay'],
    githubUrl: 'https://github.com/Subhash6102003/MGB-Heights',
  },
  {
    id: 'nexlogic',
    title: 'NexLogic Innovation',
    kind: 'Enterprise digital platform',
    description: 'Production web application built with React.js, Node.js, Express.js, and AWS microservices, engineered for high reliability, fast page loads, and enterprise scalability.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'AWS'],
    liveUrl: 'https://nexlogic.co.in',
    githubUrl: 'https://github.com/Subhash6102003/NexLogic',
  },
  {
    id: 'spine_pain_growth',
    title: 'Spine Pain Growth Systems',
    kind: 'Healthcare patient consultation growth framework',
    description: 'Helps spine & pain clinics increase case acceptance, streamline patient pathways, and build authority using a 7-step diagnostic patient-consultation growth strategy.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://subhash6102003.github.io/Spine-Pain-Growth-Systems/',
    githubUrl: 'https://github.com/Subhash6102003/Spine-Pain-Growth-Systems',
  },
  {
    id: 'aesthetica_dento_facial',
    title: 'Aesthetica Dento-Facial Clinic',
    kind: 'Dental & facial aesthetic clinic web application',
    description: 'Modern healthcare portal with appointment booking, clinical procedure showcase, patient treatment guides, and responsive layout.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://subhash6102003.github.io/Aesthetica-Dento-Facial-Clinic-Website/',
    githubUrl: 'https://github.com/Subhash6102003/Aesthetica-Dento-Facial-Clinic-Website',
  },
  {
    id: 'namaste_stays',
    title: 'Namaste Stays',
    kind: 'Boutique hospitality booking platform',
    description: 'Property booking application featuring accommodation showcases, room availability search, guest booking management, and responsive UI.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://subhash6102003.github.io/Namaste-Stays/',
    githubUrl: 'https://github.com/Subhash6102003/Namaste-Stays',
  },
  {
    id: 'kicking_ninja',
    title: 'Kicking Ninja',
    kind: 'Interactive TypeScript action game',
    description: 'Action game built with TypeScript, custom collision physics, sprite animations, particle effects, and high-score tracking.',
    stack: ['TypeScript', 'HTML5 Canvas', 'Game Dev', 'GitHub Pages'],
    liveUrl: 'https://subhash6102003.github.io/Kicking-Ninja/',
    githubUrl: 'https://github.com/Subhash6102003/Kicking-Ninja',
  },
  {
    id: 'bp_public_school',
    title: 'B.P. Public School',
    kind: 'Educational institution web platform',
    description: 'School administration web portal featuring admissions guide, academic curriculum, student activity showcases, and institutional announcements.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://subhash6102003.github.io/B.P.Public-School/',
    githubUrl: 'https://github.com/Subhash6102003/B.P.Public-School',
  },
];

const toneSequence: Array<'orange' | 'ink' | 'sand'> = ['orange', 'ink', 'sand'];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  const allTechPills = ['All', 'React', 'Flutter', 'Kotlin', 'TypeScript', 'Node.js', 'Supabase', 'HTML/JS'];

  const filteredProjects = verifiedProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.kind.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTech =
      selectedTech === 'All' ||
      (selectedTech === 'HTML/JS' && project.stack.some((s) => s.includes('HTML') || s.includes('JavaScript'))) ||
      project.stack.some((s) => s.toLowerCase().includes(selectedTech.toLowerCase()));

    return matchesSearch && matchesTech;
  });

  return (
    <div className="projects-page-container">
      <section className="projects section-frame" aria-labelledby="projects-title">
        <div className="section-heading">
          <div className="section-kicker"><span>03</span> Verified Work &amp; Repositories</div>
          <h2 id="projects-title">Built to leave<br /><i>a mark.</i></h2>
          <p>Verified production applications, cross-platform mobile software, and live web deployments.</p>
        </div>

        {/* Filter & Search Bar */}
        <div className="project-filter-bar" style={{ marginBottom: '40px' }}>
          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="project-search-field"
              data-testid="input-project-search"
            />
          </div>

          <div className="tech-pills">
            {allTechPills.map((tech) => (
              <button
                key={tech}
                className={`tech-pill-btn ${selectedTech === tech ? 'active' : ''}`}
                onClick={() => setSelectedTech(tech)}
                data-testid={`pill-tech-${tech.toLowerCase()}`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Verified Projects Symmetrical 3-Column Grid */}
        <div className="project-list" style={{ marginTop: '0' }}>
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              // Enforce strict column symmetry: Col 1 = orange, Col 2 = ink, Col 3 = sand
              const tone = toneSequence[idx % 3];
              const projectNum = String(idx + 1).padStart(2, '0');

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`project-card project-${tone}`}
                  data-testid={`card-project-${projectNum}`}
                >
                  <div className="project-top">
                    <span>{projectNum}</span>
                    <span>{project.kind}</span>
                    <ExternalLink size={17} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-stack">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="project-arrow" style={{ marginTop: '24px', flexWrap: 'wrap', gap: '10px' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-primary"
                        style={{ padding: '8px 14px', fontSize: '10px' }}
                        data-testid={`link-live-${project.id}`}
                      >
                        {project.isAppUrl ? (
                          <><Download size={13} /> Direct APK Download</>
                        ) : (
                          <><Globe size={13} /> Live Demo <ArrowUpRight size={13} /></>
                        )}
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-dark"
                      style={{ padding: '8px 14px', fontSize: '10px' }}
                      data-testid={`link-github-${project.id}`}
                    >
                      <Github size={13} /> Source Code <ExternalLink size={13} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
