package com.ReelsOrbit.userService.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {

    boolean existsByUserId(String userId);
}
