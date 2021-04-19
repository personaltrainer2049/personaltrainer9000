import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {CustomerTrainingInterface} from "../customers/CustomerList";

export default function AddTraining(props: CustomerTrainingInterface) {

    const [training, setTraining] = React.useState({
        date: "",
        duration: "",
        activity: "",
        customer: props.data.links[0].href,
    });
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const saveAddedTraining = () => {
        props.addTraining(training);
        handleClose()
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };


    return (
        <div>
            <form>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>ADD</Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">NEW TRAINING</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Activity" name="activity" margin="dense" fullWidth autoFocus
                            value={training.activity}
                            onChange={(e) => handleInputChange(e)}/>
                        <TextField
                            label="" name="date" type="date" margin="dense" fullWidth autoFocus
                            value={training.date}
                            onChange={(e) => handleInputChange(e)}/>
                        <TextField
                            label="Duration" name="duration" margin="dense" fullWidth autoFocus
                            value={training.duration}
                            onChange={(e) => handleInputChange(e)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={saveAddedTraining} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
};