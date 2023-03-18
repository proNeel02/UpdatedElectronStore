import React, { useState } from "react";
import {
  Alert,
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
import { loginUser } from "../../services/user.services";
import Base from "./users/Base";
const Login = () => {
  const LoginForm = () => {
    const [data, setData] = useState({
      email: "",
      password: "",
    });

    const [Error, setError] = useState({
      erroData: null,
      isError: false,
    });

    const [isLoading, setLoading] = useState(false);

    const clearData = () => {
      setData((data) => {
        return {
          email: "",
          password: "",
        };
      });
    };

    let navigate = useNavigate();

    const HandleSubmit = (event) => {
      event.preventDefault();
      // console.log(data);

      // sending data to the client
      if (data.email === undefined || data.email.trim() === "") {
        toast.error("email required!");
        return;
      }

      if (data.password === undefined || data.password.trim() === "") {
        toast.error("password required!");
        return;
      }

      // login api

      setLoading(() => true);
      loginUser(data)
        .then((serverData) => {
          console.log(serverData);
          toast.success(`logged in successful!`);

          setError((Error) => {
            return {
              erroData: null,
              isError: false,
            };
          });

          setTimeout(() => {
            navigate("/users/home");
          }, 5000);
        })
        .catch((error) => {
          console.log(error);

          setError((Error) => {
            return {
              erroData: error.response.data.message,
              isError: true,
            };
          });
          toast.error(Error.erroData);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(() => false);
          }, 5000);
        });
    };

    const HandleChange = (event, property) => {
      setData((data) => {
        return {
          ...data,
          [property]: event.target.value,
        };
      });
    };

    // console.log(data);

    return (
      <>
        <Container>
          <Row>
            <Col
              md={{
                span: 8,
                offset: 2,
              }}
            >
              <Card
                className="my-4 p-4 border-0 shadow"
                style={{
                  position: "relative",
                  top: "-80px",
                  // borderRadius: "20px",
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
                    <b>Store Login</b>
                  </h3>

                  <Alert
                    variant="danger"
                    show={Error.isError}
                    // onClose={() =>
                    //   setError({
                    //     erroData: null,
                    //     isError: false,
                    //   })
                    // }
                    // dismissible
                  >
                    <Alert.Heading>Hey there , </Alert.Heading>
                    <p>{Error.erroData}</p>
                  </Alert>
                  <Form noValidate onSubmit={HandleSubmit}>
                    {/* email login field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Enter your email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="email"
                        onChange={(event) => {
                          return HandleChange(event, "email");
                        }}
                        value={data.email}
                      />
                    </Form.Group>

                    {/* password login field */}
                    <Form.Group className="mb-3">
                      <Form.Label>Enter your password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="password"
                        onChange={(event) => {
                          return HandleChange(event, "password");
                        }}
                        value={data.password}
                      />
                    </Form.Group>

                    <Container className="text-center">
                      {/* <p className="mb-0">Forgot Password <Link to="/forgetpass">forgetpassword</Link></p> */}
                      <p>
                        If Not Member <Link to="/signup">Click here</Link>
                      </p>
                    </Container>

                    <Container className="text-center text-uppercase">
                      <Button
                        disabled={isLoading}
                        type="submit"
                        variant="primary"
                        className="me-2"
                      >
                         <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                          hidden={!isLoading}
                        />
                        <span hidden={!isLoading}>wait...</span>

                        <span hidden={isLoading}>Register</span>
                      </Button>

                      <Button variant="danger" onClick={clearData}>
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
      <Base title={"Electron Store / Login"} description={"Login Here"}>
        {LoginForm()}
      </Base>
    </>
  );
};
export default Login;
