package com.restaurant.exception;

/**
 * Thrown when an invalid operation is attempted
 * (e.g., adding items to a completed order).
 */
public class InvalidOperationException extends RuntimeException {

    public InvalidOperationException(String message) {
        super(message);
    }
}
