import { PocSettings } from "@/pages/_app";
import Image from "next/image";
import { useRouter } from "next/router";

type HeaderProps = Pick<PocSettings, "logo" | "siteTitle" | "menu">;
export function Header({ logo, siteTitle, menu }: HeaderProps) {
  const { asPath } = useRouter();
  console.log(asPath);
  return (
    <header className="flex justify-between max-w-screen-lg m-auto p-8">
      <Image src={logo.url} alt={siteTitle} {...logo.dimensions} />
      <nav className="flex gap-4">
        {menu.map((item) => {
          return (
            <div key={item.label} className="">
              {item.label}
            </div>
          );
        })}
      </nav>
    </header>
  );
}
