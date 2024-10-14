package com.ReelsOrbit.PaymentService.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaConfig {

    private final KafkaTemplate<String, NotificationRequest> kafkaTemplate;

    public void sendNotification(NotificationRequest notification) {

        Message<NotificationRequest> message = MessageBuilder.withPayload(notification)
                .setHeader(KafkaHeaders.TOPIC, "Reels-Orbit-Payment-Notification")
                .build();

        kafkaTemplate.send(message);
        log.info("Notification sent to Reels-Orbit.PaymentService: {}", message);
    }

    @Bean
    public NewTopic PaymentNotificationTopic() {
        return TopicBuilder.name("Reels-Orbit-Payment-Notification").build();
    }

}
