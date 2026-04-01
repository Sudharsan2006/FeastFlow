package com.restaurant.repository;

import com.restaurant.enums.OrderStatus;
import com.restaurant.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Order entity.
 * Provides CRUD + query methods for orders.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /** Find all orders by their current status */
    List<Order> findByStatus(OrderStatus status);
}
