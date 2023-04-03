import { PostProps } from "@/pages/blog/[post]";
import {
  BlogQueryResult,
  PageQueryResult,
  pageQuery,
  postQuery,
} from "./queries";
import { jsonToHtml } from "@contentstack/json-rte-serializer";

const config = {
  apiBaseUrl: process.env.CONTENTSTACK_API_BASE_URL ?? "",
  accessToken: process.env.CONTENTSTACK_ACCESS_TOKEN ?? "",
  apiKey: process.env.CONTENTSTACK_API_KEY ?? "",
  environment: process.env.CONTENTSTACK_ENVIRONMENT ?? "",
};

const missingEnvVars = Object.entries(config).filter(([, value]) => !value);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing env vars: ${missingEnvVars.map(([key]) => key).join()}`
  );
}

async function contentstackClient(
  query: string,
  variables?: Record<string, string | number>
) {
  const response = await fetch(
    `${config.apiBaseUrl}/stacks/${config.apiKey}?environment=${config.environment}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        access_token: config.accessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`GraphQL API Error: ${response.status}`);
  }

  return response.json();
}

export async function getPageBlocks(url: string) {
  const response: PageQueryResult = await contentstackClient(pageQuery, {
    url,
  });
  return response.data.all_page.items[0].main_content;
}

export async function getBlogPost(url: string): Promise<PostProps["post"]> {
  const response: BlogQueryResult = await contentstackClient(postQuery, {
    url,
  });

  const post = response.data.all_blog_article.items[0];

  return {
    date: post.date,
    image: {
      dimensions: post.featured_imageConnection.edges[0].node.dimension,
      url: post.featured_imageConnection.edges[0].node.url,
    },
    title: post.title,
    content: jsonToHtml(response.data.all_blog_article.items[0].content.json),
    author: {
      name: post.authorConnection.edges[0].node.title,
      url: post.authorConnection.edges[0].node.url,
      image: {
        url: post.authorConnection.edges[0].node.photoConnection.edges[0].node
          .url,
        dimensions:
          post.authorConnection.edges[0].node.photoConnection.edges[0].node
            .dimension,
      },
    },
  };
}
