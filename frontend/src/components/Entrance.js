import React, { useState, useEffect } from 'react';
import ContainedButtons from './ContainedButton';
import nurse from '../images/female-nurse.jpg';
import { getPersons, getPersonsByAge, getPersonsByPostal, getPathosis, getPatients, addPerson, addPathosis, 
    updatePerson, updatePathosis, deletePerson, deletePathosis, sendToSurgery } from '../api/Api';
import { FormDialogPerson, FormDialogPathosis, FormDialogPatients } from './FormDialog';
import { PopupInfoPerson, PopupInfoPathosis } from './PopupInfo';

export default function Entrance(props) {
    const { username, login, setLogin, setAuth } = props;
    const [ view, setView ] = useState('entrance');
    const [ currentInfo, setCurrentInfo ] = useState({});
    const [ openPerson, setOpenPerson ] = useState(false);
    const [ openPathosis, setOpenPathosis ] = useState(false);
    const [ results, setResults ] = useState(null);
    const [ currentChoice, setCurrentChoice ] = useState(null);
    const [ cured, setCured ] = useState(0);
        useEffect(() => {
            if (results) {
            setCured(0);
        results.forEach(result => { if (result.cured) {
            setCured(prev => prev + 1)}})
        }
     }, [results]);

    const [ pathosis, setPathosis ] = useState(null);
        useEffect(() => {
            setTimeout(getPathosis(setPathosis, login), 1000)
        }, [login, openPathosis])

    const [ persons, setPersons ] = useState(null);
        useEffect(() => {
            setTimeout(getPersons(setPersons, login), 1000);
        }, [login, openPerson]);

    const [ patients, setPatients ] = useState(null);
        useEffect(() => {
            getPatients(setPatients, login) 
        }, [persons, pathosis])

    let admin = false;
    if (username === "admin" || username === "Admin") { admin = true }; 

    const setViewClick = view => e => setView(view);
    const goBack = () => e => setView('entrance');    

    const handleClosePerson = () => {
        setOpenPerson(false);
        setCurrentInfo('')
      };
    const handleClosePathosis = () => {
        setOpenPathosis(false);
        setCurrentInfo('')
      };

    const userPriviledges = () => {
        return (
        <ul>
            <li>View and enlist new individuals to this hospital.</li>
            <li>View current and add newly discovered diseases.</li>
            <li>View todays patients.</li>
            <li>Send patients to the waiting room.</li>
        </ul>
        )}
    const adminPriviledges = () => {
        return (
            <ul>
                <li>View, add, <b>update and unlist</b> individuals listed to this hospital.</li>
                <li>View, add, <b>update and delete</b> discovered diseases.</li>
                <li>See current patients.</li>
                <li>Send patients to the waiting room.</li>
            </ul>
        )}    

    const View = () => {
      if (view === 'persons') {
            if (persons) {
            return (
                <div>
                    <div className="actions">
                <ContainedButtons onClick={goBack()} value="Go back" /> 
                <FormDialogPerson onClose={addPerson} login={login} setEntity={setPersons} buttonTitle="Add new person" type="contained" />
                <ContainedButtons onClick={() => getPersonsByAge(setPersons, login)} value="Sort by age" type="outlined" />
                <ContainedButtons onClick={() => getPersonsByPostal(setPersons, login)} value="Sort by postal" type="outlined" />
                <ContainedButtons onClick={() => getPersons(setPersons, login)} color="success" value="Sort by ID" type="outlined" />
                </div>
                <div className="center"> 
                    {admin ? <h5>Currently listed individuals. Click to edit or delete an entry.</h5> : <h5>Currently listed people.</h5> }
                </div>
                <table className="persons">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Last name</th>
                            <th>First name</th>
                            <th>Age</th>
                            <th>Postal code</th>
                        </tr>
                    </thead>
                    <tbody className="data">
                        {persons.map((person, key) => {
                            return (
                                <tr key={key} onClick={() => { setCurrentInfo(person);
                                       setOpenPerson(true);}} >
                                    <td>{person.id}</td>
                                    <td>{person.lastName}</td>
                                    <td>{person.firstName}</td>
                                    <td>{person.age}</td>
                                    <td>{person.postal}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            );
        }
        }  else if (view === 'pathosis') {
            if (pathosis) {
            return (
                <div>
                    <div className="actions">
                        <ContainedButtons onClick={goBack()} value="Go back" />
                        <FormDialogPathosis onClose={addPathosis} login={login} setEntity={setPathosis} buttonTitle="Add new disease" />
                    </div>
                    <div className="center"> 
                    {admin ? <h5>Discovered pathogens. Click to edit or delete an entry.</h5> : <h5>Discovered pathogens</h5> }
                </div>
                <table className="pathosis">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Symptom 1</th>
                            <th>Symptom 2</th>
                            <th>Symptom 3</th>
                            <th>Mortality</th>
                        </tr>
                    </thead>
                    <tbody className="data">
                        {pathosis.map((disease, key) => {
                            return (
                                <tr key={key} onClick={() => { setCurrentInfo(disease);
                                    setOpenPathosis(true); }} >
                                    <td>{disease.id}</td>
                                    <td>{disease.name}</td>
                                    <td>{disease.symptomOne}</td>
                                    <td>{disease.symptomTwo}</td>
                                    <td>{disease.symptomThree}</td>
                                    <td>{disease.mortality}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            );
        }

        } else if (view === 'patients') {
            if (patients) {
            return (
                <div>
                    <div className="actions">
                        <ContainedButtons onClick={goBack()} value="Go back"/>
                        <FormDialogPatients onClose={sendToSurgery} login={login} setChoice={setCurrentChoice} setEntity={setResults} changeView={setViewClick('results')} patients={patients} buttonTitle="Start medical care" />
                    </div>
                    <div className="center"> 
                    <p>Every listed person has gotten sick with a randomized disease and needs medical care.<br/> The patient list is anonymized. Patient and disease names will be cross-referenced after medical care.</p>
                </div>               
                <table className="patients">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pathosis ID</th>
                            <th>Person ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, key) => {
                            return (
                                <tr key={key}>
                                    <td>{patient.id}</td>
                                    <td>{patient.pathosisId}</td>
                                    <td>{patient.personId}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            );
                    } else { return (<div className="center"><p><b>Patients are loading...</b></p></div>);
                }

        } else if (view === 'results') {
            if (results) {
            return (
                <div className="results">
                      <div className="actions">
                        
                      <ContainedButtons onClick={goBack()} value="To Entrance" type="outlined"/>
                    </div>
                    <div className="center">
                    
                            <p>Your choice of a <b>{(currentChoice[0] === "s") ? "stack" : "queue"}</b> waiting room and {currentChoice[1]} man-hours, (<b>{currentChoice[1]/8}</b> doctors & nurses)<br/> managed to cure <b>{cured}</b> out of {(patients.length)} individuals.</p>
                            <p>{(patients.length === cured) ? "You cured all patients!" : "" }</p>
                    </div>                    
                    <table className="results">
                    <thead>
                        <tr>
                            <th>Person ID</th>
                            <th>Full Name</th>
                            <th>Pathosis name</th>
                            <th>Cured</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, key) => {
                            return (
                                <tr key={key}>
                                    <td>{result.personId}</td>
                                    <td>{result.fullName}</td>
                                    <td>{result.pathosisName}</td>
                                    <td>{result.cured ? <b>Yes</b> : "No"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="center"><br/><p>That's all this app does! <br/>
                Try with different settings or add your own diseases and persons.<br/>
                If you logged in as an admin, you are also authorized to update and delete entries in the database.</p></div>
                </div>
        ); } else {
            return (<div className="center"><p><b>Results are loading...</b></p></div>);
        }
        } else {
            return (
                <div>
                      <div className="actions">
                        <ContainedButtons onClick={setViewClick("persons")} value="Listed individuals" type="contained"/>
                        <ContainedButtons onClick={setViewClick("pathosis")} value="Discovered diseases" type="contained" />
                        <ContainedButtons onClick={setViewClick("patients")} value="Current patients" type="contained"/>
                    </div>                    
                    <table className="entrance">
                        <tbody className="entrance">
                            <tr>
                                <td>
                                    <p>Your <b>{username}</b> role enables you to:</p>
                                    {admin ? adminPriviledges() : userPriviledges()}
                                </td>
                                <td>
                                    <img src={nurse} alt="hospital nurse"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
        );}
    }


    return (
        <div><div className="title">
            <p>Welcome back <b>{username}</b>.</p>
            </div>
            {admin && <PopupInfoPerson open={openPerson} login={login} handleClose={handleClosePerson} currentInfo={currentInfo} currentAction={updatePerson} currentDeleteAction={deletePerson} />}
            {admin && <PopupInfoPathosis open={openPathosis} login={login} handleClose={handleClosePathosis} currentInfo={currentInfo} currentAction={updatePathosis} currentDeleteAction={deletePathosis} />}
            <View />
            <div className="actions">
                <ContainedButtons onClick={() => {setAuth(false); setLogin('')}} value="Sign Out" type="outlined"/>
            </div>
        </div>
    );
}