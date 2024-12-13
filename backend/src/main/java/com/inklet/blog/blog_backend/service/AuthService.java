package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.configuration.JwtTokenProvider;
import com.inklet.blog.blog_backend.dto.LoginDTO;
import com.inklet.blog.blog_backend.entity.User;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.exception.InvalidDataException;
import com.inklet.blog.blog_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;


    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public String login(LoginDTO loginDTO) {
        Optional<User> user = userRepository.findByUsername(loginDTO.getUsername());

        if (user.isEmpty()) {
            throw new InputNotFoundException("Username '" + loginDTO.getUsername() + "is not found");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(),user.get().getPassword())){
            throw new InvalidDataException("Invalid password or username");
        }

        return jwtTokenProvider.generateToken(user.get().getUsername());
    }
}
