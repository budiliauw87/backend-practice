package com.practice.spring.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.spring.data.Response;
import com.practice.spring.data.UserRepository;
import com.practice.spring.model.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepository repository;

	@GetMapping("/users")
	public ResponseEntity<Response<List<User>>> getAllUsers(@RequestParam(required = false) String name) {
		try {
			 List<User> users =  name != null ? repository.findUserByName(name) 
			 					: repository.findAll();
			// repository.findAll().forEach(users::add);
			return new ResponseEntity<>(
					Response.success(
							users, "Ok : " +name,
							true),
					HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(
					Response.error(e.getLocalizedMessage(), null, false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// create user
	@PostMapping("/users")
	public ResponseEntity createUser(@RequestBody(required = false) User user) {
		try {
			if(user == null ){
				return new ResponseEntity<>(
					Response.error( "Silakan input kan nama penguna",
					 null, false),
					HttpStatus.BAD_REQUEST);
			}
			String idUser = UUID.randomUUID().toString();
			// String idUser = String.valueOf(System.currentTimeMillis());
			User entityUser = new User(idUser, user.getName());
			repository.save(entityUser);
			return new ResponseEntity<>(
						Response.success(
							entityUser, "Berhasil menambahkan "+ user.getName(),
								true),
						HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					Response.error(e.getLocalizedMessage(), null, false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//Delete Request
	@DeleteMapping("/users/{id}")
	public ResponseEntity deleteUser(@PathVariable("id") String id) {
		try {
			if(id == null ){
				return new ResponseEntity<>(
					Response.error( "User id required!!",
					 null, false),
					HttpStatus.BAD_REQUEST);
			}
			repository.deleteById(id);
			return new ResponseEntity<>(
						Response.success(
							null, "Berhasil menghapus data ",
								true),
						HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					Response.error(e.getLocalizedMessage(), null, false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//Update user
	@PutMapping("/users/{id}")
	public ResponseEntity deleteUserById(@PathVariable String id, @RequestParam(required = false) String name) {
		try {
			if(id == null ){
				return new ResponseEntity<>(
					Response.error( "user id required!!",
					 null, false),
					HttpStatus.BAD_REQUEST);
			}

			if(name == null ){
				return new ResponseEntity<>(
					Response.error( "new name required!!",
					 null, false),
					HttpStatus.BAD_REQUEST);
			}
			//check exist user by id
			repository.findById(id).orElseThrow();

			repository.save(new User(id, name));
			return new ResponseEntity<>(
						Response.success(
							null, "user data changed!\nName : " + name +"\nId :"+id,
								true),
						HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(
					Response.error(e.getLocalizedMessage(), null, false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
