import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Component/CheckoutSteps";
import FormContainer from "../Component/FormContainer";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux/actions/CartAction";
import { Button, Form } from "react-bootstrap";

function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const history = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history("/payment");
  };
  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h2>Address Details</h2>
        <Form>
          <Form.Group controlId="address">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Type address"
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              type="city"
              placeholder="Type city"
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Type postal code"
              value={postalCode ? postalCode : ""}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="repassword">
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Type country"
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            onClick={(e) => FormSubmitHandler(e)}
          >
            Go to next step
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}
export default Shipping;
