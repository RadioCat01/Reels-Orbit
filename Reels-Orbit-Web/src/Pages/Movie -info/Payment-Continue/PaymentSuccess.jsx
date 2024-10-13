import './PaymentSuccess.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import '../../Bucket.css';
import Footer from '../../../Components/Footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { SquareChevronLeft } from 'lucide-react';

function PaymentSuccess() {

  const {movieId} = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchMovieDetails = async ()=>{
      
      const respponse = await axios.get(`http://localhost:8081/movies/byId/${movieId}`);
      setMovieDetails(respponse.data);
      console.log(respponse.data);
    };

    if(movieId){
      fetchMovieDetails();
    }

  },[movieId]);

  if (!movieDetails) {
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
    <div className="paymentSuccessPage">   
      <div className="SpageTop">
        <img src={`${imageBaseUrl}${movieDetails.backdrop_path}`} alt="Movie Bd" className='SpageTopBD' />
        <img src={`${imageBaseUrl}${movieDetails.poster_path}`} alt="" className='SpagePoster' />
        
        <div className="Scont">
        <SquareChevronLeft onClick={()=>{navigate("/")}} className='SHome' />
          <div className='logo3 Slogo'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
          </div>
          <div className="title">
             <h3>Thank You !</h3>
             <h4>Enjoy the Show</h4>
          </div>
          <div className="movieDetailsSection">
          <h2>{movieDetails.title}</h2>
          <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p><strong>Price:</strong> ${movieDetails.price}</p>
          <p><strong>Vote Average:</strong> {movieDetails.vote_average} / 10</p>
          <p><strong>Vote Count:</strong> {movieDetails.vote_count}</p>
          <p><strong>Language:</strong> {movieDetails.original_language.toUpperCase()}</p>
          <p><strong>User Email:</strong> {movieDetails.email}</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
