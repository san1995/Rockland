/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container } from "react-bootstrap";

// core components

function LandingPageHeader() {

  return (
    <div style={{height: "100vh",
    backgroundImage:
    "url(" + "src/assets/rockbanner1.png" + ")", backgroundSize:"cover"}} className="d-flex align-items-center">
        <Container fluid>
            <div className="text-center" style={{color:"white"}}>
                <h1>Kickstart Your Rock Learning Journey</h1>
                <h3>Start learning about Rocks with us and along with our experts</h3>
                <h4>Scroll down to learn more!</h4>

            </div>
        </Container>
    </div>
  );
}

export default LandingPageHeader;
