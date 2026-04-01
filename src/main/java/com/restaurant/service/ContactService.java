package com.restaurant.service;

import com.restaurant.dto.ContactRequest;
import com.restaurant.model.Contact;
import com.restaurant.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    /** Save a new contact form submission to MySQL */
    public Contact submitContact(ContactRequest req) {
        Contact contact = Contact.builder()
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .subject(req.getSubject())
                .message(req.getMessage())
                .isRead(false)
                .build();
        return contactRepository.save(contact);
    }

    /** Get all contact submissions (newest first) */
    public List<Contact> getAllContacts() {
        return contactRepository.findAllByOrderBySubmittedAtDesc();
    }

    /** Get unread contact submissions */
    public List<Contact> getUnreadContacts() {
        return contactRepository.findByIsReadFalseOrderBySubmittedAtDesc();
    }

    /** Mark a contact as read */
    public Contact markAsRead(Long id) {
        Contact c = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact #" + id + " not found"));
        c.setIsRead(true);
        return contactRepository.save(c);
    }
}
