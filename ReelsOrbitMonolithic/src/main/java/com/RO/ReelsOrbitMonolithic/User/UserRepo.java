package com.RO.ReelsOrbitMonolithic.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUserId(Integer userId);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String name);

     void deleteByEmail(String email);
}
