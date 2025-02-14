package com.RO.ReelsOrbitMonolithic.Controllers;

import com.RO.ReelsOrbitMonolithic.Comments.Comment;
import com.RO.ReelsOrbitMonolithic.Comments.CommentService;
import com.RO.ReelsOrbitMonolithic.Comments.LikeRequest;
import com.RO.ReelsOrbitMonolithic.Movie.DeleteMovieRequest;
import com.RO.ReelsOrbitMonolithic.Movie.Movie;
import com.RO.ReelsOrbitMonolithic.Movie.MovieService;
import com.RO.ReelsOrbitMonolithic.User.User;
import com.RO.ReelsOrbitMonolithic.User.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserRoleController {
    private final CommentService commentService;
    private final MovieService movieService;


    @PostMapping("/comment")
    public ResponseEntity<String> addComment(@RequestBody @Valid Comment comment) {
        return ResponseEntity.ok(commentService.save(comment));
    }

    @GetMapping("/comment/{movieId}")
    public ResponseEntity<List<Comment>> getCommentsByMovieId(@PathVariable("movieId") Integer movieId){
        return ResponseEntity.ok(commentService.getCommentsByMovieId(movieId));
    }

    @PostMapping("/comment/delete")
    public ResponseEntity<String> deleteComment(@RequestBody Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment deleted");
    }
    @PatchMapping("/comment/addLike")
    public ResponseEntity<String> addLikeComment(@RequestBody LikeRequest request) {
        return ResponseEntity.ok(commentService.addLike(request));
    }




    @PostMapping("/movie")
    public ResponseEntity<String> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.save(movie));
    }

    @GetMapping("/movie")
    public ResponseEntity<List<Movie>> getMoviesById(@RequestParam int userId) {
        return movieService.getMoviesById(userId);
    }

    @PostMapping("/movie/delete")
    public ResponseEntity<String> deleteMovie(@RequestBody DeleteMovieRequest request) {
        movieService.deleteMovie(request);
        System.out.println(request);
        return ResponseEntity.ok("Movie deleted successfully");
    }

    @GetMapping("/movie/byId/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("movieId") String movieId) {
        return ResponseEntity.ok( movieService.getMovieById(movieId));
    }
}
