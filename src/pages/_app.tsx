import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="text-slate-600">
      <Component {...pageProps} />
    </div>
  );
}
