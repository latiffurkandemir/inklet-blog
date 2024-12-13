package com.inklet.blog.blog_backend.exception;

public class InputAlreadyExistsException extends RuntimeException {
    public InputAlreadyExistsException(String message) {
        super(message);
    }
}
