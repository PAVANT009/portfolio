import React from "react";
import DashedFrame from "@/components/ui/DashedFrame";
import { CalendarDays } from "lucide-react";
import Github from "./Github";
import CvMenu from "./CvMenu";
import { SiGithub } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";

type CvFile = {
  name: string;
  href: string;
};

export default async function PersonalInfo() {
  const cvFiles = await (async () => {
    const { readdir } = await import("node:fs/promises");
    const path = await import("node:path");
    const cvDir = path.join(process.cwd(), "public", "cv");
    const entries = await readdir(cvDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => name.toLowerCase().endsWith(".pdf"))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        name,
        href: `/cv/${name}`,
      }));
  })();

  return (
   <DashedFrame className="w-full py-2" left={false} right={false}>
            <DashedFrame
                className="grid grid-cols-[auto_1fr] items-center w-[90%] sm:w-1/2 mx-auto px-2 py-4"
                top={false}
                bottom={false}
            >
                <div className="flex flex-col gap-3 px-2.5 min-w-0">

                    <div className="flex flex-col gap-3 text-foreground max-w-prose w-full min-w-0">
                        <span className="font-sans break-words overflow-hidden">
                            Hey, I&apos;m Pavan, a full stack developer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.
                        </span>
                        <span className="break-words overflow-hidden">
                            Tech stack isn&apos;t my concern, I&apos;m flexible with whatever the project needs, though I prefer modern frameworks and tools. I&apos;m always open for new opportunities to learn and grow.
                        </span>
                    </div>
                    {/* Contact info */}
                    <div className="flex flex-row flex-wrap gap-3.5">
                        <a
                          href="https://cal.com/pavan-teja-lxgie1"
                          target="_blank"
                          rel="noreferrer"
                          className="w-fit flex items-center bg-nonHover hover:bg-hover transition-colors duration-300 gap-1.5 px-2.5 py-[7px] sm:py-1.5 text-background text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden bg-accent-foreground"
                        >
                            <CalendarDays/> Book an intro call
                        </a>
                        <a
                          href="mailto:tejap9316@gamil.com"
                          className="w-fit flex items-center bg-nonHover hover:bg-hover transition-colors duration-300 gap-1.5 px-2.5 py-[7px] sm:py-1.5  text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden bg-accent-foreground text-background"
                        >
                            Email me 
                        </a>
                        <CvMenu files={cvFiles} />
                    </div>
                {/* Contact  */}
                    <div className="flex flex-col gap-2">
                        <span>Here are my socials</span>
                        <div className="flex flex-row gap-3.5">
                            <a
                              href="https://github.com/PAVANT009"
                              target="_blank"
                              rel="noreferrer"
                              className="w-fit flex items-center bg-nonHover hover:bg-hover transition-colors duration-300 gap-1.5 px-2.5 py-[7px] sm:py-1.5 text-foreground text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden bg-muted"
                            >
                                <SiGithub/>
                                <span>Github</span>
                            </a>
                            <a
                              href="https://www.linkedin.com/in/pavan-teja-kumar-65261035b/"
                              target="_blank"
                              rel="noreferrer"
                              className="w-fit flex items-center bg-nonHover hover:bg-hover transition-colors duration-300 gap-1.5 px-2.5 py-[7px] sm:py-1.5 text-foreground text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden bg-muted"
                            >
                                <SlSocialLinkedin/>
                                <span>Linkedin</span>
                            </a>
                        </div>
                    </div>
                <Github/>
                </div>
            </DashedFrame>
        </DashedFrame>
  );
}
