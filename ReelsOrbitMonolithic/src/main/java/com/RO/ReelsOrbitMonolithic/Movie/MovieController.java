package com.RO.ReelsOrbitMonolithic.Movie;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping
    public ResponseEntity<String> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.save(movie));
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getMoviesById(@RequestParam String userId) {
        return movieService.getMoviesById(userId);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteMovie(@RequestBody DeleteMovieRequest request) {
        movieService.deleteMovie(request);
        System.out.println(request);
        return ResponseEntity.ok("Movie deleted successfully");
    }

    @GetMapping("/byId/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("movieId") String movieId) {
        return ResponseEntity.ok( movieService.getMovieById(movieId));
    }

}
