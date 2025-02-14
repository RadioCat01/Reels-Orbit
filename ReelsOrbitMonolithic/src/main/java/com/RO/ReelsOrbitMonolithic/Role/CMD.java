package com.RO.ReelsOrbitMonolithic.Role;

import com.RO.ReelsOrbitMonolithic.User.User;
import com.RO.ReelsOrbitMonolithic.User.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class CMD {
    @Bean
    public CommandLineRunner commandLineRunner(UserRepo userRepository, RoleRepository RoleRepository) {
        return args -> {
//            Role Admin_role = Role.builder().roleName("ROLE_ADMIN").build();
//            Role User_Role = Role.builder().roleName("ROLE_USER").build();
//
//            RoleRepository.saveAll(List.of(Admin_role, User_Role));

//            User user1 = User.builder()
//                    .username("admin")
//                    .email("admin@gmail.com")
//                    .password(passwordEncoder().encode("password"))
//                    .roles(List.of(Admin_role, User_Role))
//                    .build();
//
//            User user2 = User.builder()
//                    .username("user")
//                    .email("user1@gmail.com")
//                    .password(passwordEncoder().encode("password"))
//                    .roles(List.of(User_Role))
//                    .build();
//
//            userRepository.saveAll(List.of(user1, user2));
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
