package com.RO.ReelsOrbitMonolithic.Controllers;

import com.RO.ReelsOrbitMonolithic.Role.Role;
import com.RO.ReelsOrbitMonolithic.Role.RoleRepository;
import com.RO.ReelsOrbitMonolithic.User.User;
import com.RO.ReelsOrbitMonolithic.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Secured("ROLE_ADMIN")
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleRepository roleRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/delete/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
          userService.deleteUser(email);
          return ResponseEntity.ok("Deleted user with email: " + email);
    }

    @PostMapping("/addRoles")
    public ResponseEntity<String> addRole(@RequestBody Role role) {
        return ResponseEntity.ok(roleRepository.save(role).getRoleName());
    }
    @PostMapping("/removeRole/{roleName}")
    public ResponseEntity<String> removeRole(@PathVariable String roleName) {
        roleRepository.deleteByRoleName(roleName);
        return ResponseEntity.ok("Removed role: " + roleName);
    }
}
