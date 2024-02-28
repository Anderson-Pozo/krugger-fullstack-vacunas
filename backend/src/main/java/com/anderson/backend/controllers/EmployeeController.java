package com.anderson.backend.controllers;

import com.anderson.backend.models.EmployeeModel;
import com.anderson.backend.services.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Validated
@RequestMapping("/employee")
@CrossOrigin("*")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<EmployeeModel> getAllEmployees(){
        return this.employeeService.getAllEmployees();
    }

    @GetMapping(path = "/{id}")
    public Optional<EmployeeModel> getEmployeeById(@PathVariable("id") Long id){
        return this.employeeService.getEmployeeById(id);
    }

    @PostMapping
    public ResponseEntity<EmployeeModel> createEmployee(@Valid @RequestBody EmployeeModel employee){
        return ResponseEntity.ok(this.employeeService.createEmployee(employee));
    }

    @PutMapping(path = "/{id}")
    public EmployeeModel updateEmployee(@PathVariable("id") Long id, @RequestBody EmployeeModel employeeInput){
        return this.employeeService.updateEmployee(id, employeeInput);
    }

    @DeleteMapping(path = "/{id}")
    public Boolean deleteEmployee(@PathVariable("id") Long id){
        return this.employeeService.deleteEmployee(id);
    }
}
