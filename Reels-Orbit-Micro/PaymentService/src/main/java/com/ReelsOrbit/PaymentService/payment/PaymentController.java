package com.ReelsOrbit.PaymentService.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.core.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
@Slf4j
public class PaymentController {

    private final PaymentService service;
    public PaymentRequest incomingReq;

    @Value("${paypal-success-url}")
    private String paypal_success_url;
    @Value("${paypal-cancel-url}")
    private String paypal_cancel_url;
    @Value("${payment-success-frontend-url}")
    private String paypal_success_frontend_url;
    @Value("${paypal-cancel-frontend-url}")
    private String paypal_cancel_frontend_url;


    @PostMapping("/create")
    public RedirectView createPayment(
            @RequestBody PaymentRequest request
    ) throws PayPalRESTException {
        try {
            String cancelUrl = paypal_cancel_url;
            String successUrl = paypal_success_url;

            Payment payment = service.createPayment(
                    request.amount().toBigInteger().doubleValue(),
                    "USD",
                    "paypal",
                    "sale",
                    "Payment Description",
                    cancelUrl,
                    successUrl
            );
            incomingReq = request;
            for(Links links: payment.getLinks()){
                if(links.getRel().equals("approval_url")){
                    log.info("Redirecting to: " + links.getHref());
                    return new RedirectView(links.getHref());
                }
            }

        } catch (com.paypal.base.rest.PayPalRESTException e) {
            log.error("error :", e);

        }
        return new RedirectView("/error");
    }

    @GetMapping("/success")
    public RedirectView paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId
            ){
        try{
            Payment payment = service.executePayment(paymentId,payerId);
            if(payment.getState().equals("approved")){

                service.savePaymentInfoSendEmail(incomingReq,payerId,paymentId);

                return new RedirectView(paypal_success_frontend_url+incomingReq.id());
            }
        } catch (com.paypal.base.rest.PayPalRESTException e) {
            throw new RuntimeException(e);
        }
        return new RedirectView(paypal_success_frontend_url+incomingReq.id());
    }

    @GetMapping("/cancel")
    public RedirectView paymentCancel(){
        return new RedirectView(paypal_cancel_frontend_url);
    }

    @GetMapping("/error")
    public RedirectView paymentError(){
        return new RedirectView(paypal_cancel_frontend_url);
    }


}
