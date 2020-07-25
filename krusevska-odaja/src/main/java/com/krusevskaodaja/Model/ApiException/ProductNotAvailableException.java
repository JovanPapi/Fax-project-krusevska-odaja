package com.krusevskaodaja.Model.ApiException;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductNotAvailableException extends Exception {
    private String message;
}
