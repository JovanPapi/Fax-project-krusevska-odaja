package com.krusevskaodaja.repository;

import com.krusevskaodaja.model.TableReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaReservationRepository extends JpaRepository<TableReservation, String> {
    TableReservation findByUserId(String userId);
}
