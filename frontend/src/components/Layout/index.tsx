import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import logoUrl from "../../assets/logo.svg";

function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="header-inner">
          <Link to="/" className="logo">
            <img src={logoUrl} alt="Photolog" className="logo-icon" />
            <span className="logo-text">Photolog</span>
          </Link>
          <div className="search-bar">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="タイトル・撮影場所で検索" />
          </div>
          <button className="upload-btn" onClick={() => navigate("/upload")}>
            + 投稿
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
