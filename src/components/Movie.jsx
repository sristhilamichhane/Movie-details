import axios from "axios";
import { useEffect, useState } from "react";

const Movie = () => {
  const [movielist, setMovieList] = useState([]);

  const fetchMovies = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=06c75e5079e9681370174aa94d98620f"
      )
      .then((res) => {
        console.log(res.data);
        setMovieList(res.data.results);
      });
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-row gap-5 p-5">
      {movielist.map((movie) => (
        <img
          key={movie.id}
          className="h-[25rem] w-[50rem] object-cover rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      ))}
    </div>
  );
};

export default Movie;
