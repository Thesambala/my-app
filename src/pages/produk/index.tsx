import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HalamanProduk = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 1. Cek apakah user sudah login (berdasarkan localStorage dari halaman login tadi)
    const statusLogin = localStorage.getItem("isLoggedIn");

    // 2. INI ADALAH JAWABAN TUGAS 3: Redirect otomatis jika belum login
    if (!statusLogin) {
      router.replace("/auth/login");
    } else {
      // Jika sudah login, izinkan halaman ditampilkan
      setIsLogin(true);
    }
  }, [router]);

  // Fungsi tambahan untuk menghapus sesi login
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace("/auth/login");
  };

  // Tampilkan teks loading sebentar saat sistem mengecek status login
  if (!isLogin) {
    return <p>Memeriksa akses keamanan...</p>;
  }

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Selamat datang! Ini adalah halaman yang dilindungi.</p>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HalamanProduk;