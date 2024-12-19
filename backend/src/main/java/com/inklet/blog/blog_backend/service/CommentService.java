package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.CommentDTO;
import com.inklet.blog.blog_backend.dto.CreateCommentDTO;
import org.springframework.transaction.annotation.Transactional;

public interface CommentService {

    CreateCommentDTO createComment(CreateCommentDTO commentDTO, String username);

    void deleteCommentById(int id, String username);

    CommentDTO updateCommentById(CommentDTO commentDTO, String username);
}
