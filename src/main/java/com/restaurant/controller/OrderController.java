package com.restaurant.controller;

import com.restaurant.dto.OrderResponse;
import com.restaurant.dto.OrderStatusRequest;
import com.restaurant.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Order operations.
 * Base URL: /order
 */
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    private final OrderService orderService;

    // ─── POST /order/place ─────────────────────────────────────────────────────
    /**
     * Places a new order from the current cart contents.
     * No request body needed — uses items in cart.
     */
    @PostMapping("/place")
    public ResponseEntity<OrderResponse> placeOrder() {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.placeOrder());
    }

    // ─── PUT /order/{id}/status ────────────────────────────────────────────────
    /**
     * Updates the status of an existing order.
     * Request Body: { "status": "DELIVERED" }
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request));
    }

    // ─── GET /order ────────────────────────────────────────────────────────────
    /**
     * Returns a list of all orders.
     */
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // ─── GET /order/{id} ───────────────────────────────────────────────────────
    /**
     * Returns a single order by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }
}
