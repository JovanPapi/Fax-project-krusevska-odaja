package com.krusevskaodaja.model.UtilDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
