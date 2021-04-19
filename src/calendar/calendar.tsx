import * as React from "react";
import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Appointments,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";

// Interface for the data from server
export interface CustomerObj {
  id: number;
  date: Date;
  duration: number;
  activity: string;
  customer: {
    firstname: string;
    lastname: string;
  };
}

export default class Calendar extends Component {
  state = {
    customer_map: [],
  };

  componentDidMount() {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          customer_map: data.map((c: CustomerObj) => {
            let start = new Date(c.date);
            let end = moment(start).add(60, "minutes");
            return {
              startDate: start,
              endDate: end,
              title:
                c.activity +
                " | " +
                c.customer.firstname +
                " " +
                c.customer.lastname,
            };
          }),
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <Paper>
          <Scheduler height={600} data={this.state.customer_map}>
            <ViewState
              defaultCurrentViewName="Month"
              defaultCurrentDate="2021-04-19"
            />
            <DayView />
            <WeekView />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
