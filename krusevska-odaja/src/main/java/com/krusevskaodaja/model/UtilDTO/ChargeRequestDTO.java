package com.krusevskaodaja.model.UtilDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChargeRequestDTO {
    private String description;
    private int amount;
    private String currency;
    private String stripeEmail;
    private String stripeToken;
}
