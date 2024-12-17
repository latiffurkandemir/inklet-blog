package com.inklet.blog.blog_backend.repository;

import com.inklet.blog.blog_backend.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Integer> {
    Page<Comment> findByBlogId(Long blogId, Pageable pageable);
}
