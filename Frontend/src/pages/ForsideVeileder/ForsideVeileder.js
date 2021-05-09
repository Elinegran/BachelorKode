//Utviklet av: Gruppe 2
import React from 'react'
import { CircleImgContainer } from '../../components/Forside/CircleImgContainer'
import { ForsideCarousel } from '../../components/Forside/Carousel'
import { Row, Container } from 'react-bootstrap'
import { BigButton } from '../../components/Forside/BigButton'
import MediaQuery from 'react-responsive'
import { CenterModal } from '../../components/Modal';
import { 
        buttonEndreAktivitet,
        buttonLenkebibliotekV,
        // buttonLenkebibliotek,   
        buttonEndreChatbot, 
        circleMeldinger, 
        circleCalendar, 
        circleBrukeroversikt,
        slides,
        buttonEndreFAQ,
        buttonRegBruker
 } from './Data'

export const ForsideVeileder = () => (
        <Container>
                <CenterModal />
                {/* Runde knapper på toppen */}
                <Row style = {{ margin: 'auto'}}>
                        <CircleImgContainer { ...circleMeldinger } />
                        <CircleImgContainer { ...circleBrukeroversikt } />
                        <CircleImgContainer { ...circleCalendar } />
                </Row>
        
                {/* Aktiviteter i karusell */}
                <ForsideCarousel fluid {... slides }/>

                {/* Knapper nederst */}
                <MediaQuery maxWidth={992}>
                        <Row>
                                <BigButton { ...buttonRegBruker}/>
                                <BigButton { ...buttonEndreAktivitet }/>
                        </Row>
                        <Row>
                                <BigButton { ...buttonEndreChatbot }/>
                                <BigButton { ...buttonEndreFAQ } />
                        </Row>

                        <Row>
                                <BigButton { ...buttonLenkebibliotekV }/>
                                {/* <BigButton { ...buttonLenkebibliotek }/>   */}
                        </Row>
                       
                </MediaQuery>

                {/* Knapper nederst på skjerm over 992px (PC) - en rad istedenfor to*/}
                <MediaQuery minWidth={992}>
                        <Row>
                                <BigButton { ...buttonRegBruker} />
                                <BigButton { ...buttonEndreAktivitet } />
                                <BigButton { ...buttonEndreChatbot } />
                                <BigButton { ...buttonEndreFAQ } />
                                <BigButton { ...buttonLenkebibliotekV }/>
                                {/* <BigButton { ...buttonLenkebibliotek } /> */}
                        </Row>
                </MediaQuery>
        </Container>  
          
);

export default ForsideVeileder;

