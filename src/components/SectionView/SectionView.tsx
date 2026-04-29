import styles from "./SectionView.module.css";
import sections from "../../data/sections.json";
import pages from "../../data/pages.json";
import { NavLink, useParams } from "react-router";
import NotFound from "../../pages/NotFound/NotFound";

const SectionView = () => {
  const { sectiune } = useParams();

  const section = sections.find((s) => s.id === sectiune);
  const sectionPages = pages.filter((p) => p.sectiune === sectiune);

  if (!section) {
    return <NotFound />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{section.titlu}</h1>
        <p className={styles.description}>{section.descriere}</p>
      </div>

      <div className={styles.content}>
        <h2>📚 Pagini din secțiune</h2>

        <div className={styles.list}>
          {sectionPages.map((page) => (
            <NavLink
              to={`/docs/${sectiune}/${page.id}`}
              key={page.id}
              className={styles.card}
            >
              <h3>{page.titlu}</h3>
              <p>{page.continut.slice(0, 80)}...</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionView;
