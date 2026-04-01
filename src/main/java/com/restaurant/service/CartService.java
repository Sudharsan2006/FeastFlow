package com.restaurant.service;

import com.restaurant.dto.CartRequest;
import com.restaurant.model.Cart;
import com.restaurant.model.Menu;
import com.restaurant.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service layer for Cart operations.
 * Manages adding items and retrieving cart contents.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartRepository cartRepository;
    private final MenuService menuService;

    // ─── Add to Cart ───────────────────────────────────────────────────────────

    /**
     * Adds a menu item to the cart with specified quantity.
     *
     * @param request contains menuId and quantity
     * @return the persisted Cart entry
     */
    public Cart addToCart(CartRequest request) {
        Menu menu = menuService.getMenuById(request.getMenuId());

        log.info("Adding item '{}' (qty: {}) to cart", menu.getName(), request.getQuantity());

        Cart cartItem = Cart.builder()
                .menu(menu)
                .quantity(request.getQuantity())
                .build();

        return cartRepository.save(cartItem);
    }

    // ─── View Cart ─────────────────────────────────────────────────────────────

    /**
     * Returns all items currently in the cart.
     */
    public List<Cart> viewCart() {
        log.info("Fetching all cart items");
        return cartRepository.findAll();
    }

    // ─── Clear Cart ────────────────────────────────────────────────────────────

    /**
     * Clears all items from the cart after an order is placed.
     */
    public void clearCart() {
        log.info("Clearing cart");
        cartRepository.deleteAll();
    }
}
