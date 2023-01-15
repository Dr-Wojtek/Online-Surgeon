package com.portfolio.OnlineAkuten.repositories;

import com.portfolio.OnlineAkuten.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    List<Person> findAllByAgeBetweenOrderByAgeAsc(Integer start, Integer end);
    List<Person> findAllByOrderByAgeDesc();
    List<Person> findAllByOrderByPostalAsc();

}