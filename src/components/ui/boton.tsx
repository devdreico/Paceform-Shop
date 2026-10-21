import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "primario" | "secundario" | "claro";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  form?: string;
};

const variantes = {
  primario: "btn-primario",
  secundario: "btn-secundario",
  claro:
    "bg-white text-verde border-[1.5px] border-white rounded-full font-bold hover:bg-verde-50 transition-colors",
};

export default function Boton({
  href,
  onClick,
  variant = "primario",
  className,
  children,
  type = "button",
  disabled,
  external,
  form,
}: Props) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm min-h-12 select-none disabled:opacity-50 disabled:pointer-events-none",
    variantes[variant],
    className
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={form}
      className={base}
    >
      {children}
    </button>
  );
}
