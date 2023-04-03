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

export interface SpotlightQuery {
  description: string;
  title: string;
  caption: Array<{
    description: string;
    title: string;
    imageConnection: Image;
  }>;
}
const spotlightQuery = gql`
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

export interface BlogQueryResult {
  data: {
    all_blog_article: {
      items: Array<BlogQuery>;
    };
  };
}
export interface BlogQuery {
  date: string;
  title: string;
  url: string;
  summary: string;
  global_field: {
    title: string;
    description: string;
  };
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
  content: {
    json: any;
  };
  authorConnection: {
    edges: Array<{
      node: {
        title: string;
        url: string;
        photoConnection: {
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
  date
  title
  url
  summary
  featured_imageConnection {
    edges {
      node {
        dimension {
          height
          width
        }
        url
      }
    }
  }
  content {
    json
  }
  authorConnection {
    edges {
      node {
        ... on Author {
          title
          url
          photoConnection {
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
        }
      }
    }
  }
  global_field {
    description
    title
    keywords
  }
`;

export interface SettingsQueryResult {
  data: {
    settings: {
      copyright: string;
      site_title: string;
      logoConnection: {
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
      referenceConnection: {
        edges: Array<{
          node: {
            title: string;
            menu_items: Array<{
              label: string;
              external_link: {
                href: string;
                title: string;
              };
              internal_linkConnection: {
                edges: Array<{
                  node: {
                    title: string;
                    url: string;
                  };
                }>;
              };
            }>;
          };
        }>;
      };
      social_links: {
        social_links: Array<{
          name: string;
          link: {
            href: string;
            title: string;
          };
          iconConnection: {
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
        }>;
      };
    };
  };
}
export const settingsQuery = gql`
  query MyQuery {
    settings(uid: "blt2c76fbecb8678aee") {
      copyright
      site_title
      logoConnection {
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
      referenceConnection {
        edges {
          node {
            ... on Menu {
              title
              menu_items {
                label
                external_link {
                  href
                  title
                }
                internal_linkConnection {
                  edges {
                    node {
                      ... on Page {
                        title
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      social_links {
        social_links {
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
          link {
            href
            title
          }
          name
        }
      }
    }
  }
`;

export interface FeaturedPostsQuery {
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
const featuredPostsQuery = gql`
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
            ${blogQuery}
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
  PageMainContentSpotlight: spotlightQuery,
  PageMainContentBlog: featuredPostsQuery,
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
      spotlight: SpotlightQuery;
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
        global_field: {
          description: string;
          title: string;
        };
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
        global_field {
          description
          title
          keywords
        }
      }
    }
  }
`;

export const postQuery = gql`
  query post($url: String!) {
    all_blog_article(where: { url: $url }) {
      items {
        ${blogQuery}
      }
    }
  }
`;
