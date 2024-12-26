package com.inklet.blog.blog_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BlogBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogBackendApplication.class, args);
    }

//	@Bean
//	public CommandLineRunner helloWorldRunner() {
//		return args -> {
//			System.out.println("Hello, World!");
//		};
//	}

}
