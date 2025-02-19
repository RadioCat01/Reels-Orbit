package com.RO.ReelsOrbitMonolithic.Payment;

import java.math.BigDecimal;

public record PaymentRequest(

        Integer id,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        String userName,
        String userEmail
) {
}
