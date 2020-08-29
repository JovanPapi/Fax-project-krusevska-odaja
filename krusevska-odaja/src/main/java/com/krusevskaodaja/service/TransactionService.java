package com.krusevskaodaja.service;

import com.krusevskaodaja.model.UtilDTO.ChargeRequestDTO;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.model.Charge;

import javax.naming.AuthenticationException;

public interface TransactionService {
    Charge charge(ChargeRequestDTO request) throws AuthenticationException,
            com.stripe.exception.AuthenticationException,
            InvalidRequestException, APIConnectionException,
            CardException, APIException;
}
