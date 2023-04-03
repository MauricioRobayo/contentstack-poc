import Link from "next/link";
import { ButtonLink } from "./button-link";
import Image from "next/image";

export interface FeaturedPostsProps {
  title: string;
  link: {
    href: string;
    title: string;
  };
  posts: Array<{
    title: string;
    url: string;
    summary: string;
    image: {
      url: string;
      dimensions: {
        width: number;
        height: number;
      };
    };
  }>;
}
export function FeaturedPosts({ title, link, posts }: FeaturedPostsProps) {
  return (
    <div className="p-16">
      <div className="max-w-screen-xl justify-center items-center m-auto flex flex-col gap-16">
        <div className="flex justify-center gap-4 items-center">
          <div className="font-bold text-2xl">{title}</div>
          <ButtonLink href={link.href}>{link.title}</ButtonLink>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-8 max-w-screen-lg˝">
            {posts.map(({ title, url, summary, image }) => {
              return (
                <div key={title} className="border-gray-100 border-2">
                  <Image src={image.url} alt="" {...image.dimensions} />
                  <div className="p-4">
                    <div className="font-bold mb-2">{title}</div>
                    {summary && <div className="text-sm">{summary}</div>}
                    <Link
                      href={url}
                      style={{ color: "#715cdd" }}
                      className="mt-4 block text-sm"
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
