package com.inklet.blog.blog_backend.repository;

import com.inklet.blog.blog_backend.entity.Blog;
import com.inklet.blog.blog_backend.dto.BlogListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {


    @Query("SELECT new com.inklet.blog.blog_backend.dto.BlogListDTO(b.id, b.title, b.content) FROM Blog b WHERE b.user.username = :username")
    List<BlogListDTO> findBlogsByUsername(String username);


}
