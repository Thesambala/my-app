import fetcher from "../../../utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../../views/DetailProduct";

const HalamanProduk = () => {
    const { query } = useRouter();
    const { data, error, isLoading } = useSWR(`/api/produk/${query.product}`, fetcher);

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
                Halaman Detail Produk CSR
            </h1>
            <DetailProduk products={isLoading ? {} : data.data} />
        </div>
    );
};

export default HalamanProduk;
