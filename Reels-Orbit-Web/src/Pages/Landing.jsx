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
import { LogOut } from 'lucide-react';

import { Link as ScrollLink, Element } from 'react-scroll';


function Landing() {

  // # Security Section
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  // # Security Section
  const securityAPI = import.meta.env.VITE_SECURITY_API_URL;

  useEffect(() => {
    axios.get(`${securityAPI}/Security`, { withCredentials: true })
        .then(response => {

          if (response.data && Object.keys(response.data).length > 0) {
            setUser(response.data);
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
  
  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.7 }
    );

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

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
  

  const logout = async () => {
    window.location.reload();
    axios.post(`${securityAPI}/logout`, {}, { withCredentials: true });   
  };

  if (loading) {
    return (
      <div className='loading-containerMain'>
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
        <div className='navRight'>
        <div className='logo4'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
        </div>
        <div className='navBtns'>
            <ScrollLink to="home" smooth={true} duration={500} offset={-100}>
              <p className={activeSection === 'home' ? 'active' : ''}>Home</p>
            </ScrollLink>
            <ScrollLink to="fav-movies" smooth={true} duration={500} offset={-100}>
              <p className={activeSection === 'fav-movies' ? 'active' : ''}>Top Movies</p>
            </ScrollLink>
            <ScrollLink to="drama-section" smooth={true} duration={500} offset={-100}>
              <p className={activeSection === 'drama-section' ? 'active' : ''}>Top TV</p>
            </ScrollLink>
            <ScrollLink to="genre-section" smooth={true} duration={500} offset={-100}>
              <p className={activeSection === 'genre-section' ? 'active' : ''}>Genres</p>
            </ScrollLink>
        </div>
        </div>
        <div className='navLeft'>
          <div className='userInfo'>
          {user?.email ? <p className='userName'>{user.email}</p> : <p className='userName'>Guest</p>}
          {user?.email ?  <LogOut className='lout' onClick={logout}/> : ''}
          <Search className='search' onClick={handleSearchClick}/>
          <p className='bt' onClick={handleButtonClick}>Bucket</p>
          </div>
       
        </div>
    </div>

    <Element name="home" id="home" className="scroll-section">
    <motion.div
            className="fav-movies"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.5 }}
          >
          <Hero/>
        </motion.div>
        </Element>
        
        <Element name="fav-movies" id="fav-movies" className="scroll-section">
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
        </Element>

        <Element name="drama-section" id="drama-section" className="scroll-section">
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
        </Element>

        <Element name="genre-section" id="genre-section" className="scroll-section">
          <motion.div
            className="genre-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Genre />
          </motion.div>
        </Element>

        <Footer/>
      </div>

    {showLoginPopup && (
            <Login onClose={closePopup} />
      )}
    </div>
  );
}
  
  export default Landing
  