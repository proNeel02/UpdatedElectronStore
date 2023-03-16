import React from "react";
import { Container } from "react-bootstrap";

const Footer = () =>{

    return (
        <>
            <Container fluid className="bg-dark p-5 text-white text-center">
      
            <h3>We provide best Products</h3>
            <p>All rights reserved - <b>Electron Tech</b> <img src={'/Assets/output-onlinegiftools.gif'} width={'30px'} height={'30px'}/></p>
            </Container>
        </>
    );
}
export default Footer; 