import styles from "../produk/produk.module.scss";
import { ProductType } from "../../src/types/Product.type";
import Link from "next/link";

const TampilanProduk = ({ products, basePath = "/produk" }: { products: ProductType[], basePath?: string }) => {
  // Render multiple skeletons saat loading
  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <div key={`skeleton-${index}`} className={styles.produk__content__skeleton}>
        <div className={styles.produk__content__skeleton__image}></div>
        <div className={styles.produk__content__skeleton__name}></div>
        <div className={styles.produk__content__skeleton__category}></div>
        <div className={styles.produk__content__skeleton__price}></div>
      </div>
    ));
  };

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {products.length > 0 ? (
          <>
            {products.map((products: ProductType) => (
              <Link href={`${basePath}/${products.id}`} key={products.id} className={styles.produk__content__item}>
                <div className={styles.produk__content__item__image}>
                  <img src={products.image} alt={products.name} width={200} />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {products.name}
                </h4>
                <p className={styles.produk__content__item__category}>
                  {products.category}
                </p>
                <p className={styles.produk__content__item__price}>
                  Rp {products.price.toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </>
        ) : (
          renderSkeletons()
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;
