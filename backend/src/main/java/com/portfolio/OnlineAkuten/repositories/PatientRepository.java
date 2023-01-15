package com.portfolio.OnlineAkuten.repositories;

import com.portfolio.OnlineAkuten.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
        }

