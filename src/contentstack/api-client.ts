import { PostProps } from "@/pages/blog/[post]";
import {
  BlogQueryResult,
  PageQueryResult,
  SettingsQueryResult,
  pageQuery,
  postQuery,
  settingsQuery,
} from "./queries";
import { jsonToHtml } from "@contentstack/json-rte-serializer";
import { PocSettings } from "@/pages/_app";

const config = {
  apiBaseUrl: process.env.CONTENTSTACK_API_BASE_URL ?? "",
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN ?? "",
  apiKey: process.env.CONTENTSTACK_API_KEY ?? "",
  environment: process.env.CONTENTSTACK_ENVIRONMENT ?? "",
};

const missingEnvVars = Object.entries(config).filter(([, value]) => !value);

if (typeof window === "undefined" && missingEnvVars.length > 0) {
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
        access_token: config.deliveryToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.log(JSON.stringify({ data, query }, null, 2));
    throw new Error(`GraphQL API Error: ${response.status}`);
  }

  return data;
}

export async function getPage(url: string) {
  const response: PageQueryResult = await contentstackClient(pageQuery, {
    url,
  });
  return {
    system: response.data.all_page.items[0].system,
    content: response.data.all_page.items[0].main_content,
    metadata: response.data.all_page.items[0].global_field,
  };
}

export async function getBlogPost(url: string): Promise<PostProps["post"]> {
  const response: BlogQueryResult = await contentstackClient(postQuery, {
    url,
  });

  const post = response.data.all_blog_article.items[0];

  return {
    metadata: post.global_field,
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

export async function getSettings(): Promise<PocSettings> {
  const response: SettingsQueryResult = await contentstackClient(settingsQuery);
  const data = response.data.settings;

  return {
    copyright: data.copyright,
    siteTitle: data.site_title,
    logo: {
      url: data.logoConnection.edges[0].node.url,
      dimensions: data.logoConnection.edges[0].node.dimension,
    },
    socialLinks: data.social_links.social_links.map((socialLink) => ({
      logo: {
        url: socialLink.iconConnection.edges[0].node.url,
        dimensions: socialLink.iconConnection.edges[0].node.dimension,
      },
      name: socialLink.name,
      link: socialLink.link,
    })),
    menu: data.menuConnection.edges[0].node.menu_items.map((menuItem) => ({
      label: menuItem.label,
      link: {
        href:
          menuItem.internal_linkConnection.edges[0]?.node.url ||
          menuItem.external_link.href,
        title:
          menuItem.internal_linkConnection.edges[0]?.node.title ||
          menuItem.external_link.title,
      },
    })),
  };
}
