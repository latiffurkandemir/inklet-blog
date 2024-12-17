package com.inklet.blog.blog_backend.service;


import com.inklet.blog.blog_backend.dto.BlogDTO;
import com.inklet.blog.blog_backend.dto.BlogListDTO;
import com.inklet.blog.blog_backend.dto.BlogWithCommentDTO;

import java.util.List;

public interface BlogService {
    void createBlog(BlogDTO blogDTO, String username);

    List<BlogListDTO> getAllBlogs(String username);

    void deleteBlogById(int id, String username);

    BlogDTO updateBlogById(int id, BlogDTO blogDTO, String username);

    BlogWithCommentDTO getBlogWithComments(Long id, int page, int size);
}
