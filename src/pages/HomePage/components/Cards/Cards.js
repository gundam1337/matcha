const Cards = () => {
  return (
    <main >
      <div className="photo-and-actions">
        <div className="photo">
          <img
            src="https://www.krqe.com/wp-content/uploads/sites/12/2022/12/AdobeStock_81556974.jpeg?w=2560&h=1440&crop=1"
            alt=""
          />
          <div className="photo-text">
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
