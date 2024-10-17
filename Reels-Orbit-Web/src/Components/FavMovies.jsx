import axios from "axios";
import { useEffect, useState } from "react";
import MovieCardA from "./MovieCardA";
import './FavMovies.css';
import Pop from "./MoviePopUp/Pop";
function FavMovies() {

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

        const storedMovies = localStorage.getItem('NewMovies');
    
        if(storedMovies){
          setMovies(JSON.parse(storedMovies));
        }
        else{
        const fetchMovies = async () => {
          try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
            setMovies(response.data.results);
            console.log(response.data);
            localStorage.setItem('NewMovies', JSON.stringify(response.data.results));
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
    
      const handleClick= () =>{}

  return (
    <>
      <div className="reel">
        <h3>New Releases</h3>
        <div className="slider-container">
          <ul className="movies-list">
            {movies.map(movie => (
              <MovieCardA key={movie.id} movie={movie} onInfoClick={handleClick}  onClick={handleMovieClick} />
            ))}
          </ul>
        </div>
      </div>
      {selectedMovie && <Pop movie={selectedMovie} onClose={closePopup} />}
    </>
  )
}

export default FavMovies
