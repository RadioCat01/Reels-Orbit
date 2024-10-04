function Home() {

    const googleLogin = () => {
        window.location.href ='http://localhost:8080/oauth2/authorization/google';
    };

    const facebookLogin = () => {
        window.location.href ='http://localhost:8080/oauth2/authorization/facebook';
    };

   return (
     <div>
       <h2>Oauth Login</h2>
       <button onClick={googleLogin}>Google</button>
       <button onClick={facebookLogin}>FaceBook</button>
     </div>
   )
 }
 
 export default Home
 