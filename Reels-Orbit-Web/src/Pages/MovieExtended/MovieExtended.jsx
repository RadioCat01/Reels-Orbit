import { useState } from 'react';
import './MovieExtended.css';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BucketPop from '../../Components/InBucketPopUp/BucketPop';

function MovieExtended() {

    const location = useLocation();
    const { movie, user } = location.state;
    const [showInfoPopUp, setInfoPopUp] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(movie);

    const handleBuyClick = () => {
        if (!user) {
         
          console.log("User not logged in. Show login popup.");
        } else {
          
          setInfoPopUp(true);
        }
      };
      const closePopup = () => {
        setInfoPopUp(false);
       
      };

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>User: {user.name}</p>
      <button onClick={handleBuyClick}>Buy</button>

      {showInfoPopUp && (
        <>
          <div className="backdrop" onClick={closePopup} />
          <div className='gradient-overlay'></div>
          <motion.div className="motiondev" initial={{opacity: 0, y: -70}} animate={{opacity: 1, y: -90}} transition={{duration: 0.4}} exit={{opacity: 0, y: 20}}>
            <BucketPop movie={selectedMovie} user={user} onClose={closePopup} />
          </motion.div>
        </>
      )}
    </div>
  )
}

export default MovieExtended
