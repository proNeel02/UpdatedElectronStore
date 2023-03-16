import React from "react";
import Base from "./users/Base";
const Services = () => {
  return (
    <Base
      title={"Services we provide"}
      description={
        'In this page we will discuss about the services we provide.'
          }
      buttonEnabled={true}
      buttonText={"Back To Home"}
      buttonType="warning"
      buttonLink={'/'}
    >
      <h1>This is Services page</h1>
    </Base>
  );
};

export default Services;
