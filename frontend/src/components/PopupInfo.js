import React, {useState, useEffect }  from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function PopupInfoPerson(props) {
    const {open, currentInfo, handleClose, currentAction, currentDeleteAction, login } = props;
    const currentKeys = Object.keys(currentInfo);
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [age, setAge] = useState();

    const [postal, setPostal] = useState();
        useEffect(() => {
            setLastName(currentInfo[currentKeys[1]]);
            setFirstName(currentInfo[currentKeys[2]]);
            setAge(currentInfo[currentKeys[3]]);
            setPostal(currentInfo[currentKeys[4]]);
        }, [open])

    const handleSubmit = () => {
        let object =  {id:currentInfo[currentKeys[0]], lastName: lastName, firstName:firstName, age:age, postal: postal };
          currentAction(object, login);
          handleClose();
        };

    const handleDelete = () => {
        let object =  {id:currentInfo[currentKeys[0]], lastName: lastName, firstName:firstName, age:age, postal: postal };
          currentDeleteAction(object, login);
          handleClose();
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
    <div className="popup">
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      >
      <DialogTitle id="alert-dialog-title">
      {currentInfo.name}
      </DialogTitle>
      <DialogContent>
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
                disabled
                required
                name={currentKeys[0]}
                id="outlined-required"
                label={currentKeys[0]}
                defaultValue={currentInfo[currentKeys[0]]}
                onChange={handleChange}
              />
            <TextField
                autoFocus
                required
                name={currentKeys[1]}
                id="outlined-required"
                label={currentKeys[1]}
                defaultValue={currentInfo[currentKeys[1]]}
                onChange={handleChange}
              />
              <TextField
                required
                name={currentKeys[2]}
                id="outlined-required"
                label={currentKeys[2]}
                defaultValue={currentInfo[currentKeys[2]]}
                onChange={handleChange}
              />
                <TextField
                id="third"
                name={currentKeys[3]}
                label={currentKeys[3]}
                defaultValue={currentInfo[currentKeys[3]]}
                type="number"
                onChange={handleChange}
              />
               <TextField
                name={currentKeys[4]}
                id="outlined"
                label={currentKeys[4]}
                defaultValue={currentInfo[currentKeys[4]]}
                type="number"
                onChange={handleChange}
              />
              </div>
          </Box>
      </DialogContent>
      <DialogActions>
      <Button color="success" onClick={handleClose}>Close</Button>
      <Button variant="contained" color="success" onClick={handleSubmit}>Update</Button>
      <Button variant="outlined" color="error" onClick={handleDelete}>Delete entry</Button>
      </DialogActions>
    </Dialog>
    </div>
    );
}

export function PopupInfoPathosis(props) {
  const {open, currentInfo, handleClose, currentAction, currentDeleteAction, login } = props;
  const currentKeys = Object.keys(currentInfo);
  const [name, setName] = useState();
  const [symptomOne, setSymptomOne] = useState();
  const [symptomTwo, setSymptomTwo] = useState();
  const [symptomThree, setSymptomThree] = useState();

  const [mortality, setMortality] = useState();
      useEffect(() => {
          setName(currentInfo[currentKeys[1]]);
          setSymptomOne(currentInfo[currentKeys[2]]);
          setSymptomTwo(currentInfo[currentKeys[3]]);
          setSymptomThree(currentInfo[currentKeys[4]]);
          setMortality(currentInfo[currentKeys[5]]);
      }, [open])

  const handleSubmit = () => {
      let object =  {id:currentInfo[currentKeys[0]], name: name,
         symptomOne: symptomOne, symptomTwo: symptomTwo,
          symptomThree: symptomThree, mortality: mortality };
          if (mortality && name && symptomOne && mortality > 0 && mortality < 6) {
            currentAction(object, login);
            handleClose();
          } else {
            alert("Name, symptom 1 and mortality 1-5 required.");
          }        
      };

  const handleDelete = () => {
      let object =  {id:currentInfo[currentKeys[0]]};
        currentDeleteAction(object, login);
        handleClose();
      };
    
  const handleChange = e => {
      e.preventDefault();
      if (e.target.name==="name") {
          setName(parseInt(e.target.value));
      } else if (e.target.name==="symptomOne") {
          setSymptomOne(e.target.value);
      } else if (e.target.name==="symptomTwo") {
        setSymptomTwo(e.target.value);
      } else if (e.target.name==="symptomThree") {
        setSymptomThree(e.target.value);
      } else if (e.target.name==="mortality") {
        setMortality(e.target.value);
    }
  }
    
  return (
  <div className="popup">
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    maxWidth="lg"
    >
    <DialogTitle id="alert-dialog-title">
    {currentInfo.name}
    </DialogTitle>
    <DialogContent>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '15ch' },
      }}
      noValidate
      autoComplete="off" 
      >
        <div>
        <TextField
            autoFocus
            required
            name={currentKeys[1]}
            id="outlined-required"
            label={currentKeys[1]}
            defaultValue={currentInfo[currentKeys[1]]}
            onChange={handleChange}
          />
          <TextField
            required
            name={currentKeys[2]}
            id="outlined-required"
            label={currentKeys[2]}
            defaultValue={currentInfo[currentKeys[2]]}
            onChange={handleChange}
          />
            <TextField
            id="third"
            name={currentKeys[3]}
            label={currentKeys[3]}
            defaultValue={currentInfo[currentKeys[3]]}
            onChange={handleChange}
          />
          <TextField
            name={currentKeys[4]}
            id="outlined"
            label={currentKeys[4]}
            defaultValue={currentInfo[currentKeys[4]]}
            onChange={handleChange}
          />
          <TextField
            name={currentKeys[5]}
            id="outlined"
            label={currentKeys[5]}
            defaultValue={currentInfo[currentKeys[5]]}
            type="number"
            onChange={handleChange}
          />
          </div>
        </Box>
    </DialogContent>
    <DialogActions>
    <Button color="success" onClick={handleClose}>Close</Button>
    <Button variant="contained" color="success" onClick={handleSubmit}>Update</Button>
    <Button variant="outlined" color="error" onClick={handleDelete}>Delete entry</Button>
    </DialogActions>
  </Dialog>
  </div>
  );

    }

