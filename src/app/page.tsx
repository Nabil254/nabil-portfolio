import FluidOrb from "@/components/FluidOrb";
import OrbitalCanvas from "@/components/OrbitalCanvas";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { BookOpenCheck, Gamepad2, Mail, MapPin, Phone, ScanEye } from "lucide-react";
import Link from "next/link";

type ProjectGroup = {
  title: string;
  tagline: string;
  accent: string;
  icon: LucideIcon;
  projects: {
    title: string;
    timeframe: string;
    description: string;
    impact: string;
    videoUrl: string;
  }[];
};

const heroStats = [
  { label: "Immersive Tech Focus", value: "Unity · Three.js · AR/VR · AI Assistants " },
  { label: "Education", value: "B.CompSc (Graphics & Multimedia Software), UTM" },
  { label: "Based in", value: "Bangi, Malaysia" },
];

const experiences = [
  {
    role: "Unity Developer Intern",
    company: "Adticles Sdn Bhd (Experiential Design Team)",
    timeframe: "Sept 2024 – Feb 2025",
    location: "Pantai Hill Park, Kuala Lumpur",
    bullets: [
      "Developed interactive AR/VR applications in Unity, balancing performance, storytelling, and rapid iteration.",
      "Built a web-based AI assistant with Three.js for a talking orb avatar and integrated JDN’s proprietary LLM.",
      "Collaborated with designers to refine UI/UX and prototyped new XR product features that improved usability feedback scores.",
    ],
  },
];

const projectGroups: ProjectGroup[] = [
  {
    title: "AR / VR Experiences",
    tagline: "XR, AR/VR, and intelligent interfaces for immersive experiences.",
    accent: "from-sky-500 via-cyan-400 to-emerald-400",
    icon: ScanEye,
    projects: [
      {
        title: "Ecco Golf VR Experience",
        timeframe: "Feb 2025 · Freelance",
        description:
          "Crafted a VR putting experience with telemetry capture for Ecco Golf, showcased during HSBC Women's World Championship in Singapore.",
        impact:
          "Merged immersive storytelling with analytics leaderboard, giving event stakeholders measurable engagement insights.",
        videoUrl: "https://drive.google.com/drive/u/0/folders/1rR4xTYmdBh2ZLhDGtMR4TWj7QBnRNB4d",
      },
      {
        title: "Portal with ManoMotion",
        timeframe: "July 2024 · Unity · ManoMotion SDK",
        description:
          "Built an AR portal demo where the ManoMotion hand-tracking SDK reads circular wrist rotations and pinch-to-drag gestures—letting users channel a Doctor Strange-style motion to carve portals, swipe between realms, and fan open spatial HUDs.",
        impact:
          "Demonstrates intuitive gesture UX—users can literally reach out to manipulate spatial interfaces without controllers.",
        videoUrl: "https://drive.google.com/file/d/1wv3b5Jx5NRwTMRhTlw1RlN1O-BbbbEUj/view",
      },
      {
        title: "Feature Tracking Web AR",
        timeframe: "April 2024 · WebAR · AR.js",
        description:
          "Shipped a browser-based AR experience where AR.js feature tracking locks holographic UI rings to printed markers, letting users orbit content without native installs.",
        impact:
          "Showcases how lightweight WebAR pipelines can deliver stable tracking, branded hero shots, and rapid-share demos straight from a URL—perfect for events or pitches.",
        videoUrl: "https://drive.google.com/file/d/12C0WAzt9p4r0_IiUxkRxWwrxNHXyfpAl/view",
      },
    ],
  },
  {
    title: "Game Development",
    tagline: "Unity gameplay systems and mechanics balancing.",
    accent: "from-fuchsia-500 via-purple-500 to-indigo-500",
    icon: Gamepad2,
    projects: [
      {
        title: "Wau Terbang 3D Game",
        timeframe: "June 2025 · Unity",
        description:
          "Endless-runner honoring Malaysia’s wau-kite heritage where players dodge obstacles through reactive input and layered VFX.",
        impact:
          "Balanced physics, pacing, and celebratory visuals to showcase cultural storytelling in a modern arcade loop.",
        videoUrl: "https://drive.google.com/file/d/16zyS5pMVPH5ccM1LS5RQMQBnRAM4Mvi6/view",
      },
      {
        title: "Virtual Showroom Explorer",
        timeframe: "May 2025 · Three.js · Socket.IO",
        description:
          "Multiplayer showroom with avatar movement, voice-ready chat hooks, and product hotspots to mimic in-person pitches on the web.",
        impact:
          "Bridges real-time collaboration with playful navigation, aligning more closely with game-like mechanics and networking patterns.",
        videoUrl: "https://drive.google.com/file/d/19zTVKcbVLEQ2_0H4OnA9Jp5Vm3NkJZ3M/view",
      },
    ],
  },
  {
    title: "Final Year Project",
    tagline: "Research-backed solutions for real learners.",
    accent: "from-amber-500 via-orange-500 to-rose-500",
    icon: BookOpenCheck,
    projects: [
      {
        title: "Augmented Reality Application on Learning Tajweed",
        timeframe: "FYP · Unity · Firebase",
        description:
          "AR learning companion supporting Quranic learners via marker recognition, animated guidance, and Firestore progress tracking.",
        impact:
          "Improves Tajweed retention by pairing phonetic feedback with spatial visualization so new readers build confidence faster.",
        videoUrl: "https://drive.google.com/file/d/1uYl-9TR1AfCUXtsbatl6HwpT5rcJh6bE/view?t=3",
      },
    ],
  },
];

const certifications = [
  {
    title: "CompTIA Cloud+ (CV0-004)",
    body:
      "Validated knowledge of cloud infrastructure, virtualization, and security fundamentals supporting backend choices for immersive apps.",
  },
  {
    title: "Augmented Reality Degree++",
    body:
      "Mentorship-based program focused on Unity, Photon Networking, and rapid prototyping of multiplayer mini games.",
  },
  {
    title: "AWS Foundations",
    body:
      "Completed AWS architecture, pricing, and security coursework to design reliable compute for realtime and analytics workloads.",
  },
];

const skillGroups = [
  {
    title: "Engines & Frameworks",
    items: ["Unity", "Three.js", "Socket.IO", "Photon PUN", "Ionic Framework"],
  },
  {
    title: "Languages & APIs",
    items: ["C#", "C/C++", "JavaScript", "Python", "Java", "PHP"],
  },
  {
    title: "Data & Cloud",
    items: ["Firebase", "Firestore", "SQL", "Oracle", "AWS", "OpenCV"],
  },
  {
    title: "Analytics & Productivity",
    items: ["Tableau", "Power BI", "WEKA", "Microsoft Office"],
  },
];

const languages = [
  { name: "Malay", level: "Native" },
  { name: "English", level: "Advanced" },
  { name: "Arabic", level: "Beginner" },
  { name: "Mandarin", level: "Beginner" },
];

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-80 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_80%_0,rgba(16,185,129,0.25),transparent_45%)]" />
      <OrbitalCanvas />
      <main className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
        <div className="mb-8 flex items-center justify-end gap-4">
          <nav className="rounded-full bg-white/70 px-5 py-2 text-sm font-semibold text-slate-700 shadow-md shadow-slate-900/10 backdrop-blur-md transition dark:bg-slate-900/60 dark:text-white dark:shadow-black/30">
            <ul className="flex items-center gap-3">
              <li>
                <a href="#projects" className="shortcut-link inline-flex items-center gap-1">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="shortcut-link inline-flex items-center gap-1">
                  About me
                </a>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-600 dark:text-sky-300">
              Immersive Tech Graduate
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              Muhammad Nabil Kamil
            </h1>
            <p className="text-lg text-slate-600 dark:text-white">
              Fresh Computer Science (Graphics & Multimedia Software) graduate focused on immersive tech experiences. I blend Unity, AR/VR, computer vision, and
              web tech to prototype user-centric solutions, learn fast, and thrive in highly
              collaborative teams.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-1 py-1 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition hover:shadow-sky-500/40"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 text-slate-900 transition group-hover:bg-slate-100 dark:bg-slate-950/70 dark:text-white dark:group-hover:bg-slate-900/80 px-6 py-3">
                  Download Resume
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
            <div className="glass-surface relative overflow-hidden rounded-3xl border border-white/10">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-200/70 via-transparent to-slate-200/70 dark:from-slate-900/60 dark:via-transparent dark:to-slate-900/60" />
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/92KXbFaDfZw?autoplay=1&mute=1&controls=0&loop=1&playlist=92KXbFaDfZw&modestbranding=1&rel=0&showinfo=0"
                  title="Portfolio teaser"
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className="glass-surface p-6">
              <div className="space-y-6">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="border-b border-white/5 pb-4 last:border-0">
                    <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-200">{stat.label}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
                  </div>
                ))}
              <div className="flex flex-col gap-3 pt-4 text-sm text-slate-600 dark:text-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Open to Unity, XR, and creative tech roles
                </div>
                <Link
                  href="mailto:nabilkamil0@gmail.com"
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2 text-slate-900 transition hover:border-slate-300 hover:bg-white/80 dark:border-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  nabilkamil0@gmail.com
                </Link>
                <Link
                  href="https://www.linkedin.com/in/muhammad-nabil-b8b8672bb/"
                  target="_blank"
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2 text-slate-900 transition hover:border-slate-300 hover:bg-white/80 dark:border-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-white">
                    <Image src="/linkedin.svg" alt="LinkedIn" width={18} height={18} className="opacity-90" />
                  </span>
                  /muhammad-nabil
                </Link>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2 text-slate-700 dark:border-white/10 dark:text-white/80">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">
                    <Phone className="h-4 w-4" />
                  </span>
                  +60 11-1325 5996
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mt-16 space-y-12">
          <div className="relative min-h-[420px] overflow-hidden rounded-[48px] bg-gradient-to-br from-slate-100/40 via-white/10 to-slate-200/40 shadow-[0_20px_80px_rgba(15,23,42,0.25)] transition-colors dark:from-slate-900/50 dark:via-slate-900/10 dark:to-slate-950/50 dark:shadow-[0_20px_80px_rgba(1,6,18,0.8)]">
            <FluidOrb />
          </div>
          {projectGroups.map((group) => {
            const Icon = group.icon;
            return (
            <div key={group.title} className="segment-node space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="segment-node__eyebrow text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white">
                    {group.tagline}
                  </p>
                  <h2 className="segment-node__title mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{group.title}</h2>
                </div>
                <span
                  className={`focus-pill inline-flex items-center rounded-full bg-gradient-to-r ${group.accent} px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  Focus
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {group.projects.map((project) => (
                  <article
                    key={project.title}
                    className="segment-card group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 transition dark:border-white/10 dark:bg-white/5"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-60 bg-gradient-to-br ${group.accent}`}
                    />
                    <div className="relative">
                      <p className="segment-card__eyebrow text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-white">
                        {project.timeframe}
                      </p>
                      <h3 className="segment-card__title mt-2 text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                      <p className="segment-card__body mt-3 text-sm text-slate-600 dark:text-white">{project.description}</p>
                      <p className="segment-card__impact mt-3 text-sm text-slate-500 dark:text-white">{project.impact}</p>
                      {project.videoUrl ? (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="segment-card__link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline-offset-4 hover:underline dark:text-white"
                        >
                          Watch demo
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 transition group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </a>
                      ) : project.title === "Ecco Golf VR Experience" ? null : (
                        <p className="mt-4 text-xs text-slate-400">
                          Add a `videoUrl` when you’re ready to share a demo.
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
          })}
        </section>

        <section
          id="about"
          className="mt-16 grid gap-10 text-center lg:grid-cols-[1.2fr_0.8fr] lg:text-left xl:place-items-center"
        >
          <div className="info-panel rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/70">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Experience</h2>
            <div className="mt-6 space-y-8 text-left">
              {experiences.map((exp) => (
                <article key={exp.role} className="glass-surface p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 transition-colors dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-white">{exp.company}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {exp.timeframe}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-white">{exp.location}</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-white">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="glass-surface p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Education</h3>
              <p className="mt-3 text-slate-700 dark:text-white">
                Bachelor of Computer Science (Graphics & Multimedia Software), Universiti Teknologi
                Malaysia — Johor Bahru | Sept 2020 – Aug 2025
              </p>
              <p className="mt-3 text-sm text-slate-600 dark:text-white">
                Foundation in Engineering, Universiti Teknologi MARA (CGPA 3.78) — Dengkil
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="info-panel rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Skills Snapshot</h2>
            <div className="mt-6 space-y-6">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">{group.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 dark:border-slate-600 dark:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="info-panel rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Certifications & Upskilling</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-200">
                {certifications.map((cert) => (
                  <div key={cert.title}>
                    <p className="font-semibold text-slate-900 dark:text-white">{cert.title}</p>
                    <p className="text-slate-600 dark:text-slate-200">{cert.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="info-panel rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Languages</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {languages.map((lang) => (
                  <div key={lang.name} className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{lang.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
