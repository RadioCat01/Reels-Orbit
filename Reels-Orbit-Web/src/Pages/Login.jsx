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

   return (
     <div>
      <button className='icon'><ChevronsLeft onClick={onClose}/></button>
       <h2>Oauth Login</h2>
       <button onClick={googleLogin}>Google</button>
       <button onClick={facebookLogin}>FaceBook</button>
     </div>
   )
 }
 
 export default Home
 