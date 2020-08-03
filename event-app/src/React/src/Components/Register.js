import React, { Component } from "react";
import {Button,Form,
FormGroup,
  Label,
  Input,
  CardHeader,
  Card,
  CardBody,
  Table,
  ButtonGroup,Modal,ModalBody,ModalFooter,ModalHeader,} from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Row, Col} from "react-bootstrap";
import alertify from 'alertifyjs';


export default class Register extends Component {
constructor(props) {
    super(props);
    this.eventChange = this.eventChange.bind(this);
    this.state={ events:[],
          name:"", surname:"",email:"",tcKimlikNo:"",
          modal:false

    };
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  intialState={
    name:"",
    surname:"",
    email:"",
    tcKimlikNo:"",
  };

  eventChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  summitUser = (event) => {
    event.preventDefault()
    axios.post("/" + this.state2.name2 + "/participants", this.state).then((response) => {
      if (response.data != null) {
        this.setState(this.intialState);
        alertify.success(this.state.name+" Added Succesfully");
        this.toggle();
      }
    }).catch((error=>{
      alertify.error("Kontejan Dolu");
    }))
  }
  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    axios
      .get("/events")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ events: data });
      });
  };

  getName = (name) => {
    this.state2 = {
      name2: name,
    }
    this.toggle();
  }
  render() {
    const { name, surname, email, tcKimlikNo } = this.state;

    return (
      <div className="m-5">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} charCode="x">Register</ModalHeader>
          <Form onSubmit={this.summitUser}>
          <ModalBody>
          <Card>
            <CardBody>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                      required
                     autocomplete="off"
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={this.eventChange}/>
                  <Label>Surname</Label>
                  <Input required
                    autocomplete="off"
                    type="text"
                    name="surname"
                    placeholder="Enter Your  surname"
                    value={surname}
                    onChange={this.eventChange}
                  />
                  <Label>Email</Label>
                  <Input
                      required
                     autocomplete="off"
                    type="email"
                    name="email"
                    placeholder="Enter Your E-Mail"
                    value={email}
                    onChange={this.eventChange}
                  />
                  <Label>Tc Number</Label>
                  <Input
                      required
                     autocomplete="off"
                      type="number"
                    name="tcKimlikNo"
                    placeholder="Enter TC Number"
                    value={tcKimlikNo}
                    onChange={this.eventChange}
                  />
                </FormGroup>
            </CardBody>
          </Card>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type="submit">Save</Button>
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
       </Form>
        </Modal>
        <Row>
          <Col xs="7">
        <Card >
            <CardHeader className="font-weight-bold text-left">
              <FontAwesomeIcon icon={faList} /> Event List
          </CardHeader>
            <Table hover>
              <thead className="thead-light">
                <tr className="text-left font-weight-bold text-dark">
                  <th>Event Name</th>
                  <th>Quota</th>
                  <th>Start time</th>
                  <th>End time</th>
                  <th className={"text-center"}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.events.length === 0 ? (
                  <tr align="center">
                    <td>
                      <h5>Yaklaşan Etklinlik yok</h5>
                    </td>
                  </tr>
                ) : (
                    this.state.events.map((events) => (
                      <tr>
                        <th>{events.name}</th>
                        <th>{events.quota}</th>
                        <th>{events.startDate}</th>
                        <th>{events.endDate}</th>
                        <th className="text-center">
                          <ButtonGroup>
                            <Link to="/register">
                              <Button
                                color="outline-dark"
                                size="sm"
                                onClick={this.getName.bind(this, events.name)}>
                                <FontAwesomeIcon icon={faSignInAlt} /> Join
                              </Button>
                            </Link>
                          </ButtonGroup>
                        </th>
                      </tr>
                    ))
                  )}
              </tbody>
            </Table>
          </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
