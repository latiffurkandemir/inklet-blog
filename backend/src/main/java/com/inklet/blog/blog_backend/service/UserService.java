package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.LoginDTO;
import com.inklet.blog.blog_backend.dto.UserDTO;
import com.inklet.blog.blog_backend.entity.User;
import com.inklet.blog.blog_backend.exception.InputAlreadyExistsException;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new InputAlreadyExistsException("Username '" + userDTO.getUsername() + "' already exists.");
        }
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new InputAlreadyExistsException("Email '" + userDTO.getEmail() + "' already exists");
        }

        User user = new User(
                userDTO.getUsername(),
                userDTO.getNickname(),
                userDTO.getEmail(),
                passwordEncoder.encode(userDTO.getPassword())
        );
        userRepository.save(user);
    }


}
