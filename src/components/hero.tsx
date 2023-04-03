import Image from "next/image";
import { ButtonLink } from "./button-link";

export interface HeroProps {
  backgroundColor: string;
  description: string;
  image: {
    url: string;
    position: "Left" | "Right";
    dimensions: {
      width: number;
      height: number;
    };
  };
  link?: {
    href: string;
    title: string;
  };
  textColor: string;
  title: string;
}
export function Hero({
  backgroundColor,
  description,
  image,
  link,
  textColor,
  title,
}: HeroProps) {
  return (
    <div style={{ backgroundColor, color: textColor }}>
      <div
        className={`p-16 flex max-w-screen-xl m-auto gap-8 justify-between ${
          image.position === "Left" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex flex-col justify-center gap-4 max-w-xl">
          <div className="text-3xl font-bold">{title}</div>
          <div>{description}</div>
          {link && <ButtonLink href={link.href}>{link.title}</ButtonLink>}
        </div>
        <Image src={image.url} alt="" {...image.dimensions}></Image>
      </div>
    </div>
  );
}
