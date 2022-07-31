import React from "react";

function GenreCard(props) {
  console.log(props);
  return (
    <div className="genre_card">
      <p>{props.genres}</p>
    </div>
  );
}

export default GenreCard;
