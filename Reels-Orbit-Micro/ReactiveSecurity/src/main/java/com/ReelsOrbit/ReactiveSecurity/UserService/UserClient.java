package com.ReelsOrbit.ReactiveSecurity.UserService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "USERSERVICE",
        url = "http://localhost:8081"
)
public interface UserClient {

    @PostMapping("/user")
    String addUser(@RequestBody User user);

}
