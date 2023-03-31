import { getPageBlocks } from "@/contentstack/api-client";
import { GetServerSideProps } from "next";

function Hero(props: any) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

const mainContentComponents = {
  // PageMainContentRichText: richText,
  // PageMainContentBuckets: buckets,
  PageMainContentHeroSection: Hero,
  // PageMainContentActions: actions,
  // PageMainContentSpotlight: spotlight,
};

export default function Page({ blocks }: any) {
  return <pre>{JSON.stringify(blocks, null, 2)}</pre>;
  return blocks.map((block: any) => {
    const Component = mainContentComponents[block.__typename as string];
    if (Component) {
      return <Component key={block._typename} {...block.hero_section} />;
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
