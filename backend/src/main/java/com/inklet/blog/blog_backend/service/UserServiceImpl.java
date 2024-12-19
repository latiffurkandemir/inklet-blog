package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.UpdatePasswordDTO;
import com.inklet.blog.blog_backend.dto.UserDTO;
import com.inklet.blog.blog_backend.dto.UserProfileDTO;
import com.inklet.blog.blog_backend.entity.User;
import com.inklet.blog.blog_backend.exception.InputAlreadyExistsException;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void signup(UserDTO userDTO) {
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

    @Override
    public UserProfileDTO getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InputNotFoundException("User '" + username + "' not found"));

        final UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setEmail(user.getEmail());
        userProfileDTO.setUsername(user.getUsername());
        userProfileDTO.setNickname(user.getNickname());
        return userProfileDTO;
    }

    @Override
    @Transactional
    public UserProfileDTO updateUser(String username, UserProfileDTO userProfileDTO) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InputNotFoundException("User '" + username + "' not found"));


        if (userProfileDTO.getNickname() != null && !userProfileDTO.getNickname().equals(user.getNickname())) {
            user.setNickname(userProfileDTO.getNickname());
        }

        if (userProfileDTO.getUsername() != null && !userProfileDTO.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(userProfileDTO.getUsername())) {
                throw new InputAlreadyExistsException("Username '" + userProfileDTO.getUsername() + "' already taken.");
            }
            user.setUsername(userProfileDTO.getUsername());
        }


        if (userProfileDTO.getEmail() != null && !userProfileDTO.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userProfileDTO.getEmail())) {
                throw new InputAlreadyExistsException("There is a user that has '" + userProfileDTO.getEmail() + "'.");
            }

            user.setEmail(userProfileDTO.getEmail());

        }

        User savedUser = userRepository.save(user);

        UserProfileDTO updatedDTO = new UserProfileDTO();

        updatedDTO.setUsername(savedUser.getUsername());
        updatedDTO.setNickname(savedUser.getNickname());
        updatedDTO.setEmail(savedUser.getEmail());

        return updatedDTO;
    }

    @Override
    @Transactional
    public void updatePassword(String username, UpdatePasswordDTO updatePasswordDTO) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InputNotFoundException("User '" + username + "' not found"));

        if (!passwordEncoder.matches(updatePasswordDTO.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current Password is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
        userRepository.save(user);
    }


}
