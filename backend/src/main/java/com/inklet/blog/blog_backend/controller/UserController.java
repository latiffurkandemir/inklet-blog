package com.inklet.blog.blog_backend.controller;

import com.inklet.blog.blog_backend.dto.UserDTO;
import com.inklet.blog.blog_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@Valid @RequestBody UserDTO userDTO) {
        userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

//    @GetMapping("/signup")
//    public ResponseEntity<String> getSignupInfo() {
//        return ResponseEntity.ok("Use POST method to sign up.");
//    }


}
