import { useState } from 'react';
import './search.css';
import axios from 'axios';
import { motion } from 'framer-motion';
import MovieCardA from '../Components/MovieCardA';
import '../Components/Nav/Nav.css';
import { Search } from 'lucide-react';
import Footer from '../Components/Footer/Footer';



import { useNavigate } from 'react-router-dom';
import SearchPop from '../Components/MoviePopUp/SearchPop';

function SearchPage() {

  const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closePopup = () => {
    setSelectedMovie(null); 
  };

  const searchMov = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.get(searchUrl);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const onInfoClick=()=>{}
  
  return (
    <>
    <div className='searchPage'>
      <div className="searchTop">
        <div className='logo4'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
        </div>
        <div className="searchFrom">
           <form onSubmit={searchMov}>
             <input
                className='searchInput'
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                 />
              <button  className='searchbtn'> <Search className='searchIcon'/></button>
           </form>
         </div>
         <button className='searcBackbtn' onClick={()=>navigate("/")}>Home</button>
     </div>

  <div className="searchContent">
    <motion.div className="pickedB" initial={{opacity:0, y: 0}} animate={{opacity:1, y:0}} transition={{duration: 0.4}} exit={{opacity:0, y:20}}>
    {movies.length > 0 ? (
        movies.map(movie => (
            <MovieCardA key={movie.id} movie={movie} onInfoClick={onInfoClick} onClick={handleMovieClick} />
        ))
    ) : (
        <p className="emptyBkt">Search Your Favourit Movie or TV !</p>
    )}
      </motion.div>
      </div>
      {selectedMovie && <SearchPop movie={selectedMovie} onClose={closePopup} />}
      <div className="aboveFooter"></div>
      <Footer/>
    </div>
    
    </>
  );
}

export default SearchPage
