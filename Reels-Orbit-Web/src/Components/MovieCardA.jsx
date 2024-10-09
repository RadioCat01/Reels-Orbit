import './MovieCardA.css';

function MovieCardA({movie, onClick, onInfoClick}) {

  const handleClick = (event) => {
  
    onClick(movie);
    onInfoClick(movie);
    event.stopPropagation();
  };

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; 

  return (
  <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} 
      className="movie-poster" onClick={handleClick} />
  )
}
export default MovieCardA
