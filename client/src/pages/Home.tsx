import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Braces,
  Brain,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Download,
  Dumbbell,
  ExternalLink,
  Gamepad2,
  Github,
  Globe,
  GraduationCap,
  Languages,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Quote,
  Send,
  Server,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Terminal,
  Trophy,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import {
  certifications,
  education,
  experiences,
  exploring,
  interests,
  journey,
  navItems,
  profile,
  projects,
  rotatingRoles,
  skills,
  softSkills,
  testimonials,
  type Certification,
  type Project,
} from "@/data/portfolio";

type IconComponent = typeof Activity;

const iconForSkill: Record<string, IconComponent> = {
  Lenguajes: Braces,
  Backend: Server,
  Frontend: Layout,
  "Cloud & DevOps": Cloud,
  "AI / ML & Data": Database,
  "Métodos & herramientas": Workflow,
};

const iconForInterest: IconComponent[] = [Brain, Globe, Sparkles, Dumbbell, Gamepad2, BookOpen];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case "screenshot":
      return (
        <div className="mock-browser mock-shot">
          <div className="mock-browser-bar"><i /><i /><i /><span>{project.demo ? new URL(project.demo).host : "localhost"}</span></div>
          <img src={project.image} alt={`Captura de ${project.title}`} loading="lazy" />
        </div>
      );
    case "search":
      return (
        <div className="mock-data-lab">
          <div className="lab-title"><span><span className="lab-dot" /> POST /search/text</span><span>clip · 512-d</span></div>
          <div className="mini-search search-query">⌕ &nbsp; un gato durmiendo en un sofá <span>↵</span></div>
          <div className="search-results">
            {[["cat", "34%"], ["couch", "32%"], ["cat · bed", "31%"], ["dog · sofa", "29%"], ["cat · tv", "28%"], ["remote", "27%"]].map(([label, score]) => (
              <div key={label}><span>{score}</span><small>{label}</small></div>
            ))}
          </div>
          <div className="lab-bottom"><span>pgvector · HNSW</span><span>● 38 ms</span></div>
        </div>
      );
    case "routes":
      return (
        <div className="mock-dashboard">
          <div className="dash-top"><span>ecoroutex / lima</span><b>ruta óptima</b></div>
          <svg className="route-map" viewBox="0 0 300 150" aria-hidden="true">
            <g stroke="currentColor" strokeOpacity=".16" strokeWidth="1">
              <path d="M20 30H280M20 75H280M20 120H280M60 10V140M140 10V140M220 10V140" />
              <path d="M20 10L120 140M180 10L280 110" />
            </g>
            <path d="M30 120 L60 120 L60 75 L140 75 L140 30 L220 30 L220 75 L270 75" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            {[[30, 120], [60, 75], [140, 75], [140, 30], [220, 30], [270, 75]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="currentColor" />
            ))}
            <circle cx="270" cy="75" r="9" fill="none" stroke="currentColor" strokeOpacity=".5" />
          </svg>
          <div className="dash-legend"><span>● camión 01</span><span>○ puntos de recojo</span><span>dijkstra()</span></div>
        </div>
      );
    case "moving":
      return (
        <div className="mock-dashboard">
          <div className="dash-top"><span>quive / nueva mudanza</span><b>en ruta</b></div>
          <div className="dash-number">Origen → Destino <strong>↗</strong><b>transportista asignado</b></div>
          <div className="quive-steps">
            <span className="done">Cotización</span>
            <span className="done">Pago</span>
            <span className="active">Transporte</span>
            <span>Entrega</span>
          </div>
          <div className="dash-legend"><span>● Google OAuth</span><span>Leaflet.js</span><span>Flask API</span></div>
        </div>
      );
    case "cluster":
      return (
        <div className="mock-data-lab">
          <div className="lab-title"><span><span className="lab-dot" /> voting_cluster.c</span><span>mpi + cuda</span></div>
          <div className="lab-lines">
            <p><b>$</b> <span className="syntax-blue">mpirun</span> -np <span className="syntax-yellow">8</span> ./voting</p>
            <p><b>01</b> <span className="syntax-purple">MPI_Scatter</span>(votos, …)</p>
            <p><b>02</b> verify_kernel&lt;&lt;&lt;<span className="syntax-yellow">blocks</span>, <span className="syntax-yellow">threads</span>&gt;&gt;&gt;()</p>
            <p><b>03</b> <span className="syntax-purple">MPI_Reduce</span>(conteo, …)</p>
            <p className="output"><b>↳</b> resultados verificados en 8 nodos</p>
          </div>
          <div className="lab-bottom"><span>CPyD / 01</span><span>● paralelo</span></div>
        </div>
      );
    case "database":
      return (
        <div className="mock-data-lab">
          <div className="lab-title"><span><span className="lab-dot" /> social_schema</span><span>sql + nosql</span></div>
          <div className="schema-grid">
            <div><b>users</b><span>id · pk</span><span>email</span><span>created_at</span></div>
            <div><b>posts</b><span>id · pk</span><span>user_id · fk</span><span>content</span></div>
            <div className="schema-doc"><b>{"{ feed }"}</b><span>mongo · doc</span><span>likes[]</span><span>comments[]</span></div>
          </div>
          <div className="lab-bottom"><span>MySQL ⇄ MongoDB</span><span>● APIs escalables</span></div>
        </div>
      );
  }
}

function CertificateModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="cert-modal-backdrop" onClick={onClose}>
      <div className="cert-modal" role="dialog" aria-modal="true" aria-label={cert.title} onClick={(event) => event.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose} aria-label="Cerrar"><X size={18} /></button>
        <div className="cert-modal-image"><img src={cert.image} alt={`Certificado: ${cert.title}`} /></div>
        <div className="cert-modal-body">
          <span className="section-index">{cert.institution}</span>
          <h3>{cert.title}</h3>
          <p>{cert.description}</p>
          <div className="cert-modal-meta">
            <div><small>Emitido por</small><span>{cert.institution}</span></div>
            <div><small>Fecha</small><span>{cert.date}</span></div>
            {cert.hours && <div><small>Tiempo de estudio</small><span>{cert.hours}</span></div>}
            {cert.credentialId && <div><small>ID del certificado</small><span>{cert.credentialId}</span></div>}
          </div>
          <div className="cert-modal-block"><small><BookOpen size={14} /> ¿Qué aprendí?</small><p>{cert.learned}</p></div>
          <div className="cert-modal-block"><small><Zap size={14} /> Habilidades adquiridas</small><div className="tag-row">{cert.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
          {cert.verifyUrl && (
            <a className="button button-ghost" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
              Verificar insignia en Credly <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [projectFilter, setProjectFilter] = useState("Todos");
  const [submitted, setSubmitted] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const closeCert = useCallback(() => setSelectedCert(null), []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("gian-theme") === "light") setDarkMode(false);
    } catch {
      /* almacenamiento no disponible */
    }

    const onScroll = () => {
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];
      const current = sections.reduce((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - 140);
        return distance < closest.distance ? { id: section.id, distance } : closest;
      }, { id: "inicio", distance: Number.POSITIVE_INFINITY });
      setActiveSection(current.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setRoleIndex((current) => (current + 1) % rotatingRoles.length), 2600);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    try {
      window.localStorage.setItem("gian-theme", darkMode ? "dark" : "light");
    } catch {
      /* almacenamiento no disponible */
    }
  }, [darkMode]);

  const projectCategories = useMemo(
    () => ["Todos", ...Array.from(new Set(projects.flatMap((project) => project.category)))],
    [],
  );
  const filteredProjects = projectFilter === "Todos"
    ? projects
    : projects.filter((project) => project.category.includes(projectFilter));

  function handleNav(id: string) {
    setMobileMenuOpen(false);
    scrollToId(id);
  }

  // Sin backend: el formulario abre el cliente de correo con el mensaje ya redactado.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Contacto desde el portafolio — ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")} · ${data.get("email")}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-inner">
          <button className="brand" onClick={() => handleNav("inicio")} aria-label="Ir al inicio">
            <span className="brand-mark"><span /></span>
            <span>GQ<span className="brand-dot">.</span></span>
          </button>

          <nav className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => handleNav(item.id)}
              >
                {item.label}
              </button>
            ))}
            <a className="nav-cv" href={profile.cv} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
              Descargar CV <ArrowUpRight size={14} />
            </a>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}>
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="menu-toggle" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Abrir menú">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero section-pad">
          <div className="hero-grid-overlay" aria-hidden="true" />
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container hero-content">
            <div className="hero-copy reveal-in">
              <div className="eyebrow"><span className="status-pulse" /> {profile.status} · 2026</div>
              <p className="hero-kicker">Hola, soy</p>
              <h1>Gian<br /><em>Quezada</em><span className="headline-period">.</span></h1>
              <p className="hero-role" aria-live="polite"><span key={roleIndex} className="role-swap">{rotatingRoles[roleIndex]}</span></p>
              <p className="hero-description">Estudiante de Ingeniería Informática en la <strong>Universidad Peruana Cayetano Heredia</strong>, apasionado por la tecnología y la innovación. Exploro el potencial de los <strong>datos</strong>, el <strong>software</strong>, la <strong>nube</strong> y la <strong>gestión de proyectos</strong> para construir soluciones tecnológicas con impacto.</p>
              <div className="hero-buttons">
                <button className="button button-primary" onClick={() => handleNav("proyectos")}>Ver proyectos <ArrowUpRight size={17} /></button>
                <button className="button button-ghost" onClick={() => handleNav("contacto")}>Contactarme <ArrowRight size={17} /></button>
              </div>
              <div className="social-row" aria-label="Redes sociales">
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
                <a href={`mailto:${profile.email}`} aria-label="Correo electrónico"><Mail size={17} /></a>
              </div>
            </div>

            <div className="hero-visual reveal-in delay-2" aria-label="Visualización de áreas de interés">
              <div className="visual-topline"><span>GQ / signal map</span><span className="live-label"><span /> live</span></div>
              <div className="signal-board">
                <svg className="signal-lines" viewBox="0 0 560 430" fill="none" aria-hidden="true">
                  <path d="M79 94C170 94 167 214 280 214M280 214C383 214 361 112 482 112M280 214C376 214 375 326 482 326" stroke="currentColor" strokeOpacity=".23" strokeWidth="1.5" strokeDasharray="5 7" />
                  <path d="M79 332C184 332 190 214 280 214" stroke="currentColor" strokeOpacity=".16" strokeWidth="1.5" strokeDasharray="5 7" />
                </svg>
                <div className="signal-node node-a"><span className="node-dot" /><b>DATA</b><small>data science · ML</small></div>
                <div className="signal-node node-b is-core">
                  <span className="node-photo"><img src={profile.photo} alt={profile.fullName} /></span>
                  <b>GIAN</b><small>curiosity → craft</small>
                </div>
                <div className="signal-node node-c"><span className="node-dot" /><b>SOFTWARE</b><small>full stack</small></div>
                <div className="signal-node node-d"><span className="node-dot" /><b>CLOUD</b><small>AWS</small></div>
                <div className="signal-node node-e"><span className="node-dot" /><b>INSIGHTS</b><small>decisiones con datos</small></div>
                <div className="signal-axis axis-x" />
                <div className="signal-axis axis-y" />
              </div>
              <div className="terminal-card">
                <div className="terminal-head"><span className="terminal-lights"><i /><i /><i /></span><span>gian@portfolio:~</span><span className="terminal-caret">_</span></div>
                <div className="terminal-body"><span className="terminal-green">&gt; whoami</span><br />{profile.fullName}<br /><span className="terminal-muted">Ing. Informática @ UPCH · Data · Cloud</span></div>
              </div>
            </div>
          </div>
          <div className="container hero-foot"><span>Scroll para conocer el camino</span><ArrowDown size={16} /></div>
        </section>

        <section className="ticker" aria-label="Áreas de interés">
          <div className="ticker-track"><span>DATA SCIENCE</span><i>✦</i><span>CLOUD COMPUTING</span><i>✦</i><span>AUTOMATIZACION DE PROCESOS</span><i>✦</i><span>MACHINE LEARNING</span><i>✦</i><span>SOFTWARE</span><i>✦</i><span>BASES DE DATOS</span><i>✦</i><span>GESTION DE PROYECTOS</span></div>
        </section>

        <section id="sobre-mi" className="section section-pad about-section">
          <div className="container about-grid">
            <div className="section-intro">
              <span className="section-index">01 / perfil</span>
              <h2>La curiosidad<br /><em>se vuelve sistema.</em></h2>
              <div className="profile-card">
                <img src={profile.photo} alt={profile.fullName} loading="lazy" />
                <div className="profile-card-body">
                  <b>{profile.fullName}</b>
                  <span>Ingeniero Informático en formación</span>
                  <div className="profile-card-actions">
                    <a className="button button-primary" href={profile.cv} target="_blank" rel="noopener noreferrer"><Download size={15} /> Descargar CV</a>
                    <a className="button button-ghost" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={15} /> LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-copy">
              <p className="lead-text">Soy Gian Carlos Quezada Marceliano, estudiante de Ingeniería Informática comprometido con la <strong>excelencia técnica y la innovación.</strong></p>
              <p>Me interesa moverme entre el análisis, la gestion y la implementación: entender el problema, ordenar los datos, construir el software y aprender lo necesario para llevarlo más lejos.
                Busco constantemente nuevos desafíos que me permitan aplicar mis conocimientos en soluciones prácticas: contribuir a proyectos que integren tecnologías emergentes y fomenten el trabajo en equipo, creciendo profesionalmente mientras aporto valor real a la organización.
              </p>

              <div className="about-meta">
                <div><MapPin size={16} /><span><b>Base actual</b>{profile.location}</span></div>
                <div><GraduationCap size={16} /><span><b>Formación</b>{profile.cycle} · {profile.universityShort}</span></div>
                <div><Activity size={16} /><span><b>Estado</b>{profile.status}</span></div>
                <div><Braces size={16} /><span><b>Enfoque</b>{profile.focus}</span></div>
                <div><Languages size={16} /><span><b>Idiomas</b>{profile.languages}</span></div>
                <div><Mail size={16} /><span><b>Correo</b>{profile.email}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-pad journey-section">
          <div className="container">
            <div className="section-heading-row">
              <div><span className="section-index">02 / camino</span><h2>Siempre <em>construyendo.</em></h2></div>
              <p className="heading-note">Trayectoria y plan de carrera.<br />Cada etapa abre una nueva pregunta.</p>
            </div>
            <div className="journey-line">
              {journey.map((item) => (
                <div className={`journey-item is-${item.status}`} key={item.date + item.title}>
                  <div className="journey-marker"><span>{item.date}</span></div>
                  <div className="journey-card">
                    <small>{item.status === "current" ? "AHORA" : item.status === "done" ? "HECHO" : "PLAN"}</small>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="section section-pad projects-section">
          <div className="container">
            <div className="section-heading-row project-heading">
              <div><span className="section-index">03 / selección</span><h2>Proyectos<br /><em>destacados.</em></h2></div>
              <p className="heading-note">Proyectos académicos y personales.<br /><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">Ver todos en GitHub ↗</a></p>
            </div>
            <div className="filter-row" role="group" aria-label="Filtrar proyectos">
              <SlidersHorizontal size={16} />
              {projectCategories.map((category) => <button key={category} className={projectFilter === category ? "selected" : ""} onClick={() => setProjectFilter(category)}>{category}</button>)}
            </div>
            <div className="projects-list">
              {filteredProjects.map((project, index) => (
                <article className={`project-card project-${project.accent} ${index % 2 === 1 ? "reverse" : ""}`} key={project.id}>
                  <div className="project-visual">
                    <div className="project-visual-grid" />
                    <div className="project-code-label"><span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span>{project.status}</span></div>
                    <ProjectVisual project={project} />
                    <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="project-content">
                    <div className="project-eyebrow">{project.eyebrow}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-detail">
                      <div><small>Problema</small><span>{project.problem}</span></div>
                      <div><small>Solución</small><span>{project.solution}</span></div>
                    </div>
                    <div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    <div className="project-footer">
                      <span className="role-note"><span className="inline-dot" /> {project.role}</span>
                      <div className="project-links">
                        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={14} /> Código</a>}
                        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Ver demo <ArrowUpRight size={15} /></a>}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="section section-pad experience-section">
          <div className="container experience-grid">
            <div className="experience-stamp"><span className="section-index">04 / recorrido</span><div className="stamp-ring"><span>GQ</span><small>BUILDING<br />IN PUBLIC</small></div><p>La experiencia también<br />se construye colaborando.</p></div>
            <div className="experience-content">
              <div className="section-heading-row"><div><h2>Experiencia<br /><em>en contexto.</em></h2></div><p className="heading-note">Pasantía, logros<br />y formación continua.</p></div>
              {experiences.map((experience) => (
                <article className="experience-item" key={experience.title}>
                  <div className="experience-label">{experience.label}</div>
                  <div className="experience-main">
                    <div><h3>{experience.title}</h3><p>{experience.text}</p></div>
                    <div className="experience-side"><span>{experience.period}</span><div className="tag-row">{experience.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-pad testimonials-section">
          <div className="container">
            <div className="section-heading-row">
              <div><span className="section-index">05 / referencias</span><h2>Anexos y<br /><em>reconocimientos.</em></h2></div>
              <p className="heading-note">Lo que dicen quienes<br />han trabajado conmigo.</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((item) => (
                <figure className="testimonial-card" key={item.name}>
                  <Quote size={22} className="testimonial-mark" />
                  <blockquote>“{item.quote}”</blockquote>
                  <figcaption><span className="signature-line" /><span><b>{item.name}</b><small>{item.role}</small></span></figcaption>
                </figure>
              ))}
              <div className="award-card">
                <span className="award-icon"><Trophy size={22} /></span>
                <small>Hackathon UPCH 2025</small>
                <h3>Finalista · Top 8</h3>
                <p>Proyecto FocusUp: una plataforma de organización personalizada para cada estudiante.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="habilidades" className="section section-pad skills-section">
          <div className="container">
            <div className="section-heading-row"><div><span className="section-index">06 / toolkit</span><h2>Un stack que<br /><em>crece conmigo.</em></h2></div><p className="heading-note">Sin porcentajes inventados.<br />Solo herramientas en contexto.</p></div>
            <div className="skills-grid">{skills.map((skill) => { const SkillIcon = iconForSkill[skill.title] || Code2; return <article className={`skill-card ${skill.tone}`} key={skill.title}><div className="skill-card-head"><span className="skill-icon"><SkillIcon size={19} /></span><span>área / {skill.title.toLowerCase()}</span></div><h3>{skill.title}</h3><p>{skill.kicker}</p><div className="skill-items">{skill.items.map((item) => <span key={item}>{item}</span>)}</div></article>; })}</div>

            <div className="soft-skills">
              <div className="cert-head"><span><Users size={13} /> Competencias blandas</span><span>Más allá del código, el éxito de un proyecto depende de la colaboración y la comunicación.</span></div>
              <div className="soft-grid">
                {softSkills.map((skill, index) => (
                  <div className="soft-item" key={skill.title}><span className="exploring-code">{String(index + 1).padStart(2, "0")}</span><div><h3>{skill.title}</h3><p>{skill.text}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-pad exploring-section">
          <div className="container exploring-grid"><div className="exploring-intro"><span className="section-index">07 / siguiente</span><h2>Actualmente<br /><em>explorando.</em></h2><p>El aprendizaje continuo no es una nota al pie: es parte del trabajo.</p></div><div className="exploring-list">{exploring.map((item) => <div className="exploring-item" key={item.code}><span className="exploring-code">{item.code}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ChevronDown size={17} /></div>)}</div></div>
        </section>

        <section id="formacion" className="section section-pad education-section">
          <div className="container education-grid">
            <div><span className="section-index">08 / base</span><h2>Formación que<br /><em>abre posibilidades.</em></h2><p className="education-note">La ingeniería como punto de partida para conectar sistemas, personas y decisiones.</p></div>
            <div className="education-card">
              <div className="edu-top"><span className="edu-icon"><GraduationCap size={18} /></span><span>formación académica</span><span className="edu-year">2022 — ACTUALIDAD</span></div>
              <h3>Ingeniería<br />Informática</h3>
              <div className="edu-bottom"><span>Universidad<br /><b>{profile.university}</b></span><span>Estado<br /><b>{profile.cycle}</b></span></div>
            </div>
          </div>
          <div className="container edu-list">
            {education.map((item) => (
              <div className={`edu-row ${item.current ? "is-current" : ""}`} key={item.title}>
                <span className="edu-period">{item.period}</span>
                <div><h3>{item.title}</h3><p>{item.institution}</p></div>
                <span className="edu-note">{item.note}</span>
              </div>
            ))}
          </div>
          <div className="container certifications">
            <div className="cert-head"><span><Award size={13} /> Certificaciones y logros</span><span>Haz clic en cada una para ver el certificado</span></div>
            {certifications.map((cert) => (
              <button className="cert-row" key={cert.title} onClick={() => setSelectedCert(cert)}>
                <span className="cert-logo"><img src={cert.logo} alt="" loading="lazy" /></span>
                <div><h3>{cert.title}</h3><p>{cert.institution} · {cert.date}{cert.hours ? ` · ${cert.hours}` : ""}</p></div>
                <span className="cert-action">Ver certificado <ExternalLink size={14} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="section section-pad beyond-section">
          <div className="container beyond-grid">
            <div><span className="section-index">09 / persona</span><h2>Más allá<br /><em>del código.</em></h2></div>
            <div className="beyond-quote"><span className="quote-mark">“</span><blockquote>Transformar curiosidad en proyectos, trabajar con otros y mantener la mente abierta a la siguiente pregunta.</blockquote><div className="quote-signature"><span className="signature-line" /> <span>Gian Quezada<br /><small>datos · software · nube</small></span></div></div>
            <div className="interest-grid">
              {interests.map((interest, index) => {
                const InterestIcon = iconForInterest[index] || Sparkles;
                return <div className="interest-item" key={interest.title}><InterestIcon size={16} /><div><b>{interest.title}</b><span>{interest.text}</span></div></div>;
              })}
            </div>
          </div>
        </section>

        <section id="contacto" className="section section-pad contact-section">
          <div className="container contact-grid">
            <div className="contact-intro">
              <span className="section-index">10 / contacto</span>
              <h2>¿Construimos<br /><em>algo juntos?</em></h2>
              <p>Estoy abierto a prácticas pre-profesionales, oportunidades de aprendizaje, proyectos tecnológicos y colaboraciones en desarrollo de software, datos y cloud computing.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><Mail size={16} /><span><small>Email</small>{profile.email}</span><ArrowUpRight size={15} /></a>
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /><span><small>LinkedIn</small>{profile.linkedin}</span><ArrowUpRight size={15} /></a>
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /><span><small>GitHub</small>{profile.github}</span><ArrowUpRight size={15} /></a>
                <a href={profile.phoneHref}><Phone size={16} /><span><small>Teléfono</small>{profile.phone}</span><ArrowUpRight size={15} /></a>
                <a href={profile.cv} target="_blank" rel="noopener noreferrer"><Download size={16} /><span><small>Currículum</small>CV_QUEZADA_GIAN.pdf</span><ArrowUpRight size={15} /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-kicker"><Terminal size={16} /> / send a signal</div>
              <label>Nombre<input name="name" type="text" placeholder="Tu nombre" required /></label>
              <label>Correo<input name="email" type="email" placeholder="tu@email.com" required /></label>
              <label>Mensaje<textarea name="message" placeholder="Cuéntame qué tienes en mente..." rows={5} required /></label>
              <button type="submit" className="button button-primary button-submit">{submitted ? <>Mensaje preparado <Check size={16} /></> : <>Enviar mensaje <Send size={15} /></>}</button>
              {submitted && <p className="form-success">Se abrió tu cliente de correo con el mensaje listo. Si no se abrió, escríbeme a {profile.email}.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand"><span className="brand-mark"><span /></span><span>{profile.fullName} <i>© {new Date().getFullYear()}</i></span></div>
          <p><MapPin size={11} /> {profile.location} · Diseñado y desarrollado con curiosidad, código y café.</p>
          <div className="footer-links"><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a><a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={`mailto:${profile.email}`}>Email</a></div>
        </div>
      </footer>

      {selectedCert && <CertificateModal cert={selectedCert} onClose={closeCert} />}
    </div>
  );
}
