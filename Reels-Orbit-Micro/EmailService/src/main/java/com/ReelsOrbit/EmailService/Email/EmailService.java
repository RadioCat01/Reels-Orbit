package com.ReelsOrbit.EmailService.Email;

import com.ReelsOrbit.EmailService.Kafka.PaymentMethod;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendPaymentSuccessEmail(
            String destinationEmail,
            String customerName,
            BigDecimal amount,
            PaymentMethod paymentMethod,
            String paymentId,
            String payerId
    )throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        messageHelper.setFrom("pwnkanishka@gmail.com");

        final String templateName = EmailTemplates.PAYMENT.getTemplate();

        Map<String,Object> model = new HashMap<>();
        model.put("customerName", customerName);
        model.put("amount", amount);
        model.put("paymentMethod", paymentMethod);
        model.put("paymentId", paymentId);
        model.put("payerId", payerId);

        Context context = new Context();
        context.setVariables(model);
        messageHelper.setSubject(EmailTemplates.PAYMENT.getSubject());

        try {
            String html = templateEngine.process(templateName, context);
            messageHelper.setText(html, true);

            messageHelper.setTo(destinationEmail);
            mailSender.send(message);

            log.info("Email Sent Successfully");
        }catch (MessagingException e){
            log.warn("Email Sent Failed");
        }
    }

}
