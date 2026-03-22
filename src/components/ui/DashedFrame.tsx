import React from "react";

type DashedFrameProps = React.HTMLAttributes<HTMLDivElement> & {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  color?: string;
  dash?: number;
  gap?: number;
  thickness?: number;
};

export default function DashedFrame({
  top = true,
  right = true,
  bottom = true,
  left = true,
  color = "var(--dashed-color, var(--muted-foreground))",
  dash = 6,
  gap = 10,
  thickness = 2,
  style,
  className,
  children,
  ...rest
}: DashedFrameProps) {
  const dashStop = `${dash}px`;
  const gapStop = `${dash + gap}px`;

  const horiz = `repeating-linear-gradient(to right, ${color} 0px, ${color} ${dashStop}, transparent ${dashStop}, transparent ${gapStop})`;
  const vert = `repeating-linear-gradient(to bottom, ${color} 0px, ${color} ${dashStop}, transparent ${dashStop}, transparent ${gapStop})`;

  const bgImages: string[] = [];
  const bgSizes: string[] = [];
  const bgPositions: string[] = [];

  if (top) {
    bgImages.push(horiz);
    bgSizes.push(`100% ${thickness}px`);
    bgPositions.push("left top");
  }

  if (bottom) {
    bgImages.push(horiz);
    bgSizes.push(`100% ${thickness}px`);
    bgPositions.push("left bottom");
  }

  if (left) {
    bgImages.push(vert);
    bgSizes.push(`${thickness}px 100%`);
    bgPositions.push("left top");
  }

  if (right) {
    bgImages.push(vert);
    bgSizes.push(`${thickness}px 100%`);
    bgPositions.push("right top");
  }

  const dashedStyle: React.CSSProperties =
    bgImages.length === 0
      ? {}
      : {
          backgroundImage: bgImages.join(", "),
          backgroundSize: bgSizes.join(", "),
          backgroundPosition: bgPositions.join(", "),
          backgroundRepeat: "no-repeat",
        };

  return (
    <div className={className} style={{ ...dashedStyle, ...style }} {...rest}>
      {children}
    </div>
  );
}
