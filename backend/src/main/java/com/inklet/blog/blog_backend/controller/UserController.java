package com.inklet.blog.blog_backend.controller;

import com.inklet.blog.blog_backend.configuration.JwtTokenProvider;
import com.inklet.blog.blog_backend.dto.UserDTO;
import com.inklet.blog.blog_backend.dto.UserProfileDTO;
import com.inklet.blog.blog_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")

public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody UserDTO userDTO) {
        userService.signup(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);//get token from request
        String username = jwtTokenProvider.getUsernameFromToken(token);
        UserProfileDTO userProfileDTO = userService.getUserProfile(username);
        return ResponseEntity.ok(userProfileDTO);
    }


}
