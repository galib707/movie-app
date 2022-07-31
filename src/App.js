import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [database, setDataBase] = useState([]);
  const api =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=bea0f2048144c7b832b7e32ca5e8bcd1";

  const trailerAdd = `https://api.themoviedb.org/3/movie/${""}/videos?api_key=bea0f2048144c7b832b7e32ca5e8bcd1&language=en-US`;

  const getPoster = (poste_path) => {
    return `http://image.tmdb.org/t/p/original${poste_path}`;
  };

  const movieObj = (title, overview, rating, poster, id, backdrop_path) => {
    let obj = {};
    obj.id = id;
    obj.title = title;
    obj.overview = overview;
    obj.rating = rating;
    obj.poster = getPoster(poster);
    return obj;
  };

  let db = [];

  const fetchData = async () => {
    let response = await fetch(api);
    let data = await response.json();
    console.log(data);
    for (let movie of data.results) {
      let { title, overview, vote_average, poster_path, id, backdrop_path } =
        movie;
      db.push(
        movieObj(title, overview, vote_average, poster_path, id, backdrop_path)
      );
    }
    setDataBase((currDatabase) => db);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {database.map((movie) => (
          <Card
            poster={movie.poster}
            overview={movie.overview}
            title={movie.title}
            rating={movie.rating}
            id={movie.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
