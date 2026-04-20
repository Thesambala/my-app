import TampilanProduk from "../../../views/products";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#fff3e0',
        borderLeft: '4px solid #ff9800'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#f57c00'
        }}>
          Halaman Produk SSG (Static Site Generation)
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '1rem',
          margin: 0
        }}>
          Data di-fetch saat build time dengan ISR (revalidate: 60s). Setelah build ulang, data baru muncul. Tidak ada skeleton loading.
        </p>
      </div>
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukStatic;

export async function getStaticProps() {
  try {
    // Setelah build ulang - SSG mengambil data dari API yang sama dengan CSR/SSR
    // Menunjukkan bahwa SSG bisa mendapat data terbaru setelah di-build ulang
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    const products: ProductType[] = response.data || [];
    
    // console.log("Data produk setelah build ulang untuk SSG:", products);
    return {
      props: {
        products: products,
      },
      // Revalidate setiap 60 detik (ISR)
      revalidate: 60,
    }
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    // Fallback data jika API tidak tersedia saat build
    const fallbackProducts: ProductType[] = [
      {
        id: "2",
        name: "Sepatu Duramo SL",
        category: "Men's Shoes",
        price: 900000,
        image: "/sepatu-duramo.svg"
      },
      {
        id: "3", 
        name: "SEPATU SAMBA OG",
        category: "Men's Shoes",
        price: 2000000,
        image: "/sepatu-samba.svg"
      }
    ];
    return {
      props: {
        products: fallbackProducts,
      },
      revalidate: 60,
    }
  }
}