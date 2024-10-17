import axios from "axios";
import { useEffect, useState } from "react";
import MovieCardB from '../MovieCardB/MovieCardB';
import './TopRated.css';
import Pop from "../MoviePopUp/Pop";

function Top() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
    };
  
    const closePopup = () => {
      setSelectedMovie(null); 
    };

    useEffect(() => {

        const storedMovies = localStorage.getItem('TopMovies');
    
        if(storedMovies){
          setMovies(JSON.parse(storedMovies));
        }
        else{
        const fetchMovies = async () => {
          try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
            setMovies(response.data.results);
            localStorage.setItem('TopMovies', JSON.stringify(response.data.results));
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchMovies(); 
      }
      }, []);

      if (error) {
        return <div>Error: {error}</div>;
      }
    
  return (
    <>
    {error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="reel">
            <h3>Top Rated</h3>
        <div className="slider-container">
        <ul className="movies-listtype2">
            {movies.map(movie => (
              <MovieCardB key={movie.id} movie={movie} onClick={handleMovieClick}/>
            ))}
        </ul>
    </div>
    </div>
      )}
      {selectedMovie && <Pop movie={selectedMovie} onClose={closePopup}/>}
      </>
  )
}

export default Top
