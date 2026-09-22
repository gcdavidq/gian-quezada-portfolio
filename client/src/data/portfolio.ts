// Contenido del portafolio. Todo el texto visible vive aquí para editarlo sin tocar el layout.

export type Accent = "mint" | "blue" | "violet" | "orange";

export const profile = {
  name: "Gian Quezada",
  fullName: "Gian Carlos Quezada Marceliano",
  role: "Estudiante de Ingeniería Informática",
  university: "Universidad Peruana Cayetano Heredia",
  universityShort: "UPCH",
  cycle: "9vo ciclo",
  location: "Lima, Perú",
  focus: "Data Science · Cloud Computing · Software",
  status: "Disponible para prácticas",
  languages: "Inglés (intermedio)",
  email: "gcdavidq12@gmail.com",
  phone: "+51 904 956 422",
  phoneHref: "tel:+51904956422",
  linkedin: "linkedin.com/in/gian-carlos-quezada-marceliano",
  linkedinUrl: "https://www.linkedin.com/in/gian-carlos-quezada-marceliano-8655a3247/",
  github: "github.com/gcdavidq",
  githubUrl: "https://github.com/gcdavidq",
  cv: "/CV_QUEZADA_GIAN.pdf",
  photo: "/img/gian.jpeg",
};

export const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" },
];

export const rotatingRoles = [
  "Estudiante de Ingeniería Informática",
  "Data Science & Machine Learning",
  "Cloud Computing · AWS",
  "Desarrollo de software full stack",
];

export type JourneyItem = {
  date: string;
  title: string;
  text: string;
  status: "done" | "current" | "next";
};

// Trayectoria real + plan de carrera en una sola línea de tiempo.
export const journey: JourneyItem[] = [
  { date: "2017–2021", title: "Educación secundaria", text: "Colegio Nacional San Nicolás.", status: "done" },
  { date: "2022", title: "Ingeniería Informática", text: "Ingreso a la Universidad Peruana Cayetano Heredia.", status: "done" },
  { date: "2025-2026", title: "Pasantía de Desarrollo Web", text: "Plataforma para la automatización de convenios usando LLMs.", status: "done" },
  { date: "2026–2027", title: "Prácticas pre-profesionales", text: "En búsqueda de una oportunidad para desarrollarme como profesional.", status: "current" },
  { date: "2026", title: "Tesis", text: "Desarrollo y sustentación en interoperabilidad y estandares FHIR.", status: "current" },
  { date: "2027", title: "Bachiller y título", text: "Ingeniero Informático titulado.", status: "next" },
  { date: "2027", title: "Junior Data Scientist", text: "Practicante / Junior Data Scientist con base de arquitectura de software.", status: "next" },
  { date: "2028+", title: "Liderazgo técnico", text: "Tech Lead / Senior Developer.", status: "next" },
];

export type ProjectVisual = "screenshot" | "routes" | "cluster" | "moving" | "database" | "search";

export type Project = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  category: string[];
  role: string;
  status: string;
  accent: Accent;
  visual: ProjectVisual;
  image?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "focushive",
    eyebrow: "EdTech · Plataforma web",
    title: "FocusHive",
    description:
      "Plataforma web integral que optimiza el rendimiento académico mediante diagnósticos de metodología de estudio y seguimiento de progreso.",
    problem: "Los estudiantes no saben qué método de estudio les funciona ni cómo medir su avance.",
    solution: "Diagnóstico personalizado del método de estudio, seguimiento de progreso y motivación en comunidad.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS", "Python"],
    category: ["Web", "Cloud"],
    role: "Desarrollo de la plataforma web",
    status: "Demo en línea",
    accent: "mint",
    visual: "screenshot",
    image: "/img/projects/focushive.png",
    github: "https://github.com/gcdavidq/FocusHiveFinal",
    demo: "https://focushive-web.onrender.com",
  },
  {
    id: "retinopatia",
    eyebrow: "Deep learning · Visión médica",
    title: "Detección de retinopatía diabética",
    description:
      "Clasificador de imágenes de fondo de ojo que estima la probabilidad de retinopatía diabética y muestra con un mapa Grad-CAM en qué zonas de la retina se fijó para decidir. AUC-ROC de 0.998 y sensibilidad del 99.2 % sobre 733 imágenes de validación de APTOS 2019.",
    problem:
      "La retinopatía diabética es una causa prevenible de ceguera, pero su detección temprana requiere que un especialista revise cada retinografía.",
    solution:
      "ResNet50 con transfer learning en dos etapas, exportada a ONNX con el Grad-CAM calculado dentro del propio modelo. Se sirve con una API FastAPI sin TensorFlow y una web React con demo interactiva.",
    stack: ["Python", "TensorFlow / Keras", "ResNet50", "ONNX Runtime", "FastAPI", "React", "Docker", "pytest", "GitHub Actions"],
    category: ["IA / ML", "Data"],
    role: "Equipo de 3 · modelo, API y despliegue",
    status: "Demo en línea",
    accent: "orange",
    visual: "screenshot",
    image: "/img/projects/retinopatia.png",
    github: "https://github.com/gcdavidq/Maching_Learning_Group",
    demo: "https://retinopatia-ml.onrender.com",
  },
  {
    id: "buscador-imagenes",
    eyebrow: "IA multimodal · Búsqueda vectorial",
    title: "Buscador multimodal de imágenes",
    description:
      "Escribe “un gato durmiendo en un sofá” o sube una foto y recibe las imágenes más parecidas de MS COCO en milisegundos. Texto e imagen comparten un mismo espacio vectorial de 512 dimensiones, así que un único índice sirve para ambas búsquedas, en más de 100 idiomas.",
    problem:
      "Las búsquedas por palabras clave no entienden el contenido visual: no encuentran una foto a partir de su descripción ni imágenes parecidas a otra.",
    solution:
      "Embeddings CLIP multilingües (XLM-RoBERTa + ViT-B/32) guardados en PostgreSQL con pgvector e índice HNSW, con FAISS como alternativa sin base de datos. API FastAPI desplegada en Google Cloud Run y base de datos en Neon.",
    stack: ["Python", "PyTorch", "CLIP (open_clip)", "FastAPI", "PostgreSQL", "pgvector", "FAISS", "Google Cloud Run", "Docker", "Vite"],
    category: ["IA / ML", "Cloud", "Data"],
    role: "Proyecto individual · diseño y desarrollo completo",
    status: "Proyecto personal",
    accent: "violet",
    visual: "screenshot",
    image: "/img/projects/image_search.png",
    github: "https://github.com/gcdavidq/Project_imagen_search_system",
  },
  {
    id: "sismos-peru",
    eyebrow: "Data analytics · Geoespacial",
    title: "Sismos en el Perú (1960 – 2022)",
    description:
      "Panel interactivo para explorar 23 213 sismos registrados por el Instituto Geofísico del Perú: dónde ocurren, qué tan fuertes son, a qué profundidad se originan y qué departamentos concentran los eventos más fuertes.",
    problem:
      "El catálogo sísmico del IGP es público, pero como tabla cruda es difícil sacar conclusiones sobre la actividad sísmica de cada región.",
    solution:
      "Mapas de calor y coropléticos, análisis por magnitud y profundidad, y una unión espacial que asigna cada sismo de magnitud ≥ 5 a su departamento, con filtros por fechas y descarga de datos.",
    stack: ["Python", "Streamlit", "pandas", "GeoPandas", "Folium", "Plotly", "pytest", "GitHub Actions"],
    category: ["Data"],
    role: "Equipo de 5 · análisis y modernización",
    status: "Demo en línea",
    accent: "mint",
    visual: "screenshot",
    image: "/img/projects/sismos-peru.png",
    github: "https://github.com/gcdavidq/Project_PA",
    demo: "https://sismos-peru.streamlit.app/",
  },
  {
    id: "ecoroutex",
    eyebrow: "Optimización · Smart city",
    title: "EcoRoutex — Rutas de recolección de residuos",
    description:
      "Software inteligente que genera rutas dinámicas para los camiones recolectores de residuos sólidos en distritos de Lima, desplegado en AWS con frontend en React.",
    problem: "Rutas de recolección ineficientes que elevan costos operativos e impacto ambiental.",
    solution:
      "Algoritmo de optimización (Dijkstra sobre grafos viales con OSMnx y NetworkX) que calcula en tiempo real la ruta más eficiente para cada camión, con panel para municipios y conductores.",
    stack: ["Python", "React", "MySQL", "AWS Lambda", "EC2", "S3", "CloudFront", "API Gateway", "OSMnx", "NetworkX"],
    category: ["Cloud", "Data"],
    role: "Trabajo en equipo · algoritmo y despliegue",
    status: "Proyecto académico",
    accent: "blue",
    visual: "screenshot",
    image: "/img/projects/ecoroutex.png",
    github: "https://github.com/gcdavidq/Project_PI1",
    demo: "https://ecoroutex-xzwa.onrender.com"
  },
  {
    id: "quive",
    eyebrow: "Marketplace · Logística",
    title: "QUIVE — Gestión de mudanzas",
    description:
      "Aplicación web responsiva que conecta clientes con transportistas: autenticación con Google, cálculo de rutas, gestión de pagos y asignaciones dinámicas.",
    problem: "Contratar una mudanza es informal y difícil de coordinar entre clientes y transportistas.",
    solution:
      "Backend en Flask desplegado en EC2 y frontend en React con AWS Amplify, APIs RESTful, mapas interactivos y base de datos relacional escalable.",
    stack: ["Python", "Flask", "React", "AWS EC2", "AWS Amplify", "PostgreSQL", "Leaflet.js", "Google OAuth", "REST APIs"],
    category: ["Web", "Cloud"],
    role: "Desarrollo full stack e infraestructura",
    status: "Proyecto personal",
    accent: "orange",
    visual: "screenshot",
    image: "/img/projects/quive.png",
    github: "https://github.com/gcdavidq/QUIVE",
    demo: "https://quive-zeta.vercel.app/"
  },
  {
    id: "votacion",
    eyebrow: "Computación paralela",
    title: "Votación electrónica distribuida",
    description:
      "Sistema de votación seguro y distribuido implementado con MPI y CUDA para procesamiento paralelo de alta velocidad y seguridad criptográfica.",
    problem: "Contar grandes volúmenes de votos de forma rápida, verificable y segura.",
    solution: "Procesamiento distribuido entre nodos con MPI y aceleración en GPU con CUDA para las operaciones criptográficas.",
    stack: ["C", "MPI", "CUDA", "Sistemas distribuidos"],
    category: ["Sistemas distribuidos"],
    role: "Liderazgo técnico del equipo",
    status: "Proyecto académico",
    accent: "violet",
    visual: "screenshot",
    image: "/img/projects/votaciondistribuida.png",
    github: "https://github.com/gcdavidq/CPyD-Project",
    demo: "https://votacion-distribuida-dashboard.onrender.com/panel"
  },
  {
    id: "red-social",
    eyebrow: "Bases de datos · APIs",
    title: "Red social con bases de datos multidimensionales",
    description:
      "Prototipo de red social que integra bases de datos SQL y NoSQL para modelar toda la información de los usuarios, con APIs escalables para la comunicación y gestión de datos.",
    problem: "Manejar grandes volúmenes de datos heterogéneos con consistencia y flexibilidad.",
    solution: "Enfoque dual SQL + NoSQL con APIs que aseguran robustez, consistencia y eficiencia en el intercambio de datos.",
    stack: ["Python", "MySQL", "MongoDB", "HeidiSQL", "HTML", "CSS"],
    category: ["Data", "Web"],
    role: "Trabajo en equipo · modelado de datos y APIs",
    status: "Proyecto académico",
    accent: "mint",
    visual: "database",
    github: "https://github.com/gcdavidq/Project_BD_FINAL",
  },
];

export const experiences = [
  {
    label: "Pasantía · Proyecto de automatización",
    title: "Pasante de Desarrollo — Universidad Peruana Cayetano Heredia",
    text:
      "Participé en el desarrollo de una plataforma web que automatiza la gestión de convenios institucionales, reemplazando procesos manuales. Implemento módulos clave con PHP (Laravel) y PostgreSQL, ademas de LLMs que permitan un mejor analisis de cada convenio: flujos de aprobación, gestión de firmas de convenios y paneles de control con indicadores para mejorar la eficiencia y trazabilidad del proceso.",
    period: "May 2025 — Jun 2026",
    tags: ["PHP", "Laravel", "PostgreSQL", "Dashboards", "GROQ"],
  },
  {
    label: "Reconocimiento · Hackathon",
    title: "Finalista — Hackathon UPCH 2025",
    text:
      "Entre los 8 mejores equipos con FocusUp, una plataforma de organización personalizada para cada estudiante.",
    period: "2025",
    tags: ["Top 8", "Producto", "Trabajo en equipo"],
  },
  {
    label: "Programa · Formación continua",
    title: "Oracle Next Education (ONE) — Oracle + Alura Latam",
    text:
      "Programa de formación en tecnología de Oracle y Alura Latam. Completé la formación Principiante en Programación (10 cursos, 78 horas) y opté por la ruta de Especialista en Data Science y AI.",
    period: "Jun 2025 — Agosto 2026",
    tags: ["Lógica de programación", "Data Science", "AI", "Virtual", "ML"],
  },
];

export const testimonials = [
  {
    quote:
      "Gian Carlos demostró una capacidad excepcional para resolver problemas complejos durante el desarrollo del sistema distribuido. Su liderazgo técnico fue clave para el éxito del equipo.",
    name: "Dr. Marco Antonio Alania Vicente",
    role: "Profesor de Computación Paralela y Distribuida",
  },
  {
    quote:
      "Ser parte de un proyecto junto a Gian fue una experiencia increíble. Su manera de comunicar y conectar con el equipo marcó la diferencia y contribuyó directamente al éxito del proyecto.",
    name: "Magno Luque",
    role: "Compañero de proyectos",
  },
];

export const skills: { title: string; kicker: string; tone: Accent; items: string[] }[] = [
  { title: "Lenguajes", kicker: "La base para resolver problemas.", tone: "mint", items: ["Python", "JavaScript", "TypeScript", "C++", "C", "SQL", "R", "PHP"] },
  { title: "Backend", kicker: "APIs y datos que sostienen el producto.", tone: "blue", items: ["Node.js", "FastAPI", "Flask", "Laravel", "PostgreSQL", "MySQL", "MongoDB", "REST APIs"] },
  { title: "Frontend", kicker: "Interfaces claras y responsivas.", tone: "violet", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS", "Figma"] },
  { title: "Cloud & DevOps", kicker: "Llevar las soluciones a producción.", tone: "orange", items: ["AWS", "EC2", "S3", "Lambda", "Amplify", "CloudFront", "Docker", "Git", "CI/CD", "Linux"] },
  { title: "AI / ML & Data", kicker: "De los datos a las decisiones.", tone: "mint", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "Power BI", "Excel", "NetworkX"] },
  { title: "Métodos & herramientas", kicker: "Cómo trabajo en equipo.", tone: "blue", items: ["Scrum", "Metodologías ágiles", "Jira", "GitHub", "Google Workspace", "Windows", "Linux"] },
];

export const softSkills = [
  { title: "Trabajo en equipo", text: "Colaboro eficazmente en entornos multidisciplinarios." },
  { title: "Pensamiento crítico", text: "Análisis objetivo para tomar decisiones fundamentadas." },
  { title: "Gestión del tiempo", text: "Organización eficiente para cumplir plazos exigentes." },
  { title: "Comunicación", text: "Transmito ideas técnicas con claridad a audiencias diversas." },
  { title: "Liderazgo", text: "Iniciativa para guiar proyectos y motivar a mis compañeros." },
  { title: "Adaptabilidad", text: "Flexibilidad ante nuevas tecnologías y metodologías." },
];

export const exploring = [
  { code: "01", title: "Interoperabilidad y estandares FHIR", text: "La línea de investigación de mi tesis: crear un pipeline interoperable entre sistemas de salud con estandares FHIR para mejorar la calidad de datos en fichas epidemiologicas." },
  { code: "02", title: "Analisis de Datos y Machine Learning", text: "Explorando el uso de LLMs para el analisis de datos y la creación de modelos que conviertan datos en decisiones." },
  { code: "03", title: "Ingeniería de datos", text: "Pipelines ETL, data lakes y data warehouses con AWS Glue y Amazon Redshift." },
  { code: "04", title: "Arquitectura de soluciones en AWS", text: "Diseño de infraestructuras escalables, seguras y eficientes en costos, con la mira en AWS Solutions Architect." },
];

export const education = [
  {
    period: "Abr 2022 — Actualidad",
    title: "Ingeniería Informática",
    institution: "Universidad Peruana Cayetano Heredia",
    note: "9no ciclo",
    current: true,
  },
  {
    period: "Jun 2025 — Agosto 2026",
    title: "Oracle Next Education (ONE)",
    institution: "Oracle + Alura Latam · Virtual",
    note: "Especialista en Data Science y AI",
    current: true,
  },
  {
    period: "2017 — 2021",
    title: "Educación secundaria",
    institution: "Colegio Nacional San Nicolás",
    note: "Completada",
    current: false,
  },
];

export type Certification = {
  title: string;
  institution: string;
  date: string;
  year: string;
  logo: string;
  image: string;
  description: string;
  learned: string;
  hours?: string;
  skills: string[];
  credentialId?: string;
  verifyUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "AWS Academy Graduate — Introduction to Cloud",
    institution: "Amazon Web Services · AWS Academy",
    date: "20 oct 2024",
    year: "2024",
    logo: "/img/logos/aws.png",
    image: "/img/certs/aws-cloud.jpg",
    description:
      "Acredita conocimientos fundamentales sobre los servicios, la arquitectura y los beneficios del cloud computing en AWS (ruta Cloud Practitioner).",
    learned:
      "Servicios esenciales como EC2, S3, IAM y RDS, principios de arquitectura en la nube, modelos de costos y mejores prácticas de seguridad.",
    hours: "60 horas",
    skills: ["AWS Core Services", "Cloud Fundamentals", "Security & Compliance", "Billing & Pricing"],
    verifyUrl: "https://www.credly.com/go/0JpwL7nb",
  },
  {
    title: "AWS Academy Graduate — Data Engineering",
    institution: "Amazon Web Services · AWS Academy",
    date: "13 nov 2024",
    year: "2024",
    logo: "/img/logos/aws.png",
    image: "/img/certs/aws-data-engineering.jpg",
    description: "Diseño, construcción y mantenimiento de pipelines de datos escalables en AWS.",
    learned:
      "Arquitecturas de datos, procesos ETL con AWS Glue, optimización de consultas en Amazon Redshift y buenas prácticas para data lakes.",
    hours: "40 horas",
    skills: ["Data Pipelines", "ETL", "AWS Glue", "Amazon Redshift", "Data Lakes"],
    verifyUrl: "https://www.credly.com/go/0rZLkTcU",
  },
  {
    title: "Scrum Foundation Professional Certification (SFPC)",
    institution: "CertiProf",
    date: "15 ago 2024",
    year: "2024",
    logo: "/img/logos/certiprof.jpg",
    image: "/img/certs/scrum.jpg",
    description: "Fundamentos del marco Scrum aplicado a la gestión ágil de proyectos.",
    learned:
      "Roles, artefactos y ceremonias de Scrum, junto con herramientas para mejorar la comunicación del equipo y facilitar proyectos de forma ágil.",
    skills: ["Scrum Framework", "Agile Mindset", "Team Collaboration", "Project Facilitation"],
    credentialId: "99082481",
  },
  {
    title: "Gestión de la madurez tecnológica: TRL",
    institution: "CONCYTEC · Plataforma Vincúlate",
    date: "11 nov 2024",
    year: "2024",
    logo: "/img/logos/concytec.png",
    image: "/img/certs/concytec.jpg",
    description:
      "Curso MOOC sobre evaluación del nivel de madurez tecnológica (Technology Readiness Levels) en proyectos científicos y de innovación.",
    learned:
      "Identificación y clasificación del nivel de madurez tecnológica, análisis de riesgos, hojas de ruta tecnológicas y validación de tecnologías en etapas tempranas.",
    hours: "20 horas",
    skills: ["TRL Assessment", "Innovation Management", "Technology Evaluation"],
  },
  {
    title: "2025 Aspire Leaders Program",
    institution: "Aspire Institute",
    date: "Ago 2025",
    year: "2025",
    logo: "/img/logos/aspire.webp",
    image: "/img/certs/aspire.jpg",
    description:
      "Programa internacional enfocado en liderazgo, pensamiento crítico y resolución de problemas en entornos globales.",
    learned:
      "Liderazgo, comunicación efectiva, toma de decisiones y exposición a casos globales de innovación y emprendimiento con impacto social.",
    hours: "40 horas",
    skills: ["Leadership", "Critical Thinking", "Teamwork", "Global Perspective"],
  },
  {
    title: "Principiante en Programación — G9 ONE",
    institution: "Oracle + Alura Latam",
    date: "17 sep 2025",
    year: "2025",
    logo: "/img/logos/alura.jpg",
    image: "/img/certs/alura.jpg",
    description:
      "Formación introductoria de Oracle Next Education: 10 cursos enfocados en lógica de programación y construcción de soluciones.",
    learned: "Variables, operadores, estructuras de control, funciones y resolución de problemas mediante programación.",
    hours: "78 horas",
    skills: ["Logic Building", "Problem Solving", "Algorithms", "Coding Fundamentals"],
  },
];

export const interests = [
  { title: "Inteligencia artificial", text: "Me apasiona comprender y aplicar modelos avanzados." },
  { title: "Tendencias tecnológicas", text: "Me gusta estar al día con los últimos avances del sector." },
  { title: "Eventos tecnológicos", text: "Disfruto asistir a summits, charlas y conferencias." },
  { title: "Ejercicio", text: "Me ayuda a mantenerme enfocado y liberar estrés." },
  { title: "Videojuegos", text: "Principalmente shooters y juegos competitivos." },
  { title: "Lectura", text: "Me gusta aprender un poco de todo cada día." },
];
