const Cards = () => {
  return (
    <main>
      <div className="photo-and-actions">
        <div className="photo">
          <div className="photo-text">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Bella_Hadid_Cannes_2018.jpg"
              alt=""
            />
            <div className="photo-name-and-age">
              <h2>Lorem</h2>
              <h2>21</h2>
            </div>

            <div className="photo-bio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              quos, doloribus officiis molestias quo magni earum quaerat nemo
              eius dolor!
            </div>
          </div>
        </div>
        <div className="actions">
          <div className="action">
            <i className="fas fa-times"></i>
          </div>
          <div className="action">
            <i className="fas fa-star"></i>
          </div>
          <div className="action">
            <i className="fas fa-heart"></i>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cards;
