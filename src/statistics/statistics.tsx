import React, { Component } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default class Stats extends Component {
  lodash = require("lodash");

  state = {
    trainings: [],
  };

  componentDidMount() {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((trainings) =>
        this.setState({
          // ACTIVITIES BY DURATION
          trainings: this.lodash(trainings)
            .groupBy("activity")
            .map((length: string, activity: string) => ({
              activity: activity,
              duration: this.lodash.sumBy(length, "duration"),
            }))
            .value(),
        })
      )
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <ResponsiveContainer width={"75%"} height={500}>
        <BarChart
          barSize={75}
          width={100}
          height={250}
          data={this.state.trainings}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#7600FF" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />{" "}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
