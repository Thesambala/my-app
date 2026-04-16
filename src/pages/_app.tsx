import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/Appshell";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Halaman yang tidak menggunakan AppShell (tanpa Navbar)
  const disableAppShell = router.pathname === '/404';

  if (disableAppShell) {
    return <Component {...pageProps} />;
  }

  return (
    <AppShell>
      {/* Navbar tidak perlu dipanggil di sini lagi karena sudah ada di dalam AppShell */}
      <Component {...pageProps} />
    </AppShell>
  );
};