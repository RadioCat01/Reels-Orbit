# Reels Orbit an E-Commerce Website Prototype
#### Spring Cloud GCP | Spring Boot Microservices | React | Docker

https://github.com/user-attachments/assets/352ec47f-bf2c-415d-9926-d9ded84188c2

![Reels-Orbit](https://github.com/user-attachments/assets/361f9264-0cc8-4853-8fce-feb626666593)

---
### Service Imformation
#### Payment Service Environmental Variables ( Spring Profile - dev )
    SPRING_PROFILES_ACTIVE=dev
    datasource-url-Pg=jdbc:postgresql://localhost:5432/payment
    datasource-username-pg=username
    datasource-password-pg=password

    paypal-client-id=AbjzUpp06dy-_V9FgZnZUqVKQdwqKNkVI6satiVDqMgbiHVVFo0N2gw6NI9xtWNvhwRf0r5QGfJrwO8c
    paypal-client-secret=EAsRr46qOtOy9hgAI8fOJ2kyKhzsgvU3fqXstSHUuorAgkGgCKWouTx4oyE5Czh9hxodzKf4LPma_CfL

    paypal-success-url=http://localhost:8053/payments/success
    paypal-cancel-url=http://localhost:8053/payments/cancel
    payment-success-frontend-url=http://localhost:5173/paymentSuccess/
    paypal-cancel-frontend-url=http://localhost:5173/paymentCanceled/

    eureka-default-zone=http://localhost:8761/eureka
    kafka-bootstrap-server=localhost:9092
#### Payment Service Environmental Variables ( Spring Profile - prod )
    SPRING_PROFILES_ACTIVE=prod
    gcp-project-id=reels-orbit
    gcp-sql-instance-connection-name=reels-orbit:asia-south2:reels-orbit-sql
    gcp-sql-database-name=payment
    gcp-credentials-location=file:/app/config/credentials.json
    datasource-username-CSQL=postgres
    datasource-password-CSQL=password
    eureka-default-zone=http://discovery:8761/eureka
    kafka-bootstrap-server=ReelsOrbit-kafka:29092
    paypal-client-id=AbjzUpp06dy-_V9FgZnZUqVKQdwqKNkVI6satiVDqMgbiHVVFo0N2gw6NI9xtWNvhwRf0r5QGfJrwO8c
    paypal-client-secret=EAsRr46qOtOy9hgAI8fOJ2kyKhzsgvU3fqXstSHUuorAgkGgCKWouTx4oyE5Czh9hxodzKf4LPma_CfL
    paypal-success-url=http://localhost:8053/payments/success
    paypal-cancel-url=http://localhost:8053/payments/cancel
    payment-success-frontend-url=http://localhost:5173/paymentSuccess/
    paypal-cancel-frontend-url=http://localhost:5173/paymentCanceled/
    
---
### Import From Docker
#### docker-compose.yml
