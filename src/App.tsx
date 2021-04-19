import React, { lazy, Suspense } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const Home = lazy(() => import("./home"));
const Customers = lazy(() => import("./customers/Customers"));
const Trainings = lazy(() => import("./trainings/trainings"));
const Calendar = lazy(() => import("./calendar/calendar"));
const Statistics = lazy(() => import("./statistics/statistics"));

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navLinks = [
  { title: `Home`, path: `/` },
  { title: `Customers`, path: `/customers` },
  { title: `Trainings`, path: `/trainings` },
  { title: `Calendar`, path: `/calendar` },
  { title: `Statistic`, path: `/statistics` },
];

const App: React.FC = () => (
  <div>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AppBar position="static">
          <Toolbar>
            <Container
              style={{
                display: `flex`,
                justifyContent: `space-between`,
              }}
            >
              <List
                aria-labelledby="navigation"
                style={{
                  display: `flex`,
                  justifyContent: `space-between`,
                }}
              >
                {navLinks.map(({ title, path }) => (
                  <a
                    href={path}
                    key={title}
                    style={{
                      textDecoration: `none`,
                      textTransform: `uppercase`,
                      color: `white`,
                    }}
                  >
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </a>
                ))}
              </List>
            </Container>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/trainings" exact component={Trainings} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/statistics" exact component={Statistics} />
        </Switch>
      </Suspense>
    </Router>
  </div>
);

export default App;
