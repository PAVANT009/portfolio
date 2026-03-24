import React from "react";
import path from "node:path";
import { readdir } from "node:fs/promises";
import DashedFrame from "../DashedFrame";
import CertificateCard from "./certificate-card";

type CertificateItem = {
  title: string;
  href: string;
  fileName: string;
};

function prettifyTitle(fileName: string) {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "");
  const withoutPrefix = withoutExt.replace(/^UC-/, "");
  return withoutPrefix.replace(/[-_]+/g, " ").trim() || "Certificate";
}

async function getCertificates(): Promise<CertificateItem[]> {
  const certificatesDir = path.join(process.cwd(), "public", "certificates");
  const entries = await readdir(certificatesDir, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.toLowerCase().endsWith(".pdf"))
    .sort((a, b) => a.localeCompare(b));

  const certificates = files.map((fileName) => ({
    title: prettifyTitle(fileName),
    fileName,
    href: `/certificates/${fileName}`,
  }));

  return certificates;
}

export default async function CertificatesView() {
  const certificates = await getCertificates();

  return (
    <DashedFrame className="w-full py-2" left={false} right={false} top={false}>
        <DashedFrame
        className="w-[90%] sm:w-1/2 mx-auto px-4 py-4"
        top={false}
        bottom={false}
        >
          <section id="certificates" className="px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-3 flex flex-col gap-3">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                  Certificates
                </h2>
                <p className="text-text-secondary">Proof of focused learning and hands-on practice.</p>
              </div>

              {certificates.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/70 bg-bg-card/40 px-4 py-6 text-center text-sm text-text-muted">
                  No certificates found in the `public/certificates` folder.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {certificates.map((certificate) => (
                    <CertificateCard
                      key={certificate.fileName}
                      title={certificate.title}
                      href={certificate.href}
                      fileName={certificate.fileName}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </DashedFrame>
    </DashedFrame>
  );
}
