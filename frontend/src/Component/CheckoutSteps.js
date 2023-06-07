import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({step1,step2,step3,step4}) {
  return (
    <div>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          <LinkContainer to="/login">
            {step1 ? (
              <Nav.Link className="text-primary">Login</Nav.Link>
            ) : (
              <Nav.Link disabled>Login</Nav.Link>
            )}
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/shipping">
            {step2 ? (
              <Nav.Link className="text-primary">Shipping Details</Nav.Link>
            ) : (
              <Nav.Link disabled>Shipping Details</Nav.Link>
            )}
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/payment">
            {step3 ? (
              <Nav.Link className="text-primary">Payment Details</Nav.Link>
            ) : (
              <Nav.Link disabled>Payment Details</Nav.Link>
            )}
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/placeorder">
            {step4 ? (
              <Nav.Link className="text-primary">Done</Nav.Link>
            ) : (
              <Nav.Link disabled>Done</Nav.Link>
            )}
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default CheckoutSteps;
