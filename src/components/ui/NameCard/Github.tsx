"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import DashedFrame from "@/components/ui/DashedFrame";

export default function Github() {
  return (
    <DashedFrame className="w-full py-2" left={false} right={false} top={false}>
      <DashedFrame
        className="w-full max-w-1/2 mx-auto px-4 py-4"
        top={false}
        bottom={false}
      >
        <div className="flex flex-col gap-3">
          <div className="text-sm text-white/60">GitHub Contributions</div>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="PAVANT009"
              colorScheme="dark"
              blockSize={10}
              blockMargin={4}
              fontSize={12}
              showTotalCount={false}
              theme={{
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
          </div>
        </div>
      </DashedFrame>
    </DashedFrame>
  );
}
