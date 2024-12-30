package com.practice.spring.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.spring.data.Response;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class NoTFoundController implements ErrorController {
    
    @RequestMapping("/error")
    public ResponseEntity<Response> handleError(HttpServletRequest request) {        
        return new ResponseEntity<>(
            Response.error("Something when Wrong!!",null,false),
            HttpStatus.NOT_FOUND);
    }
    
}
