import { Project, Skill } from "./types";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiPrisma,
  SiGraphql,
  SiDrizzle,
  SiBun,
} from "react-icons/si";
import { RiStackLine } from "react-icons/ri";

export const PROJECTS_DATA: Project[] = [
  {
    title: "CampusNav",
    description:
      "Coming Soon",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Google Generative AI",
      "Better Auth",
      "Tailwind CSS",
      "ShadCN UI",
      "Zod",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/PAVANT009/#",  
    image: "/project/soon.webp",
  },
  {
    title: "TldrAI",
    description:
      "An AI-powered productivity and knowledge assistant that helps users upload documents, extract insights, and interact with content using generative AI. Features authentication, drag-and-drop interfaces, PDF parsing, and a modern dashboard built for fast, intelligent workflows.",
    tech: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Google Generative AI",
      "Better Auth",
      "Tailwind CSS",
      "ShadCN UI",
      "Zod",
    ],
    liveUrl: "https://tldrai-opal.vercel.app/",
    githubUrl: "https://github.com/PAVANT009/tldrai",
    image: "/project/tldr.png",
  },
  {
    title: "SpendFlow",
    description:
      "A smart personal finance management platform that helps users track expenses, manage budgets, and gain insights into their spending habits. Monitor transactions, categorize expenses, visualize financial data, and make better financial decisions with a clean and intuitive dashboard.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Prisma"],
    liveUrl: "https://spend-flow-six.vercel.app/",
    githubUrl: "https://github.com/PAVANT009/SpendFlow",
    image: "/project/spendflow.png",
  },
  {
    title: "ConvoAI",
    description:
      "A real-time AI conversational platform that combines chat, video, and intelligent agents into one seamless experience. Users can interact with AI in live sessions, manage conversations, and leverage background workflows powered by event-driven architecture. Built with scalable serverless infrastructure, realtime streaming, authentication, and modern SaaS-grade tooling.",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind",
      "Drizzle",
      "ShadCN UI",
      "Zod",
    ],
    liveUrl: "https://convo-ai-one.vercel.app/",
    githubUrl: "https://github.com/PAVANT009/ConvoAi",
    image: "/project/convoai.png",
  },
];

export const SKILLS_DATA: Skill[] = [
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "Bun", icon: <SiBun /> },
  { name: "Express", icon: <SiExpress /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Prisma", icon: <SiPrisma /> },
  { name: "Drizzle", icon: <SiDrizzle /> },
  { name: "TanStack", icon: <RiStackLine /> },
  { name: "Git", icon: <SiGit /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Vercel", icon: <SiVercel /> },
  // { name: "Framer Motion", icon: <SiFramer /> },
  // { name: "Polar", icon: <TbPolaroid /> },
  // {name: "Inngest", icon}
];
