import { useEffect, useRef, useState } from 'react';
import Login from './Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import FavMovies from '../Components/FavMovies';
import Top from '../Components/TopRatedMov/Top';
import Drama from '../Components/Drama/Drama';
import Scifi from '../Components/Sci-fi/Scifi';
import Genre from '../Components/Genre/Genre';
import { InfinitySpin } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer/Footer';
import Hero from '../Components/Hero/Hero';
import '../Components/Nav/Nav.css';
import { Search } from 'lucide-react';


function Landing() {

  // # Security Section
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);

  // # Security Section
  useEffect(() => {
    axios.get('http://localhost:8080/Security', { withCredentials: true })
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
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [showLoginPopup]);

  useEffect(() => {
    if (showLoginPopup) {
      document.body.style.overflow = 'hidden';

      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setShowLoginPopup(false); 
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'auto'; 
      };
    }
  }, [showLoginPopup]);
  

  const handleButtonClick = () => {
    if (!loading) {
      if (user) {
        navigate('/bucket');  
      } else {
        setShowLoginPopup(true);  
      }
    }
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const closePopup = () => {
    setShowLoginPopup(false); 
  };

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
    <div className="page">
      <div className={showLoginPopup ? 'blur-background' : ''}>
      <div className='nav'>
        <div className='logo4'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
        </div>
        <div className='navBtns'>
            <p className='home'>Home</p>
            <p>My movies</p>
            <p>About</p>
        </div>
        <div className='navLeft'>
        <Search className='search' onClick={handleSearchClick}/>
        <p className='bt' onClick={handleButtonClick}>Bucket</p>
        </div>
    </div>

    <Hero/>
        <motion.div
          className="fav-movies"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <FavMovies />
        </motion.div>

        <motion.div
          className="top-rated"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Top />
        </motion.div>

        <motion.div
          className="drama-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Drama />
        </motion.div>

        <motion.div
          className="scifi-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Scifi />
        </motion.div>

        <motion.div
          className="genre-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Genre />
        </motion.div>

        <Footer/>
      </div>

    {showLoginPopup && (
        <motion.div className="popup" initial={{opacity:0, y: 20}} animate={{opacity:1, y:0}} transition={{duration: 0.4}} exit={{opacity:0, y:20}}>
          <div className="popup-inner" ref={popupRef}>
            <Login onClose={closePopup} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
  
  export default Landing
  