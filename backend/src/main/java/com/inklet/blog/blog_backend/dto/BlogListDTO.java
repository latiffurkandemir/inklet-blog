package com.inklet.blog.blog_backend.dto;

public class BlogListDTO {
    private final Long id; // Blog ID
    private final String title;
    private final String content;

    public BlogListDTO(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public Long getId() {
        return id;
    }


    public String getTitle() {
        return title;
    }


    public String getContent() {
        return content;
    }


}
