package com.ReelsOrbit.userService.Movie;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    Optional<Movie> findByMovieIdAndUserId(Integer movieId, String userId);
    List<Movie> findByUserId(String userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Movie m WHERE m.movieId = ?1 AND m.user.userId = ?2")
    void deleteByMovieIdAndUserId(Integer movieId, String userId);
}