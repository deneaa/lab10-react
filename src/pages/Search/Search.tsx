import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import styles from "./Search.module.css";
import pages from "../../data/pages.json";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const sectiune = searchParams.get("sectiune") || "";
  const tags = searchParams.getAll("tag");

  const allTags = useMemo(() => {
    const map = new Set<string>();
    pages.forEach((p) => p.tags.forEach((t) => map.add(t)));
    return Array.from(map);
  }, []);

  const allSectiuni = useMemo(() => {
    const map = new Set<string>();
    pages.forEach((p) => map.add(p.sectiune));
    return Array.from(map);
  }, []);

  const results = useMemo(() => {
    return pages.filter((p) => {
      const matchQ =
        !q ||
        p.titlu.toLowerCase().includes(q.toLowerCase()) ||
        p.continut.toLowerCase().includes(q.toLowerCase());

      const matchSectiune = !sectiune || p.sectiune === sectiune;

      const matchTags =
        tags.length === 0 || tags.every((t) => p.tags.includes(t));

      return matchQ && matchSectiune && matchTags;
    });
  }, [q, sectiune, tags]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);
    else params.delete(key);

    setSearchParams(params);
  };

  const toggleTag = (tag: string) => {
    const current = searchParams.getAll("tag");
    const params = new URLSearchParams(searchParams);

    params.delete("tag");

    const newTags = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];

    newTags.forEach((t) => params.append("tag", t));

    setSearchParams(params);
  };

  return (
    <div className={styles.wrapper}>
      <input
        value={q}
        onChange={(e) => setParam("q", e.target.value)}
        placeholder="Caută..."
      />

      <div className={styles.tags}>
        {allSectiuni.map((s) => (
          <button
            key={s}
            onClick={() => setParam("sectiune", sectiune === s ? "" : s)}
            className={sectiune === s ? styles.active : styles.tag}
          >
            {s}
          </button>
        ))}
      </div>

      <div className={styles.tags}>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={tags.includes(tag) ? styles.active : styles.tag}
          >
            {tag}
          </button>
        ))}
      </div>

      <button onClick={() => setSearchParams({})}>Reset</button>

      <div className={styles.results}>
        {results.map((p) => (
          <Link key={p.id} to={`/docs/${p.sectiune}/${p.id}`}>
            <h3>{p.titlu}</h3>
            <p>{p.sectiune}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
