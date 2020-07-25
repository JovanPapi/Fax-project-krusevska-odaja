package com.krusevskaodaja.Model.ApiException;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserNameNotValidException extends Exception {
    private String message;
}
