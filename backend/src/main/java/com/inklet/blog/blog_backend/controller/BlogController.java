package com.inklet.blog.blog_backend.controller;

import com.inklet.blog.blog_backend.configuration.JwtTokenProvider;
import com.inklet.blog.blog_backend.dto.BlogDTO;
import com.inklet.blog.blog_backend.service.BlogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/blogs")
public class BlogController {

    private final BlogService blogService;
    private final JwtTokenProvider jwtTokenProvider;

    public BlogController(BlogService blogService, JwtTokenProvider jwtTokenProvider) {
        this.blogService = blogService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createBlog(@Valid @RequestBody BlogDTO blogDTO, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);//get token from request
        String username = jwtTokenProvider.getUsernameFromToken(token);
        blogService.createBlog(blogDTO, username);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
