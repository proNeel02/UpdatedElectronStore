import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Base from "./users/Base";

const SignUp = () => {
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
  });

  const clearData = () => {
    setData((data) => {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        about: "",
      };
    });
  };

  const handleChnage = (event, property) => {
    setData((data) => {
      return {
        ...data,
        [property]: event.target.value,
      };
    });
  };

  const SignUpForm = () => {
    return (
      <>
        <Container>
          {/* single Row  */}

          <Row>
            <Col sm={{ span: 8, offset: 2 }}>
              <Card
                className="my-3 shadow p-4"
                style={{
                  position: "relative",
                  top: "-20px",
                  borderRadius: "20px",
                }}
              >
                <Card.Body>
                  <Container className="text-center mb-3">
                    <img
                      src={"/Assets/logo192.png"}
                      width={"100px"}
                      height={"100px"}
                    />
                  </Container>
                  <h3 className="mb-4 text-center text-uppercase">
                    <b>Store SignUp Here</b>
                  </h3>

                  <Form>
                    {/* Name Field */}
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Enter your Name</Form.Label>
                      <Form.Control
                        onChange={(event) => handleChnage(event, "name")}
                        value={data.name}
                        type="text"
                        placeholder="Enter name"
                      />
                    </Form.Group>

                    {/* email field */}
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Enter your email</Form.Label>
                      <Form.Control
                        onChange={(event) => handleChnage(event, "email")}
                        value={data.email}
                        type="email"
                        placeholder="Enter Email"
                      />
                    </Form.Group>

                    {/* new password field */}
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Enter new password</Form.Label>
                      <Form.Control
                        onChange={(event) => handleChnage(event, "password")}
                        type="password"
                        placeholder="Enter password"
                        value={data.password}
                      />
                    </Form.Group>

                    {/* Confirm password */}
                    <Form.Group
                      className="mb-3"
                      controlId="formConfirmpassword"
                    >
                      <Form.Label>Confirm password</Form.Label>
                      <Form.Control
                        onChange={(event) =>
                          handleChnage(event, "confirmPassword")
                        }
                        value={data.confirmPassword}
                        type="password"
                        placeholder="Enter password"
                      />
                    </Form.Group>

                    {/*radio  Gender field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Select Gender</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          name="gender"
                          label="Male"
                          type={"radio"}
                          id={"gender"}
                          onClick={(event) => handleChnage(event, "gender")}
                          value={"male"}
                          checked={data.gender === "male"}
                        />

                        <Form.Check
                          inline
                          name="gender"
                          label="Female"
                          type={"radio"}
                          id={"gender"}
                          onClick={(event) => handleChnage(event, "gender")}
                          value={"female"}
                          checked={data.gender === "female"}
                        />
                      </div>
                    </Form.Group>
                    {/* TextArea */}
                    <Form.Group className="mb-3">
                      <Form.Label>Write somthing about yourself</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="write here"
                        rows={6}
                        onChange={(event) => handleChnage(event, "about")}
                        value={data.about}
                      />
                    </Form.Group>
                  </Form>

                  <Container>
                    <p className="text-center">
                      Already register<Link to="/login">login</Link>
                    </p>
                  </Container>

                  <Container className="text-center">
                    <Button className={"text-uppercase"} variant="success">
                      Register
                    </Button>
                    <Button
                      className="ms-2 text-uppercase"
                      variant="danger"
                      onClick={clearData}
                    >
                      Reset
                    </Button>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return (
    <>
      <Base
        title={"Electron Store / Signup"}
        description={"Fill the from correctly to register with Us !"}
      >
        {SignUpForm()}
      </Base>
    </>
  );
};
export default SignUp;
