import {
  useDocsDispatch,
  useDocsState,
} from "../../context/DocsContext/useDocs";
import styles from "./Istoric.module.css";
import { useNavigate } from "react-router";
import type { History } from "../../types";

const Istoric = () => {
  const { istoric } = useDocsState();
  const dispatch = useDocsDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch({ type: "DELETE_HISTORY" });
  };

  const handleNavigate = (item: History) => {
    navigate(`/docs/${item.page.sectiune}/${item.page.id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Istoric navigare</h1>

      <p className={styles.subtitle}>
        Ultimele pagini vizitate în EA FC 26 Docs
      </p>

      <div className={styles.actions}>
        <button onClick={handleDelete}>Șterge istoric</button>
      </div>

      <div className={styles.list}>
        {istoric.map((i: History, index) => (
          <div
            key={index}
            className={styles.item}
            onClick={() => handleNavigate(i)}
          >
            <h3>{i.page.titlu}</h3>

            <small>{`/docs/${i.page.sectiune}/${i.page.id}`}</small>

            <span>{new Date(i.data).toLocaleTimeString()}</span>
          </div>
        ))}

        {istoric.length === 0 && (
          <div className={styles.empty}>
            <h3>Nu ai nicio pagină vizitată</h3>
            <button onClick={() => navigate("/docs")}>Începe navigarea</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Istoric;
