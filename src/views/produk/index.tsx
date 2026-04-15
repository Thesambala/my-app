import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import styles from './produk.module.scss';

const TampilanProduk = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah login
    const statusLogin = localStorage.getItem("isLoggedIn");

    // Redirect otomatis jika belum login
    if (!statusLogin) {
      router.replace("/auth/login");
    } else {
      // Jika sudah login, izinkan halaman ditampilkan
      setIsLogin(true);
    }
  }, [router]);

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace("/auth/login");
  };

  // Tampilkan loading saat mengecek status login
  if (!isLogin) {
    return <div className={styles.loading}>Memeriksa akses keamanan...</div>;
  }

  return (
    <div className={styles.produk}>
      <HeroSection onLogout={handleLogout} />
      <MainSection />
    </div>
  );
};

export default TampilanProduk;
