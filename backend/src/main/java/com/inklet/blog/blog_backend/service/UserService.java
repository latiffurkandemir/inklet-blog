package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.UpdatePasswordDTO;
import com.inklet.blog.blog_backend.dto.UserDTO;
import com.inklet.blog.blog_backend.dto.UserProfileDTO;

public interface UserService {
    void signup(UserDTO userDTO);


    UserProfileDTO getUserProfile(String username);

    UserProfileDTO updateUser(String username, UserProfileDTO userProfileDTO);

    void updatePassword(String username, UpdatePasswordDTO updatePasswordDTO);
}
