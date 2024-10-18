package com.ReelsOrbit.userService.Movie;

import com.ReelsOrbit.userService.Comments.Comment;
import com.ReelsOrbit.userService.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "movies")
@ToString(exclude = {"user", "comments"})
public class Movie {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, unique = true)
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

    private String persistingUserId;
    private String email;

    @ManyToOne
    @JoinColumn(name = "user_id_joint", referencedColumnName = "userId")
    @JsonBackReference("user-movie")
    private User user;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("movie-comment")
    private List<Comment> comments = new ArrayList<>();
}
