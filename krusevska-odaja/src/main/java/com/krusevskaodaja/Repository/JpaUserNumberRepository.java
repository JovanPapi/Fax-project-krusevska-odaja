package com.krusevskaodaja.Repository;

import com.krusevskaodaja.Model.UserPhoneNumber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaUserNumberRepository extends JpaRepository<UserPhoneNumber, String> {
    void deleteAllByUserId(String userId);
}
