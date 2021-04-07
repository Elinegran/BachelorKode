
import './App.css';
import React, { Component, useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProtectedRouteVeileder from './components/ProtectedRouteVeileder'
import ProtectedRoute from './components/ProtectedRoute'

import { Logginn } from './pages/Login/Login';
import Loggut  from './components/Logout/Loggut';
import { ForsideBruker } from './pages/ForsideBruker/ForsideBruker';
import { ForsideVeileder } from './pages/ForsideVeileder/ForsideVeileder';
import { Meldinger } from './pages/Meldinger/Meldinger';
import { Meldekort } from './pages/Meldekort/Meldekort';
import { Kalender } from './pages/Kalender/Kalender';
import { CV } from './pages/CV/CV';
import { ChatbotPage } from './pages/Chatbot/Chatbot';
import { Lenkebibliotek } from './pages/Lenkebibliotek/Lenkebibliotek';
import { FAQoversikt } from './pages/FAQ/FAQoversikt';
import { EndreFAQ } from './pages/FAQ/EndreFAQ';
import { AktivitetsOversikt } from './pages/Aktiviteter/AktivitetsOversikt';
import { EndreAktivitet } from './pages/Aktiviteter/EndreAktivitet';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { PageLine } from './components/PageLine';
import { RegBruker } from './pages/Veileder/RegBruker';
import { BrukerOversikt } from './pages/Veileder/BrukerOversikt';
import { RedigerProfil } from './pages/Bruker/RedigerProfil';
import { TidsbankBruker } from './pages/Bruker/TidsbankBruker';
import IdleTimer from "./components/IdleTimer"
import authService from './services/auth.service';

import { NoMatch } from './NoMatch';

function App() {
  //Logger brukeren ut etter x minutter inaktivitet
  const [isTimeout, setIsTimeout] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("token")) {
      const timer = new IdleTimer({
        timeout: 2, //utløper etter # sekunder
        //Callback triggered if users are in the app and have the idle timeout:
        onTimeout: () => {
          alert("Du vil nå bli logget ut på grunn av inaktivitet");
          setIsTimeout(true);
        },
        //Callback triggered if users re-open the app after expired time
        onExpired: () => {
          setIsTimeout(true);
        }
      });
      return () => {
        timer.cleanUp();
      };
    }
  }, []); 
    
  

  return (
      <React.Fragment>
      <Layout><NavigationBar /></Layout> <PageLine />
        <Layout>
          <Router>
            <Switch>
            <Route exact path="/" component={ Logginn }></Route>
            <Route path="/Loggut" component= { Loggut }></Route>
            <ProtectedRouteVeileder path="/Veileder" component={ ForsideVeileder } />
            <ProtectedRouteVeileder path="/RegBruker" component={ RegBruker } /> 
              <ProtectedRouteVeileder path="/Brukeroversikt" component={ BrukerOversikt } />
              <ProtectedRouteVeileder path="/EndreFAQ" component={ EndreFAQ } />
              <ProtectedRouteVeileder path="/EndreAktivitet" component={ EndreAktivitet } />

              <ProtectedRoute path="/Bruker" component={ ForsideBruker } />
                <ProtectedRoute path="/Profil" component={ RedigerProfil } />
                <ProtectedRoute path="/TidsbankBruker" component={ TidsbankBruker } />
                <ProtectedRoute path="/Meldinger" component={ Meldinger } />
                <ProtectedRoute path="/Meldekort" component={ Meldekort } />
                <ProtectedRoute path="/Kalender" component={ Kalender } />
                <ProtectedRoute path="/CV" component={ CV } />
                <ProtectedRoute path="/Chatbot" component={ ChatbotPage } />
                <ProtectedRoute path="/Lenkebibliotek" component={ Lenkebibliotek } />
                <ProtectedRoute path="/FAQ" component={ FAQoversikt } />
                <ProtectedRoute path="/Aktiviteter" component={ AktivitetsOversikt } />
               
                <Route component={ NoMatch }></Route>
            </Switch>
          </Router>
          <div>{isTimeout && authService.logout()} </div>
         </Layout>
        {/* <PageLine > &#169; Matchbox-Ringerike 2021 </PageLine> */}
      </React.Fragment>

    );
  }

export default App;
