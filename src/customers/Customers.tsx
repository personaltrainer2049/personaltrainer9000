import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { Component } from "react";
import CustomerList from "./CustomerList";

class Customers extends Component {
    render() {
        return (
            <div className="App">
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6">CustomerList</Typography>
                    </Toolbar>
                </AppBar>
                <CustomerList />
            </div>
        );
    }
}

export default Customers;