import { useEffect, useState } from 'react';
import Login from './Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Landing.css';

function Landing() {

  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

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

  const handleButtonClick = () => {
    if (!loading) {
      if (user) {
        navigate('/bucket');  
      } else {
        setShowLoginPopup(true);  
      }
    }
  };

  const closePopup = () => {
    setShowLoginPopup(false); 
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div className={showLoginPopup ? 'blur-background' : ''}>
        <h1>This is landing</h1>
        <button onClick={handleButtonClick}>Bucket</button>
      </div>
      
      {showLoginPopup && (
        <motion.div className="popup" initial={{opacity:0, y: 20}} animate={{opacity:1, y:0}} transition={{duration: 0.4}} exit={{opacity:0, y:20}}>
          <div className="popup-inner">
            <Login onClose={closePopup} />
          </div>
        </motion.div>
      )}
    </>
  );
}
  
  export default Landing
  