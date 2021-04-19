import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React, { Component } from "react";
import TrainingList from "./TrainingList";

class Trainings extends Component {
    render() {
        return (
            <div>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6">TrainingList</Typography>
                    </Toolbar>
                </AppBar>

                <TrainingList />
            </div>
        );
    }
}

export default Trainings;