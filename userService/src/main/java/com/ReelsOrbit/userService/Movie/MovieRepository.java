package com.ReelsOrbit.userService.Movie;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    Optional<Movie> findByMovieIdAndUserId(Integer movieId, String userId);
    List<Movie> findByUserId(String userId);
}
