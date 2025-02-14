package com.RO.ReelsOrbitMonolithic.Movie;

import com.RO.ReelsOrbitMonolithic.User.User;
import com.RO.ReelsOrbitMonolithic.User.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final UserRepo userRepository;

    public String save(Movie movie) {

        Optional<Movie> existingMovie = movieRepository.findByMovieIdAndPersistingUserId(movie.getMovieId(), movie.getPersistingUserId());

        if (existingMovie.isPresent()) {
            return "Movie with the same movieId and userId already exists!";
        }

        Optional<User> userOptional = userRepository.findByUserId(movie.getPersistingUserId());

        if (userOptional.isEmpty()) {
            return "User does not exist!";
        }

        User user = userOptional.get();

        Movie toSave = movieMapper.toMovie(movie, user);

        movieRepository.save(toSave);

        return "Movie saved successfully!";
    }

    public ResponseEntity<List<Movie>> getMoviesById(int userId) {
        List<Movie> movies = movieRepository.findByPersistingUserId(userId);

        if (movies.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.ok(movies);
        }
    }

    public void deleteMovie(DeleteMovieRequest request) {
        movieRepository.deleteById(request.movieId());
    }

    public Movie getMovieById(String movieId) {
        Optional<Movie> purchased = movieRepository.findById(Integer.parseInt(movieId));
        return purchased.orElse(null);
    }
}
