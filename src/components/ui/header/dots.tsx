export default function Dots() {
  const rows = 20;
  const cols = 62;

  return (
    <div
  className="grid gap-2 justify-center p-5 "
  style={{
    gridTemplateColumns: `repeat(${cols}, 3px)`,

    backgroundImage: `
    repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.2) 0px,
        rgba(255,255,255,0.2) 8px,
        transparent 8px,
        transparent 18px
    ),
    repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.2) 0px,
        rgba(255,255,255,0.2) 8px,
        transparent 8px,
        transparent 18px
    )
    `
    ,
    backgroundSize: "2px 100%, 2px 100%",
    backgroundPosition: "left top, right top",
    backgroundRepeat: "no-repeat",
    }}
    >

      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full bg-white/20"
        />
      ))}
    </div>
  );
}
