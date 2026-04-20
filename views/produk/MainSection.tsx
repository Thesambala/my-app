import { useRouter } from "next/router";
import styles from './produk.module.scss';

const MainSection = () => {
  const router = useRouter();

  // Data produk dummy
  const products = [
    {
      id: 1,
      name: "Laptop Gaming",
      description: "Laptop gaming dengan spesifikasi tinggi untuk performa maksimal",
      price: "Rp 15.000.000",
      icon: "💻"
    },
    {
      id: 2,
      name: "Smartphone Premium",
      description: "Smartphone dengan kamera canggih dan layar AMOLED",
      price: "Rp 8.500.000",
      icon: "📱"
    },
    {
      id: 3,
      name: "Headphone Wireless",
      description: "Headphone dengan noise cancellation dan audio berkualitas",
      price: "Rp 2.500.000",
      icon: "🎧"
    },
    {
      id: 4,
      name: "Smart Watch",
      description: "Smart watch dengan fitur kesehatan dan fitness tracking",
      price: "Rp 3.200.000",
      icon: "⌚"
    },
    {
      id: 5,
      name: "Kamera DSLR",
      description: "Kamera DSLR profesional untuk fotografi berkualitas tinggi",
      price: "Rp 12.000.000",
      icon: "📷"
    },
    {
      id: 6,
      name: "Tablet Pro",
      description: "Tablet dengan stylus untuk produktivitas dan kreativitas",
      price: "Rp 9.500.000",
      icon: "📲"
    }
  ];

  const handleProductClick = (productId: number) => {
    router.push(`/produk/${productId}`);
  };

  return (
    <section id="main-section" className={styles.main}>
      <div className={styles.main__header}>
        <h2 className={styles.main__title}>Produk Unggulan</h2>
        <p className={styles.main__description}>
          Pilihan produk terbaik dengan kualitas terjamin dan harga kompetitif
        </p>
      </div>

      <div className={styles.main__grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.main__card}>
            <div className={styles.main__cardImage}>
              {product.icon}
            </div>
            <h3 className={styles.main__cardTitle}>{product.name}</h3>
            <p className={styles.main__cardDescription}>{product.description}</p>
            <div className={styles.main__cardPrice}>{product.price}</div>
            <button 
              className={styles.main__cardButton}
              onClick={() => handleProductClick(product.id)}
            >
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainSection;
