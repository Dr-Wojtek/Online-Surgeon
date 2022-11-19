package com.portfolio.OnlineSurgeonH2.repositories;

import com.portfolio.OnlineSurgeonH2.entities.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Integer>{
    Iterable<Person> findAllByAgeBetweenOrderByAgeAsc(Integer start, Integer end);
    Iterable<Person> findAllByOrderByAgeDesc();
    Iterable<Person> findAllByOrderByPostalAsc();

}