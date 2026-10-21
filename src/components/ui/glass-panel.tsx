import { cn } from "@/lib/cn";

export default function GlassPanel({
  className,
  oscuro = false,
  solido = false,
  children,
}: {
  className?: string;
  oscuro?: boolean;
  solido?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "panel sin-reflejos",
        oscuro ? "vidrio-oscuro" : solido ? "vidrio-solido" : "vidrio",
        className
      )}
    >
      {children}
    </div>
  );
}
