# Online Surgeon API

* The goal of the program is 'cure' patients from various diseases, either by sending them to a queue or a stack.
* An external .sql file is loaded at boot and populates the Hibernate-created tables with 50 persons and 15 pathosis (diseases). The persons have a first name, last name, age, a postal code and a unique ID. The pathosis each have a name, three different symptoms and a mortality level. They are given unique IDs.
* Persons are infected with a random pathosis, rendering them into patients, and are sent to the waiting room. 
* There, patients are sorted after mortality of their disease, and then sent to a queue (with FIFO-policy). This is more in line with a real world scenario; most severe cases have priority. There is another option: sending the patients to a stack (with LIFO-policy).
* Every patients "surgery" consumes time units. Available time units are provided with each patients-to-surgery request. The higher the mortality, the more time consumed. This means the doctor will save more lives by sending patients to a stack since the lower, "easier" cases are treated first. 

## Third-party libraries / setup
Online Surgeon API is a secured Spring Boot application using an external H2 database for management of persons, pathosis (diseases) and patients. It has Google Guava and lombok dependencies, among others. It uses Hibernate ORM for SQL querying (except for a .sql file loaded at boot which has standard SQL queries).

## Security
* The program is secured using Spring Security 5.7.5.
* It does not use the deprecated WebSecurityConfigurerAdapter. Instead, it uses SecurityFilterChain, with enabled CSRF-protection and CSRF-tokens sent through an external cookie, enabling modifying requests such as POST, PUT, DELETE to be sent by, for example, Postman.
* Authentication is needed for any request, except GET on the root page "/" (which holds nothing, there is no front-end).
* A user role have authorization to GET and POST new persons and pathosis and sending patients to surgery. An admin have both USER and ADMIN roles, enabling them to GET, POST, PUT and DELETE on tables where possible.
* Exclusive admin authorization is enabled through GlobalMethodSecurity.
* Passwords are encoded using Springs own createDelegatingPasswordEncoder() method and users are stored in-memory.
* **Password for both user and admin: password**

## End points
Online Surgeon is a RESTful application. These end points are available at all times, if the appropriate data is fed.
* As a USER you may GET and POST. As an ADMIN you may also update (PUT) and DELETE.
* If POSTing, a new and unique ID will be generated for you.
* If you try to POST a person or pathosis with a specified ID, existing or not, the program will generate a new ID instead.
* If POSTing a new person you need to specify at least firstName, lastName.
* If POSTing a new pathosis you need to specify at least a name, a symptomOne and a mortality rate (1-5).

* You need to grab the CSRF token from the CSRF cookie in a GET request and attach it in order to POST, PUT and DELETE. See https://www.baeldung.com/postman-send-csrf-token for how to do this if you are using Postman.

### /persons
* There are several ways of GETTING persons:
/persons gets all persons
/persons/byAge gets all persons sorted after their age in descending order
/persons/byAge/{start}-{end} gets persons with ages in requested span, sorted in ascending order after their age.
/persons/byPostal gets all persons, sorted after their postal code in ascending order.

* POST to /person
* PUT to /person/{id}
* DELETE to /person/{id}.
Will return the JSON if the ID is found. Will throw a 404 if not.

### /pathosis
* /pathosis answers to GET and POST
* /pathosis/{id} answers to GET, PUT and DELETE

### /patients
* answers to GET.
* **Upon each GET the patient database table is cleared** and then all current persons in the database are loaded and each infected with a random disease. The patients are saved to the patient table in the db and returned. Each patient has an ID (unique), a personID and a pathosisID. 


### /sendToSurgery/{type of waiting room}/{amount of time units}
* Answers to POST.
* Type of waiting rooms are either q for queue or s for stack. Will throw a 404 for all other inputs.
* Amount of time units can be anything, although a maximum of around 300 will be sufficient to treat all patients. 
* Example: /sendToSurgery/q/100.
* Will take the list of inputed patients, sort them after mortality level and send them to either a stack or queue.
* When all patients are in the "waiting room" they are popped/removed one by one and after treatment a counter goes down by that patient's mortality level+random number from 1-10.
* The counters initial value is the amount of time unites specified.
* If a patient gets treated their boolean Cured is set to True.
* When the time is up, or the queue/stack empty, all patients are updated with their full name, their former (or still ongoing) disease's name, and their cured status. The patients are then returned.

## In practice:
1) Use any CRUD operation of your choice on persons or pathosis tables
2) GET a list of patients from /patients
3) POST that list to /sendToSurgery/{type}/{time units} to get the final outcome.

# Other
Online Surgeon was developed in three days, with about 8 hours of work each day.
