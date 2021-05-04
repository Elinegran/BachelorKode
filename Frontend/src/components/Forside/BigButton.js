//Utviklet av: Gruppe 2
import React from "react";
import { Image, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {appColors} from '../Colors'
import {Responsive} from '../Responsive'
export const ButtonFrame = styled.div`
    max-width: 47%;
    min-height: 120px;
    display:block;
    float:left;
    padding: 3%;
    width:auto;
    height:auto;
    border-radius:5%;
    -moz-border-radius:5%;
    -webkit-border-radius:5%;
    -khtml-border-radius: 5%;
    background:#fff;
    border: 2px solid ${ appColors.primaryColor};
    box-shadow: 0 11px 10px rgba(0,0,0,.5);
    text-align:center;
    position: relative;
    margin: auto;
    margin-top: 7px;
    margin-bottom: 25px;
    
    .btn {
        background-color: white;
        border:none;
        color: black;
    }

    :hover {
        box-shadow: 0 25px 35px rgba(0,0,0,.5);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        
    }
    @media screen and (min-width:992px) {
       
        width: 22%;
    }



`
export const ImgWrapper = styled.div`
margin-left: auto;
margin-right: auto;
padding: 5px;
max-width: 100%;
align: center;
max-height: 50px;
${ButtonFrame}:hover & {
    transform: scale(1.2);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    
}
${Responsive.mini}{
   
    max-height: 65px;
}
${Responsive.medium}{
    max-height: 75px;
}
${Responsive.stor}{
    max-height: 95px;
}
${Responsive.pc} {
    max-height: 75px;
}

`
export const ButtonLabel = styled.div`
    margin-top: 25px;
    font-size: 12px;
    font-weight: bold;
    ${ButtonFrame}:hover & {
        transform: scale(1.2);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        text-decoration: underline;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
        margin-top: 35px;
        font-size: 16px;
    }
    @media screen and (min-width:481px) and (max-width: 767px){
         margin-top: 45px;
         font-size: 16px;
    }
    @media screen and (min-width:768px) and (max-width: 991px){
        margin-top: 75px;
        font-size: 20px;
     }
     @media screen and (min-width: 992px)  {
        font-size: 20px;
    }
         
`


export const BigButton = ({ img, buttonLabel, path }) => (
    <ButtonFrame>
         <Button bsPrefix='btn' href={ path }>
        <ImgWrapper> <Image  fluid src={img} /> </ImgWrapper>
        <ButtonLabel> { buttonLabel} </ButtonLabel>
        </Button>
    </ButtonFrame>

    )