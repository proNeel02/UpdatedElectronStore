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
// import { loginUser } from "../../services/user.services";
import { loginUser } from "../services/user.services";
import UserContext from "./context/UserContext";
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

    const [isError, setError] = useState({
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
          navigate("/");
        })
        .catch((error) => {
          // console.log(error);
          setError((Error) => {
            return {
              isError: true,
            };
          });
          toast.error("Unble to Loggin!");
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
                className="my-3 p-4 border-0 shadow"
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
                      src={"/Assets/android-icon-144x144.png"}
                      width={"75px"}
                      height={"75px"}
                      alt=""
                    />
                  </Container>
                  <h6 className="mb-4 text-center text-uppercase">
                    <b>Store Login</b>
                  </h6>

                  <Alert
                    variant="danger"
                    show={isError?.isError}
                    // onClose={() =>
                    //   setError({
                    //     erroData: null,
                    //     isError: false,
                    //   })
                    // }
                    // dismissible
                  >
                    <Alert.Heading>Hey there , </Alert.Heading>
                    <p>{"UseName or Password is incorrect!"}</p>
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

                <Card className="text-center border-0">
                  <Card.Body>
                    <h6>
                      {" "}
                      You can signup for user Experience and use Admin
                      Crendentials
                    </h6>
                    <p>Email : admin@gmail.com</p>
                    <p>password : admin123</p>
                  </Card.Body>
                </Card>
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
