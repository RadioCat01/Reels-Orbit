package com.ReelsOrbit.userService.Comments;

import com.ReelsOrbit.userService.Movie.Movie;
import com.ReelsOrbit.userService.Movie.MovieRepository;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MovieRepository movieRepository;

    public String save(Comment comment) {
        System.out.println(comment);
        Optional<Movie> commentedMovie = movieRepository.findByMovieId(comment.getMovie().getMovieId());

        if (commentedMovie.isPresent()) {
            comment.setMovie(commentedMovie.get());
            comment.setLikes(0);
            commentRepository.save(comment);
            return "Comment saved successfully";
        }else {
            return "Movie not found";
        }
    }

    public List<Comment> getCommentsByMovieId(Integer movieId) {
        System.out.println(movieId);
        return commentRepository.findAllByMovieId(movieId);
    }

    public void deleteComment(Integer commentId) {
        commentRepository.deleteById(commentId);
    }

    @RateLimiter(name = "ReelsOrbitCircuitBreaker")
    public String addLike(LikeRequest request) {
        Optional<Comment> comment = commentRepository.findById(request.commentId());
        if (comment.isPresent()) {
              comment.get().setLikes(comment.get().getLikes()+1);
              commentRepository.save(comment.get());
            return "Like successfully added";
        }else {
            return "Something went wrong !";
        }

    }
}
