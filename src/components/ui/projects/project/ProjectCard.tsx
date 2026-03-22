import { ArrowUpNarrowWide, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Project } from "./types";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <div className="flex flex-col w-73 ">
      <div className="border border-border rounded-md p-1.5 group">
        <a
          href={project.liveUrl ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="bg-[#1F1F1F] h-48 rounded-2xl hover:rounded-md relative overflow-hidden hover:cursor-pointer block"
        >
          <span className="absolute top-2 left-2 z-10 text-sm text-white/80">
            {project.title}
          </span>
          <div className="absolute bottom-2 left-14 w-40 h-28 transition-all duration-500 ease-out group-hover:bottom-0 group-hover:left-0 group-hover:w-full group-hover:h-full">
            <Image
              className="object-cover rounded-md"
              src={project.image}
              alt={project.title}
              fill
              priority={false}
            />
          </div>
        </a>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">{project.title}</div>
          {project.liveUrl && (
            <div className="flex flex-row gap-2">
            <div className="signal-radar">
              <span className="signal-radar-ring" />
              <span className="signal-radar-ring signal-radar-ring--delay" />
              <span className="signal-radar-dot" />
            </div>
            <a
              href={project.liveUrl}
              className="text-sm text-white/70 hover:text-white transition-colors"
              target="_blank"
              rel="noreferrer"
              >
              Live
            </a>
            </div>
          )}
        </div>
        <span className="text-sm text-white/70">{project.description}</span>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs text-white/70 border border-white/10 px-2 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="group text-muted-foreground hover:text-foreground flex flex-row gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              View Project
            </a>
          )}
          <ArrowUpRight className="transition-transform duration-200 group-hover:rotate-45"/>
        </div>
      </div>
    </div>
  );
}
