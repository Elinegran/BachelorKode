import React from 'react'
import { CircleImgContainer } from '../../components/Forside/CircleImgContainer'
import{ ForsideCarousel} from '../../components/Forside/Carousel'
import { Row, Container } from 'react-bootstrap'
import { BigButton } from '../../components/Forside/BigButton'
import MediaQuery from 'react-responsive'
import { 
        buttonNyAktivitet, 
        buttonLenkebibliotek, 
        circleMeldinger, 
        circleCalendar, 
        circleBrukeroversikt,
        slides,
        buttonFAQ,
        buttonRegBruker
 } from './Data'
export const ForsideVeileder = () => (
        <Container>
                {/* Runde knapper på toppen */}
                <Row style = {{ margin: 'auto'}}>
                        <CircleImgContainer { ...circleMeldinger} />
                        <CircleImgContainer  { ...circleBrukeroversikt}  />
                        <CircleImgContainer { ...circleCalendar}  />
                </Row>
        
                {/* Aktiviteter i karusell */}
                <ForsideCarousel fluid {... slides }/>

                {/* Knapper nederst */}
                <MediaQuery maxWidth={992}>
                        <Row>
                                <BigButton { ...buttonNyAktivitet }/>
                                <BigButton { ...buttonRegBruker }/>
                        </Row>
                        <Row>
                                <BigButton { ...buttonLenkebibliotek }/>
                                <BigButton { ...buttonFAQ } />
                        </Row>
                </MediaQuery>

                {/* Knapper nederst på skjerm over 992px (PC) - en rad istedenfor to*/}
                <MediaQuery minWidth={992}>
                        <Row>
                                <BigButton { ...buttonNyAktivitet }/>
                                <BigButton { ...buttonRegBruker }/>
                                <BigButton { ...buttonLenkebibliotek }/>
                                <BigButton { ...buttonFAQ } />
                        </Row>
                </MediaQuery>
        </Container>
        
)

