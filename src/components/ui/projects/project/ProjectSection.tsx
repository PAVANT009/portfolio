import React from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS_DATA } from "./data";
import DashedFrame from "../../DashedFrame";

export default function ProjectSection() {
  const total = PROJECTS_DATA.length;
  const cols = 2;
  const rows = Math.ceil(total / cols);

  return (
    <DashedFrame className="w-full py-2" left={false} right={false} top={false}>
      <DashedFrame
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 justify-items-center items-start w-1/2 mx-auto"
        top={false}
        bottom={false}
      >
        {PROJECTS_DATA.map((project, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const showRight = col === 0;
          const showBottom = row < rows - 1;

          return (
            <DashedFrame
              key={project.title}
              className="w-full flex justify-center p-4"
              left={false}
              top={false}
              right={showRight}
              bottom={showBottom}
            >
              <ProjectCard project={project} />
            </DashedFrame>
          );
        })}
      </DashedFrame>
    </DashedFrame>
  );
}
