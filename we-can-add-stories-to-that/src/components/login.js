import React from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        this.onSubmit = this.onSubmit.bind(this);
    }
  onSubmit(ev) {
      ev.preventDefault();
      const data = {
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
      }
      /* validate the data */
      axios.post('/v1/session', qs.stringify(data))
      .then(
        (res)=>{
          if (res.status == 401) {
            console.log("found 401");
            
          }
          else if (res.status == 200 || res.status == 200) {
            console.log(res)
            this.setState({ hasError: false});
          }
        }
      ).catch((error)=> {
        this.setState({ hasError: true});
        document.getElementById("loginForm").reset();
      });
  }    

  render() {
    const val = (this.state.hasError ? 'Please enter a valid username and password.' : ' ');
    return (
    <Container>
      <Form id="loginForm">
        <FormGroup row>
          <Label for="username" sm={2}>Username</Label>
          <Col offset={3} sm={8}>
            <Input type="text" name="username" id="username" placeholder="Username" />
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