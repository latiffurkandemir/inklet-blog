package com.inklet.blog.blog_backend.repository;

import com.inklet.blog.blog_backend.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog,Integer> {

}
