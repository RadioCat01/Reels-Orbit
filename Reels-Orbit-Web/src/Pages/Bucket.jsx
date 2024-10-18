import axios from "axios";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import './Bucket.css';
import BucketPop from "../Components/InBucketPopUp/BucketPop";
import { motion } from "framer-motion";
import CardC from "../Components/MovieCardC/CardC";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Components/Footer/Footer";
import { UserRoundPen } from 'lucide-react';
import '../Components/Nav/Nav.css';
import { CircleUser } from 'lucide-react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Bucket() {

  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(null);

  const [showInfoPopUp, setInfoPopUp] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const userAPIUrl=import.meta.env.VITE_USER_API_URL;
  const securityAPI = import.meta.env.VITE_SECURITY_API_URL;

  useEffect(() => {
    axios.get(`${securityAPI}/Security`, { withCredentials: true })
        .then(response => {
          if (response.data && Object.keys(response.data).length > 0) {
            setUser(response.data);
            const userId = response.data.sub || response.data.id;
            setUserId(userId);
            axios.get(`${userAPIUrl}/movies?userId=${userId}`, { withCredentials: true })
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


  const handleDelete = (movie) =>{
    const DeleteMovieRequest = {
      movieId: movie.id,
      userId: userId
    }
    axios.post(`${userAPIUrl}/movies/delete`, DeleteMovieRequest)
    .then(response => {
      console.log(response);
      setMovies(movies.filter(m => m.id !== movie.id));
      toast(`✅ Item Removed !`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }

  const handleInfo = (movie) =>{
    navigate(`/movie/${movie.id}`, { state: { movie, user } });
    //setSelectedMovie(movie);
    //setInfoPopUp(true);
  }
  const closePopup = () => {
    setInfoPopUp(false); 
    setSelectedMovie(null); 
  };

  if (loading) {
    return (
      <div className="loading-containerMain">
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
      <div className="Bucketpage">
      <div className="bktTop">
       <div className="bktTopRight">
           <div className='logo3 logoBkt'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
          </div> 
           <h1>Movie Bucket</h1>
       </div>
      <div className="BuktTopLeft">
      {user && <p>{ user.name} <UserRoundPen className="personIcon"/></p>}
      <button className="bucketBtn" onClick={()=>navigate("/")}>Home</button>
      </div>
      </div>
      <div className="cont">
      <div className="contLeft">
        <div className="welcome">Welcome Back !</div>
        <p className="bktUserName"><CircleUser className="personIcon"/>{user.name}</p>
        <p className="bktUserEmail"><Mail className="personIcon"/>{user.email}</p>

        <div className="sidebar-content">

          <h3>🎬 Movie Picks for You!</h3>
              <p>Check out personalized movie recommendations, trending titles, and top genres suited to your taste.</p>

           <h4>🔥 Popular Genres:</h4>
           <ul className="genres">
               <li>Action</li>
               <li>Comedy</li>
               <li>Drama</li>
               <li>Sci-Fi</li>
               <li>Documentary</li>
          </ul>

        <p>Start exploring and add favorites to your wishlist or preview upcoming movies.</p>
      </div>

      </div>
      <motion.div className="picked" initial={{opacity:0, y: -70}} animate={{opacity:1, y:-90}} transition={{duration: 0.4}} exit={{opacity:0, y:20}}>
    {movies.length > 0 ? (
        movies.map(movie => (
            <CardC key={movie.id} movie={movie} onDelete={handleDelete} onInfoClick={handleInfo} />
        ))
    ) : (
        <p className="emptyBkt">Oops! Your Movie Bucket is Empty!</p>
    )}
      </motion.div>
      </div>
      </div>

    {showInfoPopUp && (
        <>
          <div className="backdrop" onClick={closePopup} />
          <div className='gradient-overlay'></div>
          <motion.div className="motiondev" initial={{opacity:0, y: -70}} animate={{opacity:1, y:-90}} transition={{duration: 0.4}} exit={{opacity:0, y:20}}>
             <BucketPop movie={selectedMovie} user={user} onClose={closePopup} />
          </motion.div>
        </>
      )}   
      <ToastContainer className="toast"/>
      <Footer/>
    </div>
  )
}

export default Bucket
