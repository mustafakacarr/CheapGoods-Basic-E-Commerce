import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertMessage from "../Component/AlertMessage";
import Loader from "../Component/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../Constants/UserConstants";
import { listMyOrders } from "../redux/actions/OrderAction";
import { getUserDetails, updateUserProfile } from "../redux/actions/UserAction";

function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
 const history = useNavigate();


  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { error: errorOrders, loading: loadingOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) history("/login");
      
    else {
      dispatch(listMyOrders());
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        
        console.log("asd");
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);
  const FormSubmitHandler = (e) => {
    e.preventDefault();
    if (password != rePassword) {
      setMessage("The passwords dont match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };
  return (
    <div>
      <Row>
        <Col md={4}>
          <h2>Profile</h2>
          {message && <AlertMessage variant="danger">{message}</AlertMessage>}
          {error && <AlertMessage variant="danger">{error}</AlertMessage>}
          {loading && <Loader></Loader>}
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Type name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Type email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Type password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="repassword">
              <Form.Label>Re Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Type re password to confirm"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="warning"
              type="submit"
              onClick={(e) => FormSubmitHandler(e)}
            >
              Update
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <h2 className="product-title">Siparişlerim</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <AlertMessage variant="danger">{errorOrders}</AlertMessage>
          ) : (
            <Table striped responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Datetime</th>
                  <th>Total Price</th>
                  <th>Payment Status</th>
                  <th>Details </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice} $</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt
                      ) : (
                        <i className="fa fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order.id}`}>
                        <Button> Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
