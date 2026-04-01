package com.restaurant.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

/**
 * JPA Entity representing a Menu item.
 * Each menu item has a name and price.
 */
@Entity
@Table(name = "menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the menu item (cannot be blank) */
    @NotBlank(message = "Menu item name cannot be blank")
    @Column(nullable = false)
    private String name;

    /** Price of the menu item (must be > 0) */
    @Positive(message = "Price must be greater than 0")
    @Column(nullable = false)
    private Double price;
}
