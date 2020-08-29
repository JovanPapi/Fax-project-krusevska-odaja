package com.krusevskaodaja.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    public enum Currency {
        EUR
    }

    //Unique identifier for the transaction object.
    @Id
    private String id;

    //Amount intended to be collected by this payment.
    @Column
    private long amount;

    //ID of the balance transaction that describes the impact of this charge on your account balance
    @Column
    private String balanceTransaction;

    @Column
    private Currency currency;

    //The actual user that makes the transaction
    @ManyToOne
    private UserProfile user;

    //Description often used for displaying to users for more info
    @Column
    private String description;

}
