package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.BlogDTO;
import com.inklet.blog.blog_backend.entity.Blog;
import com.inklet.blog.blog_backend.dto.BlogListDTO;
import com.inklet.blog.blog_backend.entity.User;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.repository.BlogRepository;
import com.inklet.blog.blog_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogServiceImpl(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public void createBlog(BlogDTO blogDTO, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InputNotFoundException("User '" + username + "' not found"));

        Blog blog = new Blog();
        blog.setTitle(blogDTO.getTitle());
        blog.setContent(blogDTO.getContent());

        // Add user's blog list
        user.addBlog(blog);

        blogRepository.save(blog);
    }

    @Override
    public List<BlogListDTO> getAllBlogs(String username) {
        List<BlogListDTO> blogListDTO = blogRepository.findBlogsByUsername(username);
        if (blogListDTO == null) {
            return null;
        }

        return blogListDTO;
    }

    @Override
    @Transactional
    public void deleteBlog(int id, String username) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new InputNotFoundException("Blog not found with id : " + id));

        if (!blog.getUser().getUsername().equals(username)){
            throw new SecurityException("You are not authorized to delete this blog");
        }

        blogRepository.delete(blog);
    }

}
