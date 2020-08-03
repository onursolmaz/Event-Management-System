import React, { Component } from "react";
import Navi from "./Components/Navi";
import EventList from "./Components/EventList";
import { Row, Col } from "reactstrap";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Users from "./Components/Users";
import AddEvent from "./Components/AddEvent";
import Footer from "./Components/Footer";
import axios from "axios";
import Register from "./Components/Register";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }


  showUsers = (name) => {
    axios
      .get("/" + name + "/participants")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ users: data });
      });
  };




  render() {
    let margin = {
      margin: "0px",
      marginTop: "35px",
      marginLeft: "20px",
    };

    return (
      <Router>
        <div>
          <Navi/>

          <Route
          exact
            path="/"
            render={()=>
              <Row style={margin}>
                <Col xs="3">
                  <AddEvent></AddEvent>
                </Col>
                <Col xs="1"></Col>
                <Col xs="7">
                  <EventList showUsers={this.showUsers}></EventList>
                </Col>
              </Row>
            }
          ></Route>
          <Route
             exact path="/users"
            render={()=><Users users={this.state.users}></Users>}
          ></Route> 

          <Route
             exact path="/register"
            render={()=><Register></Register>

            }
          ></Route>






            <Footer></Footer>
        </div>
      </Router>
    );
  }
}
