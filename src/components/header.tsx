import { PocSettings } from "@/pages/_app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "./menu";

type HeaderProps = Pick<PocSettings, "logo" | "siteTitle" | "menu">;
export function Header({ logo, siteTitle, menu }: HeaderProps) {
  return (
    <header className="flex justify-between max-w-screen-lg m-auto p-8">
      <Image src={logo.url} alt={siteTitle} {...logo.dimensions} />
      <Menu menu={menu} />
    </header>
  );
}
