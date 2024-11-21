import './BucketPop.css';
import { Calendar } from 'lucide-react';
import { Star } from 'lucide-react';
import paypal from '../../assets/paypal.png';
import amazon from '../../assets/social.png';
import aEx from '../../assets/american-express.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import '../../Pages/Landing.css';


function BucketPop({movie, user}) {

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    const [loading, setLoading] = useState(false);
    
    const userApiUrl = import.meta.env.VITE_USER_API_URL;

    useEffect(()=>{
      console.log(user);
    },[user]) //Executes when changing user variable
   
    const handlePayment = async() => {
      setLoading(true);
      
      const paymentRequest = {
        id: movie.id,
        amount: movie.price,
        paymentMethod: 'PAYPAL',
        userName: user.name,
        userEmail: user.email

      };

      console.log(paymentRequest);

      const response = await axios.post(`${userApiUrl}/payment`, paymentRequest, {
                withCredentials: true,
            });
            const redirectUrl = response.data;  
            window.location.href = redirectUrl;
            console.log(redirectUrl);
            setLoading(false);
          }

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
    <div className='pop2'>
    <div className="bg-wrapper">
      <img src={`${imageBaseUrl}${movie.backdrop_path}`} className="bg-image" alt="Movie Backdrop" />
      <div className="gradient-overlay"></div>
      <div className="gradient-overlay-for-bgimage"></div>
    </div>
    <div className='info'>
          <div className='Infotitle'>{movie.title}</div>
      <div className='infoTop'>
        <span className='lang'>{movie.original_language}</span>
        <p className='date'><Calendar className='cal' /> {movie.release_date.substring(0, 4)}</p>
        <p className='rating'><Star className='star'/>{movie.vote_average}</p>
      </div>
      <div className='mid'>Pick Your Favorite Retailer & Let's Get Connected</div>
      <div className='retail'>
        <button className='paypal' onClick={handlePayment}><img src={paypal} className='paypalicon payment' />Paypal<div className='price'>${movie.price}</div></button>
        <button className='itunes'><img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" className='payment apple'/>iTunes<div className='price'>${movie.price}</div></button>
        <button className='pm'><img src={amazon} className='payment b'/>Prime Video<div className='price'>${movie.price}</div></button>
        <button className='fgo'><img src={aEx} className='payment c'/>American Express<div className='price'>${movie.price}</div></button>
      </div> 
      <div className='infoFoot'>
        <div>PRICING SUBJECT TO CHANGE. Confirm current pricing with applicable retailer.</div>
        <div>All transactions subject to applicable license terms and conditions.</div>   
    </div>
    </div>
    </div>
  )
}

export default BucketPop

