package com.krusevskaodaja.model.ApiException;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductAlreadyExistException extends Exception {
    private String message;
}
