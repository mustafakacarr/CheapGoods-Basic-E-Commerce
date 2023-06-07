import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertMessage from "../Component/AlertMessage";
import FormContainer from "../Component/FormContainer";
import Loader from "../Component/Loader";
import { register } from "../redux/actions/UserAction";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setMessage("Passwords dont match");
    } else dispatch(register(name, email, password));
  };

    return (
      <div>
        <FormContainer>
          <h1>Register</h1>
          {message && <AlertMessage variant="danger">{message}</AlertMessage>}
          {error && <AlertMessage variant="danger">{error}</AlertMessage>}
          {loading && <Loader></Loader>}
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="rePassword">
              <Form.Label>Re-Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your password again to confirm"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              onClick={(e) => submitHandler(e)}
            >
              Sign up
            </Button>
            <Row className="py-3">
              <Col>
                Have you registered before ?{" "}
                <Link to={redirect ? "/" : "/login"}>
                  Click here to sign in
                </Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      </div>
    );
}

export default Register;
