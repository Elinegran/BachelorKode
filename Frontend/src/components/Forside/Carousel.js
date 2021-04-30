
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap';
import moment from 'moment';
import styled from 'styled-components';
import { appColors } from '../Colors';
import slide1 from '../../assets/images/Forside/slide3.jpg'
export const ImageSpec = styled.div`

    @width: 450px;
@height: 250px;

.carousel {
  width: @width;
  height: @height;
  background:#fff;
  margin-bottom: 15px;
  border: 2px solid ${ appColors.primaryColor};
  .carousel-item {
    overflow: hidden;

    img {
      object-fit: cover;
      max-height: 170px;
      max-width: 100%;
      left: 50%;
      position: relative;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);

      @media screen and (min-width: 992px)  {
        max-height: 250px;
        max-width: 100%;
      }
    }
  }
  .carousel-caption { color: #fff;}
}
`


export const ForsideCarousel = function ForsideCarousel() {
  const [aktivitetsList, setAktivitetsList] = useState([]);

useEffect(() => {
  Axios.get("http://localhost:3001/api/getAktivitetMax3").then((response) => {
      setAktivitetsList(response.data);
      console.log(response.data)
  });
}, []);


  return (
<div>
  <Link to='/aktiviteter'>
<ImageSpec>
  <Carousel bsPrefix='carousel' interval={5000}>
  {aktivitetsList.map((val) => {return (
    <Carousel.Item  >
      
      <img
        className="d-block w-100"
       
        src={slide1}
        alt="First slide"
        max-height="50px;"
      />
     
      <Carousel.Caption>
        <h3>{val.tittel}</h3>
        <p>{moment(val.dato).format("DD/MM/YYYY")}  kl: {val.tidspunktformat}</p>
        <p>{ val.sted}</p>
      </Carousel.Caption>
    </Carousel.Item>
     )})}
  </Carousel>
  </ImageSpec> 
  </Link>
  </div>
);
}
