import React from "react";
import './Footer.css'

const Footer = (props) => {
  return(
      <footer>
          <div className={"row footer p-4 align-items-center"}>
              <div className={"col"}>
                  <h5>HELP</h5>
                  <ul className={"list"}>
                      <li><a className={"li"} href={"#"}>Contact Us</a></li>
                      <li><a className={"li"}  href={"#"}>Returns & Charges</a></li>
                      <li><a className={"li"} href={"#"}>Shipping & Delivery</a></li>
                      <li><a className={"li"} href={"#"}>Order Tracking</a></li>
                      <li><a className={"li"} href={"#"}>FAQ</a></li>
                  </ul>

              </div>
              <div className={"col"}>
                  <h5>ABOUT US</h5>
                  <ul className={"list"}>
                      <li><a className={"li"} href={"#"}>About Us</a></li>
                      <li><a className={"li"} href={"#"}>Our Stores</a></li>
                      <li><a className={"li"} href={"#"}>Corporate</a></li>
                      <li><a className={"li"} href={"#"}>Career Opportunities</a></li>
                      <li><a className={"li"} href={"#"}>Corporate Support</a></li>
                  </ul>
              </div>
              <div className={"col"}>
                  <h5>POLICIES</h5>
                  <ul className={"list"}>
                      <li><a className={"li"} href={"#"}>Data Privacy & Security Policy</a></li>
                      <li><a className={"li"} href={"#"}>Terms of Use</a></li>
                  </ul>
              </div>
              <div className={"col"}>
                  <h1 className={"logo"}>LC WAIKIKI</h1>
              </div>
          </div>
      </footer>
  )
}

export default Footer;