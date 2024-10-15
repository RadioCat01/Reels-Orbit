package com.ReelsOrbit.userService.payment;

import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "${feing-payment-service}", url = "${feing-payment-service-url}")
public interface paymentClient {

    @PostMapping
    Response requestPayment(@RequestBody PaymentRequest request);
}
