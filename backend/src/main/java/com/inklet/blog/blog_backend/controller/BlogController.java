package com.inklet.blog.blog_backend.controller;

import com.inklet.blog.blog_backend.configuration.JwtTokenProvider;
import com.inklet.blog.blog_backend.dto.BlogDTO;
import com.inklet.blog.blog_backend.dto.BlogListDTO;
import com.inklet.blog.blog_backend.service.BlogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BlogListDTO>> getAllBlogs(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenProvider.getUsernameFromToken(token);
        List<BlogListDTO> blogs = blogService.getAllBlogs(username);
        return ResponseEntity.ok(blogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable int id, HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenProvider.getUsernameFromToken(token);
        BlogDTO blogDTO = blogService.getBlogById(id,username);
        return new ResponseEntity<>(blogDTO,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBlogById(@PathVariable int id, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenProvider.getUsernameFromToken(token);
        blogService.deleteBlogById(id, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BlogDTO> updateBlogById(@PathVariable int id, @Valid @RequestBody BlogDTO blogDTO, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtTokenProvider.getUsernameFromToken(token);
        BlogDTO updatedDTO = blogService.updateBlogById(id, blogDTO, username);

        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }


}
