import React , {useState} from "react";
import { FaStar } from "react-icons/fa";
import "./starStyle.css";

const StarRating = () => {

    const [count, setcount] = useState(0);
  return (
    <>
      <div className="star-container">
        <FaStar  onClick={() => setcount(1)} color={count < 1? "grey" : "red"} />
        <FaStar  onClick={() => setcount(2)} color={count < 2? "grey" : "red"} />
        <FaStar  onClick={() => setcount(3)} color={count < 3? "grey" : "red"} />
        <FaStar  onClick={() => setcount(4)} color={count < 4? "grey" : "red"} />
        <FaStar  onClick={() => setcount(5)} color={count < 5? "grey" : "red"} />
      </div>
    </>
  );
};

export default StarRating;