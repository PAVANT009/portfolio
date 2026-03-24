"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

type CvFile = {
  name: string;
  href: string;
};

type CvMenuProps = {
  files: CvFile[];
};

export default function CvMenu({ files }: CvMenuProps) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (files.length === 0) return null;

  const primary = files[0];

  return (
    <div className="relative" ref={menuRef}>
      <div className="w-fit flex items-center bg-nonHover hover:bg-hover transition-colors duration-300 gap-1.5 px-2.5 py-[7px] sm:py-1.5 text-sm font-medium cursor-pointer rounded-[9px] group overflow-hidden bg-accent-foreground text-background">
        <a
          href={primary?.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center"
        >
          View CV
        </a>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setOpen((value) => !value);
          }}
          aria-label="Toggle CV downloads"
          className="flex items-center"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {open ? (
        <div className="absolute left-0 z-20 mt-2 w-56 rounded-xl border border-border bg-bg-card p-2 shadow-lg shadow-accent/10">
          {files.map((cv) => (
            <a
              key={cv.href}
              href={cv.href}
              download
              className="block rounded-lg px-2 py-2 text-sm text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
            >
              Download {cv.name}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
