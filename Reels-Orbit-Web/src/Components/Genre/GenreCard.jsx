import './Genre.css';

function GenreCard({collection}) {

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; 

  return (
    <div className='genreCard'>
    <img src={`${imageBaseUrl}${collection.moviePoster}`}
      className="GenreBackDrop" />
      <div className='genreBg'>
      <p className='genreSpan'>{collection.genreName}</p>
      </div>
      </div>
  )
}

export default GenreCard
