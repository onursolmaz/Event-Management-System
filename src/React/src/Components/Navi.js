import React, { Component } from "react";
import { Navbar, Nav, FormControl } from "react-bootstrap";
import { Button, Form } from "reactstrap";

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand href="/">
          <img src="https://img.icons8.com/ios-glyphs/30/000000/commercial-development-management.png" width="25" height="25" alt="logo"/>
            Event Management <span className="lead">System</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-5">
              <Nav.Link className="mr-4" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="mr-4" href="/Register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form inline>
            <FormControl
              type="text"
              placeholder="User Name"
              className="mr-sm-1"
            />
            <FormControl
              type="text"
              placeholder="Password"
              className="mr-sm-1"
            />
            <Button variant="outline-info" href="/" >Login</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}
