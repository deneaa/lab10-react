import { Link, useNavigate } from "react-router";
import styles from "./Home.module.css";
import { useState } from "react";
import sections from "../../data/sections.json";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/cauta?q=${query}`);
  };

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>⚽ EA FC 26 Docs</h1>
        <p>
          Ghid complet pentru mecanici, gameplay, moduri și sistemele din EA
          SPORTS FC 26
        </p>
        <button className={styles.button} onClick={() => navigate("/docs")}>
          Începe explorarea
        </button>
      </section>

      <section className={styles.search}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Caută mecanici, moduri, sisteme..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section className={styles.sections}>
        <h2>Categorii</h2>
        {sections.map((s) => (
          <Link key={s.id} to={`/docs/${s.id}`} className={styles.card}>
            <h3>{s.titlu}</h3>
            <p>{s.descriere}</p>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Home;
