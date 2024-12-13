package com.inklet.blog.blog_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class UserDTO {
    @NotBlank(message = "Username cannot be empty")
    private String username;
    @NotBlank(message = "Nickname cannot be empty")
    private String nickname;
    @NotBlank(message = "Email cannot be empty")
    private String email;
    @NotBlank(message = "Password cannot be empty")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
