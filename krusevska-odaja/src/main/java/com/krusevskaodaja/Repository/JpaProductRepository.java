package com.krusevskaodaja.Repository;

import com.krusevskaodaja.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JpaProductRepository extends JpaRepository<Product, String> {
    boolean existsByName(String name);
    boolean existsByType(String type);
}
