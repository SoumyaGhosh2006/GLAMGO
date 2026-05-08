import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function NotFound() {
  return (
    <main className="not-found-page">
      <Seo
        title="Page Not Found | GLAMGO"
        description="The GLAMGO page you are looking for could not be found."
        path="/404"
        noindex
      />

      <section className="not-found-card">
        <span>404</span>
        <h1>Page not found</h1>
        <p>
          This page may have moved, or the link may be incomplete. The
          collection and contact pages are still ready for you.
        </p>
        <div className="not-found-actions">
          <Link to="/essentials">Browse Collection</Link>
          <Link to="/contact">Contact GLAMGO</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
