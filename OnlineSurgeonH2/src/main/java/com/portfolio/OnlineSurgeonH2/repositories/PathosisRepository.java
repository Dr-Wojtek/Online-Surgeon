package com.portfolio.OnlineSurgeonH2.repositories;

import com.portfolio.OnlineSurgeonH2.entities.Pathosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PathosisRepository extends JpaRepository<Pathosis, Integer>{

}
