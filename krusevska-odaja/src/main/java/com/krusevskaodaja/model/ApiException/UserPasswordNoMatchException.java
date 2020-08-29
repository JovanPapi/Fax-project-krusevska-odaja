package com.krusevskaodaja.model.ApiException;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserPasswordNoMatchException extends Exception {
    private String message;
}
