"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function Github() {
  return (
        <div className="flex flex-col gap-3 overflow-auto max-w-[90%]">
          <div className="text-sm text-muted-foreground ">GitHub Contributions</div>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="PAVANT009"
              colorScheme="dark"
              blockSize={10}
              blockMargin={4}
              fontSize={12}
              showTotalCount={false}
              // theme={{
              //   light: [
              //     "var(--muted)",
              //     "color-mix(in oklch, var(--muted-foreground) 25%, transparent)",
              //     "color-mix(in oklch, var(--muted-foreground) 45%, transparent)",
              //     "color-mix(in oklch, var(--muted-foreground) 65%, transparent)",
              //     "var(--muted-foreground)",
              //   ],
              //   dark: [
              //     "var(--muted)",
              //     "color-mix(in oklch, var(--muted-foreground) 25%, transparent)",
              //     "color-mix(in oklch, var(--muted-foreground) 45%, transparent)",
              //     "color-mix(in oklch, var(--muted-foreground) 65%, transparent)",
              //     "var(--muted-foreground)",
              //   ],
              // }}
            />
          </div>
        </div>
  );
}
