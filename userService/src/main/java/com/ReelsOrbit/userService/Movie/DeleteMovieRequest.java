package com.ReelsOrbit.userService.Movie;

public record DeleteMovieRequest(
        Integer movieId,
        String userId
) {
}
