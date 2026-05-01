package com.manufactos.core.controller;

import com.manufactos.core.model.entity.Customer;
import com.manufactos.core.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    /**
     * GET /api/customers?plantId=<uuid>&page=0&size=20
     */
    @GetMapping
    public ResponseEntity<Page<Customer>> list(
            @RequestParam UUID plantId,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(customerService.listByPlant(plantId, pageable));
    }

    /**
     * GET /api/customers/{id}?plantId=<uuid>
     */
    @GetMapping("/{id}")
    public ResponseEntity<Customer> get(
            @PathVariable UUID id,
            @RequestParam UUID plantId) {
        return ResponseEntity.ok(customerService.getById(id, plantId));
    }

    /**
     * POST /api/customers
     */
    @PostMapping
    public ResponseEntity<Customer> create(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.create(customer));
    }

    /**
     * PATCH /api/customers/{id}?plantId=<uuid>
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Customer> update(
            @PathVariable UUID id,
            @RequestParam UUID plantId,
            @RequestBody Customer patch) {
        return ResponseEntity.ok(customerService.update(id, plantId, patch));
    }

    /**
     * DELETE /api/customers/{id}?plantId=<uuid>
     * Soft-deletes (sets isActive=false).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivate(
            @PathVariable UUID id,
            @RequestParam UUID plantId) {
        customerService.deactivate(id, plantId);
        return ResponseEntity.noContent().build();
    }
}
