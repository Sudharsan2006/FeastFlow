package com.restaurant.controller;

import com.restaurant.dto.CartRequest;
import com.restaurant.model.Cart;
import com.restaurant.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * REST Controller for Cart operations.
 * Base URL: /cart
 */
@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class CartController {

    private final CartService cartService;

    // ─── POST /cart/add ────────────────────────────────────────────────────────
    /**
     * Adds a menu item to the cart.
     * Request Body: { "menuId": 1, "quantity": 2 }
     */
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@Valid @RequestBody CartRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addToCart(request));
    }

    // ─── GET /cart ─────────────────────────────────────────────────────────────
    /**
     * Returns all items currently in the cart.
     */
    @GetMapping
    public ResponseEntity<List<Cart>> viewCart() {
        return ResponseEntity.ok(cartService.viewCart());
    }

    // ─── DELETE /cart/clear ────────────────────────────────────────────────────
    /**
     * Clears all items from the cart.
     */
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok("Cart cleared successfully.");
    }
}
