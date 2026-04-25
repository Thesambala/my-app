import TampilanProduk from "../../../../views/products";
import { ProductType } from "../../../../src/types/Product.type";
import Link from "next/link";

const ProdukStaticList = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        padding: '20px', 
        backgroundColor: '#e8f5e9',
        margin: 0,
        borderBottom: '2px solid #4caf50'
      }}>
        Halaman Produk SSG (Static Site Generation)
      </h1>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Halaman ini di-generate saat build time. Data diambil sekali saat build dan di-cache.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Link href="/produk" style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>
            CSR
          </Link>
          <Link href="/produk/server" style={{ padding: '10px 20px', backgroundColor: '#e3f2fd', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>
            SSR
          </Link>
          <Link href="/produk/static" style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
            SSG (Current)
          </Link>
        </div>
      </div>
      <TampilanProduk products={products} basePath="/produk/static" />
    </div>
  );
};

export default ProdukStaticList;

// getStaticProps: Data diambil saat build time
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();
  
  return {
    props: {
      products: response.data,
    },
    revalidate: 10, // ISR: Re-generate halaman setiap 10 detik
  };
}
