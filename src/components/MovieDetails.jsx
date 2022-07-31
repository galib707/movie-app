import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "./MovieDetailsCard";
import { getGenres } from "../genre";
function MovieDetails() {
  const movieId = useParams().movie_id;
  console.log(movieId);

  const [database, setDataBase] = useState([]);
  const api =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=bea0f2048144c7b832b7e32ca5e8bcd1";

  const trailerAdd = `https://api.themoviedb.org/3/movie/${""}/videos?api_key=bea0f2048144c7b832b7e32ca5e8bcd1&language=en-US`;

  const getPoster = (poste_path) => {
    return `http://image.tmdb.org/t/p/original${poste_path}`;
  };

  const getTrailer = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bea0f2048144c7b832b7e32ca5e8bcd1&language=en-US`;
  };
  const movieObj = (
    title,
    overview,
    rating,
    poster,
    id,
    backdrop_path,
    genre_ids
  ) => {
    let obj = {};
    obj.id = id;
    obj.title = title;
    obj.overview = overview;
    obj.rating = rating;
    obj.poster = getPoster(poster);
    obj.backdrop = getPoster(backdrop_path);
    obj.genres = getGenres(genre_ids);
    obj.trailer = getTrailer(id);
    return obj;
  };

  let db = [];

  const fetchData = async () => {
    let response = await fetch(api);
    let data = await response.json();
    console.log(data);
    for (let movie of data.results) {
      if (Number(movieId) === movie.id) {
        console.log(movie.genre_ids);
        let {
          title,
          overview,
          vote_average,
          poster_path,
          id,
          backdrop_path,
          genre_ids,
        } = movie;
        db.push(
          movieObj(
            title,
            overview,
            vote_average,
            poster_path,
            id,
            backdrop_path,
            genre_ids
          )
        );
      }
    }
    setDataBase((currDatabase) => db);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(database);
  return (
    <div>
      {database.map((movie) => (
        <MovieDetailsCard
          poster={movie.poster}
          overview={movie.overview}
          title={movie.title}
          rating={movie.rating}
          id={movie.id}
          backdrop={movie.backdrop}
          genres={movie.genres}
        />
      ))}
    </div>
  );
}

export default MovieDetails;
