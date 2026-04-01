package com.restaurant.repository;

import com.restaurant.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Cart entity.
 * Provides basic CRUD operations for cart management.
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
}
