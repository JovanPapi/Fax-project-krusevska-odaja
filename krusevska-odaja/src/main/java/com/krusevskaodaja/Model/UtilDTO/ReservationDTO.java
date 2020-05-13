package com.krusevskaodaja.Model.UtilDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {
    private String userId;
    private String userNumber;
    private Integer tableNumber;
    private String date;
    private String time;

}
