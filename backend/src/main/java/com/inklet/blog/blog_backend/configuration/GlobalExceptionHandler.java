package com.inklet.blog.blog_backend.configuration;

import com.inklet.blog.blog_backend.exception.InputAlreadyExistsException;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.exception.InvalidDataException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InputAlreadyExistsException.class)
    public ResponseEntity<String> handleInputAlreadyExistsException(InputAlreadyExistsException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InputNotFoundException.class)
    public ResponseEntity<String> handleInputNotFoundException(InputNotFoundException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<String> handleInvalidDataException(InvalidDataException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}
