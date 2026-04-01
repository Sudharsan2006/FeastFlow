package com.restaurant.service;

import com.restaurant.dto.OrderResponse;
import com.restaurant.dto.OrderStatusRequest;
import com.restaurant.enums.OrderStatus;
import com.restaurant.exception.InvalidOperationException;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.model.Cart;
import com.restaurant.model.Order;
import com.restaurant.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for Order operations.
 * Handles placing orders, status updates, and order retrieval.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;

    // ─── Place Order ───────────────────────────────────────────────────────────

    /**
     * Places an order from current cart items.
     * Calculates total, creates order, and clears the cart.
     *
     * @return the newly created order as a response DTO
     */
    @Transactional
    public OrderResponse placeOrder() {
        List<Cart> cartItems = cartService.viewCart();

        if (cartItems.isEmpty()) {
            throw new InvalidOperationException("Cannot place an order with an empty cart.");
        }

        // Calculate total amount
        double total = cartItems.stream()
                .mapToDouble(item -> item.getMenu().getPrice() * item.getQuantity())
                .sum();

        // Build items summary string
        String summary = cartItems.stream()
                .map(item -> item.getMenu().getName() + " x" + item.getQuantity())
                .collect(Collectors.joining(", "));

        log.info("Placing order with items: {} | Total: {}", summary, total);

        Order order = Order.builder()
                .totalAmount(total)
                .status(OrderStatus.PREPARING)
                .itemsSummary(summary)
                .build();

        Order saved = orderRepository.save(order);

        // Clear cart after successful order
        cartService.clearCart();

        return toResponse(saved);
    }

    // ─── Update Order Status ───────────────────────────────────────────────────

    /**
     * Updates the status of an existing order.
     *
     * @param id      order ID
     * @param request contains new status
     * @return updated order as response DTO
     */
    public OrderResponse updateOrderStatus(Long id, OrderStatusRequest request) {
        Order order = getOrderById(id);

        // Prevent status regression (DELIVERED cannot go back to PREPARING)
        if (order.getStatus() == OrderStatus.DELIVERED || order.getStatus() == OrderStatus.CANCELLED) {
            throw new InvalidOperationException(
                    "Cannot update status of an order that is already " + order.getStatus());
        }

        log.info("Updating order {} status from {} to {}", id, order.getStatus(), request.getStatus());
        order.setStatus(request.getStatus());
        return toResponse(orderRepository.save(order));
    }

    // ─── Get All Orders ────────────────────────────────────────────────────────

    /**
     * Returns all orders from the database.
     */
    public List<OrderResponse> getAllOrders() {
        log.info("Fetching all orders");
        return orderRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ─── Get Order by ID ───────────────────────────────────────────────────────

    /**
     * Returns a single order by ID, or throws 404.
     */
    public OrderResponse getOrder(Long id) {
        return toResponse(getOrderById(id));
    }

    // ─── Internal Helpers ──────────────────────────────────────────────────────

    private Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
    }

    private OrderResponse toResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .itemsSummary(order.getItemsSummary())
                .createdAt(order.getCreatedAt())
                .build();
    }
}
