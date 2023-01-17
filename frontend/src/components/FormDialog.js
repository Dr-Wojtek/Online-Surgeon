import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export function FormDialogPerson(props) {
  const [open, setOpen] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState(0);
  const [postal, setPostal] = useState(0);
  const {buttonTitle, dialogTitle, contentText, onClose, setEntity, login} = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let person = {};
    if (lastName && firstName) {
      person = { lastName: lastName, firstName:firstName, age:age, postal: postal };
      onClose(setEntity, person, login);
      setOpen(false);
      setLastName('');
      setFirstName('');
      setAge(0);
      setPostal(0);
    } else {
      alert("Fields Last name and First name are required.")
    } 
    };
  
  const handleChange = e => {
    e.preventDefault();
    if (e.target.name==="age") {
      setAge(parseInt(e.target.value));
    } else if (e.target.name==="lastName") {
      setLastName(e.target.value);
    } else if (e.target.name==="firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name==="postal") {
      setPostal(parseInt(e.target.value));
    }
  }

  return (
    <div>
      <Button style={{ margin:5 }} variant="contained" onClick={handleOpen}>
        {buttonTitle}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contentText}
          </DialogContentText>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '15ch' },
            }}
            noValidate
            autoComplete="off" >
              <div>
                
                  <TextField
                    autoFocus
                    required
                    name="lastName"
                    id="outlined-required"
                    label="Last name"
                    type="string"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    name="firstName"
                    id="outlined-required"
                    label="First name"
                    type="string"
                    onChange={handleChange}
                  />
                    <TextField
                    id="outlined"
                    name="age"
                    label="Age"
                    type="number"
                    min="1"
                    max="99"
                    onChange={handleChange}
                  />
                   <TextField
                    name="postal"
                    id="outlined"
                    label="Postal"
                    type="number"
                    min="1000"
                    max="99999"
                    onChange={handleChange}
                  />
              </div>
              </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function FormDialogPathosis(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [symptomOne, setSymptomOne] = useState();
  const [symptomTwo, setSymptomTwo] = useState();
  const [symptomThree, setSymptomThree] = useState();
  const [mortality, setMortality] = useState();
  const {buttonTitle, dialogTitle, contentText, onClose, setEntity, login } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let pathosis = {};
    if (name && symptomOne && mortality > 0 && mortality < 6) {
      pathosis = { name: name, symptomOne: symptomOne, symptomTwo: symptomTwo, symptomThree: symptomThree, mortality: mortality };
      onClose(setEntity, pathosis, login);
      setOpen(false);
      setName('');
      setSymptomOne('');
      setSymptomTwo('');
      setSymptomThree('');
      setMortality(0);
    } else {
      alert("Fields Name, Symptom One and Mortality 1-5 required.")
    }    
    };
  
    const handleChange = e => {
      e.preventDefault();
      if (e.target.name==="name") {
        setName(e.target.value);
      } else if (e.target.name==="symptomOne") {
        setSymptomOne(e.target.value);
      } else if (e.target.name==="symptomTwo") {
        setSymptomTwo(e.target.value);
      } else if (e.target.name==="symptomThree") {
        setSymptomThree(e.target.value);
      } else if (e.target.name==="mortality") {
        setMortality(parseInt(e.target.value));
    }
  }

  return (
    <div>
      <Button style={{ margin:5 }} variant="contained" onClick={handleOpen}>
        {buttonTitle}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contentText}
          </DialogContentText>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '15ch' },
            }}
            noValidate
            autoComplete="off" >
              <div>
                  <TextField
                    autoFocus
                    required
                    name="name"
                    id="outlined-required"
                    label="Name"
                    placeholder=""
                    type="string"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    name="symptomOne"
                    id="outlined-required"
                    label="Symptom 1"
                    type="string"
                    onChange={handleChange}
                  />
                    <TextField
                    name="symptomTwo"
                    id="outlined"                    
                    label="Symptom 2"
                    onChange={handleChange}
                  />
                  <TextField
                    id="outlined"
                    name="symptomThree"
                    label="Symptom 3"
                    onChange={handleChange}
                  />
                   <TextField
                   required
                    name="mortality"
                    id="outlined-required"
                    label="Mortality"
                    type="number"
                    min="1"
                    max="5"
                    onChange={handleChange}
                  />
              </div>
              </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function FormDialogPatients(props) {
  const [open, setOpen] = useState(false);
  const [waitingRoom, setWaitingRoom] = useState();
  const [timeUnits, setTimeUnits] = useState();
  const {buttonTitle, dialogTitle, patients, onClose, changeView, setEntity, setChoice, login} = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (waitingRoom && timeUnits >= 8) {
      onClose(setEntity, patients, waitingRoom, timeUnits, login);
      setChoice([waitingRoom, timeUnits]);
      setTimeout(changeView(), 700);
      setOpen(false);
      setTimeUnits(0)
      setWaitingRoom('')
      
    } else {
      alert("All fields are required, and you need at least one doctor.")
    }    
    };
  
    const handleChange = e => {
      e.preventDefault();
      if (e.target.name==="doctors") {
          setTimeUnits(e.target.value * 8);
      } else if (e.target.name==="waitingRoom") {
        setWaitingRoom(e.target.value);
      } 
    };

  return (
    <div>
      <Button style={{ margin:5 }} variant="contained" color="success" onClick={handleOpen}>
        {buttonTitle}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '20ch' },
            }}
            noValidate
            autoComplete="off" >
              <div>
              <FormControl>
                <FormLabel required id="row-radio-buttons-group-label">Waiting room</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel name="waitingRoom" onChange={handleChange} value="q" control={<Radio />} label="Queue" />
                  <FormControlLabel name="waitingRoom" onChange={handleChange} value="s" control={<Radio />} label="Stack" />
                </RadioGroup>
              </FormControl>
                  <TextField
                    required
                    name="doctors"
                    id="outlined-required"
                    label="Doctors & nurses"
                    type="number"
                    onChange={handleChange}
                  />
              </div>
              </Box>
              <DialogContentText>
              
              Patients are sorted after mortality, deadliest disease first in line. <br/>
              A <b>queue</b> type waiting room honors this sorting. A <b>stack</b> type reverses it.<br/><br/>
              Specify how many doctors are available today. One doctor equals eight man-hours.<br/>
              Higher mortality requires more hours to treat, and the clock is ticking.<br/><br/>
            Will you cure more people using a <b>stack</b>, or fewer, but deadlier cases with a <b>queue</b>?       
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} variant="contained">Retrieve outcome</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
