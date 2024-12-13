package com.inklet.blog.blog_backend.configuration;

import com.inklet.blog.blog_backend.exception.InputAlreadyExistsException;
import com.inklet.blog.blog_backend.exception.InputNotFoundException;
import com.inklet.blog.blog_backend.exception.InvalidDataException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
