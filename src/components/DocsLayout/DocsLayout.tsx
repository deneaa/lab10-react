import { NavLink, Outlet } from "react-router";
import styles from "./DocsLayout.module.css";
import pages from "../../data/pages.json";
import sections from "../../data/sections.json";
import type { Page } from "../../types";

const DocsLayout = () => {
  const grouped = pages.reduce<Record<string, Page[]>>((acc, page) => {
    if (!acc[page.sectiune]) {
      acc[page.sectiune] = [];
    }

    acc[page.sectiune].push(page);
    return acc;
  }, {});

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>📘 EA FC 26 Docs</h2>

        {sections.map((section) => (
          <div key={section.id} className={styles.section}>
            <NavLink
              to={`/docs/${section.id}`}
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.sectionTitle} ${styles.sectionTitleActive}`
                  : styles.sectionTitle
              }
            >
              {section.titlu.toUpperCase()}
            </NavLink>

            <div className={styles.link}>
              {(grouped[section.id] || []).map((page: Page) => (
                <NavLink
                  key={page.id}
                  to={`/docs/${section.id}/${page.id}`}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                >
                  {page.titlu}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default DocsLayout;
