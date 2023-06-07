import React, { useEffect } from "react";
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams,useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/actions/CartAction";
import AlertMessage from "../Component/AlertMessage";
import { LinkContainer } from "react-router-bootstrap";
function Cart() {
  const { id } = useParams();
  const useQuantity = useLocation();
  const quantity = useQuantity.search
    ? Number(useQuantity.search.split("=")[1])
    : 1;

  const dispatch = useDispatch();
  const history=useNavigate()
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (id) dispatch(addToCart(id, quantity));
  }, [dispatch, id, quantity]);
    const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    }
  
  
  const goToCheckoutHandler = () => {
    history('/shipping')
  }
  return (
    <div>
      <Row>
        <Col md={8}>
          <h1 className="product-title">My cart</h1>
          {cartItems.length === 0 ? (
            <AlertMessage variant="info">
              Cart is empty <Link to="/">Go to products page</Link>
            </AlertMessage>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        width={100}
                        alt={item.image}
                      ></Image>
                    </Col>
                    <Col md={2}>{item.name}</Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                              <Button
                                  onClick={()=>removeFromCartHandler(item.product)}
                        type="button"
                        variant="light"
                        onChange={(e) => console.log(e)}
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem className="text-center">
                <h2>
                  Toplam (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  ürün
                </h2>
                $(
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
                )
              </ListGroupItem>
            </ListGroup>{" "}
            <ListGroup.Item>
              <center>
                <Button
                  type="button"
                  className="btn-block "
                  disabled={cartItems.length === 0}
                  onClick={goToCheckoutHandler}
                >
                  Go to checkout
                </Button>
              </center>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
