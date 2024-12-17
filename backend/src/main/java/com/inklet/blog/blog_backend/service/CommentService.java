package com.inklet.blog.blog_backend.service;

import com.inklet.blog.blog_backend.dto.CreateCommentDTO;
import org.springframework.transaction.annotation.Transactional;

public interface CommentService {

    CreateCommentDTO createComment(CreateCommentDTO commentDTO, String username);
}
