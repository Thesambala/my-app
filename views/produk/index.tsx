import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import styles from './produk.module.scss';
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

type ProductType = {
  id: string;
  nama: string;
  harga: number;
  ukuran: string;
  warna: string;
  category: string;
};

const TampilanProduk = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  // Menggunakan SWR untuk fetch data
  const { data, error, isLoading, mutate } = useSWR("/api/produk", fetcher);

  // useEffect untuk cek login - di-comment
  // useEffect(() => {
  //   const statusLogin = localStorage.getItem("isLoggedIn");
  //   if (!statusLogin) {
  //     router.replace("/auth/login");
  //   } else {
  //     setIsLogin(true);
  //   }
  // }, [router]);

  // Fungsi untuk refresh data menggunakan mutate dari SWR
  const handleRefresh = () => {
    console.log("Refreshing data...");
    mutate(); // SWR akan re-fetch data
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace("/auth/login");
  };

  // Tampilkan loading saat mengecek status login
  // if (!isLogin) {
  //   return <div className={styles.loading}>Memeriksa akses keamanan...</div>;
  // }

  // Get products dari data SWR
  const products = data?.data || [];

  return (
    <div className={styles.produk}>
      <HeroSection onLogout={handleLogout} />
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1>Daftar Produk</h1>
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: isLoading ? '#ccc' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {isLoading ? 'Loading...' : '🔄 Refresh Data'}
          </button>
        </div>

        {error && (
          <p style={{ color: 'red', padding: '1rem', backgroundColor: '#fee', borderRadius: '4px' }}>
            Error loading data: {error.message}
          </p>
        )}

        {isLoading && products.length === 0 ? (
          <p>Memuat data...</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {products.map((product: ProductType) => (
              <div 
                key={product.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{product.nama}</h2>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>
                  <strong>Kategori:</strong> {product.category}
                </p>
                <p style={{ color: '#3498db', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  Harga: Rp {product.harga.toLocaleString('id-ID')}
                </p>
                <p style={{ color: '#666', marginBottom: '0.25rem' }}>
                  <strong>Ukuran:</strong> {product.ukuran}
                </p>
                <p style={{ color: '#666' }}>
                  <strong>Warna:</strong> {product.warna}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;
