package com.anderson.backend.controllers;

import com.anderson.backend.models.EmployeeModel;
import com.anderson.backend.services.EmployeeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Validated
@RequestMapping("/employee")
@Tag(name = "Empleados")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<EmployeeModel> getAllEmployees(){
        return this.employeeService.getAllEmployees();
    }

    @GetMapping(path = "/{dni}")
    public Optional<EmployeeModel> getEmployeeById(@PathVariable("dni") String dni){
        return this.employeeService.getEmployeeByDni(dni);
    }

    @PostMapping
    public ResponseEntity<EmployeeModel> createEmployee(@Valid @RequestBody EmployeeModel employee){
        return ResponseEntity.ok(this.employeeService.createEmployee(employee));
    }

    @PutMapping
    public EmployeeModel updateEmployee(@RequestBody EmployeeModel employeeInput){
        return this.employeeService.updateEmployee(employeeInput.getId(), employeeInput);
    }

    @DeleteMapping(path = "/{id}")
    public Boolean deleteEmployee(@PathVariable("id") Long id){
        return this.employeeService.deleteEmployee(id);
    }
}
