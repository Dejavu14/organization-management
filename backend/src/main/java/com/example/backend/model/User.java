package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank(message = "Nama is required")
    @Size(max = 100, message = "Nama must be less than 100 characters")
    private String nama;

    @NotBlank(message = "Jabatan is required")
    @Size(max = 100, message = "Jabatan must be less than 100 characters")
    private String jabatan;

    @Size(max = 500, message = "Laporan must be less than 500 characters")
    private String laporan;

    @Size(max = 255, message = "Foto URL must be less than 255 characters")
    private String foto;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Size(max = 100, message = "Email must be less than 100 characters")
    @Column(unique = true, nullable = false)
    private String email; // Tambahkan field email

    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password; // Tambahkan field password

    // Constructor untuk addUser
    public User(String username, String nama, String jabatan, String laporan, String email, String foto, String password) {
        this.username = username;
        this.nama = nama;
        this.jabatan = jabatan;
        this.laporan = laporan;
        this.email = email; // Inisialisasi email
        this.foto = foto;
        this.password = password;
    }

}
