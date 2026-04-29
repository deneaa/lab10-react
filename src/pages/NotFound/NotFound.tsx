import { useNavigate } from "react-router";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Pagina nu a fost găsită</h2>

        <p className={styles.text}>
          Linkul accesat nu există sau a fost mutat.
        </p>

        <div className={styles.actions}>
          <button className={styles.button} onClick={() => navigate(-1)}>
            Înapoi
          </button>

          <button className={styles.buttonPrimary} onClick={() => navigate("/")}>
            Acasă
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;