package com.krusevskaodaja.Repository;

import com.krusevskaodaja.Model.TableReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaReservationRepository extends JpaRepository<TableReservation, String> {
    TableReservation findByUserId(String userId);
}
