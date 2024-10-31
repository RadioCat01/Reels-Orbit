# Reels Orbit an E-Commerce Website Prototype
#### Spring Cloud GCP | Spring Boot Microservices | React | Docker

https://github.com/user-attachments/assets/352ec47f-bf2c-415d-9926-d9ded84188c2

![Reels-Orbit](https://github.com/user-attachments/assets/361f9264-0cc8-4853-8fce-feb626666593)

---
### Service Imformation
#### Payment Service Env ( Spring Profile - prod )
    SPRING_PROFILES_ACTIVE=prod

    # Google Cloud SQL
    gcp-project-id=
    gcp-sql-instance-connection-name=
    gcp-sql-database-name=
    gcp-credentials-location=file:
    datasource-username-CSQL=
    datasource-password-CSQL=
    
    eureka-default-zone=
    
    kafka-bootstrap-server=
    
    paypal-client-id=
    paypal-client-secret=
    paypal-success-url=
    paypal-cancel-url=
    payment-success-frontend-url=
    paypal-cancel-frontend-url=

#### UserService Env ( Spring profile - prod )
    SPRING_PROFILES_ACTIVE=prod

    # Google Cloud SQL
    gcp-project-id=
    gcp-sql-instance-connection-name=
    gcp-sql-database-name=
    datasource-username-CSQL=
    datasource-password-CSQL=
    gcp-credentials-location=

    datasource-url-Pg=
    datasource-username-pg=
    datasource-password-pg=

    feing-payment-service=
    feing-payment-service-url=

    eureka.client.service-url.defaultZone=

#### Security client Env ( Spring profile - prod )
    google-client-id=
    google-client-secret=
    facebook.client-id=
    facebook.client-secret=
    twitter.client-id=
    twitter.client-secret=
    twitter.scope=
    twitter.authorization-grant-type=
    twitter.redirect-uri=
    twitter.authorization-uri=
    twitter.token-uri=
    twitter.user-info-uri=
    
    feing-user-service-name=
    feing-user-service-url=
---
### Import From Docker
#### docker-compose.yml

```
#Current
version: v1
services:
  discovery:
    image: radiocar2000/reels-orbit-discoveryservice:latest
    container_name: ReelsOrbit-discoveryService
    ports:
      - "8761:8761"
    networks:
      - ReelsOrbit

  payment-service:
    image: radiocat2000/reels-orbit-paymentservice:latest
    container_name: ReelsOrbit-paymentService
    ports:
      - "8053:8053"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - gcp-project-id=reels-orbit
      - gcp-sql-instance-connection-name=reels-orbit:asia-south2:reels-orbit-sql
      - gcp-sql-database-name=payment
      - gcp-credentials-location=file:/app/config/credentials.json
      - datasource-username-CSQL=postgres
      - datasource-password-CSQL=password
      - eureka-default-zone=http://discovery:8761/eureka
      - kafka-bootstrap-server=ReelsOrbit-kafka:29092
      - paypal-client-id=
      - paypal-client-secret=
      - paypal-success-url=
      - paypal-cancel-url=
      - payment-success-frontend-url=http://localhost:5173/paymentSuccess/
      - paypal-cancel-frontend-url=http://localhost:5173/paymentCanceled/
    volumes:
      - ./reels-orbit-3f2299e99b9d.json:/app/config/credentials.json
    networks:
      - ReelsOrbit
    depends_on:
      - kafka
      - zookeeper
      - zipkin
      - mail-dev

  postgres:
    container_name: ReelsOrbit-postgres
    image: postgres
    environment:
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
      PGDATA: /data/postgres
    volumes:
      - postgres:/data/postgres
    ports:
      - "5432:5432"
    networks:
      - ReelsOrbit

  zipkin:
    container_name: ReelsOrbit-zipkin
    image: openzipkin/zipkin
    ports:
      - "9411:9411"
    networks:
      - ReelsOrbit

  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    container_name: ReelsOrbit-zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    networks:
      - ReelsOrbit

  kafka:
    image: confluentinc/cp-kafka:latest
    container_name: ReelsOrbit-kafka
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://ReelsOrbit-kafka:29092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
    networks:
      - ReelsOrbit

  mail-dev:
    container_name: ReelsOrbit-mail
    image: maildev/maildev
    ports:
      - "1080:1080"
      - "1025:1025"

networks:
  ReelsOrbit:
    driver: bridge

volumes:
  postgres:
```
