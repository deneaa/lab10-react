import { Link, NavLink, useNavigate } from "react-router";
import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/cauta?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();

        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKey);

    return () => {
      window.removeEventListener("keydown", handleGlobalKey);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Docs App EA FC 26</Link>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/">Acasa</NavLink>
        <NavLink to="/docs">Docs</NavLink>
        <NavLink to="/istoric">Istoric</NavLink>
        <NavLink to="/cauta">Cauta</NavLink>
        <NavLink to="/despre">Despre</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <input
        ref={inputRef}
        className={styles.search}
        type="text"
        placeholder="Caută... (Enter)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};

export default Header;
