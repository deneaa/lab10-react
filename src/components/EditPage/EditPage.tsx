import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./EditPage.module.css";
import {
  useDocsDispatch,
  useDocsState,
} from "../../context/DocsContext/useDocs";

const EditPage = () => {
  const { sectiune, paginaId } = useParams();
  const navigate = useNavigate();

  const state = useDocsState();
  const dispatch = useDocsDispatch();

  const page = useMemo(() => {
    return state.pages.find(
      (p) => p.id === paginaId && p.sectiune === sectiune,
    );
  }, [state.pages, paginaId, sectiune]);

  const [form, setForm] = useState(() => ({
    title: page?.titlu || "",
    content: page?.continut || "",
  }));

  if (!page) {
    return <div>Pagina nu există</div>;
  }

  const handleSave = () => {
    dispatch({
      type: "UPDATE_PAGE",
      payload: {
        id: paginaId!,
        sectiune: sectiune!,
        titlu: form.title,
        continut: form.content,
      },
    });

    navigate(`/docs/${sectiune}/${paginaId}`, { replace: true });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Editare pagină</h2>

      <input
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, title: e.target.value }))
        }
        className={styles.input}
      />

      <textarea
        value={form.content}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, content: e.target.value }))
        }
        className={styles.textarea}
      />

      <div className={styles.actions}>
        <button onClick={handleCancel}>Anulează</button>
        <button onClick={handleSave}>Salvează</button>
      </div>
    </div>
  );
};

export default EditPage;
