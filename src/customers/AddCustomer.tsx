import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AddCustomerPropsInterface } from "./Interface/AddCustomerPropsInterface";

export default function AddCustomer(props: AddCustomerPropsInterface) {
    const [open, setOpen] = React.useState(false);

    const [customer, setCustomer] = React.useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const saveAddedCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                ADD CUSTOMER
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">NEW CUSTOMER</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        placeholder="Enter first name"
                        value={customer.firstname}
                        onChange={(e) => handleInputChange(e)}
                        label="First Name"
                        fullWidth
                    />


                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={(e) => handleInputChange(e)}
                        label="Last Name"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={(e) => handleInputChange(e)}
                        label="Street Address"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={(e) => handleInputChange(e)}
                        label="PostCode"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={(e) => handleInputChange(e)}
                        label="City"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={(e) => handleInputChange(e)}
                        label="Email"
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={(e) => handleInputChange(e)}
                        label="Phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveAddedCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}