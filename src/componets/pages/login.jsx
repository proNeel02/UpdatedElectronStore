import React, { useContext, useState } from "react";
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
// import { doLoginLocalStorage } from "../../auth/helper.auth";
import { loginUser } from "../../services/user.services";
import UserContext from "../context/UserContext";
import Base from "./users/Base";
const Login = () => {
  const LoginForm = () => {
    // console.log(data);

    const navigate = useNavigate();

    const userContext = useContext(UserContext);

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
          // console.dir(serverData);
          toast.success(`Welcome ${serverData?.user?.name}`);

          setError((Error) => {
            return {
              erroData: null,
              isError: false,
            };
          });

          //setting useState to the true in context
          //telling every child of the provider function
          // that this use is logged in.....
          //with the help of context api..
          //below setLogin is useState function which is
          //defined inside UserProvider component in file called user.provider.js
          // const [isLogin, setIsLogin] = useState(false);

          // userContext.setIsLogin(() => true);
          // userContext.setUserData((oldData) => {
          //   return serverData;
          // });
          userContext.login(serverData);
          // console.log("Hello from Login");
          // console.dir(serverData);
          navigate("/users/home");
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
          setLoading(() => false);
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
                  borderRadius: "100px",
                }}
              >
                {/* {JSON.stringify(userContext)} */}
                <Card.Body>
                  <Container className="text-center">
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
                        If Not Member{" "}
                        <Link to="/signup" style={{ textDecoration: "none" }}>
                          Click here
                        </Link>
                      </p>
                    </Container>

                    <Container className="text-center text-uppercase">
                      <Button
                        size="lg"
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

                        <span hidden={isLoading}>Login</span>
                      </Button>

                      <Button size="lg" variant="danger" onClick={clearData}>
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
