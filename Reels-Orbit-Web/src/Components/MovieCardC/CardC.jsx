import './CardC.css';
import { Trash2 } from 'lucide-react';

function CardC({movie, onDelete, onInfoClick}) {

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; 

  return (
    <div className='bucketCard'>
        <button className='remove' onClick={()=> onDelete(movie)}><Trash2 className='trash'/></button>
    <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} 
      className="bucket-movie-poster" onClick={()=>onInfoClick(movie)}/>
    </div>
  )
}

export default CardC
