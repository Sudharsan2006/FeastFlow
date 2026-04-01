package com.restaurant.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

/**
 * DTO for creating or updating a Menu item.
 * Separates API request from the entity model.
 */
@Data
public class MenuRequest {

    @NotBlank(message = "Menu item name is required")
    private String name;

    @Positive(message = "Price must be greater than 0")
    private Double price;
}
