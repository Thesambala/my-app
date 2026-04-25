import DetailProduk from "../../../../views/DetailProduct";
import { ProductType } from "../../../../src/types/Product.type";

const HalamanProdukSSG = ({ product }: { product: ProductType }) => {
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
                Halaman Detail Produk SSG
            </h1>
            <DetailProduk products={product} />
        </div>
    );
};

export default HalamanProdukSSG;

// getStaticPaths: Menentukan path mana saja yang akan di-generate saat build time
export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/api/produk');
    const response = await res.json();

    const paths = response.data.map((product: ProductType) => ({
        params: { id: product.id }
    }));

    return {
        paths,
        fallback: false // false = 404 jika path tidak ada, true = generate on-demand
    };
}

// getStaticProps: Mengambil data untuk setiap path saat build time
export async function getStaticProps({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/produk/${params.id}`);
    const response = await res.json();

    return {
        props: {
            product: response.data,
        },
        revalidate: 10, // ISR: Re-generate halaman setiap 10 detik jika ada request
    };
}
