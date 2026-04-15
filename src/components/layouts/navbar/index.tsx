import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      {/* Memanggil class .big yang ada di globals.css */}
      <div className="big">
        Navbar
      </div>
    </div>
  );
};

export default Navbar;