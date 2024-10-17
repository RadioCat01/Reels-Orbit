import axios from "axios";
import { useEffect, useState } from "react";
import MovieCardB from "../MovieCardB/MovieCardB";
import Pop from "../MoviePopUp/Pop";

function Scifi() {

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

        const storedMovies = localStorage.getItem('Sci-Fi');
    
        if(storedMovies){
          setMovies(JSON.parse(storedMovies));
          
        }
        else{
        const fetchMovies = async () => {
          try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US&sort_by=popularity.desc
`);
            setMovies(response.data.results);
            localStorage.setItem('Sci-Fi', JSON.stringify(response.data.results));
            
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
            <h3>Man vs. Machines</h3>
        <div className="slider-container">
        <ul className="movies-listtype2">
            {movies.map(movie => (
              <MovieCardB key={movie.id} movie={movie} onClick={handleMovieClick}/>
            ))}
        </ul>
    </div>
    </div>
      )}
       {selectedMovie && <Pop movie={selectedMovie} onClose={closePopup} />}
      </>
  )
}

export default Scifi
