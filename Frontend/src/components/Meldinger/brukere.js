import React from 'react';

import axios from 'axios';

export default class Brukerliste extends React.Component {
  state = {
    brukere: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/brukerGetAll`)
      .then(res => {
        const brukere = res.data;
        this.setState({ brukere });
      })
  }

  render() {
    return (
      <ul>
        { this.state.brukere.map(bruker => <li>{bruker.fornavn}</li>)}
      </ul>
    )
  }
}