package com.krusevskaodaja.repository;

import com.krusevskaodaja.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaProductRepository extends JpaRepository<Product, String> {
    boolean existsByName(String name);
    boolean existsByType(String type);
}
