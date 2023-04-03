import App, { AppContext } from "next/app";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  example: string;
};

export default function PocApp({ Component, pageProps, example }: TProps) {
  return (
    <div className="text-slate-600">
      <div>Example {example}</div>
      <Component {...pageProps} />
    </div>
  );
}

PocApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx, example: "foo" };
};
