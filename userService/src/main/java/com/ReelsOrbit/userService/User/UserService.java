package com.ReelsOrbit.userService.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepository;

    public User deleteUser(String userId) {
        return userRepository.deleteByUserId(userId);
    }
}
