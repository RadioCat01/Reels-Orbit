import axios from "axios";
import { useEffect, useState } from "react";
import GenreCard from "./GenreCard";
import './Genre.css';

function Genre() {

    const [collections, setCollections] = useState([]);
    const [error, setError] = useState(null);
    const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

    useEffect(() => {
        const storedCollections = localStorage.getItem('Collections');
    
        if (storedCollections) {
            setCollections(JSON.parse(storedCollections));
    
        } else {
            const fetchGenresAndMovies = async () => {
                try {
                    const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
                    const genres = genreResponse.data.genres;

                    const collectionsPromises = genres.map(async (genre) => {
                        const movieResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc&language=en-US`);
                        const movies = movieResponse.data.results;

                        const randomIndex = Math.floor(Math.random() * movies.length);
                        const randomMovie = movies[randomIndex];
                        
                        return {
                            genreName: genre.name,
                            moviePoster: randomMovie.backdrop_path, 
                        };
                    });

                    const collectionsData = await Promise.all(collectionsPromises);
                    setCollections(collectionsData);
                    localStorage.setItem('Collections', JSON.stringify(collectionsData));
                } catch (error) {
                    setError(error.message);
                }
            };

            fetchGenresAndMovies();
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
            <h3>Popular Movie Collections</h3>
        <div className="slider-container">
        <ul className="movies-listtype2">
        {collections.map((collection, index) => (
    <GenreCard key={`${collection.genreName}-${index}`} collection={collection} />
  ))}
        </ul>
    </div>
    </div>
      )}
      </>
  )
}

export default Genre
