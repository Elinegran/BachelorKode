import React from "react";
import { Button } from "react-bootstrap";
import { Container, Image } from 'react-bootstrap';
import styled from 'styled-components';
import {appColors} from '../Colors';
export const CircleContainer = styled.div`
    
    margin: auto;
    width: 30%;
    @media screen and (min-width:992px) {
       
        width: 25%;
    }


`
export const CircleInfo = styled.div`
    margin: auto;
    display:block;
    pointer: yes;
    width:auto;
    height:auto;
   
    border-radius:50%;
    -moz-border-radius:50%;
    -webkit-border-radius:50%;
    -khtml-border-radius: 50%;
    background:#fff;
    border: 2px solid ${ appColors.primaryLighter};
    box-shadow: 0 5px 5px rgba(0,0,0,.5);
    text-align:center;
    position: relative;
    cursor: pointer;
    color: #666;
    text-align: center;
    
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
    padding: 5%;
   
    :hover {
        
        box-shadow: 0 25px 25px rgba(0,0,0,.5);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
        padding: 9%;
    }
    @media screen and (min-width:481px) and (max-width: 767px){
        padding: 15%;
    }
    @media screen and (min-width:768px) {
        padding: 15%;
    }

`

export const ImgWrapper = styled.div`
    margin: auto;
    max-width: 2.1rem;

   
    @media screen and (min-width: 360px) and (max-width: 480px) {
        max-width: 3.3rem;
    }
    @media screen and (min-width:481px) and (max-width: 767px){
        max-width: 4rem;
    }
    @media screen and (min-width:768px) and (max-width: 991px){
        max-width: 5rem;
    }
    @media screen and (min-width: 992px)  {
        max-width: 8rem;
    }
`

export const NumberContainer = styled.div`
    font-size: 10px;
    text-align: center;
    margin: auto;
    ${CircleInfo}:hover & {
        transform: scale(1.1);
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        text-decoration:none;
    }
    @media screen and (min-width: 360px) and (max-width: 480px) {
        font-size: 12px;
    }
    @media screen and (min-width:481px) and (max-width: 767px){
        font-size: 16px;
    }
    @media screen and (min-width: 767px)  {
        font-size: 22px;
    }
    
`
export const ButtonLabel = styled.div`
    font-size: 14px;
    text-align: center;
    margin: auto;
    font-weight: bold;
    margin-bottom: 15px;
    ${CircleContainer}:hover & {
        transform: scale(1.0);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        text-decoration: underline;
    }
    @media screen and (min-width:481px) and (max-width: 991px){
        font-size: 20px;
    }
    @media screen and (min-width: 992px)  {
        font-size: 22px;
    }
    
`



export const CircleImgContainer = ({ img, alt, buttonLabel, subText, path }) => (
    
    <CircleContainer >
    <CircleInfo >
    <Button bsPrefix='CircleContainer' href={ path }>
        <ImgWrapper><Image  src={img} alt={alt} fluid /></ImgWrapper>
        <NumberContainer>{subText}</NumberContainer>
      
       </Button> 
    </CircleInfo>
    <ButtonLabel>{ buttonLabel } </ButtonLabel>
    
    </CircleContainer>
   
    )
