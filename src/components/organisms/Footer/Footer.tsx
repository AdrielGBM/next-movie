import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="information">
        <h2 className="title">Contacto</h2>
        <ul className="dev">
          <li className="dev__item">
            <FontAwesomeIcon icon={faUser} /> <span>Adriel Barrientos M.</span>
          </li>
          <li className="dev__item">
            <FontAwesomeIcon icon={faAt} /> <span>adrielgbm@gmail.com</span>
          </li>
          <li>
            <a
              className="dev__item"
              href="https://adrielgbm.github.io/Portafolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faBriefcase} />
              <span>Portafolio</span>
            </a>
          </li>
          <li>
            <a
              className="dev__item"
              href="https://www.linkedin.com/in/AdrielGBM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} /> <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              className="dev__item"
              href="https://github.com/AdrielGBM/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} /> <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="information">
        <h2 className="title">Créditos</h2>
        <div className="tmdb">
          <span className="tmdb__usage">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </span>
          <img
            className="tmdb__logo"
            src="./tmdb/tmdb-logo.svg"
            alt="Logo de The Movie DB"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
