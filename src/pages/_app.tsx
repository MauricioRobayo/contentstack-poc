import App, { AppContext } from "next/app";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { getSettings } from "@/contentstack/api-client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export interface PocSettings {
  copyright: string;
  siteTitle: string;
  logo: {
    url: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
  menu: Array<{
    label: string;
    link: {
      href: string;
      title: string;
    };
  }>;
  socialLinks: Array<{
    name: string;
    logo: {
      url: string;
      dimensions: {
        width: number;
        height: number;
      };
    };
    link: {
      href: string;
      title: string;
    };
  }>;
}

type TProps = Pick<AppProps, "Component" | "pageProps"> & {
  settings: PocSettings;
};

export default function PocApp({ Component, pageProps, settings }: TProps) {
  const { system } = pageProps.page;
  return (
    <div
      className="text-slate-600"
      data-contenttype={system.contentType}
      data-locale={system.locale}
      data-pageref={system.pageRef}
    >
      <Header
        logo={settings.logo}
        siteTitle={settings.siteTitle}
        menu={settings.menu}
      />
      <Component {...pageProps} />
      <Footer {...settings} />
    </div>
  );
}

PocApp.getInitialProps = async (context: AppContext) => {
  const [ctx, settings] = await Promise.all([
    App.getInitialProps(context),
    getSettings(),
  ]);

  return { ...ctx, settings };
};
