package com.krusevskaodaja.service;

import com.krusevskaodaja.model.TableReservation;
import com.krusevskaodaja.model.UserProfile;
import com.krusevskaodaja.model.UtilDTO.ReservationDTO;

import java.util.List;

public interface ReservationService {
    UserProfile createReservation(ReservationDTO newReservation);

    List<TableReservation> fetchAllReservations();

    boolean deleteReservation(String id);
}
