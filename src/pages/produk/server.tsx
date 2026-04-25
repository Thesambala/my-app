import TampilanProduk from "../../../views/products";
import { ProductType } from "../../../src/types/Product.type";
import Link from "next/link";

const ProdukServer = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        padding: '20px', 
        backgroundColor: '#e3f2fd',
        margin: 0,
        borderBottom: '2px solid #2196f3'
      }}>
        Halaman Produk SSR (Server-Side Rendering)
      </h1>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Halaman ini di-render di server setiap kali ada request. Data selalu fresh.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Link href="/produk" style={{ padding: '10px 20px', backgroundColor: '#f5f5f5', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>
            CSR
          </Link>
          <Link href="/produk/server" style={{ padding: '10px 20px', backgroundColor: '#2196f3', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
            SSR (Current)
          </Link>
          <Link href="/produk/static" style={{ padding: '10px 20px', backgroundColor: '#e8f5e9', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>
            SSG
          </Link>
        </div>
      </div>
      <TampilanProduk products={products} basePath="/produk/server" />
    </div>
  );
};

export default ProdukServer;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses, dan akan mengambil data produk dari API sebelum merender halaman.
// (digunakan server-side rendering)
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();
  // console.log("Data produk yang diambil dari API:", response);
  return {
    props: {
      products: response.data, // Mengirim data produk ke component
    },
  };
}
