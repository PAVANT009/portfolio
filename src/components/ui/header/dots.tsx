import DashedFrame from "../DashedFrame";

export default function Dots() {
  const rows = 20;
  const cols = 62;

  return (
    <DashedFrame className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2 xl:w-1/2" top={false} bottom={false}>
      <div
        className="grid gap-2 justify-center p-5  overflow-hidden scale-[0.7] sm:scale-100 origin-top"
        style={{
          gridTemplateColumns: `repeat(${cols}, 3px)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: "var(--dashed-color)" }}
          />
        ))}
      </div>
    </DashedFrame>
  );
}
