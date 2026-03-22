"use client";

import { Eye, SunDimIcon } from "lucide-react";
import Image from "next/image";
import DashedFrame from "@/components/ui/DashedFrame";
import { useTheme } from "next-themes";

export default function PersonalCard() {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    const overlay = document.createElement("div");
    overlay.className = "theme-wipe";
    overlay.style.background = getComputedStyle(document.body).backgroundColor;
    document.body.appendChild(overlay);

    setTheme(nextTheme);

    requestAnimationFrame(() => {
      overlay.classList.add("theme-wipe--run");
    });

    const cleanup = () => {
      overlay.removeEventListener("transitionend", cleanup);
      overlay.remove();
    };
    overlay.addEventListener("transitionend", cleanup);
    setTimeout(cleanup, 1000);
  };

  return (
   <DashedFrame className="w-full py-2" left={false} right={false} bottom={false}>
        <DashedFrame
            className="grid grid-cols-[auto_1fr] items-center w-1/2 mx-auto px-2 py-4"
            top={false}
            bottom={false}
        >
            <div className="flex flex-row justify-between w-160 h-17 ml-4">
                <div className="flex flex-1 items-center gap-3">
                    <div className="border border-white/20 p-2.5 rounded-md">
                        <Image src="/images/profile.png" alt="profile" width={60} height={60}/>
                    </div>

                    <div className="h-full flex flex-col justify-end">
                        <div className="font-semibold text-xl">Pavan</div>
                        <div className="text-sm text-white/60">
                            Full stack Developer
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="text-white/60 hover:text-white transition-colors"
                      aria-label="Toggle theme"
                    >
                      <SunDimIcon />
                    </button>
                    <Eye className="text-white/60"/>
                </div>
            </div>
        </DashedFrame>
    </DashedFrame>
  );
}
