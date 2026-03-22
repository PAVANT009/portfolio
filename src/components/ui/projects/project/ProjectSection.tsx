import React from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS_DATA } from "./data";
import DashedFrame from "../../DashedFrame";

export default function ProjectSection() {
  return (
    <DashedFrame className="w-full py-2" left={false} right={false} top={false}>
      <DashedFrame
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center items-start w-1/2 mx-auto px-2 py-4"
            top={false}
            bottom={false}
      >
        {PROJECTS_DATA.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
    </DashedFrame>
  </DashedFrame>
  );
}
