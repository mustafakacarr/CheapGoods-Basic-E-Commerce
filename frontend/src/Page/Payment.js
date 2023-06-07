import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Component/CheckoutSteps";
import FormContainer from "../Component/FormContainer";
import { savePaymentMethod } from "../redux/actions/CartAction";
import { useNavigate } from "react-router-dom";

function Payment() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const history = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("Pay");

    if (!shippingAddress.address) {
    history("/shipping")
    }
       const FormSubmitHandler = (e) => {
         e.preventDefault();
         dispatch(savePaymentMethod(paymentMethod));
         history("/placeorder");
       };
  return (
    <div>
      {" "}
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h2>Address Details</h2>
        <Form>
          <Form.Group controlId="address">
            <Form.Label>Choose Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="Credit Cart"
              id="pay"
              name="paymentMethod"
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
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

export default Payment;
