import { pageQuery } from "@/contentstack/queries";

export default function LogPage({ props }: any) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

export function getServerSideProps() {
  return {
    props: {
      pageQuery,
    },
  };
}
