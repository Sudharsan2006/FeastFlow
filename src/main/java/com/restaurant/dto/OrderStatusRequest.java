package com.restaurant.dto;

import com.restaurant.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO for updating order status.
 */
@Data
public class OrderStatusRequest {

    @NotNull(message = "Order status is required")
    private OrderStatus status;
}
