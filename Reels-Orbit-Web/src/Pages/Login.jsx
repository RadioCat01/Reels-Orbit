/* eslint-disable react/prop-types */
import { ChevronsLeft } from 'lucide-react';
import './Login.css';

function Home({onClose}) {

    const googleLogin = () => {
        window.location.href ='http://localhost:8080/oauth2/authorization/google';
    };

    const facebookLogin = () => {
        window.location.href ='http://localhost:8080/oauth2/authorization/facebook';
    };

    const twitterLogin = () => {
      window.location.href ='http://localhost:8080/oauth2/authorization/twitter';
  };


   return (
     <div className='pop'>
      <button className='icon'><ChevronsLeft className='iconC' onClick={onClose}/></button>
      <div className='left'>
      <div className='logo2'>
      <p className='reels'>Reels</p>
      <p className='orbit'>Orbit</p>
     </div>
       <h2>Unlimited free access to the best movies and TV</h2>
       <p>Sign up to see more</p>
       <div className='btns'>
       <button onClick={googleLogin}><p className='g'></p>Continue with Google</button>
       <button onClick={facebookLogin}><p className='f'></p>Continue with FaceBook</button>
       <button onClick={twitterLogin}><p className='t'></p>Continue with Twitter</button>
     </div>
        <p className='foot'>By continuing you agree to Reels Orbit's <strong>Terms of Service Privacy Policy</strong> </p>
     </div>
     <div className='right'>
      <div className='logo'>
      <p className='reels'>Reels</p>
      <p className='orbit'>Orbit</p>
     </div>
     </div>
     </div>
   )
 }
 
 export default Home
 
