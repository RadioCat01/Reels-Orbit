import axios from "axios";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import './Bucket.css';
import MovieCardA from "../Components/MovieCardA";

function Bucket() {

  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/Security', { withCredentials: true })
        .then(response => {
          if (response.data && Object.keys(response.data).length > 0) {
            setUser(response.data);
            const userId = response.data.sub || response.data.id;

            axios.get(`http://localhost:8081/movies?userId=${userId}`, { withCredentials: true })
            .then(movieResponse => {
              if (movieResponse.data) {
                setMovies(movieResponse.data);
                console.log(movies);
              }
            })
            .catch(error => {
              console.error("Error fetching movies: ", error);
            });


          } else {
            setUser(null);
          };
            setLoading(false); 
        })
        .catch(() => {
            setUser(null); 
            setLoading(false); 
        });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <InfinitySpin 
          height="200" 
          width="200" 
          color="#ffffff" 
          ariaLabel="loading" 
        />
      </div>
    ); 
  }

  return (
    <div>
      <h1>Movie Bucket</h1>
      {user && <p>Welcome, {user.email}-{ user.name}</p>}
      
      {movies.length > 0 ? (
          <ul className="movies-list">
          {movies.map(movie => (
            <MovieCardA key={movie.id} movie={movie}/>
          ))}
        </ul>
      ) : (
        <p>Oops ! Your Movie Bucket is Empty !</p>
      )}
    </div>
  )
}

export default Bucket
