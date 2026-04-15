import { useRouter } from "next/router";
import styles from './produk.module.scss';

interface HeroSectionProps {
  onLogout: () => void;
}

const HeroSection = ({ onLogout }: HeroSectionProps) => {
  const router = useRouter();

  const handleExplore = () => {
    // Scroll ke main section
    const mainSection = document.getElementById('main-section');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <h1 className={styles.hero__title}>Selamat Datang di Toko Kami</h1>
        <p className={styles.hero__subtitle}>
          Temukan produk terbaik dengan harga terjangkau dan kualitas terpercaya
        </p>
        <div className={styles.hero__actions}>
          <button 
            className={`${styles.hero__button} ${styles.hero__button__primary}`}
            onClick={handleExplore}
          >
            Jelajahi Produk
          </button>
          <button 
            className={`${styles.hero__button} ${styles.hero__button__secondary}`}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
