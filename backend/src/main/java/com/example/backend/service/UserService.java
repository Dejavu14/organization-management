package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void saveUser(User user) {
        userRepository.save(user);
        logger.info("User {} saved successfully", user.getUsername());
    }

    public String saveFile(MultipartFile file) {
        try {
            // Menentukan nama file dan path untuk menyimpannya
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.copy(file.getInputStream(), path);
            logger.info("File {} uploaded successfully", fileName);
            return path.toString();
        } catch (IOException e) {
            logger.error("Failed to upload file", e);
            return null;
        }
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Method baru untuk menyimpan pengguna dengan foto
    public User addUser(String username, String nama, String jabatan, String laporan, String email, MultipartFile file, String password) {
        String filePath = saveFile(file);
        User user = new User(username, nama, jabatan, laporan, email, filePath, password); // Tambahkan password ke constructor
        saveUser(user);
        return user;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public boolean authenticate(String username, String password) {
        User user = findByUsername(username);
        if (user != null) {
            boolean isAuthenticated = user.getPassword().equals(password);
            logger.info("Authentication attempt for user {}: {}", username, isAuthenticated);
            return isAuthenticated;
        }
        logger.warn("User {} not found", username);
        return false;
    }

}
