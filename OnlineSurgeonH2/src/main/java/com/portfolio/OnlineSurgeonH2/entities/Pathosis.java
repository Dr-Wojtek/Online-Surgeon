package com.portfolio.OnlineSurgeonH2.entities;

import javax.persistence.*;
@Entity
@Table(name="PATHOSIS")
public class Pathosis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name="NAME")
    private String name;

    @Column(nullable = false, name="SYMPTOM_ONE")
    private String symptomOne;

    @Column(name="SYMPTOM_TWO")
    private String symptomTwo;

    @Column(name="SYMPTOM_THREE")
    private String symptomThree;

    @Column(nullable = false, name="MORTALITY")
    private Integer mortality;

    public Pathosis(){
    }

    public Pathosis(Pathosis pathosis){
        this.id = pathosis.getId();
        this.name = pathosis.getName();
        this.symptomOne = pathosis.getSymptomOne();
        this.symptomTwo = pathosis.getSymptomTwo();
        this.symptomThree = pathosis.getSymptomThree();
        this.mortality = pathosis.getMortality();
    }

    public Pathosis(String name, String symptomOne, String symptomeTwo, String symptomThree, Integer mortality){
        this.name = name;
        this.symptomOne = symptomOne;
        this.symptomTwo = symptomeTwo;
        this.symptomThree = symptomThree;
        this.mortality = mortality;
    }

    public Integer getId() {
        return this.id;
    }
    public void setId(Integer id){
        this.id = id;
    }
    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getSymptomOne(){
        return this.symptomOne;
    }
    public void setSymptomOne(String symptom){
        this.symptomOne = symptom;
    }
    public String getSymptomTwo(){
        return this.symptomTwo;
    }
    public void setSymptomTwo(String symptom){
        this.symptomTwo = symptom;
    }
    public String getSymptomThree(){
        return this.symptomThree;
    }
    public void setSymptomThree(String symptom){
        this.symptomThree = symptom;
    }
    public Integer getMortality(){
        return this.mortality;
    }
    public void setMortality(Integer mortality){
        this.mortality = mortality;
    }

}

