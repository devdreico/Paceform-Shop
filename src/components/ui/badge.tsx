import { cn } from "@/lib/cn";

export default function Badge({
  children,
  tono = "verde",
  className,
}: {
  children: React.ReactNode;
  tono?: "verde" | "claro" | "carbon" | "amarillo";
  className?: string;
}) {
  const tonos = {
    verde: "bg-verde text-blanco",
    claro: "bg-white text-verde border-[1.5px] border-vidrio-borde",
    carbon: "bg-carbon text-blanco",
    amarillo: "bg-[#FFF3C4] text-carbon",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide",
        tonos[tono],
        className
      )}
    >
      {children}
    </span>
  );
}
