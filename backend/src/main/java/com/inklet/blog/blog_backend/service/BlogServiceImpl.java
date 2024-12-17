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


    @Override
    @Transactional
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
    public void deleteBlogById(int id, String username) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new InputNotFoundException("Blog not found with id : " + id));

        if (!blog.getUser().getUsername().equals(username)) {
            throw new SecurityException("You are not authorized to delete this blog");
        }

        blogRepository.delete(blog);
    }

    @Override
    @Transactional
    public BlogDTO updateBlogById(int id, BlogDTO blogDTO, String username) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new InputNotFoundException("Blog not found with id : " + id));

        if (!blog.getUser().getUsername().equals(username)) {
            throw new SecurityException("You are not authorized to update this blog");
        }

        blog.setTitle(blogDTO.getTitle());
        blog.setContent(blogDTO.getContent());
        //I could have done these with mapper classes
        Blog updatedBlog = blogRepository.save(blog);
        BlogDTO updatedDTO = new BlogDTO();

        updatedDTO.setTitle(updatedBlog.getTitle());
        updatedDTO.setContent(updatedBlog.getContent());
        return updatedDTO;
    }

    @Override
    public BlogDTO getBlogById(int id, String username) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new InputNotFoundException("Blog not found with id : " + id));

        if ((!blog.getUser().getUsername().equals(username))) {
            throw new SecurityException("You are not authorized to get this blog");
        }

        BlogDTO blogDTO = new BlogDTO();

        blogDTO.setTitle(blog.getTitle());
        blogDTO.setContent(blog.getContent());

        return blogDTO;
    }

}
