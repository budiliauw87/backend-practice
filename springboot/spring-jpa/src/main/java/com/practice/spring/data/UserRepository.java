package com.practice.spring.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import com.practice.spring.model.User;


/**
 * Example Simple CRUD using JPA
 * More info visit https://spring.io/projects/spring-data-jpa
 */
public interface UserRepository extends JpaRepository<User, String> {
     List<User> findAll();

     @NativeQuery(value = "SELECT * FROM users WHERE nama LIKE %?1%")
     List<User> findUserByName(String keyword);
}