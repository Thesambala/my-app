import DetailProduk from "../../../../views/DetailProduct";
import { ProductType } from "../../../../src/types/Product.type";

const HalamanProdukSSR = ({ product }: { product: ProductType }) => {
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
                Halaman Detail Produk SSR
            </h1>
            <DetailProduk products={product} />
        </div>
    );
};

export default HalamanProdukSSR;

// Fungsi getServerSideProps akan dipanggil setiap kali halaman ini diakses
// Data diambil dari server setiap request (Server-Side Rendering)
export async function getServerSideProps({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3000/api/produk/${params.id}`);
    const response = await res.json();
    
    return {
        props: {
            product: response.data,
        },
    };
}
