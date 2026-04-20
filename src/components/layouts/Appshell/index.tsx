import { useRouter } from "next/router";
import Navbar from "../navbar";

// 1. Buat daftar hitam (blacklist) untuk halaman yang TIDAK boleh ada Navbar
const disableNavbar = ["/auth/login", "/auth/register"];

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter(); // 2. Ambil info URL yang sedang dibuka saat ini

  return (
    <div>
      <header>
        {/* 3. Navbar hanya dimunculkan jika URL saat ini TIDAK ada di dalam daftar disableNavbar */}
        {!disableNavbar.includes(pathname) && <Navbar />}
      </header>
      
      <main>
        {children}
      </main>

      <footer style={{ padding: '20px', borderTop: '1px solid #ddd', marginTop: '20px', textAlign: 'center' }}>
        <p>© 2026 Praktikum Pemrograman Web - Polinema</p>
      </footer>
    </div>
  );
};

export default AppShell;