import React from "react";
import DashedFrame from "@/components/ui/DashedFrame";
import { CalendarDays } from "lucide-react";

export default function PersonalInfo() {
  return (
   <DashedFrame className="w-full py-2" left={false} right={false}>
            <DashedFrame
                className="grid grid-cols-[auto_1fr] items-center w-1/2 mx-auto px-2 py-4"
                top={false}
                bottom={false}
            >
                <div className="flex flex-col gap-3 px-2.5">

                <div className="flex flex-col gap-3 text-slate-200">
                    <span className="font-sans">
                        Hey, I&apos;m Pavan, a full stack developer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.
                    </span>
                    <span>
                        Tech stack isn&apos;t my concern, I&apos;m flexible with whatever the project needs, though I prefer modern frameworks and tools. I&apos;m always open for new opportunities to learn and grow.
                    </span>
                </div>
                {/* Contact info */}
                <div className="flex flex-row gap-3.5">
                    <div className="w-fit flex items-center bg-nonHover hover:bg-hover transition-colors duration-300 gap-1.5 px-2.5 py-[7px] sm:py-1.5 text-background text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden bg-white">
                        <CalendarDays/> Book an intro call
                    </div>
                    <div className="w-fit flex items-center bg-nonHover hover:bg-hover transition-colors duration-300 gap-1.5 px-2.5 py-[7px] sm:py-1.5 text-background text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden bg-white">
                        Email me 
                    </div>
                </div>
                </div>
            </DashedFrame>
        </DashedFrame>
  );
}
