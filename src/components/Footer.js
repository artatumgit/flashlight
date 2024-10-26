import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>

      <Container>
        <Row>
          <Column>
            <Heading>About</Heading>
            <FooterLink href="">Footer stuff</FooterLink>
			<FooterLink href="">Immutable library</FooterLink>
			<FooterLink href="">Developers</FooterLink>
          </Column>
          <Column>
            <Heading>Contact</Heading>
          </Column>
          <Column>
            <Heading>Build</Heading>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  X
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;