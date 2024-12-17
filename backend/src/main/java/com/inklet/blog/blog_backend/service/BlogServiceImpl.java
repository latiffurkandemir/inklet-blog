package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.BlogDTO;
import com.inklet.blog.blog_backend.dto.BlogWithCommentDTO;
import com.inklet.blog.blog_backend.dto.CommentDTO;
import com.inklet.blog.blog_backend.entity.Blog;
import com.inklet.blog.blog_backend.dto.BlogListDTO;
import com.inklet.blog.blog_backend.entity.Comment;
import com.inklet.blog.blog_backend.entity.User;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.repository.BlogRepository;
import com.inklet.blog.blog_backend.repository.CommentRepository;
import com.inklet.blog.blog_backend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;


    public BlogServiceImpl(BlogRepository blogRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
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
    public BlogWithCommentDTO getBlogWithComments(Long id, int page, int size) {
        // Fetch the blog from the database
        Blog blog = blogRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new InputNotFoundException("Blog not found with id: " + id));

        // Fetch paginated comments
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Comment> commentPage = commentRepository.findByBlogId(id, pageable);

        // Create BlogDTO and set fields
        BlogWithCommentDTO blogWithCommentDTO = new BlogWithCommentDTO();
        blogWithCommentDTO.setTitle(blog.getTitle());
        blogWithCommentDTO.setContent(blog.getContent());
        blogWithCommentDTO.setUsername(blog.getUser().getUsername());

        // Convert Comment Page to DTO and add to the response
        Page<CommentDTO> commentDTOPage = commentPage.map(comment -> new CommentDTO(
                Math.toIntExact(comment.getId()),
                comment.getContent(),
                comment.getUser().getUsername()
        ));
        blogWithCommentDTO.setCommentList(commentDTOPage);

        return blogWithCommentDTO;
    }


}
