import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  Card,
} from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.css";
import Axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSave,faPlus} from "@fortawesome/free-solid-svg-icons"
import alertify from 'alertifyjs';


export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.summitEvent = this.summitEvent.bind(this);
    this.eventChange = this.eventChange.bind(this);
    this.state = this.intialState;
  }

  intialState = {
    name: "",
    quota: "",
    startDate: "",
    endDate: "",
  };

  eventChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  summitEvent = (event) => {
    event.preventDefault();
    Axios.post("/events", this.state).then((response) => {
      if (response.data != null) {
        alertify.alert("<h3>"+this.state.name+" Başarıyla Eklendi !"+"</h3>").setHeader('<img style="text-align: center" src="https://img.icons8.com/officel/80/000000/good-pincode.png"/>');
      }
    }).catch(error=>{
      alertify.error(this.state.name+" already available");
    });
    setTimeout(this.pageRefresh,2000);
  }

  pageRefresh(){
    window.parent.location = window.parent.location.href;
    
  }
  render() {
  
    const { name, quota, startDate, endDate, } = this.state;
    return (
      <div>
        <Card>
          <CardHeader className="text-center font-weight-bold"><FontAwesomeIcon icon={faPlus}/>  Add New Event
          </CardHeader>
          <Form className="p-2 pt-3 pb-3" onSubmit={this.summitEvent} >
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
              <Label for="exampleDate"> Start and End Date:</Label>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({ startDate, endDate })
                }
                focusedInput={this.state.focusedInput}
                onFocusChange={(focusedInput) =>
                  this.setState({ focusedInput })
                }
              />
            </FormGroup>
            <Button
              className="btn-block"
              type="submit"
              onSubmit={this.summitEvent}
              onClick={this.intialState}
            >
              <FontAwesomeIcon icon={faSave}/>   Create
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

