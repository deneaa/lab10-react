import styles from "./DocsHome.module.css";
import sections from "../../data/sections.json";
import { NavLink } from "react-router";

const DocsHome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>EA FC 26 Docs</h1>
        <p className={styles.subtitle}>
          Selectează o secțiune din sidebar pentru a începe
        </p>
      </div>

      <div className={styles.grid}>
        {sections.map((s) => (
          <NavLink to={`/docs/${s.id}`} key={s.id} className={styles.card}>
            <h3>{s.id}</h3>
            <p>{s.descriere}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DocsHome;
