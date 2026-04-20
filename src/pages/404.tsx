import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/404.module.scss";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
        <meta name="description" content="Maaf, halaman yang Anda cari tidak ditemukan." />
      </Head>
      
      <div className={styles.error}>
        <img src="/page-not-found.png" alt="404" className={styles.error__image} />
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p className={styles.error__description}>
          Maaf, halaman yang Anda cari tidak ada. Halaman mungkin telah dipindahkan atau dihapus.
        </p>
        <div className={styles.error__buttons}>
          <Link href="/" className={styles.error__link}>
            Kembali ke Home
          </Link>
          <Link href="/auth/login" className={styles.error__linkSecondary}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Custom404;
