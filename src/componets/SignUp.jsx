import React, { useState } from "react";
import { Slide } from "react-toastify";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../services/user.services";
import Base from "./users/Base";

const SignUp = () => {
  const [maleCheck, setMaleCheck] = useState(false);
  const [femaleCheck, setFemaleCheck] = useState(false);

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
  });

  const [errorData, setErrorData] = useState({
    isError: false,
    errorDisplay: null,
  });

  const [isLoader, setLoader] = useState(false);

  const navigate = useNavigate();

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

    setErrorData((errorData) => {
      return {
        isError: false,
        errorDisplay: null,
      };
    });
  };

  const handleChange = (event, property) => {
    setData((data) => {
      return {
        ...data,
        [property]: event.target.value,
      };
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    //validate data

    if (data.name === undefined || data.name.trim() === "") {
      toast.error("Name is required!!!");

      return;
    }

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("Email is required!!!");

      return;
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("Password is required!!!");

      return;
    }

    if (
      data.confirmPassword === undefined ||
      data.confirmPassword.trim() === ""
    ) {
      toast.error("Confirm Password is required!!!");

      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm password are not match");

      return;
    }

    // below registerUser comming from services/user.services
    // we are passing data object from front end
    setLoader(true);
    registerUser(data)
      //userData is response coming from back end
      // useData is object comming from backend
      .then((userData) => {
        setLoader(false);
        console.log(userData);
        clearData();
        toast.success("SingUp Successful!!");

        navigate("/login");
        toast("Welcome To Electron Store!!", {
          autoClose: 5000,
          position: "top-left",
          transition: Slide,
        });
      })

      .catch((error) => {
        setLoader(false);

        setErrorData((errorData) => {
          return {
            ...errorData,
            isError: true,
            errorDisplay: error,
          };
        });

        // console.dir(error);
        toast.error("Error in creating user! Try again");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleCheck = (entity) => {
    console.log("handleCheck");
    if (entity === "male") {
      setMaleCheck(true);
      setFemaleCheck(false);
    } else {
      setMaleCheck(false);
      setFemaleCheck(true);
    }
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
                  top: "-80px",
                  borderRadius: "100px",
                }}
              >
                <Card.Body>
                  <Container className="text-center">
                    <img
                      src={"/Assets/android-icon-144x144.png"}
                      width={"100px"}
                      height={"100px"}
                      alt=""
                    />
                  </Container>
                  <h6 className="mb-4 text-center text-uppercase">
                    <b>Store SignUp</b>
                  </h6>

                  <Form noValidate onSubmit={formSubmit}>
                    {/* Name Field */}
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Enter your Name</Form.Label>

                      <Form.Control
                        onChange={(event) => handleChange(event, "name")}
                        value={data.name}
                        type="text"
                        placeholder="Enter name"
                        isInvalid={errorData.errorDisplay?.response?.data?.name}
                      />

                      <Form.Control.Feedback type="invalid">
                        {errorData.errorDisplay?.response?.data?.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* email field */}
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Enter your email</Form.Label>
                      <Form.Control
                        onChange={(event) => handleChange(event, "email")}
                        value={data.email}
                        type="email"
                        placeholder="Enter Email"
                        isInvalid={
                          errorData.errorDisplay?.response?.data?.email
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errorData.errorDisplay?.response?.data?.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* new password field */}
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Enter new password</Form.Label>
                      <Form.Control
                        onChange={(event) => handleChange(event, "password")}
                        type="password"
                        placeholder="Enter password"
                        value={data.password}
                        isInvalid={
                          errorData.errorDisplay?.response?.data?.password
                        }
                      />

                      <Form.Control.Feedback type="invalid">
                        {errorData.errorDisplay?.response?.data?.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Confirm password */}
                    <Form.Group
                      className="mb-3"
                      controlId="formConfirmpassword"
                    >
                      <Form.Label>Confirm password</Form.Label>
                      <Form.Control
                        onChange={(event) =>
                          handleChange(event, "confirmPassword")
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
                          id={"male"}
                          value="male"
                          checked={maleCheck}
                          onChange={() => handleCheck("male")}
                          // defaultChecked
                          onClick={(event) => handleChange(event, "gender")}
                        />

                        <Form.Check
                          inline
                          name="gender"
                          label="Female"
                          type={"radio"}
                          id={"female"}
                          value="female"
                          checked={femaleCheck}
                          onChange={() => handleCheck("female")}
                          onClick={(event) => handleChange(event, "gender")}
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
                        onChange={(event) => handleChange(event, "about")}
                        value={data.about}
                        isInvalid={
                          errorData.errorDisplay?.response?.data?.about
                        }
                      />

                      <Form.Control.Feedback type="invalid">
                        {errorData.errorDisplay?.response?.data?.about}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Container>
                      <p className="text-center">
                        Already register
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          login
                        </Link>
                      </p>
                    </Container>

                    <Container className="text-center">
                      <Button
                        disabled={isLoader}
                        type="submit"
                        className={"text-uppercase"}
                        variant="success"
                        size="lg"
                      >
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                          hidden={!isLoader}
                        />
                        <span hidden={!isLoader}>wait...</span>

                        <span hidden={isLoader}>Register</span>
                      </Button>
                      <Button
                        size="lg"
                        className="ms-2 text-uppercase"
                        variant="danger"
                        onClick={clearData}
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
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
