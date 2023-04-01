import Link from "next/link";
import { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
}
export function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <div>
      <Link className="py-2 px-4 border-white border-2 rounded-md" href={href}>
        {children}
      </Link>
    </div>
  );
}
