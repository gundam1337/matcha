import React, { useEffect } from "react";
import styles from "../../styles/NotFound.module.css"; // Correct import for CSS module
import notFoundImage from "./notFoundPicture.png"; // Import the image

function NotFound() {
  //that is just a temporary solution
  useEffect(() => {
    document.body.style.background = "white";
    document.body.style.fontFamily = '"Readex Pro", sans-serif';

    return () => {
      document.body.classList.remove("body");
    };
  }, []);

  return (
    <div>
      {/* Use the styles object to access class names */}
      <div className={styles.title}>404 NOT FOUND</div>
      <section className={styles.row}>
        <img src={notFoundImage} alt="Scarecrow" />
        <section>
          <div className={styles.mainTitle}>Don't know where you are?</div>{" "}
          {/* Correct class name */}
          <p>we really have no idea either...</p>
          <button className={styles.btn}>BACK TO HOMEPAGE</button>
        </section>
      </section>
      <div className={styles.copyright}>
        created by
        <a
          target="_blank"
          href="https://github.com/Ranimbenkerri"
          rel="noopener noreferrer"
        >
          <i className={`${styles.githubIcon} fa fa-github`}></i> omar derkaoui{" "}
        </a>{" "}
        - Matcha
      </div>
    </div>
  );
}

export default NotFound;
