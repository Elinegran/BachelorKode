import React from 'react'
import { CircleImgContainer } from '../../components/Forside/CircleImgContainer'
import{ ForsideCarousel} from '../../components/Forside/Carousel'
import { Row, Container } from 'react-bootstrap'
import { BigButton } from '../../components/Forside/BigButton'
import MediaQuery from 'react-responsive'
import { 
        buttonCv, 
        buttonChatbot,
        buttonLenkebibliotek, 
        circleMeldinger, 
        circleCalendar, 
        circleNavMeldekort,
        slides,
        buttonFAQ
 } from './Data' 

export const ForsideBruker = () => (
        <Container>
                {/* Runde knapper på toppen */}
                <Row style = {{ margin: 'auto'}}>
                        <CircleImgContainer { ...circleMeldinger } />
                        <CircleImgContainer { ...circleNavMeldekort } />
                        <CircleImgContainer { ...circleCalendar } />
                </Row>
        
                {/* Aktiviteter i karusell */}
                <ForsideCarousel fluid {... slides } />

                {/* Knapper nederst */}
                <MediaQuery maxWidth={992}>

                        <Row>
                                <BigButton { ...buttonCv } />
                                <BigButton { ...buttonChatbot } />
                        </Row>
                        <Row>
                                <BigButton { ...buttonLenkebibliotek } />
                                <BigButton { ...buttonFAQ } />
                        </Row>
                </MediaQuery>

                {/* Knapper nederst på skjerm over 992px (PC) - en rad istedenfor to*/}
                <MediaQuery minWidth={993}>
                        <Row>
                                <BigButton { ...buttonCv } />
                                <BigButton { ...buttonChatbot } />
                                <BigButton { ...buttonLenkebibliotek } />
                                <BigButton { ...buttonFAQ } />
                        </Row>
                </MediaQuery>
        </Container>
        
);

export default ForsideBruker;

