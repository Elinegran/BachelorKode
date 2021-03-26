
import React from 'react'
import { render } from 'react-dom'
import KalenderComp from '../../components/Kalender/KalenderComp'
import './kal.css'


// document.addEventListener('DOMContentLoaded', function() {
//   render(
//     <DemoApp />,
//     document.body.appendChild(document.createElement('div'))
//   )
// })



export const Kalender = () => (

        <div>
        <h2>Kalender</h2>

        
        <KalenderComp />
        </div>
)