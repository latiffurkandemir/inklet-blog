package com.inklet.blog.blog_backend.dto;

public class CommentDTO {
    private int id;
    private String content;
    private String username;

    // Constructor
    public CommentDTO(int id, String content, String username) {
        this.id = id;
        this.content = content;
        this.username = username;
    }

    // Getters ve Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
