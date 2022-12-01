package com.portfolio.OnlineSurgeonH2.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="PATIENTS")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private Integer id;
    @Column(nullable = false, name="PERSON_ID")
    @Getter
    @Setter
    private Integer personId;

    @Column(nullable = false, name="PATHOSIS_ID")
    @Getter
    @Setter
    private Integer pathosisId;
    @Column(name="CURED", columnDefinition="boolean default false")
    @Getter
    @Setter
    private boolean cured = false;
    @Getter
    private String pathosisName;
    @Getter
    private String fullName;

    public Patient(){
    }

    public Patient(Patient patient){
        this.id = patient.getId();
        this.personId = patient.getPersonId();
        this.pathosisId = patient.getPathosisId();
        this.cured = patient.isCured();
    }

    public Patient(Integer personId, Integer pathosisId){
        this.personId = personId;
        this.pathosisId = pathosisId;
    }
    public void setPathosisName(String name){
        this.pathosisName = name;
    }
    public void setFullName(String name){
        this.fullName = name;
    }

}
