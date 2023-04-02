import { Hero, HeroProps } from "@/components/hero";
import { getPageBlocks } from "@/contentstack/api-client";
import { GetServerSideProps } from "next";
import type { BucketsQuery, HeroQuery } from "@/contentstack/queries";
import { Buckets, BucketsProps } from "@/components/buckets";
import { Actions } from "@/components/actions";

const mainContentComponents: { [key: string]: any } = {
  // PageMainContentRichText: richText,
  PageMainContentBuckets: {
    Component: Buckets,
    mapper: mapBucketsToBucketsProps,
  },
  PageMainContentHeroSection: {
    Component: Hero,
    mapper: mapHeroToHeroProps,
  },
  PageMainContentActions: {
    Component: Actions,
  },
  // PageMainContentSpotlight: spotlight,
};

export default function Page({
  blocks,
}: {
  blocks: Array<{
    type: string;
    content: any;
  }>;
}) {
  return blocks.map(({ type, content }) => {
    const { Component, mapper } = mainContentComponents[type] ?? {};
    const props = mapper ? mapper(content) : content;
    if (Component) {
      return <Component key={type} {...props} />;
    }

    return null;
  });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blocks = await getPageBlocks(`/${context.query.page ?? ""}`);
  console.log(blocks);
  return {
    props: {
      blocks: blocks.map((block) => {
        return Object.fromEntries(
          Object.entries(block).map(([key, value]) => {
            console.log(value);
            if (key === "__typename") {
              return ["type", value];
            } else {
              return ["content", value];
            }
          })
        );
      }),
    },
  };
};

function mapHeroToHeroProps(data: HeroQuery): HeroProps {
  return {
    title: data.title,
    description: data.description,
    backgroundColor: data.background_color,
    textColor: data.text_color,
    link: data.link,
    image: {
      url: data.hero_image.imageConnection.edges[0].node.url,
      dimensions: data.hero_image.imageConnection.edges[0].node.dimension,
      position: data.hero_image.position,
    },
  };
}

function mapBucketsToBucketsProps(data: BucketsQuery): BucketsProps {
  return {
    title: data.title,
    description: data.description,
    buckets: data.actions.map((action) => {
      console.log(action);
      return {
        title: action.title,
        description: action.description,
        link: action.link,
        icon: {
          url: action.iconConnection.edges[0].node.url,
          dimensions: action.iconConnection.edges[0].node.dimension,
        },
      };
    }),
  };
}
