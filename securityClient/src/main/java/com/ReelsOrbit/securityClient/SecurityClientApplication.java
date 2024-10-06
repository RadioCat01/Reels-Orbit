package com.ReelsOrbit.securityClient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class SecurityClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityClientApplication.class, args);
	}

}
