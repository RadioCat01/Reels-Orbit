package com.ReelsOrbit.PaymentService.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.core.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
@Slf4j
public class PaymentController {

    private final PaymentService service;
    public PaymentRequest incomingReq;

    @PostMapping("/create")
    public RedirectView createPayment(
            @RequestBody PaymentRequest request
    ) throws PayPalRESTException {
        try {
            String cancelUrl = "http://localhost:8053/payments/cancel";
            String successUrl = "http://localhost:8053/payments/success";

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

                return new RedirectView("http://localhost:5173/paymentSuccess/"+incomingReq.id());
            }
        } catch (com.paypal.base.rest.PayPalRESTException e) {
            throw new RuntimeException(e);
        }
        return new RedirectView("http://localhost:5173/paymentSuccess"+incomingReq.id());
    }

    @GetMapping("/cancel")
    public RedirectView paymentCancel(){
        return new RedirectView("http://localhost:5173/paymentCanceled");
    }

    @GetMapping("/error")
    public RedirectView paymentError(){
        return new RedirectView("http://localhost:5173/paymentCanceled");
    }


}
