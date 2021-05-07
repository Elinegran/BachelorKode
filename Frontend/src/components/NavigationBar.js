//Utviklet av: Gruppe 2
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
`

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
var viewLoggut = false;
var getRole = authService.getRole();
var isVeilAuth;
var getPswstatus = authService.getPswstatus();
    if(getAccessToken){
    view=true;
    if(getPswstatus === '0') {
        view = false;
        viewLoggut= true;
    }
        if(getRole === '2') {
            isVeilAuth=true;
        }
        else{
            isVeilAuth=false;
        }
    }

export const NavigationBar = () => (
    <Styles>
        <Navbar collapseOnSelect expand="xxl">
            {isVeilAuth ? 
            <Navbar.Brand href="/Veileder"> 
                <ImgWrap>
                    <LogoWrap src={Logo} alt="Logo"></LogoWrap>
                </ImgWrap>
            </Navbar.Brand>
            : <Navbar.Brand href="/Bruker"> 
            <ImgWrap>
                <LogoWrap src={Logo} alt="Logo"></LogoWrap>
            </ImgWrap>
        </Navbar.Brand>}

           
            <MediaQuery minWidth={ 0 }>
            {/* Hvis brukeren ikke har endret passord */}
            {viewLoggut && 
            <Navbar.Toggle>
                <Img src={ProfilePic} fluid ></Img>
            </Navbar.Toggle>}
            {viewLoggut && 
            <Navbar.Collapse >
        
                <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/Loggut">Logg ut</Nav.Link></Nav.Item>
                </Nav>
            
            </Navbar.Collapse>
            }
            {/* Vanlig navbar etter brukeren har endret passord første gang */}
            {view && 
            <Navbar.Toggle>
            <Img src={ProfilePic} fluid ></Img>
            </Navbar.Toggle>}
            {view && 
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
                    {isVeilAuth && <Nav.Item><Nav.Link href="/EndreAktivitet">Legg til og endre aktiviteter</Nav.Link></Nav.Item>}
                    {isVeilAuth &&<Nav.Item><NavDropdown.Divider className="header-divider" /></Nav.Item>}
                    <Nav.Item><Nav.Link href="/Chatbot">Matchbot</Nav.Link></Nav.Item>
                    {isVeilAuth && <Nav.Item><Nav.Link href="/EndreChatbot">Legg til og endre Matchbot</Nav.Link></Nav.Item> }
                    {isVeilAuth &&<Nav.Item><Nav.Link href="/ChatbotLogg">Matchbotlogg</Nav.Link></Nav.Item> }
                    {isVeilAuth &&<Nav.Item><NavDropdown.Divider className="header-divider" /></Nav.Item>}
                    {isVeilAuth && <Nav.Item><Nav.Link href="/LenkebibliotekV">Endre lenkebibliotek</Nav.Link></Nav.Item>}
                    <Nav.Item><Nav.Link href="/Lenkebibliotek">Lenkebibliotek</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/FAQ">FAQ</Nav.Link></Nav.Item>
                    {isVeilAuth && <Nav.Item><Nav.Link href="/EndreFAQ">Legg til og endre FAQ</Nav.Link></Nav.Item> }
                </Nav>
            
            </Navbar.Collapse>
            }
            </MediaQuery>           
        </Navbar>
    </Styles>
)