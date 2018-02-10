import React from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        this.onSubmit = this.onSubmit.bind(this);
    }
  onSubmit(ev) {
      ev.preventDefault();
      const data = {
          username: document.getElementById('username').value,
          primary_email: document.getElementById('primary_email').value,
          password: document.getElementById('password').value
      }
      /* validate the data */
      axios.post('/v1/user', qs.stringify(data))
      .then((res)=>{
          if (res.status == 200) {
            this.setState({ hasError: false});
            // move on to another page
          }
      }).catch((error)=> {
        this.setState({ hasError: true});
        document.getElementById("registrationForm").reset();
      });
  }    

  render() {
    const val = (this.state.hasError ? 'Please enter a valid username and password.' : ' ');
    return (
    <Container>
      <Form id="registrationForm">
        <FormGroup row>
          <Label for="username" sm={2}>Username</Label>
          <Col offset={3} sm={8}>
            <Input type="text" name="username" id="username" placeholder="Username" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="primary_email" sm={2}>Email</Label>
          <Col offset={3} sm={8}>
            <Input type="email" name="primary_email" id="primary_email" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={2}>Password</Label>
          <Col offset={3} sm={8}>
            <Input type="password" name="password" id="password" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={this.onSubmit} >Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      <h1> {val} </h1>
    </Container>
    );
  }
}