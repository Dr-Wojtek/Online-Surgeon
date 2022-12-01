package com.portfolio.OnlineSurgeonH2.repositories;

import com.portfolio.OnlineSurgeonH2.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
        }

