import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Base from "./users/Base";
import axios from "axios";
const Index = () => {

  const handleClick = () => {
   toast.success("Toast Successful!!");
  };

  const handleAPI = () =>{
    toast.info("Getting Data From Server");

    axios.get('http://www.localhost:9090/users')
    .then( (response) => {
      // console.log(response.data);
      toast.success("request done");
    })
    .catch( (err) => {
      console.log(err);
      toast.error("somthing went wrong");
    });

  };

  return (
    <>
      <Base
        title={"Shop What You Need"}
        description={
          "Welcome To Trending Store A retail establishment used for the selling consumer electronic products such as televisions, telephones, and personal computers"
        }
        buttonEnabled={true}
        buttonText={"Start Shopping"}
        buttonType={"primary"}
      >
        <h1>Working On home Page</h1>

        <Button className="btn btn-success" onClick={handleClick}>
          Tostify Success
        </Button>

        <Button variant="primary" onClick={ handleAPI }>Get Data from Fake API</Button>
      </Base>
    </>
  );
};

export default Index;
