import { getBlogPost } from "@/contentstack/api-client";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next/types";

export interface PostProps {
  post: {
    date: string;
    title: string;
    content: string;
    image: {
      url: string;
      dimensions: {
        width: number;
        height: number;
      };
    };
    author: {
      name: string;
      url: string;
      image: {
        url: string;
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
}
export default function Post({ post }: PostProps) {
  const { date, title, content, image, author } = post;
  return (
    <div className="p-16 m-auto max-w-screen-lg">
      <div className="text-4xl font-bold">{title}</div>
      <div className="text-sm">
        <div>{date}</div>
        <div className="flex items-center gap-2 text-base mt-4">
          by{" "}
          <Link
            href={author.url}
            style={{ color: "#715cdd" }}
            className="flex items-center gap-2"
          >
            <Image
              className="w-8 h-8"
              src={author.image.url}
              alt={author.name}
              {...author.image.dimensions}
            />
            {author.name}
          </Link>
        </div>
      </div>
      <Image
        className="my-8 w-full"
        src={image.url}
        alt={title}
        {...image.dimensions}
      />
      <article
        className="prose-xl prose"
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await getBlogPost(`/blog/${context.query.post}`);
  return {
    props: {
      post,
    },
  };
};
