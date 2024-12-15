package com.inklet.blog.blog_backend.service;


import com.inklet.blog.blog_backend.dto.BlogDTO;
import com.inklet.blog.blog_backend.dto.BlogListDTO;

import java.util.List;

public interface BlogService {
    void createBlog(BlogDTO blogDTO, String username);

    List<BlogListDTO> getAllBlogs(String username);
}
