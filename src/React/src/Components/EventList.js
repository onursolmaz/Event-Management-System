import React, { Component } from "react";
import {
  Table,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  FormGroup, Label, Input, ModalFooter
} from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash, faUsers,} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import alertify from 'alertifyjs';
import {DateRangePicker} from "react-dates";

export default class EventList extends Component {
constructor(props) {
  super();
  this.state = {
    events: [],
    name:"", quota:"", startDate:"", endDate:"",
    modal:false
  };
  this.toggle = this.toggle.bind(this);

}
  intialState = {
    name: "",
    quota: "",
    startDate: "",
    endDate: "",
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.getEvents()
  }


  getEvents = () => {
    axios
      .get("/events")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ events: data });
      });
  };

  deleteEvent = (name) => {
    axios.delete("/" + name).then((response) => {
      if (response.data != null) {
        this.setState({
          events:this.state.events.filter(events=>events.name!==name)
        });
        alertify.error(this.state.name+" Başarıyla Silindi");
      }
    });
  };

  uptadeEvent=(event)=>{
    this.toggle();
    event.preventDefault();
    axios.put("/"+this.state2.name, this.state).then((response) => {
      if (response.data != null) {
        alertify.success(" Başarıyla Güncellendi");
        setTimeout(this.pageRefresh,1500);
      }
    });
  };

  eventChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  pageRefresh(){
    window.parent.location = window.parent.location.href;
}
  getName = (event) => {
    this.setState({
      name:event.name,
      quota:event.quota,
    })
    this.state2={
      name:event.name
    }
    this.toggle()
  }

  render() {
    const { name, quota, startDate, endDate } = this.state;
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Uptade</ModalHeader>
          <Form onSubmit={this.uptadeEvent}>
            <ModalBody>
                  <FormGroup>
                    <Label>Event Name</Label>
                    <Input
                        autocomplete="off"
                        required
                        type="text"
                        name="name"
                        placeholder="Enter Event Name"
                        value={name}
                        onChange={this.eventChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleNumber">Number</Label>
                    <Input
                        required
                        autocomplete="off"
                        type="number"
                        value={quota}
                        name="quota"
                        placeholder="Enter Quota"
                        onChange={this.eventChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <div><Label for="exampleDate"> Start and End Date:</Label></div>
                    <DateRangePicker
                        onChange={this.eventChange}
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDateId="startDate" // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId="endDate" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) =>
                            this.setState({ startDate, endDate })
                        } // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={(focusedInput) =>
                            this.setState({ focusedInput })
                        }
                    />
                  </FormGroup>



            </ModalBody>
            <ModalFooter>
              <Button color='primary' type="submit">Uptade</Button>{""}
              <Button color='secondary' onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Card>
          <CardHeader className="font-weight-bold text-left">
            <FontAwesomeIcon icon={faList} /> Event List
          </CardHeader>
          <Table hover>
            <thead className="thead-light">
              <tr className="text-center font-weight-bold text-dark">
                <th>Event Name</th>
                <th>Quota</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.events.length === 0 ? (
                <tr align="center">
                  <td colSpan="5">
                    <h5>Yaklaşan Etklinlik yok</h5>
                  </td>
                </tr>
              ) : (
                this.state.events.map((events) => (
                  <tr key={events.name}>
                    <th>{events.name}</th>
                    <th>{events.quota}</th>
                    <th>{events.startDate}</th>
                    <th>{events.endDate}</th>
                    <th className="text-center">
                      <ButtonGroup>

                        <Button color="outline-dark" size="sm"
                                onClick={this.getName.bind(this, events)}>
                          <FontAwesomeIcon icon={faEdit} /> Uptade
                        </Button>{""}
                        <Button
                          color="outline-dark"
                          size="sm"
                          onClick={this.deleteEvent.bind(this, events.name)}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </Button>{" "}
                        <Link to="/users">
                        <Button 
                          color="outline-dark"
                          size="sm"
                          onClick={this.props.showUsers.bind(this, events.name)}
                        >
                          {""}
                          <FontAwesomeIcon icon={faUsers} /> Show
                        </Button>{" "}
                        </Link>
                      </ButtonGroup>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card>
      </div>
    );
  }
}
