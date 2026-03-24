"use client";

import DashedFrame from "../DashedFrame";
import { SKILLS_DATA } from "../projects/project/data";

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    description: "UI, UX, and client-side tooling.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "TanStack"],
  },
  {
    title: "Backend",
    description: "APIs, databases, and server-side infrastructure.",
    items: [
      "Node.js",
      "Bun",
      "Express",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Drizzle",
    ],
  },
  {
    title: "DevOps",
    description: "Delivery, hosting, and developer workflows.",
    items: ["Git", "GitHub", "Docker", "Vercel"],
  },
] as const;


export function SkillsSection() {
  const skillMap = new Map(SKILLS_DATA.map((skill) => [skill.name, skill]));

  return (
    <DashedFrame className="w-full py-2" left={false} right={false} top={false}>
        <DashedFrame
        className="w-[90%] sm:w-1/2 mx-auto px-4 py-4"
        top={false}
        bottom={false}
        >
        <section id="skills" className="px-4">
        <div className="mx-auto max-w-4xl">
            <div className="mb-3 flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Stack</h2>
            <p className="text-text-secondary">Tools I work with.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SKILL_CATEGORIES.map((category) => (
                <div
                  key={category.title}
                  className="rounded-2xl border border-border/60 bg-bg-card/60 p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-text-primary">{category.title}</h3>
                    <p className="text-sm text-text-muted">{category.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.items
                      .map((name) => skillMap.get(name))
                      .filter((skill) => skill !== undefined)
                      .map((skill) => (
                        <div
                          key={skill.name}
                          className="group flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-2 transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
                        >
                          <span className="text-base text-text-muted group-hover:text-text-primary transition-colors">
                            {skill.icon}
                          </span>
                          <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
        </section>
        </DashedFrame>
    </DashedFrame>
  );
}
