package com.krusevskaodaja.web;

import com.krusevskaodaja.model.ApiResponsive.ApiResponse;
import com.krusevskaodaja.model.UtilDTO.ChargeRequestDTO;
import com.krusevskaodaja.service.TransactionService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/transaction", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/charge")
    public ResponseEntity<?> charge(@RequestBody ChargeRequestDTO chargeRequest)
            throws StripeException, AuthenticationException {

        chargeRequest.setDescription("Testing charge");
        chargeRequest.setCurrency(chargeRequest.getCurrency());
        Charge charge = transactionService.charge(chargeRequest);
        return new ResponseEntity<>(charge, HttpStatus.OK);
    }

    @ExceptionHandler(StripeException.class)
    public ResponseEntity<?> handleError(StripeException ex) {
        return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
