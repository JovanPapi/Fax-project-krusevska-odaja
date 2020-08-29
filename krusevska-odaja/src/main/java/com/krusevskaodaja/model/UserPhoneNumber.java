package com.krusevskaodaja.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserPhoneNumber {

    @Id
    private String id;

    @Column
    @NotNull
    private String phoneNumber;

    @ManyToOne(
            cascade = CascadeType.ALL)
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserProfile user;
}
