package com.RO.ReelsOrbitMonolithic.Movie;

public record DeleteMovieRequest(
        Integer movieId,
        String userId
) {
}
