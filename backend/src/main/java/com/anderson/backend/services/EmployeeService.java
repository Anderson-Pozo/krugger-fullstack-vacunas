package com.anderson.backend.services;

import com.anderson.backend.models.EmployeeModel;
import com.anderson.backend.models.UserModel;
import com.anderson.backend.enums.UserRole;
import com.anderson.backend.repositories.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    IEmployeeRepository employeeRepository;

    @Autowired
    UserService userService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<EmployeeModel> getAllEmployees() {
        return this.employeeRepository.findAll();
    }

    public EmployeeModel createEmployee(EmployeeModel employee) {
        UserModel user = new UserModel();
        user.setEmail(employee.getEmail());
        user.setUsername(employee.getIdentificationNumber());
        user.setFullname(employee.getFirstName() + " " + employee.getLastName());
        user.setPassword(bCryptPasswordEncoder.encode(employee.getIdentificationNumber()));
        user.setRole(UserRole.EMPLEADO);
        UserModel createdUser = this.userService.createUser(user);

        employee.setUser(createdUser);
        return this.employeeRepository.save(employee);
    }

    public Optional<EmployeeModel> getEmployeeById(Long id){
        return this.employeeRepository.findById(id);
    }

    public Optional<EmployeeModel> getEmployeeByDni(String dni){
        return this.employeeRepository.findByIdentificationNumber(dni);
    }

    public EmployeeModel updateEmployee(Long id, EmployeeModel employeeInput){
        EmployeeModel employee = this.employeeRepository.findById(id).get();
        employee.setIdentificationNumber(employeeInput.getIdentificationNumber());
        employee.setFirstName(employeeInput.getFirstName());
        employee.setLastName(employeeInput.getLastName());
        employee.setEmail(employeeInput.getEmail());
        employee.setDateOfBirth(employeeInput.getDateOfBirth());
        employee.setAddress(employeeInput.getAddress());
        employee.setMobilePhone(employeeInput.getMobilePhone());
        employee.setVaccinationStatus(employeeInput.getVaccinationStatus());
        employee.setVaccineType(employeeInput.getVaccineType());
        employee.setVaccinationDate(employeeInput.getVaccinationDate());
        employee.setDoseNumber(employeeInput.getDoseNumber());
        return this.employeeRepository.save(employee);
    }

    public Boolean deleteEmployee(Long id){
        try {
            this.employeeRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
