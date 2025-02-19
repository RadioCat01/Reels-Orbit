package com.RO.ReelsOrbitMonolithic.Payment;

import com.RO.ReelsOrbitMonolithic.Email.EmailService;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;
    private final APIContext apiContext;
    private final EmailService emailService;

    public Payment createPayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String SuccessUrl
    ) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format(Locale.forLanguageTag(currency),"%.2f",total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(SuccessUrl);

        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    public Payment executePayment ( String paymentId, String payerId) throws PayPalRESTException {

        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        return payment.execute(apiContext, paymentExecution);

    }

    public void savePaymentInfoSendEmail(PaymentRequest incomingReq, String payerId, String paymentId)
            throws MessagingException {
        emailService.sendPaymentSuccessEmail(
                incomingReq.userEmail(),
                incomingReq.userName(),
                incomingReq.amount(),
                incomingReq.paymentMethod(),
                paymentId,
                payerId
                );

        repository.save(com.RO.ReelsOrbitMonolithic.Payment.Payment.builder()
                .amount(incomingReq.amount())
                .userEmail(incomingReq.userEmail())
                .userName(incomingReq.userName())
                .paymentMethod(incomingReq.paymentMethod())
                .payerId(payerId)
                .paymentId(paymentId)
                .build());
    }
}
