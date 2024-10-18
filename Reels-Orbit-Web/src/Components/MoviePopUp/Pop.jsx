import { useEffect, useRef, useState } from 'react';
import './Pop.css';
import { ChevronsDown} from 'lucide-react';
import { Star } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Play } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from '../../Pages/Login'
import { InfinitySpin } from 'react-loader-spinner';
import { tr } from 'framer-motion/client';



function Pop({movie, onClose}) {

    const popupRef = useRef(null);
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; 

    

    // # Security Section
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  const navigate = useNavigate(); 

  const [wishlistPopupVisible, setWishlistPopupVisible] = useState(false); 
  const [wishlistPopupMessage, setWishlistPopupMessage] = useState('');

  const securityApiUrl = import.meta.env.VITE_SECURITY_API_URL;
  const userApiUrl = import.meta.env.VITE_USER_API_URL;

    useEffect(() => {
        if (popupRef.current) {
          popupRef.current.scrollIntoView({ behavior: 'smooth' }); 
        }
      }, [movie]);

      // # Security Section
  useEffect(() => {
    axios.get(`${securityApiUrl}/Security`, { withCredentials: true })
        .then(response => {
            setUser(response.data);
            setLoading(false); 
        })
        .catch(() => {
            setUser(null); 
            setLoading(false);
        });
  }, []);

  useEffect(() => {
    if (showLoginPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [showLoginPopup]);  

  const AddToWishListClick = () => {
    if (!loading) {
      
      if (user) {
        console.log('User True');
        console.log(movie);
        console.log(user);
        const movieData = {
          movieId: movie.id,
          title: movie.title,
          adult: movie.adult,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          genreIds: movie.genre_ids,
          popularity: movie.popularity,
          original_language: movie.original_language,
          vote_count: movie.vote_count,

          persistingUserId: user.sub || user.id,
          email:user.email
        };
        
        axios.post(`${userApiUrl}/movies`, movieData)
          .then(response => {
            console.log('Movie saved successfully:', response.data);

            setWishlistPopupMessage(`Item "${movie.title}" added to the Bucket !`);
            setWishlistPopupVisible(true);

           
            setTimeout(() => {
                setWishlistPopupVisible(false);
            }, 3000);
          })
          .catch(error => {
            console.error('Error saving movie:', error);
          });
          setLoading(true);
             setTimeout(() => {
               setLoading(false);
                navigate('/bucket');
      }, 1000);

            } else {
        setShowLoginPopup(true);  
      }
    }
    
  };


  const closePopup = () => {
    setShowLoginPopup(false); 
  };

  if (loading) {
    return <div ref={popupRef} className="loading-containerMain">
    <InfinitySpin 
      height="200" 
      width="200" 
      color="#ffffff" 
      ariaLabel="loading" 
    />
  </div>; 
  }
      if (!movie) return null;

  return ( 
    <div className='PopPage'>
  
    <div className={showLoginPopup ? 'blur-background' : ''}>
      <div ref={popupRef} className="popup-content" onClick={e => e.stopPropagation()}>
         <button className="close-btn" onClick={onClose}><ChevronsDown className='btn'/></button>
        <div className='images'>
        <img src={`${imageBaseUrl}${movie.backdrop_path}`}  className="popup-back" />    
        </div>
        <div className='Cont'>
           <img src={`${imageBaseUrl}${movie.poster_path}`}  className="popup-poster" />      
           </div>
        <div className='info'>
            <div className='top'>
            <h2>{movie.title}</h2>
            <p><Star className='star'/>{movie.vote_average}</p>
            </div>    
        <div className='buttons'>
        <button onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}> <DollarSign className='add' /> See Retailers</button>
        <button onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')}><Play className='add' /> Preview</button>
        <button onClick={AddToWishListClick}><Plus className='add' /> Wishlist</button>
        </div> 
            
        <p className='overView'>{movie.overview}</p> 

        <div className='AddInfo'>
          <p><strong>Genre:</strong> {movie.genre_ids}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p> 
          <p><strong>Language:</strong> {movie.original_language}</p>
          <p><strong>Popularity:</strong> {movie.popularity}</p>
          <p><strong>Reviews on Page:</strong> {movie.vote_count}</p>
        </div>

        <span className='foot'>PRICING SUBJECT TO CHANGE. Confirm current pricing with applicable retailer. All transactions subject to applicable license terms and conditions.</span>
      </div>
      </div>
     
      </div>
      <div className="popfix">
      {showLoginPopup && (
            <Login onClose={closePopup} positionStyle={{ position: 'absolute', top: '450px'}}/>
      )}
      </div>
     {wishlistPopupVisible && (
                <div className="wishlist-popup">
                    {wishlistPopupMessage}
                </div>
            )}
      </div>
  );
}

export default Pop
