
import React from "react";
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import { appColors } from '../Colors';
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

export const ForsideCarousel = ({ slide1, slide2, slide3 }) => (
  
<ImageSpec>
  <Carousel bsPrefix='carousel' interval={5000}>
    <Carousel.Item  >
      
      <img
        className="d-block w-100"
       
        src={slide1}
        alt="First slide"
        max-height="50px;"
      />
     
      <Carousel.Caption>
        <h3>Tittel på aktivitet</h3>
        <p>Aktivitetstekst osv.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={slide2}
        alt="Third slide"
      />

      <Carousel.Caption>
      <h3>Tittel på aktivitet</h3>
        <p>Aktivitetstekst osv.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={slide3}
        alt="Third slide"
      />

      <Carousel.Caption>
      <h3>Tittel på aktivitet</h3>
        <p>Aktivitetstekst osv.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </ImageSpec>
)