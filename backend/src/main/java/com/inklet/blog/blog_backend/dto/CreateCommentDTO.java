package com.inklet.blog.blog_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateCommentDTO {
    @NotBlank(message = "Comment cannot be empty")
    private String content;
    private int blogId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getBlogId() {
        return blogId;
    }

    public void setBlogId(int blogId) {
        this.blogId = blogId;
    }
}

