import styles from "./Comments.module.css";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  useDocsDispatch,
  useDocsState,
} from "../../context/DocsContext/useDocs";
import type { Comment } from "../../types/comment";
import pages from "../../data/pages.json";

const Comments = () => {
  const navigate = useNavigate();
  const { paginaId } = useParams();

  const state = useDocsState();
  const dispatch = useDocsDispatch();

  const [text, setText] = useState("");

  const page = pages.find((p) => p.id === paginaId);

  const defaultComments: Comment[] = page?.comentarii || [];

  const stateComments: Comment[] =
    paginaId && state.comments[paginaId] ? state.comments[paginaId] : [];

  const comments: Comment[] = [...defaultComments, ...stateComments];

  const handleClose = () => {
    navigate(-1);
  };

  const handleAdd = () => {
    if (!text.trim() || !paginaId) return;

    dispatch({
      type: "ADD_COMMENT",
      payload: {
        paginaId,
        comment: {
          autor: "user",
          text,
        },
      },
    });

    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Comentarii ({comments.length})</h3>
        <button className={styles.closeBtn} onClick={handleClose}>
          ✕
        </button>
      </div>

      <div className={styles.list}>
        {comments.length === 0 && (
          <p className={styles.empty}>Nu există comentarii. Fii primul! 💬</p>
        )}

        {comments.map((c, index) => (
          <div key={index} className={styles.comment}>
            <div className={styles.commentHeader}>
              <p className={styles.author}>{c.autor}</p>

            </div>

            <p className={styles.text}>{c.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.form}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrie un comentariu..."
        />

        <button
          className={styles.sendBtn}
          onClick={handleAdd}
          disabled={!text.trim()}
        >
          Trimite
        </button>
      </div>
    </div>
  );
};

export default Comments;
