import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert, InputGroup } from "react-bootstrap";

export default function SimplePayment() {
  const [form, setForm] = useState({
    amount: "",
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [paid, setPaid] = useState(null);
  const [err, setErr] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === "cardNumber") v = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (name === "expiry") {
      const d = value.replace(/\D/g, "").slice(0, 4);
      v = d.length <= 2 ? d : d.slice(0, 2) + "/" + d.slice(2);
    }
    if (name === "amount") v = value.replace(/[^\d.]/g, "");
    setForm((f) => ({ ...f, [name]: v }));
    if (err[name]) setErr((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = {};
    if (!form.amount || Number(form.amount) <= 0) v.amount = "Enter amount";
    if (!form.name.trim()) v.name = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 13) v.cardNumber = "Invalid card";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) v.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvv)) v.cvv = "3–4 digits";
    setErr(v);
    if (Object.keys(v).length) return;

    setPaid({
      ref: "PAY-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      amount: Number(form.amount || 0),
      name: form.name,
      card: mask(form.cardNumber),
      time: new Date().toLocaleString(),
    });
  };

  const resetAll = () => {
    setForm({ amount: "", name: "", cardNumber: "", expiry: "", cvv: "" });
    setErr({});
    setPaid(null);
  };

  return (
    <div style={{ maxWidth: 520, margin: "24px auto", padding: "0 12px" }}>
      <Card>
        <Card.Body>
          <h4 className="mb-3 text-center">Payment</h4>

          {!paid ? (
            <Form noValidate onSubmit={onSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Amount</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>₦</InputGroup.Text>
                    <Form.Control
                      name="amount"
                      value={form.amount}
                      onChange={onChange}
                      isInvalid={!!err.amount}
                      placeholder="5000"
                      inputMode="decimal"
                      required
                    />
                    <Form.Control.Feedback type="invalid">{err.amount}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    isInvalid={!!err.name}
                    placeholder="Jane Doe"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{err.name}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={onChange}
                  placeholder="#### #### #### ####"
                  inputMode="numeric"
                  maxLength={19}
                  isInvalid={!!err.cardNumber}
                  required
                />
                <Form.Control.Feedback type="invalid">{err.cardNumber}</Form.Control.Feedback>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} md={6}>
                  <Form.Label>Expiry</Form.Label>
                  <Form.Control
                    name="expiry"
                    value={form.expiry}
                    onChange={onChange}
                    placeholder="MM/YY"
                    inputMode="numeric"
                    maxLength={5}
                    isInvalid={!!err.expiry}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{err.expiry}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6}>
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    name="cvv"
                    value={form.cvv}
                    onChange={onChange}
                    placeholder="123"
                    inputMode="numeric"
                    maxLength={4}
                    isInvalid={!!err.cvv}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{err.cvv}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div className="d-flex gap-2">
                <Button type="submit" variant="dark">Pay</Button>
                <Button type="button" variant="outline-secondary" onClick={resetAll}>Reset</Button>
              </div>

              <p className="text-muted mt-2 mb-0" style={{ fontSize: 12 }}>
                Static demo—no real payment.
              </p>
            </Form>
          ) : (
            <Alert variant="success" className="mb-0">
              <h5 className="mb-2">Payment Successful</h5>
              <div className="small">
                <div><strong>Ref:</strong> {paid.ref}</div>
                <div><strong>Amount:</strong> ₦{paid.amount.toLocaleString()}</div>
                <div><strong>Name:</strong> {paid.name}</div>
                <div><strong>Card:</strong> {paid.card}</div>
                <div><strong>Time:</strong> {paid.time}</div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <Button variant="outline-dark" onClick={() => window.print()}>Print</Button>
                <Button variant="outline-secondary" onClick={resetAll}>Make another</Button>
              </div>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

function mask(num) {
  const d = (num || "").replace(/\D/g, "");
  if (d.length <= 4) return d;
  return d.slice(0, -4).replace(/\d/g, "•").replace(/(.{4})/g, "$1 ").trim() + " " + d.slice(-4);
}
