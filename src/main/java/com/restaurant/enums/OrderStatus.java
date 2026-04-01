package com.restaurant.enums;

/**
 * Enum representing possible order statuses.
 * Using ENUM instead of plain String for type safety.
 */
public enum OrderStatus {
    PENDING,
    PREPARING,
    DELIVERED,
    CANCELLED
}
