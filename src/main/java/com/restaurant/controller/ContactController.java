package com.restaurant.controller;

import com.restaurant.dto.ContactRequest;
import com.restaurant.model.Contact;
import com.restaurant.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for Contact form submissions.
 * Base URL: /contact
 */
@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContactController {

    private final ContactService contactService;

    // ─── POST /contact ─────────────────────────────────────────────────────────
    /** Submit a new contact form — saves to MySQL contacts table */
    @PostMapping
    public ResponseEntity<Contact> submitContact(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.submitContact(request));
    }

    // ─── GET /contact ──────────────────────────────────────────────────────────
    /** Get all contact submissions (admin view) — newest first */
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    // ─── GET /contact/unread ───────────────────────────────────────────────────
    /** Get only unread messages */
    @GetMapping("/unread")
    public ResponseEntity<List<Contact>> getUnreadContacts() {
        return ResponseEntity.ok(contactService.getUnreadContacts());
    }

    // ─── PUT /contact/{id}/read ────────────────────────────────────────────────
    /** Mark a contact message as read */
    @PutMapping("/{id}/read")
    public ResponseEntity<Contact> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }
}
