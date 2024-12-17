package com.inklet.blog.blog_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdatePasswordDTO {

    @NotBlank(message = "Current password cannot be empty")
    private String currentPassword;

    @NotBlank(message = "New password cannot be empty")
    @Size(min = 6, message = "New password must be at least 6 characters")
    private String newPassword;


    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
