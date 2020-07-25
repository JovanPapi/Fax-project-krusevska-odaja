package com.krusevskaodaja.Model.ApiException;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReservationDeleteException extends Exception {
    private String message;
}
