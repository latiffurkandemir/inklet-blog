package com.inklet.blog.blog_backend.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "blog")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @ManyToOne(
            cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH}
    )
    @JoinColumn(name = "author_id")
    private User user;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> commentList;

    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    // Lifecycle callback for setting createdAt before the entity is persisted
    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }

    // Lifecycle callback for setting updatedAt before the entity is updated
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public Blog() {

    }

    //for creating a blog
    public Blog(String title, String content, User user) {
        this.title = title;
        this.content = content;
        this.user = user;
    }

    //For updating a Blog
    public Blog(int id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    @Override
    public String toString() {
        return "Blog{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", user=" + user +
                ", commentList=" + commentList +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }


    public void addComment(Comment comment) {
        if (commentList == null) {
            commentList = new ArrayList<>();
        }

        commentList.add(comment);
        comment.setBlog(this);
    }
}
