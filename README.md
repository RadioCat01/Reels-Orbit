# Reels Orbit an E-Commerce Website Prototype
#### Spring Cloud GCP | Spring Boot Microservices | React | Docker

https://github.com/user-attachments/assets/352ec47f-bf2c-415d-9926-d9ded84188c2

![new](https://github.com/user-attachments/assets/a942c754-7643-4cf2-8ffc-725d7e94f0b0)

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

#### Frontend - React + Vite Application
    VITE_USER_API_URL=
    VITE_MOVIEDB_API_KEY=
    VITE_SECURITY_API_URL=
    VITE_ADMIN_USERNAME=
    VITE_ADMIN_PASSWORD=
---
### Install Instructions

#### Step 1: Credentials
Setup Google Cloud SQL
Setup Google Cloud Console + Project 
Setup Meta Developer Console + App
Credentials for Open Authentication
MovieDB API Key

### Step 2: Import From Docker
SPRING_PROFILES_ACTIVE=**doc** is an quick run sping profile with minimum enviorenmental variables.
SPRING_PROFILES_ACTIVE=**prod** requires OAuth Credentials + GCP SQL Credentials

#### docker-compose.yml
```
#Current
version: v1
services:
  Reels-Orbit-Web:
    image: radiocat2000/reels_orbit_web
    ports:
      - "5173:5173"
    environment:
      - VITE_USER_API_URL=http://localhost:8081
      - VITE_MOVIEDB_API_KEY=
      - VITE_SECURITY_API_URL=http://localhost:8080
      - VITE_ADMIN_USERNAME=admin
      - VITE_ADMIN_PASSWORD=radiocat
  discovery:
    image: radiocat2000/reels_orbit_discovery:latest
    container_name: ReelsOrbit-discoveryService
    ports:
      - "8761:8761"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
    networks:
      - ReelsOrbit

  payment-service:
    image: radiocat2000/reels_orbit_payment:latest
    container_name: ReelsOrbit-paymentService
    ports:
      - "8053:8053"
    environment:
      - SPRING_PROFILES_ACTIVE=doc
      #- SPRING_PROFILES_ACTIVE=prod
      #- gcp-project-id=
      #- gcp-sql-instance-connection-name=
      #- gcp-sql-database-name=
      #- gcp-credentials-location=
      #- datasource-username-CSQL=
      #- datasource-password-CSQL=
      #- eureka-default-zone=
      #- kafka-bootstrap-server=
      #- paypal-client-id=
      #- paypal-client-secret=
      #- paypal-success-url=
      #- paypal-cancel-url=
      #- payment-success-frontend-url=
      #- paypal-cancel-frontend-url=
    #volumes:
      #- ./reels-orbit-3f2299e99b9d.json:/app/config/credentials.json
    networks:
      - ReelsOrbit
    depends_on:
      - kafka
      - zookeeper
      - zipkin
      - mail-dev

  ReelsOrbitEmail:
    container_name: ReelsOrbit_Email
    image: radiocat2000/reels_orbit_email:latest
    environment:
      - SPRING_PROFILES_ACTIVE=doc
    networks:
      - ReelsOrbit
    ports:
      - "8054:8054"
    depends_on:
      - kafka
      - zookeeper
      - zipkin

  ReelsOrbitSecurity:
    container_name: ReelsOrbit_security
    image: radiocat2000/reels_orbit_security:latest
    environment:
      - SPRING_PROFILES_ACTIVE=doc
      #- SPRING_PROFILES_ACTIVE=prod
      #- google-client-id=
      #- google-client-secret=
      #- facebook.client-id=
      #- facebook.client-secret=
      #- twitter.client-id=
      #- twitter.client-secret=
      #- twitter.scope=
      #- twitter.authorization-grant-type=
      #- twitter.redirect-uri=
      #- twitter.authorization-uri=
      #- twitter.token-uri=
      #- twitter.user-info-uri=
      #- feing-user-service-name=
      #- feing-user-service-url=
    networks:
      - ReelsOrbit
    ports:
      - "8080:8080"
    depends_on:
      - zipkin

  ReelsOrbitUser:
    container_name: ReelsOrbit_User
    image: radiocat2000/reels_orbit_user:latest
    environment:
      - SPRING_PROFILES_ACTIVE=doc
      #- SPRING_PROFILES_ACTIVE=prod
      #- gcp-project-id=
      #- gcp-sql-instance-connection-name=
      #- gcp-sql-database-name=
      #- datasource-username-CSQL=
      #- datasource-password-CSQL=
      #- gcp-credentials-location=
      #- datasource-url-Pg=
      #- datasource-username-pg=
      #- datasource-password-pg=
      #- feing-payment-service=
      #- feing-payment-service-url=
      # eureka.client.service-url.defaultZone=
    networks:
      - ReelsOrbit
    ports:
      - "8081:8081"
    depends_on:
      - postgres
      - kafka
      - zookeeper
      - zipkin
      - discovery

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
---

### Jenkins
(+)Docker Command: 
```
docker run --privileged -u 0 -p 8080:8080 -p 50000:50000 -v D:\<Location>:/var/jenkins_home jenkins/jenkins:lts
```



























