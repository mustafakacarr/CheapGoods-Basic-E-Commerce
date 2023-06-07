import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import AlertMessage from "../Component/AlertMessage";
import { createOrder, getOrderDetails } from "../redux/actions/OrderAction";
import Loader from "../Component/Loader";
import { Col, ListGroup, Row, Card } from "react-bootstrap";

function Order() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error)
    order.ItemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
    if (!order || order.id !== Number(id)) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, order, id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <AlertMessage variant="danger">{error}</AlertMessage>
  ) : (
    <div>
      <AlertMessage variant="success">
        We successfully got your order
      </AlertMessage>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="product-title">Personal Details</h3>
              <p>
                <strong>Full Name : </strong>
                {order.user.name}{" "}
              </p>
              <p>
                <strong>Email : </strong>
                {order.user.email}{" "}
              </p>

              <h3 className="product-title">Shipping Details</h3>
              <p>
                <strong>Address : </strong>
                {order.shippingDetail.address} {order.shippingDetail.city}{" "}
                {order.shippingDetail.postalCode} {order.shippingDetail.country}{" "}
              </p>
              <p>
                <strong>Email : </strong>
                {order.user.email}{" "}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-primary text-white">
                <h2>Prices of your order</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Product Price Total :</Col>
                  <Col> {order.ItemsPrice} $</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Shipping Price Total :</Col>
                  <Col> {order.shippingPrice} $</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Tax Price Total :</Col>
                  <Col> {order.taxPrice} $</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Total Price:</Col>
                  <Col> {order.totalPrice} $</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={12} className="mt-5">
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-primary text-white">
              <h3>Products in your order</h3>
            </ListGroup.Item>
            {order.orderItems.length == 0 ? (
              <AlertMessage variant="info">
                There is no products yet
              </AlertMessage>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <img src={item.image} className=" img-fluid"></img>
                      </Col>
                      <Col md={7}>
                        <Link
                          to={`/product/${item.product}`}
                          className="text-dark text-decoration-none"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4} className=" text-left">
                        {" "}
                        {item.quantity} x $ {item.price} = ${" "}
                        {(item.quantity * item.price).toFixed(2)}
                      </Col>
                      <Col></Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
