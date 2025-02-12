package com.RO.ReelsOrbitMonolithic.User;


import com.RO.ReelsOrbitMonolithic.Role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepo userRepository;
    private final UserService userService;
    private final RoleRepository roleRepository;

    @PostMapping("/addUser")
    public String addUser(@RequestBody User user) {
        if(userRepository.findByEmail(user.getEmail()).isEmpty()) {
            userRepository.save(user);
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
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteUserById(@RequestParam String userId){

        userService.deleteUser(userId);
        return ResponseEntity.ok(userId);
    }

}
