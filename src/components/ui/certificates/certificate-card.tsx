import React from "react";

type CertificateCardProps = {
  title: string;
  href: string;
  fileName: string;
};

export default function CertificateCard({ title, href, fileName }: CertificateCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-bg-card px-4 py-4 transition-all duration-300 hover:border-accent/50 hover:bg-bg-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-text-primary group-hover:text-text-primary transition-colors">
            {title}
          </p>
          {/* <p className="mt-1 text-xs text-text-muted">{fileName}</p> */}
        </div>
        <span className="rounded-full border border-border/70 bg-bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          PDF
        </span>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
          View certificate
        </span>
        <span className="text-xs text-text-muted">Open</span>
      </div>
    </a>
  );
}
