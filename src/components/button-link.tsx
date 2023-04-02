import Link from "next/link";
import { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "default" | "inverse";
}
export function ButtonLink({
  href,
  children,
  variant = "default",
}: ButtonLinkProps) {
  return (
    <div>
      <Link
        className="py-2 px-4 bg-white border-2 rounded-sm border-current"
        href={href}
        style={{
          color: variant === "default" ? "#715cdd" : "white",
          backgroundColor: variant === "default" ? "white" : "#715cdd",
        }}
      >
        {children}
      </Link>
    </div>
  );
}
