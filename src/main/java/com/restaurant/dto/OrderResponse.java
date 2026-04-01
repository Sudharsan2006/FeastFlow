package com.restaurant.dto;

import com.restaurant.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for returning Order data in API responses.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Double totalAmount;
    private OrderStatus status;
    private String itemsSummary;
    private LocalDateTime createdAt;
}
