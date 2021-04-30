import React from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import MediaQuery from "react-responsive";
import styled from 'styled-components';
import Logo from '../assets/images/logo.png'
import ProfilePic from '../assets/images/Forside/icon_profile.png';
import authService from "../services/auth.service";

const Styles = styled.div`
    
    .navbar{
        background-color: #fff;        
    }
  
    .navbar-brand, .navbar-nav .nav-link {
        color: #010606;
        &:hover {
            color:#bbb;
        }
    }  
    
`;

export const ImgWrap = styled.div`
    max-width: 100px;

    
    
`
export const LogoWrap = styled.img`
    max-width: 100%;
    margin: 0 0 0px 0;
    padding-right: 0;
    `

export const Img = styled.img`
    max-width: 50px;
   
`
export const ProfileWrapper = styled.div`
    
`  

var getAccessToken = authService.getToken();
var view = false;

if(getAccessToken){
  view=true;
}


export const NavigationBar = () => (
    <Styles>
        <Navbar collapseOnSelect expand="xxl">
            <Navbar.Brand href="/">
                <ImgWrap>
                    <LogoWrap src={Logo} alt="Logo"></LogoWrap>
                </ImgWrap>
            </Navbar.Brand>
           
            <MediaQuery minWidth={ 0 }>
           
            {getAccessToken && 
            <Navbar.Toggle>
            <Img src={ProfilePic} fluid ></Img>
            </Navbar.Toggle>}

            <Navbar.Collapse >
        
                <Nav className="ml-auto">
                    <Nav.Item><NavDropdown.Divider className="header-divider" /></Nav.Item>
                    <Nav.Item><Nav.Link href="/Profil">Profil</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/TidsbankBruker">Tidsbank</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Loggut">Logg ut</Nav.Link></Nav.Item>

                    <Nav.Item><NavDropdown.Divider className="header-divider" /></Nav.Item>

                    <Nav.Item><Nav.Link href="/Meldinger">Meldinger</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Meldekort">Meldekort</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Kalender">Kalender</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/CV">CV</Nav.Link></Nav.Item>

                    <Nav.Item><NavDropdown.Divider className="header-divider" /></Nav.Item>

                    <Nav.Item><Nav.Link href="/Aktiviteter">Aktiviteter</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Chatbot">Chatbot</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Lenkebibliotek">Lenkebibliotek</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/FAQ">FAQ</Nav.Link></Nav.Item>
                </Nav>
            
            </Navbar.Collapse>
            </MediaQuery> 
          
        </Navbar>

        
    </Styles>
)