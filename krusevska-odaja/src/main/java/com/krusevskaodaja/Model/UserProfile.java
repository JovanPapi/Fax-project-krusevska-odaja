package com.krusevskaodaja.Model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.*;

@Getter
@Setter
@Entity(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    private String id;

    @Column(nullable = false)
    @Size(max = 40)
    private String name;

    @Column
    @Size(max = 15)
    private String username;

    @Column(nullable = false)
    @Size(max = 25)
    private String email;

    @Column(nullable = false)
    @Size(max = 20)
    private String password;

    @OneToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.REMOVE
            },
            mappedBy = "user")
    @Size(max = 2)
    private List<UserPhoneNumber> phoneNumber;

    @OneToOne(mappedBy = "user",
            cascade = CascadeType.ALL)
    private TableReservation reservation;

    @Column(nullable = false)
    private String role;

    @Column
    private boolean termsChecked;

    /**
     * If the first front-end number is same with any database-users phone number, it returns 3 or 4
     * On the front-end the counter that is returned is decreased by 2
     * so we can detect correctly which phone number is used by any of the users
     */
    public int checkPhoneNumbers(List<UserPhoneNumber> numbers) {
        for (UserPhoneNumber userPhoneNumber : this.phoneNumber) {
            int counter = 3;
            for (UserPhoneNumber number : numbers) {
                if (userPhoneNumber.getPhoneNumber().equals(number.getPhoneNumber())) {
                    return counter;
                }
                counter++;
            }
        }
        return 1;
    }
}
