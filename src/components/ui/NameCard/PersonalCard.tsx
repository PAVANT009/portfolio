"use client";

import { Eye, SunDimIcon } from "lucide-react";
import Image from "next/image";
import DashedFrame from "@/components/ui/DashedFrame";
import { useTheme } from "@/components/theme-provider";
import React from "react";

export default function PersonalCard() {
  const { resolvedTheme, setTheme } = useTheme();
  const [views, setViews] = React.useState<number | null>(null);

  React.useEffect(() => {
    let mounted = true;
    fetch("/api/views")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && typeof data?.count === "number") {
          setViews(data.count);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);
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
   <DashedFrame className="w-full py-2" left={false} right={false} bottom={false} id="personal-card">
        <DashedFrame
            className="grid grid-cols-[auto_1fr] items-center w-[90%] sm:w-1/2 mx-auto px-2 py-4"
            top={false}
            bottom={false}
        >
          {/* Cat should not enter  */}
            <div className="flex flex-row justify-between lg:w-150 md:w-70 sm:w-[75%]  h-32 ml-4 mb-6">
                <div className="flex flex-1 items-center gap-3">
                    <div className="border border-border p-2.5 rounded-md mt-3">
                        <Image
                          src="icon.png"
                          alt="profile"
                          width={80}
                          height={80}
                          className="rounded-md "
                        />
                    </div>
                    <div className="h-full flex flex-col justify-center gap-3.5 mr-3">
                        <div className="font-semibold text-xl">S.Pavan Teja Kumar</div>
                        <div className="role-switch text-sm text-muted-foreground" aria-live="polite">
                            <span className="role-switch__item role-switch__item--one">
                              Full Stack Developer
                            </span>
                            <span className="role-switch__item role-switch__item--two">
                              Software Developer
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-3.5">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="text-muted-foreground hover:text-accent-foreground transition-colors"
                      aria-label="Toggle theme"
                    >
                      <SunDimIcon />
                    </button>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye />
                      <span className="text-xs">
                        {views === null ? "--" : views.toLocaleString()}
                      </span>
                    </div>
                </div>
            </div>
        </DashedFrame>
    </DashedFrame>
  );
}
