package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.CreateCommentDTO;
import com.inklet.blog.blog_backend.entity.Blog;
import com.inklet.blog.blog_backend.entity.Comment;
import com.inklet.blog.blog_backend.entity.User;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.exception.InvalidDataException;
import com.inklet.blog.blog_backend.repository.BlogRepository;
import com.inklet.blog.blog_backend.repository.CommentRepository;
import com.inklet.blog.blog_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BlogRepository blogRepository;

    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, BlogRepository blogRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
    }

    @Override
    @Transactional
    public CreateCommentDTO createComment(CreateCommentDTO commentDTO, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InputNotFoundException("User '" + username + "' not found"));

        Blog blog = blogRepository.findById(commentDTO.getBlogId())
                .orElseThrow(() -> new InputNotFoundException("Blog has not been found"));

        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setBlog(blog);
        comment.setUser(user);
        blog.addComment(comment);

        Comment savedComment = commentRepository.save(comment);

        CreateCommentDTO createCommentDTO = new CreateCommentDTO();
        createCommentDTO.setBlogId(savedComment.getBlog().getId().intValue());
        createCommentDTO.setContent(savedComment.getContent());
        return createCommentDTO;

    }

    @Override
    @Transactional
    public void deleteCommentById(int id, String username) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new InputNotFoundException("Comment not found with id: " + id));
        if (!comment.getUser().getUsername().equals(username)) {
            throw new InvalidDataException("You are not authorized to do this");
        }

        comment.setUser(null);
        comment.setBlog(null);

        commentRepository.delete(comment);
    }


}
