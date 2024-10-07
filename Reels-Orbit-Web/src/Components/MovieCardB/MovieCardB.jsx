import './MovieCardB.css';

function MovieCardB({movie, onClick}) {
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  return (
    <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} 
      className="movie-posterB" onClick={() => onClick(movie)} />
     
      )
}

export default MovieCardB
