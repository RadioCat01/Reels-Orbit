package com.ReelsOrbit.securityClient;

import com.ReelsOrbit.securityClient.UserService.User;
import com.ReelsOrbit.securityClient.UserService.UserClient;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.filter.OrderedFormContentFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserClient userClient;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, OrderedFormContentFilter formContentFilter) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authReq ->
                        authReq.anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(persistUser()));
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler persistUser() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request,
                                                HttpServletResponse response, Authentication authentication)
                    throws IOException, ServletException {

                OAuth2User user = (OAuth2User) authentication.getPrincipal();
                String email = user.getAttribute("email");

                User currentUser = new User(authentication.getName(),email);
                System.out.println(currentUser);

                userClient.addUser(currentUser);

                System.out.println("User " + authentication.getName()+" of email Address: "+ email +" has logged in successfully.");
                response.sendRedirect("http://localhost:5173");
            }
        };
    }
}
