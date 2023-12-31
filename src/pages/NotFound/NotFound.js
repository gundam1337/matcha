import React, { useEffect } from "react";
import styles from "../../styles/NotFound.module.css"; // Correct import for CSS module
import notFoundImage from "./notFoundPicture.png"; // Import the image

function NotFound() {
  useEffect(() => {
    document.body.style.fontFamily = '"Inconsolata", "Space Mono", "Poppins", sans-serif';
    document.body.style.background = "white";

    return () => {
      document.body.style.fontFamily = '';
      document.body.style.background = '';
    };
  }, []);

  return (
    <div className={styles.NotFound}>
      <div className={styles.NotFoundTitle}>404 NOT FOUND</div> {/* Updated class name */}
      <section className={styles.NotFoundRow}> {/* Updated class name */}
        <img src={notFoundImage} alt="Scarecrow" className={styles.NotFound} />
        <section>
          <div className={styles.NotFoundMainTitle}>Don't know where you are?</div> {/* Updated class name */}
          <p>we really have no idea either...</p>
          <button className={styles.btn}>BACK TO HOMEPAGE</button>
        </section>
      </section>
      <div className={styles.footer}>
        created by
        <a
          target="_blank"
          href="https://github.com/Ranimbenkerri"
          rel="noopener noreferrer"
        >
          <i className={`${styles.githubIcon} fa fa-github`}></i> omar derkaoui
        </a> - Matcha
      </div>
    </div>
  );
}

export default NotFound;
