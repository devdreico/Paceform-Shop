import { cn } from "@/lib/cn";

export default function Chip({
  activo,
  onClick,
  children,
  className,
}: {
  activo?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const base = cn(
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border-[1.5px]",
    activo
      ? "bg-verde text-blanco border-verde"
      : "bg-white/70 text-carbon border-vidrio-borde hover:bg-verde-50",
    className
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={base}>
        {children}
      </button>
    );
  }

  return <span className={base}>{children}</span>;
}
