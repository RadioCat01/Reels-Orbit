import { useEffect, useRef, useState } from 'react';
import './MovieExtended.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BucketPop from '../../Components/InBucketPopUp/BucketPop';
import axios from 'axios';
import { CalendarCheck } from 'lucide-react';
import { Star } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import '../Landing.css';
import '../Bucket.css';
import '../../Components/Nav/Nav.css';

function MovieExtended() {

    const location = useLocation();
    const { movie, user } = location.state;
    const [showInfoPopUp, setInfoPopUp] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(movie);
    const [comments, setComments] = useState(movie.comments);
    const userAPIurl = import.meta.env.VITE_USER_API_URL;
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();
    const popupRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setInfoPopUp(false); 
        }
      };
  
      
      document.addEventListener('mousedown', handleClickOutside);
  
     
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect (()=>{
      const userAPIurl = import.meta.env.VITE_USER_API_URL;
      axios.get(`${userAPIurl}/comments/${movie.movieId}`)
            .then(res => {
              setComments(res.data);
            })
      console.log(movie);
    },[movie])

    const handleLikeClick = (commentId) => {
      const likeRequest = {
        commentId: commentId,
        userEmail: user.email
      };
      axios.patch(`${userAPIurl}/comments/addLike`, likeRequest)
        .then(response => {
         
          axios.get(`${userAPIurl}/comments/${movie.movieId}`)
            .then(res => {
              setComments(res.data);
            })
            .catch(err => {
              console.error('Error fetching updated comments:', err);
            });
        })
        .catch(error => {
          console.error('Error liking comment:', error);
        });
    };
    const handleBuyClick = () => {
        if (!user) {
         
          console.log("User not logged in. Show login popup.");
        } else {
          
          setInfoPopUp(true);
        }
      };
    const closePopup = () => {
        setInfoPopUp(false);
      };
    const handleAddComment = () => {
        if (!newComment) {
          alert("Comment cannot be empty!");
          return;
        }

        const commentRequest = {
          comment: newComment,
          userEmail: user.email,
          movie: movie
        };
    
        axios.post(`${userAPIurl}/comments`, commentRequest)
          .then(response => {
          
            axios.get(`${userAPIurl}/comments/${movie.movieId}`)
              .then(res => {
                setComments(res.data);
                setNewComment("");
              })
              .catch(err => {
                console.error('Error fetching updated comments:', err);
              });
          })
          .catch(error => {
            console.error('Error adding comment:', error);
          });
      };

  return (
    <div className={`MVEPage ${showInfoPopUp ? 'blurred' : ''}`}>
      <div className={`mainContent ${showInfoPopUp ? 'blurred' : ''}`}>
      <img className='backdrop' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={`${movie.title} poster`} />
      <div className="MVEPagenav">
        <div className="navRight">
        <div className='logo3 logoBkt'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
          </div> 
        </div>
        <div className="navLeft">
      <h4>{user.email}</h4>
      <button className="bucketBtn" onClick={()=>navigate("/bucket")}>Bucket</button>
      </div>
      </div>
      <div className="movieSection">
      <img className='poster' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
      <div className="movieInfo">
      <h1>{movie.title}</h1>
      <div className="movieDetailsCont">
           <p className='lang'>{movie.original_language}</p>
           <p><CalendarCheck className='Mitem'/>{movie.release_date}</p>
           <p><Star className='Mitem'/>{movie.vote_average} ({movie.vote_count})</p>
      </div>
      <div className="buysection">
      <p>${movie.price}</p>
      <button onClick={handleBuyClick}>Check Out</button>
      </div>
          <div className="additionalInfo">
             <p><strong>Did you know?</strong> The longest film ever made is over 35 hours long.</p>
             <p><strong>Fun Fact:</strong> The most popular genre in cinema today is Drama.</p>
             <p><strong>Industry Insight:</strong> Virtual reality and augmented reality are shaping the future of filmmaking.</p>
             <p><strong>Movie Quote:</strong> "Life is what happens when you're busy making other plans." – John Lennon</p>
             <p><strong>Hollywood Update:</strong> Studios are experimenting with AI-generated scripts and character designs to save time and resources.</p>
             <p><strong>Trending:</strong> Short films and digital content are gaining influence and becoming just as impactful as full-length features.</p>
          </div>
      </div>
      </div>
      <div className="commentsSection">
        <div className="current-comments">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.commentId}>
            <div className="commentItem">
            <p className='comment'>{comment.comment}</p>
            <div className="commentInfo">
            <small>{comment.userEmail}</small>
            <small>{new Date(comment.createdDate).toLocaleDateString()}</small>
            <p className='likebutton'> {comment.likes} <ThumbsUp onClick={() => handleLikeClick(comment.commentId)} className='Mitem'/></p>
          </div>
          </div>
          </div>
        ))
      ) : (
        <p>Be the First One to Drop a Comment !</p>
      )}
      </div>
     <div className="add-comment-section">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add Comment . . ."
          className='addcommentinput'
        />
        <button className='commentutton' onClick={handleAddComment}>Submit</button>
      </div>
      </div>
      </div>

      {showInfoPopUp && (
        <>
          <div className="backdrop" onClick={closePopup} />
          <div className="gradient-overlay"></div>
          <motion.div
            className="motiondev"
            ref={popupRef}
            initial={{ opacity: 0, y: -70 }}
            animate={{ opacity: 1, y: -90 }}
            transition={{ duration: 0.4 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <BucketPop movie={selectedMovie} user={user} onClose={closePopup} />
          </motion.div>
        </>
      )}
    </div>
  )
}

export default MovieExtended
