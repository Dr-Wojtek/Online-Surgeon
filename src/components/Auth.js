import React, { useState } from 'react';
import { confirmAuth } from '../api/Api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Auth(props) {
    const {setUsername, setPassword, username, password, setAuth, setLogin } = props;
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted ] = useState(false)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (e) => {
      e.preventDefault()
      if (username && password) {
        setSubmitted(true);
        confirmAuth(username, password, setAuth, setLogin)
        setTimeout(setSubmitted, 17000)
        } else {
          alert("You have to provide something, doctor. See the password link below the button if you need a password.")
        }   
      }

    const handleChange = e => {
      e.preventDefault();
      if (e.target.name==="username") {
        setUsername(e.target.value);
      } else if (e.target.name==="password") {
        setPassword(e.target.value);
    }
  }
      
    return (
      <div>
      <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Secret password delivery"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We apologize for not briefing you on your password sooner. <br/>
            If you'd prefer a lot of responsibility, use <b>admin</b>:<b>password</b>.<br/>
            Otherwise, go with <b>user</b>:<b>password</b>.<br/><br/>
            Be advised, <b>the backend goes to sleep after several hours of inactivity.</b><br/>
            Logging in might take about 20 seconds if this is the case.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                name="username"
                type="username"
                className="form-control mt-1"
                placeholder="Enter username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              
            </div>
            <div className="center">
            {submitted && <img src="https://media.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" width="150" height="100" alt="spinning wheel" />}
            </div>
            <p className="forgot-password text-right mt-2">
              You look like an honest person, do you need a <span className="blue" onClick={handleClickOpen}>password?</span>
            </p>
          </div>
        </form>
      </div>
      </div>
    );
}