package com.inklet.blog.blog_backend.service;


import com.inklet.blog.blog_backend.dto.BlogDTO;

public interface BlogService {
    void createBlog(BlogDTO blogDTO, String username);
}
