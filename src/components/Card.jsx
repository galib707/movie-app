import React from "react";
import { Link } from "react-router-dom";
function Card(props) {
  // console.log("hi");
  return (
    <Link
      to={`/movie_details/${props.id}`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <div className="card" style={{ backgroundImage: `url(${props.poster})` }}>
        <div className="card_content">
          <div className="title">{props.title}</div>
          <div className="description_and_rating">
            <div className="description">{props.overview}</div>
            <div className="rating">
              <span className="rating_background">
                {Number(props.rating).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
