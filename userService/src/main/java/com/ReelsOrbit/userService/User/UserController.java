package com.ReelsOrbit.userService.User;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepo userRepository;

    @PostMapping
    public String addUser(@RequestBody User user) {

        if(!userRepository.existsByUserId(user.getUserId())) {
            userRepository.save(user);
            System.out.println("User " + user.getUserId() + " added with Email " + user.getEmail());
            return user.getEmail();
        }else {
            return null;
        }
    }

}
