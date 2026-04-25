import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "../../../views/products";
import useSWR from "swr";
import fetcher from "../../../utils/swr/fetcher";
import Link from "next/link";

const kategori = () => {
  const [products, setProducts] = useState([]);
  
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        padding: '20px', 
        backgroundColor: '#f5f5f5',
        margin: 0,
        borderBottom: '2px solid #ddd'
      }}>
        Halaman Produk CSR (Client-Side Rendering)
      </h1>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Halaman ini di-render di browser. Data diambil setelah halaman dimuat (ada loading state).
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Link href="/produk" style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
            CSR (Current)
          </Link>
          <Link href="/produk/server" style={{ padding: '10px 20px', backgroundColor: '#e3f2fd', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>
            SSR
          </Link>
          <Link href="/produk/static" style={{ padding: '10px 20px', backgroundColor: '#e8f5e9', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>
            SSG
          </Link>
        </div>
      </div>
      <TampilanProduk products={isLoading ? [] : data.data} />
    </div>
  );
};

export default kategori;
