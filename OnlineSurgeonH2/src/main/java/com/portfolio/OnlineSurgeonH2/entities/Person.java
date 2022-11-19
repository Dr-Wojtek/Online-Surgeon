package com.portfolio.OnlineSurgeonH2.entities;

import javax.persistence.*;

@Entity
@Table(name="PERSONS")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID")
    private Integer id;
    @Column(nullable = false, name="LASTNAME")
    private String lastName;
    @Column(nullable = false, name="FIRSTNAME")
    private String firstName;
    @Column(name="AGE")
    private Integer age;
    @Column(name="POSTAL")
    private Integer postal;

    public Integer getId(){
        return this.id;
    }

    public String getLastName(){
        return this.lastName;
    }
    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public String getFirstName(){
        return this.firstName;
    }
    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public Integer getAge(){
        return this.age;
    }
    public void setAge(Integer age){
        this.age = age;
    }

    public Integer getPostal(){
        return this.postal;
    }
    public void setPostal(Integer postal){
        this.postal = postal;
    }
}
