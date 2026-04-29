import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Docs App EA FC 26</p>
    </footer>
  );
};

export default Footer;