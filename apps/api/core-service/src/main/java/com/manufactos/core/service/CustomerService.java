package com.manufactos.core.service;

import com.manufactos.core.model.entity.Customer;
import com.manufactos.core.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomerService {

    private final CustomerRepository customerRepository;

    public Page<Customer> listByPlant(UUID plantId, Pageable pageable) {
        return customerRepository.findByPlantId(plantId, pageable);
    }

    public Customer getById(UUID id, UUID plantId) {
        return customerRepository.findByIdAndPlantId(id, plantId)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException(
                        "Customer not found: " + id));
    }

    @Transactional
    public Customer create(Customer customer) {
        if (customer.getGstin() != null &&
            customerRepository.existsByGstinAndPlantId(customer.getGstin(), customer.getPlant().getId())) {
            throw new IllegalArgumentException("GSTIN already registered for this plant");
        }
        return customerRepository.save(customer);
    }

    @Transactional
    public Customer update(UUID id, UUID plantId, Customer patch) {
        Customer existing = getById(id, plantId);
        if (patch.getName() != null)    existing.setName(patch.getName());
        if (patch.getPhone() != null)   existing.setPhone(patch.getPhone());
        if (patch.getEmail() != null)   existing.setEmail(patch.getEmail());
        if (patch.getAddress() != null) existing.setAddress(patch.getAddress());
        if (patch.getCreditLimit() != null) existing.setCreditLimit(patch.getCreditLimit());
        return customerRepository.save(existing);
    }

    @Transactional
    public void deactivate(UUID id, UUID plantId) {
        Customer customer = getById(id, plantId);
        customer.setIsActive(false);
        customerRepository.save(customer);
    }
}
