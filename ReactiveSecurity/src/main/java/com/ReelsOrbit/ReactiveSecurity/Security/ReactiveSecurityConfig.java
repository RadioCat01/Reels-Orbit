package com.ReelsOrbit.ReactiveSecurity.Security;


import com.ReelsOrbit.ReactiveSecurity.UserService.User;
import com.ReelsOrbit.ReactiveSecurity.UserService.UserClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URI;

@RequiredArgsConstructor
@Configuration
@EnableWebFluxSecurity
public class ReactiveSecurityConfig {

    private final WebClient userClient;

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {
        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchanges -> exchanges.anyExchange().authenticated())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .oauth2Login(oauth2 -> oauth2.authenticationSuccessHandler(persistUser()))
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler(((exchange, authentication) ->
                                Mono.fromRunnable(()->{
                                    SecurityContextHolder.clearContext();
                                    exchange.getExchange().getResponse().setStatusCode(HttpStatus.OK);
                                    exchange.getExchange().getResponse().getHeaders().setLocation(URI.create("/login?logout"));
                                })
                                ))
                );
        return http.build();
    }

    @Bean
    public ServerAuthenticationSuccessHandler persistUser() {
        return (webFilterExchange, authentication) -> {
            OAuth2User user = (OAuth2User) authentication.getPrincipal();
            String email = user.getAttribute("email");

            User currentUser = new User(authentication.getName(), email);
            System.out.println(currentUser);

            userClient.post().uri("/user").body(Mono.just(currentUser),User.class).retrieve().bodyToMono(String.class)
                    .then(Mono.fromRunnable(() -> webFilterExchange.getExchange().getResponse().setComplete()))
                    .then();

            System.out.println("User " + authentication.getName() + " with email: " + email + " logged in.");
            return webFilterExchange.getExchange().getResponse().setComplete();
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
