import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      username: '',
      password: '',
      redirect: false,
      token: '',
      visible: '',
      errorMessage: ''
    };
  }

  handleChange(event) {
    //console.log(this.state);
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }


  async login() {
    //console.log('sending');
    await axios.post(`http://localhost:888/api/auth/signin`,
      {
        username: this.state.username,
        password: this.state.password
      }).then(
        res => {
          if (res.data.roles[0] === "ROLE_ADMIN") {
            localStorage.setItem('token', res.data.accessToken);
            this.setState({
              redirect: true,
              token: res.data.accessToken
            });
            this.props.history.push(`/dashboard`);
          } else {
            if (res.data.roles[0] !== "ROLE_ADMIN") {
              //console.log('Vous n\'avez les privilèges pour vous connectez');
              this.setState({
                visible: true,
                errorMessage: 'Vous n\'avez pas les privilèges pour vous connectez'
              })
            } else {
              this.setState({
                visible: true,
                errorMessage: 'Réessayer plus tard'
              })
            }

          }
        }
      ).catch((error) => {
        this.setState({
          visible: true,
          errorMessage: 'Information de connexion erronées'
        })
      });
  }


  handleSubmit() {
    //console.log('submit');
    this.login();
  }

  render() {
    const redirect = this.state.redirect;
    //const token = this.state.token;
    if (redirect || localStorage.getItem('token')) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {this.state.errorMessage}
          </Alert>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name="username" autoComplete="username" onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" autoComplete="current-password" onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleSubmit}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
