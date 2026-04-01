package com.restaurant.controller;

import com.restaurant.dto.MenuRequest;
import com.restaurant.dto.MenuResponse;
import com.restaurant.service.MenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Menu operations.
 * Base URL: /menu
 */
@RestController
@RequestMapping("/menu")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MenuController {

    private final MenuService menuService;

    // ─── GET /menu ─────────────────────────────────────────────────────────────
    /**
     * Returns a list of all menu items.
     */
    @GetMapping
    public ResponseEntity<List<MenuResponse>> getAllMenuItems() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }

    // ─── POST /menu ────────────────────────────────────────────────────────────
    /**
     * Adds a new menu item.
     * Request Body: { "name": "Pizza", "price": 12.99 }
     */
    @PostMapping
    public ResponseEntity<MenuResponse> addMenuItem(@Valid @RequestBody MenuRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(menuService.addMenuItem(request));
    }

    // ─── DELETE /menu/{id} ─────────────────────────────────────────────────────
    /**
     * Deletes a menu item by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.ok("Menu item deleted successfully.");
    }
}
