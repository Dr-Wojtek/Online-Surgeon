import {encode as base64_encode} from 'base-64';

const domainAddress = "https://online-akuten.herokuapp.com";

export const confirmAuth = (username, password, setAuth, setLogin) => {
    let string = username + ":" + password;
    let encoded = base64_encode(string);
    let loginAttempt = 'Basic ' + encoded;

    let fetchData = async () => {
        let requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': loginAttempt }
        };
        let response = await fetch(`${domainAddress}/pathosis`, requestOptions);        
        setTimeout(setAuth(response.ok), 200);
        if (!response.ok) {alert("Bad user credentials.")}
        if (response.ok) {setLogin(loginAttempt)}
    }
    fetchData()    
        .catch(console.error);;   

    }

export const getPersons = (setPersons, login) => {
    let fetchData = async () => {
        let requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': login }
        };
        let response = await fetch(`${domainAddress}/persons`, requestOptions)
        let json = await response.json()
        setPersons(json);
    }
    fetchData()    
        .catch(console.error);;   
    }

    export const getPersonsByAge = (setPersons, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login }
            };
            let response = await fetch(`${domainAddress}/persons/byAge`, requestOptions)
            let json = await response.json()
            setPersons(json);
        }
        fetchData()    
            .catch(console.error);;   
        }
    
     export const getPersonsByAgeSet = (setPersons, ageStart, ageEnd, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login }
            };
            let response = await fetch(`${domainAddress}/persons/byAge/${ageStart}-${ageEnd}`, requestOptions)
            let json = await response.json()
            setPersons(json);
        }
        fetchData()    
            .catch(console.error);;   
        }

     export const getPersonsByPostal = (setPersons, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login }
            };
            let response = await fetch(`${domainAddress}/persons/byPostal`, requestOptions)
            let json = await response.json()
            setPersons(json);
        }
        fetchData()    
            .catch(console.error);;   
        }

    export const addPerson = (setPersons, person, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login},
            body: JSON.stringify(person)
            };
            console.log(requestOptions)
            let response = await fetch(`${domainAddress}/persons`, requestOptions)
            let json = await response.json()
            console.log(json)
            setPersons(prev => [...prev, json]);
        }
        fetchData()    
            .catch(console.error);;   
        }

    export const updatePerson = (person, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login },
                body: JSON.stringify(person)
            };
            fetch(`${domainAddress}/persons/${person.id}`, requestOptions)
        }
        fetchData()    
            .catch(console.error);;   
        }

    export const deletePerson = (person, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login },
                body: JSON.stringify(person)
            };
            fetch(`${domainAddress}/persons/${person.id}`, requestOptions)
        }
        fetchData()    
            .catch(console.error);;   
        }

    export const getPathosis = (setPathosis, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login }
            };
            let response = await fetch(`${domainAddress}/pathosis`, requestOptions)
            let json = await response.json()
            setPathosis(json);
        }
        fetchData()    
            .catch(console.error);;   
        }
        
    export const getPathosisById = (setPathosis, id, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login }
            };
            let response = await fetch(`${domainAddress}/pathosis/${id}`, requestOptions)
            let json = await response.json()
            setPathosis(json);
        }
        fetchData()    
            .catch(console.error);;   
        }

    export const addPathosis = (setPathosis, pathosis, login) => {
            let fetchData = async () => {
                let requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': login },
                    body: JSON.stringify(pathosis)
                };
                let response = await fetch(`${domainAddress}/pathosis`, requestOptions)
                let json = await response.json()
                setPathosis(prev => [...prev, json]);
            }
            fetchData()    
                .catch(console.error);;   
            }

    export const updatePathosis = (pathosis, login) => {
        let fetchData = async () => {
            let requestOptions = {
                method: 'PUT',
                headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login },
                body: JSON.stringify(pathosis)
            };
            fetch(`${domainAddress}/pathosis/${pathosis.id}`, requestOptions)
        }
        fetchData()    
            .catch(console.error);;   
        }

    export const deletePathosis = (pathosis, login) => {
        let fetchData = async () => {
            let requestOptions = {
                method: 'DELETE',
                headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login },
                body: JSON.stringify(pathosis)
            };
            fetch(`${domainAddress}/pathosis/${pathosis.id}`, requestOptions)
        }
        fetchData()    
            .catch(console.error);;   
        }

    export const getPatients = (setPatients, login) => {
        let fetchData = async () => {
            let requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': login }
            };
            let response = await fetch(`${domainAddress}/patients`, requestOptions)
            let json = await response.json()
            setPatients(json);
        }
        fetchData()    
            .catch(console.error);;   
        }
    
        export const sendToSurgery = (setResults, patients, waitingType, timeUnits, login) => {
            let fetchData = async () => {
                let requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': login },
                        body: JSON.stringify(patients)
                    };
                    let response = await fetch(`${domainAddress}/sendToSurgery/${waitingType}/${timeUnits}`, requestOptions)
                    let json = await response.json();
                    setResults(json);
                }
                fetchData()    
                    .catch(console.error);;   
                }
        