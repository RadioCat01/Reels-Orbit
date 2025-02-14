package com.RO.ReelsOrbitMonolithic.User;

import com.RO.ReelsOrbitMonolithic.Role.Role;
import com.RO.ReelsOrbitMonolithic.Role.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepository;
    private final RoleRepository roleRepository;

    @Transactional
    public void deleteUser(String email) {
         userRepository.deleteByEmail(email);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);

    }

    public String registerUser(User newUser) {
        List<Role> ReqRoles = newUser.getRoles();
        List<Role> validRoles = new ArrayList<>();
        for (Role role : ReqRoles) {
            Optional<Role> existingRoles = roleRepository.findByRoleName(role.getRoleName());
            existingRoles.ifPresent(validRoles::add);
        }
        newUser.setRoles(validRoles);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser).getEmail();
    }

    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        if(users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }
}
