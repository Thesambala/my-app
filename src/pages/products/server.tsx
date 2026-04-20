import TampilanProduk from "../../../views/products";
import { ProductType } from "../../types/Product.type";

const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#e8f5e8',
        borderLeft: '4px solid #4caf50'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#2e7d32'
        }}>
          Halaman Produk SSR (Server-Side Rendering)
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '1rem',
          margin: 0
        }}>
          Data di-fetch di server menggunakan getServerSideProps. Data terbaru akan muncul. Tidak ada skeleton loading.
        </p>
      </div>
      <TampilanProduk products={products} />
    </div>
  );
};

export default halamanProdukServer;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses, dan akan mengambil data produk terbaru dari API sebelum merender halaman.
export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    // console.log("Data produk yang diambil dari API:", response);
    return {
      props: {
        products: response.data || [], // Pastikan untuk memberikan nilai default jika data tidak tersedia
      },
    };
  } catch (error) {
    console.error("Error fetching products from API:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}