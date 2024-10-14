package com.ReelsOrbit.EmailService.Kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@EnableKafka
@Slf4j
public class Consumer {

    @KafkaListener(topics = "Reels-Orbit-Payment-Notification")
    public void consumeOrderTopic(NotificationRequest incomingReq) {

        log.info("Consuming Order-Topic : {}", incomingReq);

    }

}
