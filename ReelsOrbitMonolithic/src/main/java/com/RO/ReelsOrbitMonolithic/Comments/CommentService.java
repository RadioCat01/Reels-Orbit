package com.RO.ReelsOrbitMonolithic.Comments;
import com.RO.ReelsOrbitMonolithic.Movie.Movie;
import com.RO.ReelsOrbitMonolithic.Movie.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
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
