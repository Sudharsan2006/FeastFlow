package com.restaurant.controller;

import com.restaurant.dto.CartRequest;
import com.restaurant.model.Cart;
import com.restaurant.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    /** POST /cart  — add item (frontend sends {menuItemId, quantity}) */
    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody Map<String, Object> body) {
        CartRequest req = new CartRequest();
        // Accept both "menuItemId" (frontend) and "menuId" (legacy)
        Object id = body.getOrDefault("menuItemId", body.get("menuId"));
        Object qty = body.getOrDefault("quantity", 1);
        req.setMenuId(Long.valueOf(id.toString()));
        req.setQuantity(Integer.valueOf(qty.toString()));
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addToCart(req));
    }

    /** GET /cart  — view all cart items */
    @GetMapping
    public ResponseEntity<List<Cart>> viewCart() {
        return ResponseEntity.ok(cartService.viewCart());
    }

    /** PUT /cart/{id}  — update quantity */
    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        int quantity = Integer.parseInt(body.getOrDefault("quantity", 1).toString());
        return ResponseEntity.ok(cartService.updateCartItem(id, quantity));
    }

    /** DELETE /cart/{id}  — remove single item */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable Long id) {
        cartService.removeCartItem(id);
        return ResponseEntity.noContent().build();
    }

    /** DELETE /cart  — clear entire cart */
    @DeleteMapping
    public ResponseEntity<String> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok("Cart cleared");
    }
}
