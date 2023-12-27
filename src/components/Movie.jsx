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
        setMovieList(
          res.data.results.map((movie) => ({ ...movie, selectedStatus: null }))
        );
      });
  };

  const handleStatusChange = (movieId, newStatus) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, selectedStatus: newStatus } : movie
      )
    );
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-5">
      {movielist.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-lg overflow-hidden relative"
        >
          <div className="image-container relative">
            <img
              className="h-[20rem] w-full object-cover rounded-t-lg transition-transform transform hover:scale-105"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-80">
              <div className="p-3 text-white">
                <h3 className="text-lg font-semibold mb-1">
                  {movie.original_title.length > 30
                    ? `${movie.original_title.slice(0, 30)}...`
                    : movie.original_title}
                </h3>
                <div className="flex items-center mb-1">
                  <span className="mr-1 text-yellow-400">⭐</span>
                  <p className="text-lg">{movie.vote_average}</p>
                </div>
                <p>
                  Genre: {movie.genres?.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">{movie.original_language}</span>
            </div>
            <div className="flex space-x-2 my-2">
              {["Watching", "Completed", "Hold List"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(movie.id, status)}
                  className={`${
                    movie.selectedStatus === status
                      ? `bg-${status.toLowerCase()}-500 text-green-500 px-3 py-1 rounded-md`
                      : `bg-${status.toLowerCase()}-300 text-red-500 text-${status.toLowerCase()}-500 px-3 py-1 rounded-md`
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movie;
