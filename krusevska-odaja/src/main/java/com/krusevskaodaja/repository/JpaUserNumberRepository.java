package com.krusevskaodaja.repository;

import com.krusevskaodaja.model.UserPhoneNumber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaUserNumberRepository extends JpaRepository<UserPhoneNumber, String> {
    void deleteAllByUserId(String userId);
}
