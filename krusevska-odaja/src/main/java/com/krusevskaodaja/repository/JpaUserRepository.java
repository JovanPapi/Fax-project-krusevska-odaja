package com.krusevskaodaja.repository;

import com.krusevskaodaja.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaUserRepository extends JpaRepository<UserProfile, String> {

    Optional<UserProfile> findByEmail(String email);

    Optional<UserProfile> findByUsernameOrEmail(String username, String email);

    List<UserProfile> findByIdIn(List<Long> userIds);

    Optional<UserProfile> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
