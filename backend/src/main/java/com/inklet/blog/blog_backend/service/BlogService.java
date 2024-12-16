package com.inklet.blog.blog_backend.service;


import com.inklet.blog.blog_backend.dto.BlogDTO;
import com.inklet.blog.blog_backend.dto.BlogListDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface BlogService {
    void createBlog(BlogDTO blogDTO, String username);

    List<BlogListDTO> getAllBlogs(String username);

    void deleteBlog(int id, String username);

    BlogDTO updateBlog(int id, BlogDTO blogDTO, String username);
}
