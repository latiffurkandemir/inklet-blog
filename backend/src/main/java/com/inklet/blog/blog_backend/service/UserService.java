package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.UserDTO;
import com.inklet.blog.blog_backend.dto.UserProfileDTO;

public interface UserService {
    void signup(UserDTO userDTO);


    UserProfileDTO getUserProfile(String username);
}
