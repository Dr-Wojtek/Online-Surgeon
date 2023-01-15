package com.portfolio.OnlineAkuten.model;

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

    public Person(){

    }
    public Person(Person person){
        this.id = person.getId();
        this.lastName = person.getLastName();
        this.firstName = person.getFirstName();
        this.age = person.getAge();
        this.postal = person.getPostal();
    }

    public Integer getId(){
        return this.id;
    }
    public void setIdNull() {this.id = null;}

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
