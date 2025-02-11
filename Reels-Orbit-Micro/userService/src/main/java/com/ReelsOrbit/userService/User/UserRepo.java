package com.ReelsOrbit.userService.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {

    boolean existsByUserId(String userId);
    Optional<User> findByUserId(String userId);

    void deleteByUserId(String userId);
}
