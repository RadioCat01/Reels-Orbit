package com.ReelsOrbit.userService.User;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepo userRepository;
    private final UserService userService;

    @PostMapping
    @CircuitBreaker(name = "ReelsOrbitCircuitBreaker")
    public String addUser(@RequestBody User user) {
        if(!userRepository.existsByUserId(user.getUserId())) {
            userRepository.save(user);
            System.out.println("User " + user.getUserId() + " added with Email " + user.getEmail());
            return user.getEmail();
        }else {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        if(users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }


    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/delete")
    public ResponseEntity<String> deleteUserById(@RequestParam String userId){

        userService.deleteUser(userId);
        return ResponseEntity.ok(userId);
    }

}
