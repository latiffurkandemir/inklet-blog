package com.inklet.blog.blog_backend.exception;

public class InputNotFoundException extends RuntimeException{
    public InputNotFoundException(String message) {
        super(message);
    }
}
