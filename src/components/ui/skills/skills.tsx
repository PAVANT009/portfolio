"use client";

import DashedFrame from "../DashedFrame";
import { SKILLS_DATA } from "../projects/project/data";


export function SkillsSection() {
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

            <div className="flex flex-wrap gap-3">
            {SKILLS_DATA.map((skill) => (
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
        </section>
        </DashedFrame>
    </DashedFrame>
  );
}
