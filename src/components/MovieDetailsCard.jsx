import React, { useEffect, useState } from "react";
import GenreCard from "./GenreCard";
function MovieDetailsCard(props) {
  const [database, setDataBase] = useState([]);
  const getTrailer = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bea0f2048144c7b832b7e32ca5e8bcd1&language=en-US`;
  };

  let db = [];

  const fetchData = async () => {
    let response = await fetch(getTrailer(props.id));
    let data = await response.json();
    console.log(data.results[0].key);
    db.push(`https://www.youtube.com/watch?v=${data.results[0].key}`);
    setDataBase((currDatabase) => db);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(database);
  return (
    <div
      className="movieDetailsCard_container"
      style={{ backgroundImage: `url(${props.backdrop})` }}
    >
      <div className="overlay"></div>
      <div className="movie_card_div">
        <div
          className="movie_card"
          style={{ backgroundImage: `url(${props.poster})` }}
        ></div>
      </div>
      <div className="movie_card_desc_div">
        <h1 className="movie_title">{props.title}</h1>
        <h3 className="tagline">{}</h3>
        <p className="movie_des">{props.overview}</p>
        <div className="genre">
          {props.genres.map((genre) => (
            <GenreCard genres={genre} />
          ))}
        </div>
        <div className="watch_trailer_button">
          <button className="trailer_button">
            <a target="_blank" href={database[0]}>
              {" "}
              Watch Trailer
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsCard;
