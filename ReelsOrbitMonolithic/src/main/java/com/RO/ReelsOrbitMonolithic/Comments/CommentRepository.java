package com.RO.ReelsOrbitMonolithic.Comments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("SELECT c FROM Comment c WHERE c.movie.movieId = :movieId")
    List<Comment> findAllByMovieId(@Param("movieId") int movieId);

}
