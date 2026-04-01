package com.restaurant.model;

import com.restaurant.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * JPA Entity representing a customer Order.
 * An order has a total amount and status lifecycle.
 */
@Entity
@Table(name = "orders")  // 'order' is a reserved SQL keyword — using 'orders'
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Total amount for this order */
    @Column(nullable = false)
    private Double totalAmount;

    /** Current status of the order (PENDING, PREPARING, DELIVERED, CANCELLED) */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    /** Timestamp when order was placed */
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /** Items included in this order (stored as comma-separated names) */
    @Column(columnDefinition = "TEXT")
    private String itemsSummary;

    /** Automatically set creation time before persisting */
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = OrderStatus.PENDING;
        }
    }
}
