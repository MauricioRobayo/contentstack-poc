const gql = String.raw;

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

const link = gql`
  link {
    href
    title
  }
`;

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
