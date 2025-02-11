package com.ReelsOrbit.PaymentService.notification;

import com.ReelsOrbit.PaymentService.payment.PaymentMethod;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record NotificationRequest(
        Integer id,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        String paymentId,
        String payerId,
        String userName,
        String userEmail
) {
}
