import { Link } from "react-router";
import pages from "../../data/pages.json";

const PrivatePage = () => {
  const internPages = pages.filter((p) => p.intern);

  return (
    <div>
      <h2>🔒 Zonă Privată</h2>
      <p>Bine ai venit! Conținut exclusiv:</p>
      {internPages.map((p) => (
        <div key={p.id}>
          <Link to={`/docs/${p.sectiune}/${p.id}`}>
            <h3>{p.titlu}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PrivatePage;