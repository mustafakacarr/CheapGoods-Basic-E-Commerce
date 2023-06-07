import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Card,
  Form,
  ListGroup,
  Row,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Component/CheckoutSteps";
import FormContainer from "../Component/FormContainer";
import { savePaymentMethod } from "../redux/actions/CartAction";
import { useNavigate, Link } from "react-router-dom";
import AlertMessage from "../Component/AlertMessage";
import { ORDER_CREATE_RESET } from "../Constants/OrderConstants";
import { createOrder } from "../redux/actions/OrderAction";

function Placeorder() {
  const cart = useSelector((state) => state.cart);
  cart.ItemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.ItemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.18 * cart.ItemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.taxPrice) +
    Number(cart.shippingPrice) +
    Number(cart.ItemsPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;


  const dispatch = useDispatch();
  const history = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Pay");

  if (!cart.paymentMethod) {
    history("/payment");
  }

  useEffect(() => {
    if (success) {
      history(`/orders/${order.id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history]);

  const submitHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        ItemsPrice: cart.ItemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-primary text-white">
              <h3>Order Details</h3>
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              <p>
                <strong> Address : </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>{" "}
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item className="bg-primary text-white">
              <h3>Payment Details</h3>
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              <p>
                <strong> Method : </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>{" "}
          </ListGroup>

          <ListGroup variant="flush">
            <ListGroup.Item className="bg-primary text-white">
              <h3>Products in cart</h3>
            </ListGroup.Item>
            {cart.cartItems.length == 0 ? (
              <AlertMessage variant="info">
                There is no products yet
              </AlertMessage>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
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
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-primary text-white">
                <h2>Complete checkout</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Product Price Total :</Col>
                  <Col> {cart.ItemsPrice} $</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Shipping Price Total :</Col>
                  <Col> {cart.shippingPrice} $</Col>
                </Row>
              </ListGroup.Item>{" "}
              <ListGroup.Item>
                <Row>
                  <Col> Tax Price Total :</Col>
                  <Col> {cart.taxPrice} $</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Total Price:</Col>
                  <Col> {cart.totalPrice} $</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {error && <AlertMessage variant="danger">{error}</AlertMessage>}
          <Button
            type="submit"
            variant="success"
            className="col-12"
            disabled={cart.cartItems == 0}
            onClick={submitHandler}
          >
            Complete Order
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Placeorder;
