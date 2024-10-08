package com.ReelsOrbit.userService.User;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserRepo userRepository;
    private final UserService userService;

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

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        if(users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/delete")
    public ResponseEntity<User> deleteUserById(@RequestParam String userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

}
