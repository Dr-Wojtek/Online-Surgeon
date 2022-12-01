package com.portfolio.OnlineSurgeonH2.controller;

import com.portfolio.OnlineSurgeonH2.repositories.PathosisRepository;
import com.portfolio.OnlineSurgeonH2.repositories.PersonRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import java.io.File;
import java.nio.file.Files;


import static org.hamcrest.Matchers.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
public class OnlineSurgeonControllerTest {

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private PathosisRepository pathosisRepository;
    @Autowired
    private MockMvc mockMvc;

    //*** SECURITY TESTS ***
    //Testing GET without authentication, expecting 401:
    @Test
    void getAllPersonsWithoutAuthentication() throws Exception {
        this.mockMvc.perform(get("/persons"))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    //Testing POST with auth, without CSRF attached. Expecting 403.
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void CSRFTest() throws Exception {
        final File jsonFile = new ClassPathResource("/newPerson.json").getFile();
        final String personToAdd = Files.readString(jsonFile.toPath());
        this.mockMvc.perform(post("/persons")
                        .contentType(APPLICATION_JSON)
                        .with(user("user").password("password"))
                        .content(personToAdd))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    //Testing DELETE as USER. Expecting 403 (only ADMIN has auth).
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void deletePersonAsUser() throws Exception {
        this.mockMvc.perform(delete("/persons/{id}", 1)
                        .with(user("user").password("password"))
                .with(csrf()))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    //Testing DELETE as ADMIN. Expecting 200
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void deletePersonAsAdmin() throws Exception {
        this.mockMvc.perform(delete("/persons/{id}", 1)
                        .with(user("user").password("password").roles("ADMIN"))
                .with(csrf()))
                .andDo(print())
                .andExpect(status().isOk());
    }
    //*** END SECURITY TESTS ***

    // Posting new person with missing ID variable. Expecting auto-added auto-generated ID of 51 (50 persons already in db).
    // Also testing new person actually wound up in db by testing total person count.
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void addPerson() throws Exception {
        final File jsonFile = new ClassPathResource("/newPerson.json").getFile();
        final String personToAdd = Files.readString(jsonFile.toPath());
        this.mockMvc.perform(post("/persons")
                        .contentType(APPLICATION_JSON)
                        .with(user("user").password("password"))
                        .with(csrf())
                        .content(personToAdd))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$").isMap())
                .andExpect(jsonPath("$", aMapWithSize(5)))
                .andExpect(jsonPath("$.id").value(51));
        assertThat(this.personRepository.findAll()).hasSize(51);
    }

    //Testing GET persons with age between age1 and age2:
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void getAllPersonsByAgeBetween() throws Exception {
        int age1 = 34;
        int age2 = 45;
        this.mockMvc.perform(get("/persons/byAge/{age1}-{age2}", age1, age2)
                    .with(user("user").password("password")))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.[0].age").value(greaterThanOrEqualTo(age1)))
                .andExpect(jsonPath("$.[-1].age").value(lessThanOrEqualTo(age2)));
    }

    // Testing PatientRepo autogeneration of patients from tables Persons, Pathosis, expecting 200
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void getAllPatients() throws Exception {
        this.mockMvc.perform(get("/patients")
                        .contentType(APPLICATION_JSON)
                        .with(user("user").password("password"))
                        .with(csrf()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(50)))
                .andExpect(jsonPath("$.[0].pathosisId").exists())
                .andExpect(jsonPath("$.[0].cured").value(false));
    }

    // Testing PUT Pathosis as ADMIN, expecting 200
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void updatePathosisById() throws Exception {
        int id = 2;
        final File jsonFile = new ClassPathResource("/updatePathosis.json").getFile();
        final String pathosisToUpdate = Files.readString(jsonFile.toPath());
        this.mockMvc.perform(put("/pathosis/{id}", id)
                        .contentType(APPLICATION_JSON)
                        .with(user("user").password("password").roles("ADMIN"))
                        .with(csrf())
                        .content(pathosisToUpdate))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("Dysphoria"));

        assertThat(this.pathosisRepository.findAll()).hasSize(15);
    }

    // Testing sendToSurgery with curation of diseases and autogeneration of full names for patients
    @Test
    @Sql(value = "classpath:/data.sql", executionPhase = BEFORE_TEST_METHOD)
    void sendToSurgery() throws Exception {
        int time = 50;
        char type = 'q';
        final File jsonFile = new ClassPathResource("/fivePatients.json").getFile();
        final String fivePatients = Files.readString(jsonFile.toPath());
        this.mockMvc.perform(post("/sendToSurgery/{type}/{time}", type, time)
                        .contentType(APPLICATION_JSON)
                        .with(user("user").password("password"))
                        .with(csrf())
                        .content(fivePatients))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$.[0].fullName").exists())
                .andExpect(jsonPath("$.[0].cured").value(true));
    }
}
