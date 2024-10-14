package com.ReelsOrbit.EmailService.Kafka;

import com.ReelsOrbit.EmailService.Email.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@EnableKafka
@Slf4j
public class Consumer {

    private final EmailService emailService;

    @KafkaListener(topics = "Reels-Orbit-Payment-Notification")
    public void consumeOrderTopic(NotificationRequest incomingReq) throws MessagingException {
        log.info("Consuming Order-Topic : {}", incomingReq);

        emailService.sendPaymentSuccessEmail(
                incomingReq.userEmail(),
                incomingReq.userName(),
                incomingReq.amount(),
                incomingReq.paymentMethod(),
                incomingReq.paymentId(),
                incomingReq.payerId()
        );

    }

}
