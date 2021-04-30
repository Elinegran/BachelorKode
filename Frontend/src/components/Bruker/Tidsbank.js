import React, { useState, useEffect } from "react";
import { Badge } from 'react-bootstrap'
import { Chart } from 'react-charts'
import Axios from 'axios';
import AuthService from '../../services/auth.service';
import { Responsive } from '../Responsive';
import styled from 'styled-components';
const ResponsiveContainer = styled.div`
margin-top: 20px;
      width: 280px;
      height: 200px;
        ${Responsive.mini}{
          width: 100%;
          height: 200px;
      }
        ${Responsive.medium}{
          width: 100%;
          height: 200px;
      }
        ${Responsive.tablet}{
          width: 100%;
          height: 300px;
        }
        ${Responsive.pc}{
          width: 100%;
          height: 400px;
        }
      .primaryColor {
        
        color: #6ac2ee
      }
      .secondaryColor {
        color: #fc8181
      }


    
`


const InlineContainer = styled.div`
      margin-top: 20px;
      text-size: 14px;
      display: flex;
`
const BadgePrimary = styled.div`
.badge {
  margin-left: 4px;
  color: #6ac2ee;
}
`
const BadgeSecondary = styled.div`
.badge {
  margin-left: 4px;
  color: #fc8181;
}
`
export const TidsbankChart = function TidsbankChart({ id }) {
  const [TidsbankAlt, setTidsbankAlt] = React.useState('')
  const [TidsbankMonthly, setTidsbankMonthly] = React.useState('')
  console.log("Grafid" + id);
  const [getTrue, setGetTrue] = React.useState(false);
  const [getAvgTrue, setGetAvgTrue] = React.useState(false);
  // Brukerens tidsbank månedlig
  const [Januar, setJanuar] = React.useState('');
  const [Februar, setFebruar] =  React.useState('');
  const [Mars, setMars] =  React.useState('');
  const [April, setApril] =  React.useState('');
  const [Mai, setMai] =  React.useState('');
  const [Juni, setJuni] =  React.useState('');
  const [Juli, setJuli] =  React.useState('');
  const [August, setAugust] =  React.useState('');
  const [September, setSeptember] =  React.useState('');
  const [Oktober, setOktober] =  React.useState('');
  const [November, setNovember] =  React.useState('');
  const [Desember, setDesember] =  React.useState('');

  // Gjennomsnitt tidsbank månedlig
  const [AvgJanuar, setAvgJanuar] = React.useState('');
  const [AvgFebruar, setAvgFebruar] =  React.useState('');
  const [AvgMars, setAvgMars] =  React.useState('');
  const [AvgApril, setAvgApril] =  React.useState('');
  const [AvgMai, setAvgMai] =  React.useState('');
  const [AvgJuni, setAvgJuni] =  React.useState('');
  const [AvgJuli, setAvgJuli] =  React.useState('');
  const [AvgAugust, setAvgAugust] =  React.useState('');
  const [AvgSeptember, setAvgSeptember] =  React.useState('');
  const [AvgOktober, setAvgOktober] =  React.useState('');
  const [AvgNovember, setAvgNovember] =  React.useState('');
  const [AvgDesember, setAvgDesember] =  React.useState('');

  var idbruker = id;

  function getTidsbankMonthlyNum(){
    Axios.get("http://localhost:3001/api/tidsbankGetMonthly",
    {params: 
            {
        idbruker : id 
            }
    }
    ).then((response) => {
      if(response.data[0] != null) {
    setTidsbankMonthly(response.data[0].tid);
      }

//   console.log(response.data);
  }
    )
}
function getTidsbankAltNum(){
    Axios.get("http://localhost:3001/api/tidsbankGetAll",
    {params: 
            {
        idbruker : id 
            }
    }
    ).then((response) => {
      if(response.data[0] != null) {
    setTidsbankAlt(response.data[0].totaltid);
      }
//   console.log(response.data);
  }
    )
}
  function getTidsbankAverage(){
    setGetAvgTrue(true);
    Axios.get("http://localhost:3001/api/tidsbankMonthlyAverage").then((response) => {
      if(response.data[0] != null) {
      setAvgJanuar((response.data[0].AvgJan/60)/60);
      setAvgFebruar((response.data[0].AvgFeb/60)/60);
      setAvgMars((response.data[0].AvgMar/60)/60);
      setAvgApril((response.data[0].AvgApr/60)/60);
      setAvgMai((response.data[0].AvgMay/60)/60);
      setAvgJuni((response.data[0].AvgJun/60)/60);
      setAvgJuli((response.data[0].AvgJul/60)/60);
      setAvgAugust((response.data[0].AvgAug/60)/60);
      setAvgSeptember((response.data[0].AvgSep/60)/60);
      setAvgOktober((response.data[0].AvgOct/60)/60);
      setAvgNovember((response.data[0].AvgNov/60)/60);
      setAvgDesember((response.data[0].AvgDec/60)/60);
    }
  }
    )
  }
function getTidsbankMonthly(idbruker){
  setGetTrue(true);
  console.log("bruker function:" + idbruker)
  Axios.get("http://localhost:3001/api/tidsbankMonthlyMinutes",
  {params: 
          {
      idbruker : idbruker 
          }
  }
  ).then((response) => {
    if(response.data[0] != null) {
    setJanuar((response.data[0].Januar/60)/60);
    setFebruar((response.data[0].Februar/60)/60);
    setMars((response.data[0].Mars/60)/60);
    setApril((response.data[0].April/60)/60);
    setMai((response.data[0].Mai/60)/60);
    setJuni((response.data[0].Juni/60)/60);
    setJuli((response.data[0].Juli/60)/60);
    setAugust((response.data[0].August/60)/60);
    setSeptember((response.data[0].September/60)/60);
    setOktober((response.data[0].Oktober/60)/60);
    setNovember((response.data[0].November/60)/60);
    setDesember((response.data[0].Desember/60)/60);
    }
}
  )
}
if (getTrue==true) {  }
else {
  getTidsbankMonthly(idbruker)
  getTidsbankMonthlyNum(idbruker)
  getTidsbankAltNum(); 
}
if (getAvgTrue==true) {}
else {(getTidsbankAverage());}
const data = React.useMemo(
  () => [
  {
    label: 'Timer',
    data: [
      ['Januar', Januar ],
      ['Februar', Februar],
      ['Mars', Mars],
      ['April', April], 
      ['Mai', Mai], 
      ['Juni', Juni],
      ['Juli', Juli],
      ['August', August], 
      ['September', September], 
      ['Oktober', Oktober], 
      ['November', November], 
      ['Desember', Desember]
    ]},
  {
    label: 'Timer',
    data: [
      ['Januar',AvgJanuar ],
      ['Februar', AvgFebruar],
      ['Mars', AvgMars],
      ['April', AvgApril], 
      ['Mai', AvgMai], 
      ['Juni', AvgJuni],
      ['Juli', AvgJuli],
      ['August', AvgAugust], 
      ['September', AvgSeptember], 
      ['Oktober', AvgOktober], 
      ['November', AvgNovember], 
      ['Desember', AvgDesember]
    ]}
]);
const axes = React.useMemo(
  () => [
    { primary: true, type: 'ordinal', position: 'bottom' },
    { type: 'linear', position: 'left' },
  ],
  []
)

    return (
      <ResponsiveContainer>
         <div className="App text-center"><h1>Tidsbank</h1></div>
                <p>Timer denne måned:<Badge bsPrefix='badge' variant="secondary"> { TidsbankMonthly } </Badge></p>
                <p>Timer totalt: <Badge bsPrefix='badge' variant="secondary">{ TidsbankAlt } </Badge></p>
        <InlineContainer>Trend (timer) for tidsbank:

        <BadgePrimary><Badge bsPrefix='badge' variant="secondary">Bruker</Badge></BadgePrimary>
        <BadgeSecondary><Badge bsPrefix='badge' variant="secondary">Gjennomsnitt</Badge></BadgeSecondary></InlineContainer>
        <Chart key={id.toString()} data={data} axes={axes} />

      </ResponsiveContainer>
  )

}
  
