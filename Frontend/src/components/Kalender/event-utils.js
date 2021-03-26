import axios from 'axios';
import React from 'react';
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today




// componentDidMount() {
//     axios.get(`http://localhost:3001/api/kalenderAlleAvtaler`)
//       .then(res => {
//         const avtaler = res.data;
//         this.setState({ avtaler });
//       })
//   };


  // axios.get(`http://localhost:3001/api/kalenderAlleAvtaler`)
  //   .then(res => {
  //     export const avtaler = res.data;
  //     console.log(avtaler);
  //   })

  

 

export const avtaler = [
  {
    id: 1,
    title: 'heihei',
    start: '2021-03-12'
  },
  {
    id: 2,
    title: 'ny test',
    start: '2021-03-15T14:17:00.000Z'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

//export default {avtaler};


