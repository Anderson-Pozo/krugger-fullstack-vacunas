package com.anderson.backend.models;

import com.anderson.backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(unique = true, length = 20)
    private String username;

    @Column(length = 120)
    private String fullname;

    @Column()
    private String password;

    @Column(length = 30)
    private String email;

    @Column
    @Enumerated(EnumType.STRING)
    private UserRole role;
}

