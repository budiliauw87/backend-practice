package com.practice.spring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String id;

    @Column(name = "nama")
    private String name;

    public User(){}
    public User(String id, String name){
        this.id = id;
        this.name = name;
        // this.createdAt = dateAt;
    }

    public void setId(String id){
        this.id=id;
    }

    public String getId(){ 
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }
    //printed 
    @Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + "]";
	}
}
