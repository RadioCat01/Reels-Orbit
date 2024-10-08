package com.ReelsOrbit.userService.Movie;

import com.ReelsOrbit.userService.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "Movies")
public class Movie {
    @Id
    @GeneratedValue
    private Integer id;

    private Integer movieId;
    private String title;
    private String original_language;
    private String poster_path;
    private Double vote_average;
    private Integer vote_count;
    private Boolean adult;
    private String release_date;
    private String backdrop_path;
    private Double price;

    private String userId;
    private String email;

    @ManyToOne
    @JoinColumn(name = "LUser_id", referencedColumnName = "id")
    @JsonBackReference
    private User user;
}
