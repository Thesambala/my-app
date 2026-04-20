import { useState, useEffect } from "react";
import useSWR from "swr";
import TampilanProduk from "../../../views/products";
import { ProductType } from "../../types/Product.type";

// Fetcher untuk API produk (data terbaru)
const fetcher = (url: string) => 
  fetch(url).then((res) => res.json()).then((data) => data.data);

const ProductsCSRPage = () => {
  // Menggunakan SWR untuk Client-Side Rendering dengan data terbaru
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  // Get products dari data SWR
  const products: ProductType[] = data || [];

  return (
    <div>
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#e3f2fd',
        borderLeft: '4px solid #2196f3'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#1976d2'
        }}>
          Halaman Produk CSR (Client-Side Rendering)
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '1rem',
          margin: 0
        }}>
          Data di-fetch di browser menggunakan SWR. Data terbaru akan muncul. Skeleton loading akan muncul saat refresh.
        </p>
      </div>
      
      {error && (
        <div style={{ 
          padding: '1rem', 
          margin: '1rem',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          border: '1px solid #ef5350'
        }}>
          Error loading data: {error.message}
        </div>
      )}
      
      <TampilanProduk products={isLoading ? [] : products} />
    </div>
  );
};

export default ProductsCSRPage;