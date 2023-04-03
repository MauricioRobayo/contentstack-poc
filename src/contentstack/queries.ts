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
      dimension: {
        height: number;
        width: number;
      };
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
        dimension {
          height
          width
        }
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

export interface BucketsQuery {
  title: string;
  description: string;
  actions: Array<{
    description: string;
    title: string;
    link: Link;
    iconConnection: Image;
  }>;
}
const bucketsQuery = gql`
  buckets {
    actions {
      description
      iconConnection {
        edges {
          node {
            url
            dimension {
              height
              width
            }
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

export interface HeroQuery {
  background_color: string;
  description: string;
  hero_image: {
    imageConnection: Image;
    position: "Left" | "Right";
  };
  text_color: string;
  title: string;
  link?: Link;
}
const heroQuery = gql`
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

interface Actions {
  actions: {
    description: string;
    title: string;
    link: Link;
  };
}
const actions = gql`
  actions {
    actions {
      description
      title
      ${link}
    }
  }
`;

export interface BlogQuery {
  title: string;
  link: Link;
  referenceConnection: {
    edges: Array<{
      node: {
        title: string;
        url: string;
        summary: string;
        featured_imageConnection: {
          edges: Array<{
            node: {
              url: string;
              dimension: {
                width: number;
                height: number;
              };
            };
          }>;
        };
      };
    }>;
  };
}
const blogQuery = gql`
  blog {
    title
    link {
      href
      title
    }
    referenceConnection(limit: 2) {
      edges {
        node {
          ... on BlogArticle {
            title
            url
            summary
            featured_imageConnection {
              edges {
                node {
                  url
                  dimension {
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const mainContentQueries = {
  PageMainContentRichText: richText,
  PageMainContentBuckets: bucketsQuery,
  PageMainContentHeroSection: heroQuery,
  PageMainContentActions: actions,
  PageMainContentSpotlight: spotlight,
  PageMainContentBlog: blogQuery,
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

export type MainContent = Array<
  | {
      __typename: "PageMainContentHero";
      hero_section: HeroQuery;
    }
  | {
      __typename: "PageMainContentBuckets";
      buckets: BucketsQuery;
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
