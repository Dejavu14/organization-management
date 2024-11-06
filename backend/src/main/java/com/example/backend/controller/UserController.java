package com.example.backend.controller;

import com.example.backend.model.LoginRequest;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/csrf")
    public ResponseEntity<CsrfToken> getCsrfToken(CsrfToken token) {
        return ResponseEntity.ok(token);
    }

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()") // Hanya pengguna yang sudah login yang bisa menambahkan user
    public ResponseEntity<String> addUser(
            @RequestParam("username") String username,
            @RequestParam("nama") String nama,
            @RequestParam("jabatan") String jabatan,
            @RequestParam("laporan") String laporan,
            @RequestParam("email") String email,
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("password") String password) {

        logger.info("Adding user with username: {}", username);

        String fotoUrl = userService.saveFile(foto);
        if (fotoUrl == null) {
            logger.error("Failed to upload file for user: {}", username);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Gagal mengupload foto");
        }

        User user = new User(username, nama, jabatan, laporan, email, fotoUrl, password);
        userService.saveUser(user);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{username}")
                .buildAndExpand(user.getUsername())
                .toUri();

        logger.info("User {} successfully added", username);
        return ResponseEntity.created(location).body("User berhasil ditambahkan");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for user: {}", loginRequest.getUsername());
        boolean authenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (authenticated) {
            logger.info("User {} logged in successfully", loginRequest.getUsername());
            return ResponseEntity.ok("Login berhasil"); // Anda bisa mengembalikan token di sini
        } else {
            logger.warn("Invalid login attempt for user: {}", loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username atau password salah");
        }
    }


    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()") // Memerlukan autentikasi untuk mengambil semua user
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        logger.info("Retrieved {} users", users.size());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()") // Memerlukan autentikasi untuk mengambil user berdasarkan ID
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Ambil sesi saat ini
        if (session != null) {
            session.invalidate(); // Nonaktifkan sesi
        }
        return ResponseEntity.ok("Logout berhasil");
    }


}

