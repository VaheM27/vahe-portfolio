export const personalInfo = {
  name: "Vahe Mnatsakanyan",
  title: "Frontend Developer (React/Next.js)",
  tagline: "Crafting immersive web & 3D experiences with React, Next.js & Three.js",
  email: "vmnatsakanyan27@gmail.com",
  phone: "+374 98 674141",
  location: "Yerevan, Armenia",
  about: `Passionate Frontend Developer with 3+ years of experience building user-friendly,
    responsive, and scalable web applications using React.js, Next.js, Redux Toolkit, and
    TypeScript. Skilled in writing clean, maintainable code and collaborating with cross-functional
    teams to deliver high-quality digital products.`,
  aboutExtended: `Experienced in creating advanced frontend visuals and 3D interactive experiences
    using Spline and Three.js. I also teach frontend development at SmartCode, guiding students
    through HTML, CSS, and real-world project workflows — which keeps me sharp and deeply invested
    in the craft.`,
  social: {
    github: "https://github.com/VaheM27",
    linkedin: "https://www.linkedin.com/in/vahe-mnatsakanyan-665157202/",
  },
};

export const skills = [
  {
    name: "React.js",
    category: "core",
    icon: "react",
    url: "https://react.dev",
  },
  {
    name: "Next.js",
    category: "core",
    icon: "nextjs",
    url: "https://nextjs.org",
  },
  {
    name: "JavaScript",
    category: "core",
    icon: "javascript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "TypeScript",
    category: "core",
    icon: "typescript",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "Redux Toolkit",
    category: "state",
    icon: "redux",
    url: "https://redux-toolkit.js.org",
  },
  {
    name: "SCSS",
    category: "styling",
    icon: "sass",
    url: "https://sass-lang.com",
  },
  {
    name: "HTML / CSS",
    category: "styling",
    icon: "html5",
    url: "https://developer.mozilla.org/en-US/docs/Web",
  },
  {
    name: "Three.js",
    category: "3d",
    icon: "threejs",
    url: "https://threejs.org",
  },
  {
    name: "Spline",
    category: "3d",
    icon: "spline",
    url: "https://spline.design",
  },
  { name: "Git", category: "tools", icon: "git", url: "https://git-scm.com" },
  {
    name: "Webpack",
    category: "tools",
    icon: "webpack",
    url: "https://webpack.js.org",
  },
  { name: "Figma", category: "tools", icon: "figma", url: "https://figma.com" },
  {
    name: "DigitalOcean",
    category: "tools",
    icon: "digitalocean",
    url: "https://www.digitalocean.com/",
  },
  {
    name: "Storybook",
    category: "tools",
    icon: "storybook",
    url: "https://storybook.js.org",
  },
  {
    name: "Postman",
    category: "tools",
    icon: "postman",
    url: "https://postman.com",
  },
  {
    name: "ChatGPT",
    category: "ai",
    icon: "openai",
    url: "https://chat.openai.com",
  },
  { name: "Claude", category: "ai", icon: "claude", url: "https://claude.ai" },
  { name: "v0 by Vercel", category: "ai", icon: "v0", url: "https://v0.dev" },
  { name: "Cursor", category: "ai", icon: "cursor", url: "https://cursor.sh" },
  {
    name: "GitHub Copilot",
    category: "ai",
    icon: "copilot",
    url: "https://github.com/features/copilot",
  },
  {
    name: "Midjourney",
    category: "ai",
    icon: "midjourney",
    url: "https://midjourney.com",
  },
  { name: "Make.com", category: "ai", icon: "make", url: "https://make.com" },
];

export const skillCategories = [
  { key: "all", label: "All" },
  { key: "core", label: "Core" },
  { key: "styling", label: "Styling" },
  { key: "state", label: "State" },
  { key: "3d", label: "3D / Visual" },
  { key: "tools", label: "Tools" },
  { key: "ai", label: "✦ AI Tools" },
];

export const projects = [
  {
    id: 1,
    title: "Yanium — AI Engineering Co.",
    description:
      "Frontend for a full-stack AI & product engineering company based in Yerevan. Built with Next.js and SCSS modules with immersive 3D interactive sections using Spline and Three.js. Integrated DigitalOcean Spaces for media management and ensured pixel-perfect, high-performance UI across all devices.",
    tech: ["Next.js", "TypeScript", "SCSS", "Three.js", "Spline", "DigitalOcean"],
    image: "/projects/yanium.png",
    color: "#059669",
    liveUrl: "https://yanium.com",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "DAO Maker — DeFi Platform",
    description:
      "Frontend for one of the leading Web3 launchpad platforms. Built a DAO Maker-style interface with wallet integration, real-time on-chain data, staking UI, and a polished Web3-focused experience used by thousands of crypto investors.",
    tech: ["React.js", "TypeScript", "Web3.js", "Redux Toolkit", "SCSS"],
    image: "/projects/dao.png",
    color: "#0d9488",
    liveUrl: "https://app.daomaker.com",
    githubUrl: "#",
    featured: true,
    previewImage: "/projects/dao-preview.png",
  },
  {
    id: 3,
    title: "Recrout — Hiring Platform",
    description:
      "Skills-based recruitment platform that eliminates hiring bias through competency-driven matching. Built responsive UI with candidate management dashboards, job listing workflows, and data-driven decision tools.",
    tech: ["React.js", "TypeScript", "SCSS", "REST APIs", "Redux"],
    image: "/projects/recrout.png",
    color: "#16a34a",
    liveUrl: "https://recrout.com",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "PrimeEin — EIN Filing Service",
    description:
      "Streamlined online platform helping businesses obtain an Employer Identification Number (EIN) from the IRS. Clean, guided multi-step application flow with secure form handling and fast, responsive UI.",
    tech: ["React.js", "Next.js", "SCSS", "TypeScript"],
    image: "/projects/primeein.png",
    color: "#65a30d",
    liveUrl: "https://primeein.com",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Floid — Gaming Portal",
    description:
      "Immersive player-focused portal for The Finals competitive game by Spynix. Features a cinematic landing experience with 3D visuals and interactive elements designed to engage the gaming community.",
    tech: ["React.js", "Three.js", "Spline", "SCSS", "Framer Motion"],
    image: "/projects/floid.png",
    color: "#10b981",
    liveUrl: "https://www.floid.pro",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Skill Injected — Streamer Sites",
    description:
      "A web development service creating custom, game-themed portfolio sites for esports players and streamers. Built unique player profiles with stats, stream schedules, and sponsor sections — delivered in ~14 days.",
    tech: ["React.js", "Next.js", "SCSS", "Spline", "TypeScript"],
    image: "/projects/skillinjected.png",
    color: "#0d9488",
    liveUrl: "https://www.skillinjected.com",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Prodigy Streamer — Gaming Brand",
    description:
      "Personal brand site for competitive gamer Ethan (ItzProdigy), featuring The Finals gameplay highlights, Twitch stream integration, multi-platform social links, and a Dubby Energy partnership showcase.",
    tech: ["React.js", "Spline", "Three.js", "SCSS", "Framer Motion"],
    image: "/projects/prodigy.png",
    color: "#86efac",
    liveUrl: "https://www.itzprodigy.pro",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 8,
    title: "Cool Cats — Entertainment Brand",
    description:
      "Frontend for the Cool Cats animated series and entertainment brand. Features episodes, Cooltopia mini-games, merchandise, and vibrant community engagement across platforms, all wrapped in a colorful, character-driven visual experience.",
    tech: ["React.js", "Next.js", "TypeScript", "SCSS", "Framer Motion"],
    image: "/projects/coolcats.png",
    color: "#4ade80",
    liveUrl: "https://coolcats.com",
    githubUrl: "#",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    company: "Yanium",
    role: "Frontend Developer",
    duration: "Jun 2023 – Present",
    type: "Full-time",
    location: "Yerevan, Armenia",
    description:
      "Working at a full-stack AI & product engineering company, delivering pixel-perfect, high-performance frontends while bringing products to life with 3D interactive experiences and SEO-optimized Next.js architecture.",
    responsibilities: [
      "Built 3D interactive visuals using Spline and Three.js",
      "Developed SEO-optimized Next.js layouts with SCSS modules",
      "Integrated DigitalOcean Spaces for scalable media management",
      "Ensured pixel-perfect, high-performance UI across all breakpoints",
    ],
    tech: ["Next.js", "TypeScript", "SCSS", "Three.js", "Spline", "DigitalOcean"],
  },
  {
    id: 2,
    company: "SmartCode",
    role: "Frontend Lecturer",
    duration: "Mar 2023 – Present",
    type: "Part-time",
    location: "Yerevan, Armenia",
    description:
      "Teaching the next generation of frontend developers — covering HTML, CSS, responsive design, and real-world project workflows. Mentoring students through hands-on coding sessions.",
    responsibilities: [
      "Teach HTML, CSS, and responsive design principles to students",
      "Lead live coding sessions and guide real-world projects",
      "Help learners improve frontend skills and debugging techniques",
      "Design curriculum covering modern web development practices",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Design"],
  },
  {
    id: 3,
    company: "Cypress",
    role: "Frontend Developer",
    duration: "Oct 2022 – Oct 2023",
    type: "Full-time",
    location: "Remote",
    description:
      "Built a React.js-based social media management platform from the ground up, enabling SMM professionals to plan, schedule, and auto-publish content across multiple platforms simultaneously.",
    responsibilities: [
      "Built React.js platform for SMM managers to plan and schedule posts",
      "Integrated APIs for automatic cross-platform content publishing",
      "Delivered fully responsive UI with a reusable component architecture",
      "Collaborated closely with backend team to design clean API contracts",
    ],
    tech: ["React.js", "JavaScript", "Redux Toolkit", "SCSS", "REST APIs"],
  },
  {
    id: 4,
    company: "Solicy",
    role: "Software Developer",
    duration: "Feb 2022 – Oct 2022",
    type: "Full-time",
    location: "Yerevan, Armenia",
    description:
      "Contributed to fast-paced projects in the crypto and recruitment sectors, building polished interfaces for blockchain platforms and HR tools with modern UI/UX standards.",
    responsibilities: [
      "Contributed to projects in crypto and recruitment sectors",
      "Built a DAO Maker–style crypto platform with wallet integration",
      "Created a recruitment platform with modern UI/UX",
      "Wrote clean, reusable React components across multiple products",
    ],
    tech: ["React.js", "JavaScript", "Web3.js", "SCSS", "Redux"],
  },
];

export const education = {
  degree: "Software Development",
  school: "National Polytechnic University of Armenia",
  duration: "Sep 2021 – May 2024",
};

export const languages = ["Armenian", "English", "Russian"];
