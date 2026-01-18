package com.url.shortner.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

//    here i am using uuid id , but it was supposed to be long;
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
    private String role;

}
