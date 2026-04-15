import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/Appshell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      {/* Navbar tidak perlu dipanggil di sini lagi karena sudah ada di dalam AppShell */}
      <Component {...pageProps} />
    </AppShell>
  );
};