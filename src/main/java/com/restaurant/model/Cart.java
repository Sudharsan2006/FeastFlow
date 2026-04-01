package com.restaurant.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * JPA Entity representing a Cart item.
 * A cart holds a reference to a Menu item and quantity.
 * Cart is session-based but persisted for tracking.
 */
@Entity
@Table(name = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Reference to the menu item added to cart */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    /** Quantity of the menu item */
    @Column(nullable = false)
    private Integer quantity;

    /** Timestamp when item was added to cart */
    @Column(nullable = false, updatable = false)
    private LocalDateTime addedAt;

    /** Set addedAt before persisting */
    @PrePersist
    public void prePersist() {
        this.addedAt = LocalDateTime.now();
    }
}
