import { useEffect, useState } from 'react';
import './MovieExtended.css';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BucketPop from '../../Components/InBucketPopUp/BucketPop';
import axios from 'axios';

function MovieExtended() {

    const location = useLocation();
    const { movie, user } = location.state;
    const [showInfoPopUp, setInfoPopUp] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(movie);
    const [comments, setComments] = useState(movie.comments);
    const userAPIurl = import.meta.env.VITE_USER_API_URL;
    const [newComment, setNewComment] = useState("");

    useEffect (()=>{
      setComments(movie.comments);
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
    <div className='MVEPage'>
      <div className="movieSection">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={`${movie.title} poster`} />
      <div className="movieInfo">
      <h1>{movie.title}</h1>
      <p>Language: {movie.original_language}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Average Vote: {movie.vote_average} (from {movie.vote_count} votes)</p>
      <p>Price: ${movie.price}</p>
      <h3>User: {user.email}</h3>
      <button onClick={handleBuyClick}>Buy</button>
      </div>
      </div>
      <div className="commentsSection">
        <div className="current-comments">
      <h4>Comments:</h4>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.commentId}>
            <p>{comment.comment}</p>
            <small>By: {comment.userEmail} on {new Date(comment.createdDate).toLocaleDateString()}</small>
            <p>Likes: {comment.likes}</p>
            <button onClick={() => handleLikeClick(comment.commentId)}>Like</button>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      </div>
     <div className="add-comment-section">
        <h4>Add a comment:</h4>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
      </div>

      {showInfoPopUp && (
        <>
          <div className="backdrop" onClick={closePopup} />
          <div className="gradient-overlay"></div>
          <motion.div
            className="motiondev"
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
