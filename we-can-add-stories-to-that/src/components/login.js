import React from 'react';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
  onSubmit(ev) {
      ev.preventDefault();
      const data = {
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
      }
      /* validate the data */
      axios.post('/v1/session', qs.stringify(data))
      .then((res)=>{
          console.log(res)
      })
      
  }    

  render() {
    return (
    <Container>
      <Form>
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
    </Container>
    );
  }
}