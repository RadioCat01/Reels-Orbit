package com.RO.ReelsOrbitMonolithic.Email;

import lombok.Getter;

@Getter
public enum EmailTemplates {

    PAYMENT("payment-confirmation.html", "Payment Processed Successful !");

    private final String template;
    private final String subject;

    EmailTemplates(String template, String subject) {
        this.template = template;
        this.subject = subject;
    }
}
