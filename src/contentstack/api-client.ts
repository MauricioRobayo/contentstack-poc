import { PageQueryResult, pageQuery } from "./queries";

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
