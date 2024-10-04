package com.ReelsOrbit.securityClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testcontroller {

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
