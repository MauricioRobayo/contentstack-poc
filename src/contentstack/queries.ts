const gql = String.raw;

export type Image = {
  edges: Array<{
    node: {
      url: string;
      content_type: string;
      description: string;
      file_size: number;
      filename: string;
      metadata: null;
      title: string;
    };
  }>;
};
const image = gql`
  imageConnection {
    edges {
      node {
        url
        content_type
        description
        file_size
        filename
        metadata
        title
      }
    }
  }
`;

type Link = {
  href: string;
  title: string;
};
const link = gql`
  link {
    href
    title
  }
`;

type Spotlight = {
  description: string;
  title: string;
  caption: {
    description: string;
    title: string;
    imageConnection: Image;
  };
};
const spotlight = gql`
  spotlight {
    description
    title
    caption {
      description
      title
      ${image}
    }
  }
`;

const richText = gql`
  rich_text {
    rich_text_editor {
      json
      embedded_itemsConnection {
        edges {
          node {
            ... on SysAsset {
              title
              url
            }
          }
        }
      }
    }
  }
`;

type Buckets = {
  actions: {
    description: {
      iconConnection: Image;
      link: Link;
      title: string;
    };
    title: string;
  };
};
const buckets = gql`
  buckets {
    actions {
      description
      iconConnection {
        edges {
          node {
            url
          }
        }
      }
      ${link}
      title
    }
    title
    description
  }
`;

type Hero = {
  background_color: string;
  description: string;
  hero_image: {
    imageConnection: Image;
    position: "left" | "right";
  };
  text_color: string;
  title: string;
};
const hero = gql`
  hero_section {
    background_color
    description
    hero_image {
      ${image}
      position
    }
    ${link}
    text_color
    title
  }
`;

type Actions = {
  actions: {
    description: string;
    title: string;
    link: Link;
  };
};
const actions = gql`
  actions {
    actions {
      description
      title
      ${link}
    }
  }
`;

const mainContentQueries = {
  PageMainContentRichText: richText,
  PageMainContentBuckets: buckets,
  PageMainContentHeroSection: hero,
  PageMainContentActions: actions,
  PageMainContentSpotlight: spotlight,
};

const queries = Object.entries(mainContentQueries)
  .map(
    ([key, value]) => gql`
  ... on ${key} {
    __typename
    ${value}
  }
`
  )
  .join("");

type MainContent = Array<
  | {
      __typename: "PageMainContentHero";
      hero_section: Hero;
    }
  | {
      __typename: "PageMainContentBuckets";
      buckets: Buckets;
    }
  | {
      __typename: "PageMainContentSpotlight";
      spotlight: Spotlight;
    }
  | {
      __typename: "PageMainContentActions";
      actions: Actions;
    }
>;

export type PageQueryResult = {
  data: {
    all_page: {
      items: Array<{
        main_content: MainContent;
      }>;
    };
  };
};
export const pageQuery = gql`
  query page($url: String!) {
    all_page(where: { url: $url }) {
      items {
        main_content {
          ${queries}
        }
        title
        url
      }
    }
  }
`;
