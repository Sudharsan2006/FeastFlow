package com.restaurant.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO for adding an item to the cart.
 * Contains the menu item ID and desired quantity.
 */
@Data
public class CartRequest {

    @NotNull(message = "Menu ID is required")
    private Long menuId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
}
