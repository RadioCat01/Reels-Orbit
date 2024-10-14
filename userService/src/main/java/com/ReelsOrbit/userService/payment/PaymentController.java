package com.ReelsOrbit.userService.payment;

import feign.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PaymentController {

    private final paymentClient client;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody PaymentRequest paymentRequest){

        Response response = client.requestPayment(paymentRequest);
        String redirectUrl = response.headers().get("Location").iterator().next();

        return ResponseEntity.ok(redirectUrl);
    }

}
