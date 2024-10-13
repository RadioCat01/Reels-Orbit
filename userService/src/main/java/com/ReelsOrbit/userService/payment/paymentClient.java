package com.ReelsOrbit.userService.payment;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PaymentService", url = "http://localhost:8053/payments/create")
public interface paymentClient {

    @PostMapping
    Response requestPayment(@RequestBody PaymentRequest request);
}
