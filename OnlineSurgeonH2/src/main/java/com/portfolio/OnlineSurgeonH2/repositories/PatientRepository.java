package com.portfolio.OnlineSurgeonH2.repositories;

import com.portfolio.OnlineSurgeonH2.entities.Patient;
import org.springframework.data.repository.CrudRepository;

public interface PatientRepository extends CrudRepository<Patient, Integer> {
        }

