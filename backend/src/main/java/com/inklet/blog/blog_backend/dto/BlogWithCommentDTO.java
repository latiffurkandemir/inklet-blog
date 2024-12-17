package com.inklet.blog.blog_backend.dto;

import org.springframework.data.domain.Page;

public class BlogWithCommentDTO {


        private String title;
        private String content;
        private String username;
        private Page<CommentDTO> commentList; //The area that paginates comments

        // Getters ve Setters
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public Page<CommentDTO> getCommentList() {
            return commentList;
        }

        public void setCommentList(Page<CommentDTO> commentList) {
            this.commentList= commentList;
        }

}
