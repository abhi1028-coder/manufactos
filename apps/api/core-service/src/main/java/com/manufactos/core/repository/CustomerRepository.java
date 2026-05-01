package com.manufactos.core.repository;

import com.manufactos.core.model.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Page<Customer> findByPlantId(UUID plantId, Pageable pageable);

    List<Customer> findByPlantIdAndIsActiveTrue(UUID plantId);

    Optional<Customer> findByIdAndPlantId(UUID id, UUID plantId);

    boolean existsByGstinAndPlantId(String gstin, UUID plantId);
}
