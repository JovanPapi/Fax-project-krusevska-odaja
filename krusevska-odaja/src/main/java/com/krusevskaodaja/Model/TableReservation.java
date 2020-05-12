package com.krusevskaodaja.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Data
@Entity(name = "reservation")
@AllArgsConstructor
@NoArgsConstructor
public class TableReservation {
    @Id
    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private int tableNumber;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private String userNumber;

    @Column
    private LocalTime restrictionTime;

    @OneToOne
    @JsonIgnore
    private UserProfile user;
}
