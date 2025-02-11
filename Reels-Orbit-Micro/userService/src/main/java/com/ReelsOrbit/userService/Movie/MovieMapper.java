package com.ReelsOrbit.userService.Movie;

import com.ReelsOrbit.userService.User.User;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class MovieMapper {

    public Movie toMovie(Movie movie, User user){

        double price = ThreadLocalRandom.current().nextDouble(15.00, 20.01);

        BigDecimal finalPrice = BigDecimal.valueOf(price).setScale(2, RoundingMode.HALF_UP);

        return Movie.builder()
                .movieId(movie.getMovieId())
                .title(movie.getTitle())
                .original_language(movie.getOriginal_language())
                .poster_path(movie.getPoster_path())
                .vote_average(movie.getVote_average())
                .vote_count(movie.getVote_count())
                .adult(movie.getAdult())
                .release_date(movie.getRelease_date())
                .backdrop_path(movie.getBackdrop_path())
                .persistingUserId(movie.getPersistingUserId())
                .email(movie.getEmail())
                .user(user)
                .price(finalPrice.doubleValue())
                .build();
    }
}
