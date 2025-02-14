package com.RO.ReelsOrbitMonolithic.User;


import com.RO.ReelsOrbitMonolithic.Movie.Movie;
import com.RO.ReelsOrbitMonolithic.Role.Role;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "users")
@ToString(exclude = "movies")
public class User implements UserDetails, Principal {

    @Id
    @GeneratedValue
    private Integer userId;

    @Column(unique = true)
    @NotNull(message = "User Name must not be empty")
    @NotEmpty(message = "User Name must not be empty")
    private String username;

    @NotNull(message = "Password must not be empty")
    @NotEmpty(message = "Password must not be empty")
    @Column(unique = true)
    private String password;
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-movie")
    private List<Movie> movies = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "userRoles",
            joinColumns = @JoinColumn(name="userId"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;


    private String signUpMethod;

    @Override
    public String getName() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(role->new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}
