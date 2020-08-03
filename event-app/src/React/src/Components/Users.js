import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Table, Card, CardHeader, Col } from "reactstrap";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Users extends Component {
  state = {
    users: [],
  };

  render() {
    return (
      <div>
        <Container className="m-5">
          <Col xs="9">
          <Card>
            <CardHeader className="font-weight-bold text-left">
              <FontAwesomeIcon icon={faList} /> User List
            </CardHeader>

            <Table>
              <thead className="thead-light">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Tc Kimlik No</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users.map((users) => (
                  <tr key={users.tcKimlikNo}>
                    <th>{users.name}</th>
                    <th>{users.surname}</th>
                    <th>{users.email}</th>
                    <th>{users.tcKimlikNo}</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          </Col>
        </Container>
      </div>
    );
  }
}
