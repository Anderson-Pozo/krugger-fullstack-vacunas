package com.anderson.backend.repositories;

import com.anderson.backend.models.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IEmployeeRepository extends JpaRepository<EmployeeModel, Long> {
    Optional<EmployeeModel> findByIdentificationNumber(String identificationNumber);
}
