import { Hero, HeroProps } from "@/components/hero";
import { getPageBlocks } from "@/contentstack/api-client";
import { GetServerSideProps } from "next";
import type { HeroQuery } from "@/contentstack/queries";

const mainContentComponents = {
  // PageMainContentRichText: richText,
  // PageMainContentBuckets: buckets,
  PageMainContentHeroSection: {
    Component: Hero,
    mapper: mapHeroToHeroProps,
  },
  // PageMainContentActions: actions,
  // PageMainContentSpotlight: spotlight,
};

export default function Page({ blocks }: any) {
  return blocks.map((block) => {
    const { Component, mapper } =
      mainContentComponents[block.__typename as string] ?? {};
    if (Component) {
      return (
        <Component key={block._typename} {...mapper(block.hero_section)} />
      );
    }

    return null;
  });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blocks = await getPageBlocks(`/${context.query.page ?? ""}`);

  return {
    props: {
      blocks,
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
