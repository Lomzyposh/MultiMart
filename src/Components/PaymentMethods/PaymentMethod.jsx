import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaCreditCard } from "react-icons/fa";
import "./PaymentMethod.css";

const PaymentMethods = () => {
  return (
    <div className="payment-wrapper">
      <Card className="payment-card">
        <Card.Body>
          <h3 className="text-center mb-4">Select Payment Method</h3>
          <div className="payment-icons">
            <Button variant="light" className="payment-btn">
              <FaCcVisa size={40} color="#1a1f71" />
              <span>Visa</span>
            </Button>
            <Button variant="light" className="payment-btn">
              <FaCcMastercard size={40} color="#eb001b" />
              <span>MasterCard</span>
            </Button>
            <Button variant="light" className="payment-btn">
              <FaCcPaypal size={40} color="#003087" />
              <span>PayPal</span>
            </Button>
            <Button variant="light" className="payment-btn">
              <FaCcAmex size={40} color="#2e77bb" />
              <span>AmEx</span>
            </Button>
            <Button variant="light" className="payment-btn">
              <FaCreditCard size={40} color="#0f3460" />
              <span>Other</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentMethods;
