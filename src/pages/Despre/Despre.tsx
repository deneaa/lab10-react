import styles from "./Despre.module.css";

const Despre = () => {
  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>Despre EA FC 26 Docs</h1>

      <p className={styles.text}>
        Această aplicație este un ghid interactiv pentru EA SPORTS FC 26,
        creat pentru a organiza informații despre gameplay, moduri de joc și sisteme interne.
      </p>

      <div className={styles.section}>
        <h2>Conținut</h2>
        <p>
          Include informații despre Gameplay, Ultimate Team și Career Mode,
          organizate într-un sistem de documentație ușor de navigat.
        </p>
      </div>

    </div>
  );
};

export default Despre;