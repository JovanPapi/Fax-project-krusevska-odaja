package com.krusevskaodaja.Service.InterfaceImpl;

import com.krusevskaodaja.Model.Transaction;
import com.krusevskaodaja.Model.UserProfile;
import com.krusevskaodaja.Model.UtilDTO.ChargeRequestDTO;
import com.krusevskaodaja.Repository.JpaTransactionRepository;
import com.krusevskaodaja.Service.TransactionService;
import com.krusevskaodaja.Service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.model.Charge;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TransactionServiceImpl implements TransactionService {
    private final JpaTransactionRepository transactionRepository;
    private final UserService userService;

    public TransactionServiceImpl(JpaTransactionRepository transactionRepository, UserService userService) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        Stripe.apiKey = System.getenv("STRIPE_SECRET_KEY");
    }

    @Override
    public Charge charge(ChargeRequestDTO request) throws com.stripe.exception.AuthenticationException,
            InvalidRequestException,
            APIConnectionException, CardException, APIException {

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", request.getAmount() * 100);
        chargeParams.put("currency", request.getCurrency());
        chargeParams.put("description", request.getDescription());
        chargeParams.put("source", request.getStripeToken());

        Charge charge = Charge.create(chargeParams);

        UserProfile user = userService.findByEmail(request.getStripeEmail());
        Transaction t = new Transaction(charge.getId(), charge.getAmount(), charge.getBalanceTransaction(),
                Transaction.Currency.EUR, user, charge.getDescription());
        transactionRepository.save(t);

        return charge;
    }
}
