package com.ReelsOrbit.securityClient.UserService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
        name = "${feing-user-service-name}",
        url = "${feing-user-service-url}"
)
public interface UserClient {

    @PostMapping("/user")
    String addUser(@RequestBody User user);

}
