package com.anderson.backend.models;

import com.anderson.backend.enums.VaccinationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
public class EmployeeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @NotNull(message = "El número de cédula es obligatorio")
    @Pattern(regexp = "^[0-9]{10}$", message = "El numero de cédula no es correcto")
    @Column(length = 10, unique = true)
    private String identificationNumber;

    @NotNull(message = "Los nombres son obligatorios")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Los nombres deben contener solo letras")
    @Column(length = 60)
    private String firstName;

    @NotNull(message = "Los apellidos son obligatorios")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Los apellidos deben contener solo letras")
    @Column(length = 60)
    private String lastName;

    @NotNull(message = "El correo es obligatorio")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "El correo no es correcto")
    @Column(length = 30)
    private String email;

    @Column(nullable = true)
    private LocalDate dateOfBirth;

    @Column(nullable = true)
    private String address;

    @Column(nullable = true, length = 20)
    private String mobilePhone;

    @Column(nullable = true, length = 15, columnDefinition = "varchar(15) default 'NO_VACUNADO'")
    @Enumerated(EnumType.STRING)
    private VaccinationStatus vaccinationStatus;

    @Column(nullable = true)
    private String vaccineType;

    @Column(nullable = true)
    private LocalDate vaccinationDate;

    @Column(nullable = true)
    private int doseNumber;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserModel user;
}

