package com.krusevskaodaja.Service;

import com.krusevskaodaja.Model.TableReservation;
import com.krusevskaodaja.Model.UserProfile;
import com.krusevskaodaja.Model.UtilDTO.ReservationDTO;

import java.util.List;

public interface ReservationService {
    UserProfile createReservation(ReservationDTO newReservation);

    List<TableReservation> fetchAllReservations();

    boolean deleteReservation(String id);
}
