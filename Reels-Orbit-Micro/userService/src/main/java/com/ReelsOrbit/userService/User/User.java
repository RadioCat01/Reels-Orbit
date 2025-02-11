package com.ReelsOrbit.userService.User;

import com.ReelsOrbit.userService.Comments.Comment;
import com.ReelsOrbit.userService.Movie.Movie;
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
@Table(name = "users")
@ToString(exclude = "movies")
public class User {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, unique = true)
    private String userId;

    private String Email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-movie")
    private List<Movie> movies = new ArrayList<>();

}
