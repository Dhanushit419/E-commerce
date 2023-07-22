import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@mui/styles'; // Import makeStyles for custom styles

const useStyles = makeStyles((theme) => ({
    dialogContent: {
      backgroundColor: 'white', // Set the background color to white
    },
    dialogContentText: {
      color: 'black', // Set the text color to black
    },
  }));

  
const MyComponent = () => {
    const [isWrongPasswordOpen, setIsWrongPasswordOpen] = useState(false); // State for controlling the dialog open/close
    const [errorMessage, setErrorMessage] = useState(''); // State to hold the error message
  
    const classes = useStyles(); // Use the custom styles
  
    // Function to handle when the wrong password is entered
    const handleWrongPassword = () => {
      setIsWrongPasswordOpen(true);
      setErrorMessage('Wrong password. Please try again.');
    };
  
    // Function to close the dialog
    const handleDialogClose = () => {
      setIsWrongPasswordOpen(false);
    };
  
    return (
      <div>
        {/* Your login form */}
        <input type="password" />
        <button onClick={handleWrongPassword}>Submit</button>
  
        {/* Dialog for wrong password */}
        <Dialog open={isWrongPasswordOpen} onClose={handleDialogClose}onKeyDown={handleDialogClose} >
          <DialogTitle>Error</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText className={classes.dialogContentText}>
              {errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='outlined' onClick={handleDialogClose}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default MyComponent;
  