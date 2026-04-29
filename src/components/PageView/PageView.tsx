import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from "react-router";
import styles from "./PageView.module.css";
import {
  useDocsDispatch,
  useDocsState,
} from "../../context/DocsContext/useDocs";
import { useAuth } from "../../context/AuthContext/useAuth";
import { useEffect, useMemo } from "react";
import NotFound from "../../pages/NotFound/NotFound";

const PageView = () => {
  const { sectiune, paginaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const state = useDocsState();
  const dispatch = useDocsDispatch();
  const { state: authState } = useAuth();

  const page = useMemo(() => {
    return state.pages.find(
      (p) => p.id === paginaId && p.sectiune === sectiune,
    );
  }, [state.pages, paginaId, sectiune]);

  const sameSectionPages = useMemo(() => {
    return state.pages.filter((p) => p.sectiune === sectiune);
  }, [state.pages, sectiune]);

  const currentIndex = useMemo(() => {
    return sameSectionPages.findIndex((p) => p.id === paginaId);
  }, [sameSectionPages, paginaId]);

  const prevPage = currentIndex > 0 ? sameSectionPages[currentIndex - 1] : null;

  const nextPage =
    currentIndex !== -1 && currentIndex < sameSectionPages.length - 1
      ? sameSectionPages[currentIndex + 1]
      : null;

  useEffect(() => {
    if (page) {
      dispatch({
        type: "ADD_HISTORY",
        payload: { page },
      });
    }
  }, [page, dispatch]);

  if (!page) {
    return <NotFound />;
  }

  if (page.intern && !authState.isLoggedIn) {
    return (
      <div className={styles.wrapper}>
        <h2>Acces restricționat 🔒</h2>
        <button
          onClick={() =>
            navigate("/login", { state: { from: location.pathname } })
          }
        >
          Mergi la login
        </button>
      </div>
    );
  }

  const segments = location.pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "editare" && s !== "comentarii");

  const handleEdit = () => {
    navigate(`/docs/${sectiune}/${paginaId}/editare`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleComments = () => {
    navigate("comentarii");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link to="/">EA FC 26</Link>

          {segments.map((seg, index) => {
            const path = "/" + segments.slice(0, index + 1).join("/");

            return (
              <span key={path}>
                {" / "}
                <Link to={path}>{seg}</Link>
              </span>
            );
          })}
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{page.titlu}</h1>

          <div className={styles.tags}>
            {page.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <p>{page.continut}</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.navButtons}>
            {prevPage && (
              <Link
                to={`/docs/${sectiune}/${prevPage.id}`}
                className={styles.button}
              >
                ← {prevPage.titlu}
              </Link>
            )}

            {nextPage && (
              <Link
                to={`/docs/${sectiune}/${nextPage.id}`}
                className={styles.button}
              >
                {nextPage.titlu} →
              </Link>
            )}
          </div>

          <button className={styles.button} onClick={handleBack}>
            Înapoi
          </button>

          <button className={styles.button} onClick={handleComments}>
            Comentarii
          </button>

          <button className={styles.buttonPrimary} onClick={handleEdit}>
            Editează
          </button>
        </div>
      </div>

      <div className={styles.side}>
        <Outlet />
      </div>
    </div>
  );
};

export default PageView;