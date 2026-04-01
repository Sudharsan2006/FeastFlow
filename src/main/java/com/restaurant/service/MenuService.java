package com.restaurant.service;

import com.restaurant.dto.MenuRequest;
import com.restaurant.dto.MenuResponse;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.model.Menu;
import com.restaurant.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service layer for Menu operations.
 * Contains all business logic related to menu items.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MenuService {

    private final MenuRepository menuRepository;

    // ─── Get All Menu Items ────────────────────────────────────────────────────

    /**
     * Returns a list of all available menu items.
     */
    public List<MenuResponse> getAllMenuItems() {
        log.info("Fetching all menu items");
        return menuRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // ─── Add New Menu Item ─────────────────────────────────────────────────────

    /**
     * Adds a new menu item to the database.
     *
     * @param request DTO with name and price
     * @return saved menu item as response DTO
     */
    public MenuResponse addMenuItem(MenuRequest request) {
        log.info("Adding new menu item: {}", request.getName());

        Menu menu = Menu.builder()
                .name(request.getName())
                .price(request.getPrice())
                .build();

        Menu saved = menuRepository.save(menu);
        return toResponse(saved);
    }

    // ─── Get Single Menu Item ──────────────────────────────────────────────────

    /**
     * Fetches a menu item by its ID or throws 404.
     */
    public Menu getMenuById(Long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + id));
    }

    // ─── Delete Menu Item ──────────────────────────────────────────────────────

    /**
     * Deletes a menu item by ID.
     */
    public void deleteMenuItem(Long id) {
        Menu menu = getMenuById(id);
        log.info("Deleting menu item: {}", menu.getName());
        menuRepository.delete(menu);
    }

    // ─── Mapper: Entity → DTO ──────────────────────────────────────────────────

    private MenuResponse toResponse(Menu menu) {
        return MenuResponse.builder()
                .id(menu.getId())
                .name(menu.getName())
                .price(menu.getPrice())
                .build();
    }
}
