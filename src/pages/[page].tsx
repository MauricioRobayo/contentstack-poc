import { contentstackClient } from "@/contentstack/api-client";
import { pageQuery } from "@/contentstack/queries";
import { GetServerSideProps } from "next";

export default function Page({ page }: any) {
  return <pre>page {JSON.stringify(page, null, 2)}</pre>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = await contentstackClient(pageQuery, {
    url: `/${context.query.page ?? ""}`,
  });

  return {
    props: {
      page,
    },
  };
};
