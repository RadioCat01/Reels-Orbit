FROM openjdk:17-jdk

WORKDIR /app

COPY target/PaymentService-0.0.1-SNAPSHOT.jar /app/paymentService.jar

EXPOSE 8053

CMD ["java","-jar","paymentService.jar"]