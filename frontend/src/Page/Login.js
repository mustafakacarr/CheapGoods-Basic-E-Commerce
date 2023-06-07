import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertMessage from "../Component/AlertMessage";
import FormContainer from "../Component/FormContainer";
import Loader from "../Component/Loader";
import { login } from "../redux/actions/UserAction";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <FormContainer>
        <h1>Login</h1>
        {error && <AlertMessage variant="danger">{error} </AlertMessage>}
        {loading && <Loader></Loader>}
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
        <Button
          type="submit"
          variant="success"
          onClick={(e) => submitHandler(e)}
        >
          Sign in
        </Button>
        <Row className="py-3">
          <Col>
            Didnt you register yet?{" "}
            <Link to={redirect ? "/register?redirect={redirect}" : "/register"}>
              Click Here
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default Login;
