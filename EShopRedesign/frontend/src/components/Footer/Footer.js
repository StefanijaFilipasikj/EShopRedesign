import React from "react";
import './Footer.css'

const Footer = (props) => {
  return(
      <footer>
          <div className={"row footer align-items-center"}>
              <div className={"col"}>
                  <h5>ABOUT US</h5>
                  <ul className={"list"}>
                      <li><a className={"li"} href={"#"}>Made By:</a></li>
                      <li><a className={"li"} href={"#"}>Jana Trpkovska</a></li>
                      <li><a className={"li"} href={"#"}>Stefanija Filipasikj</a></li>
                  </ul>
              </div>
              <div className={"col"}>
                  <h5>HELP</h5>
                  <ul className={"list"}>
                      <li><a className={"li"} href={"#"}>Contact Us</a></li>
                      <li><a className={"li"}  href={"#"}>Returns & Charges</a></li>
                      <li><a className={"li"} href={"#"}>Shipping & Delivery</a></li>
                  </ul>
              </div>
              <div className={"col"}>
                  <h5>POLICIES</h5>
                  <ul className={"list"}>
                      <li><a className={"li"} href={"#"}>Data Privacy</a></li>
                      <li><a className={"li"} href={"#"}>Security Policy</a></li>
                      <li><a className={"li"} href={"#"}>Terms of Use</a></li>
                  </ul>
              </div>
              <div className={"col"}>
                  <a href="/"><h1 className={"logo"}>LC WAIKIKI</h1></a>
              </div>
          </div>
      </footer>
  )
}

export default Footer;