//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap';
import moment from 'moment';
import styled from 'styled-components';
import { appColors } from '../Colors';
import slide1 from '../../assets/images/Bruker/box_ico.png'
export const ImageSpec = styled.div`

    @width: 450px;
@height: 250px;

.carousel {
  width: @width;
  height: @height;
  background: #f2f2f2;
  margin-bottom: 15px;
  border: 2px solid ${ appColors.primaryColor};
  .carousel-item {
    overflow: hidden;

    img {
      object-fit: scale-down;
      max-height: 170px;
      max-width: 100%;
      left: 20%;
      position: relative;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);

      @media screen and (min-width: 992px)  {
        max-height: 250px;
        max-width: 100%;
      }
    }
  }
  .carousel-caption { color: black;}
}

.carousel-indicators li {
  background-color: #5edbdb; 
}

`


export const ForsideCarousel = function ForsideCarousel({testdata}) {
  const [aktivitetsList, setAktivitetsList] = useState([]);
useEffect(() => {
  Axios.get("http://localhost:3001/api/getAktivitetMax3").then((response) => {
      setAktivitetsList(response.data);
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
