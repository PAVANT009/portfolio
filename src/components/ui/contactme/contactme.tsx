import React from "react";
import DashedFrame from "../DashedFrame";

export default function Contactme() {
  return (
        <DashedFrame className="w-full " left={false} right={false} top={false}>
            <DashedFrame
            className="w-full max-w-1/2 mx-auto "
            top={false}
            bottom={false}
            >

    <div className="w-full py-6 bg-striped">
      <div className="mx-auto w-full max-w-xl rounded-xl border border-border bg-background/90 p-6 backdrop-blur">
        <div className="text-sm text-muted-foreground">Contact</div>
        <h2 className="mt-1 text-2xl font-semibold">Get in touch</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          I usually reply within 24 hours.
        </p>

        <div className="mt-5 rounded-lg border border-border bg-background p-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Email
          </div>
          <div className="mt-1 text-base font-medium">
            tejap9316@gamil.com
          </div>
          <a
            href="mailto:tejap9316@gamil.com"
            className="mt-3 inline-flex w-fit items-center rounded-md bg-accent-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-hover"
          >
            Send an email
          </a>
        </div>
        </div>
        </div>
        </DashedFrame>
    </DashedFrame>

  );
}
