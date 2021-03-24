
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ForsideBruker } from './pages/ForsideBruker/ForsideBruker';
import { ForsideVeileder } from './pages/ForsideVeileder/ForsideVeileder';
import { Meldinger } from './pages/Meldinger/Meldinger';
import { Meldekort } from './pages/Meldekort/Meldekort';
import { Kalender } from './pages/Kalender/Kalender';
import { CV } from './pages/CV/CV';
import { Chatbot } from './pages/Chatbot/Chatbot';
import { Lenkebibliotek } from './pages/Lenkebibliotek/Lenkebibliotek';
import { FAQ } from './pages/FAQ/FAQ';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout'; 
import { NavigationBar } from './components/NavigationBar';
import { PageLine } from './components/PageLine';
class App extends Component {
  render() {
  return (
      <React.Fragment>
        
        <Layout><NavigationBar /></Layout> <PageLine />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={ ForsideBruker }></Route>
              <Route path="/Veileder" component={ ForsideVeileder }></Route>
              <Route path="/Meldinger" component={ Meldinger }></Route>
              <Route path="/Meldekort" component={ Meldekort }></Route>
              <Route path="/Kalender" component={ Kalender }></Route>
              <Route path="/CV" component={ CV }></Route>
              <Route path="/Chatbot" component={ Chatbot }></Route>
              <Route path="/Lenkebibliotek" component={ Lenkebibliotek }></Route>
              <Route path="/FAQ" component={ FAQ }></Route>
              <Route component={ NoMatch }></Route>
            </Switch>
          </Router>
        </Layout>
        <PageLine > &#169; Matchbox-Ringerike 2021 </PageLine>
      </React.Fragment>
    );
  }
}
export default App;
