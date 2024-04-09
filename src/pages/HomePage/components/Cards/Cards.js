import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

//TODO : add a  javscript code that can change the images
//TODO : make each section as separted compont
const Cards = () => {
  return (
    <main>
      <div className="photo-and-actions">
        <div className="photo">
          <img
            src="https://fr.web.img6.acsta.net/c_310_420/pictures/15/11/10/14/58/490093.jpg"
            alt=""
          />

          <div className="photo-text">
            <div className="photo-name-and-age">
              <h2>Lorem</h2>
              <h3>21</h3>
              <p>
                Morocco,
                beni mellal
              </p>
            </div>

            <div className="photo-bio">
              chess player
            </div>
          </div>
        </div>

        <div className="actions">
          <div className="action">
            <FontAwesomeIcon className="dislike " icon={faTimes} />
          </div>
          <div className="action">
            <FontAwesomeIcon className="superlike" icon={faStar} />
          </div>
          <div className="action">
            <FontAwesomeIcon className="like" icon={faHeart} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cards;
