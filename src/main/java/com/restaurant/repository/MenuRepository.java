package com.restaurant.repository;

import com.restaurant.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Menu entity.
 * JpaRepository provides built-in CRUD operations.
 */
@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    /** Find menu items by name (case-insensitive) */
    List<Menu> findByNameContainingIgnoreCase(String name);
}
