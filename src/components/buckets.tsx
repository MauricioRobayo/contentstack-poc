import Image from "next/image";
import Link from "next/link";

export interface BucketsProps {
  title: string;
  description: string;
  buckets: Array<{
    title: string;
    description: string;
    icon: {
      url: string;
      dimensions: {
        height: number;
        width: number;
      };
    };
    link: {
      title: string;
      href: string;
    };
  }>;
}
export function Buckets({ title, description, buckets }: BucketsProps) {
  return (
    <div className="bg-gray-100 p-16">
      <div className="flex max-w-screen-xl m-auto gap-12 text-center flex-col">
        <div>
          <div className="text-3xl font-bold mb-4">{title}</div>
          <div>{description}</div>
        </div>
        <div
          className={
            buckets.length === 4
              ? "grid grid-rows-2 gap-x-24 gap-y-8 m-auto grid-flow-col"
              : "flex justify-around"
          }
        >
          {buckets.map(({ title, description, icon, link }) => {
            return (
              <div key={title} className="flex flex-col gap-4 max-w-sm">
                <div className="flex flex-col items-center">
                  <Image src={icon.url} alt={title} {...icon.dimensions} />
                  <div className="text-xl">{title}</div>
                </div>
                <div>{description}</div>
                {link?.href && (
                  <Link style={{ color: "#715cdd" }} href={link.href}>
                    {link.title} &rarr;
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
