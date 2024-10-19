# Reels Orbit an E-Commerce Website Prototype
#### Spring Cloud GCP | Spring Boot Microservices | React | Docker

https://github.com/user-attachments/assets/352ec47f-bf2c-415d-9926-d9ded84188c2

![Reels-Orbit](https://github.com/user-attachments/assets/361f9264-0cc8-4853-8fce-feb626666593)

---
### Service Imformation
#### Payment Service Environmental Variables ( Spring Profile - dev )
    SPRING_PROFILES_ACTIVE=dev
    datasource-url-Pg
    datasource-username-pg=
    datasource-password-pg=

    paypal-client-id=
    paypal-client-secret=

    paypal-success-url=
    paypal-cancel-url=
    payment-success-frontend-url=
    paypal-cancel-frontend-url=

    eureka-default-zone=
    kafka-bootstrap-server=
    
#### Payment Service Environmental Variables ( Spring Profile - prod )
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
    
---
### Import From Docker
#### docker-compose.yml
