import React from 'react';
import './Conversor.css'
import Buttons from './Buttons/Index'

export default function Conversor() {
  return (
   <React.Fragment>
    <div className="header">
      <h3 >Conversor</h3>
    </div>
    <div className="conversor-container">
      <div className="prev-value-container">
        <h4 className="to">To</h4>
        <div className="prev-value">
          <Buttons />
        </div>
      </div>
      <textarea className ="value" name="value" id="value" cols="30" rows="10">
      </textarea>
      <div className="next-value-container">
        <h4 className="for">For</h4>
        <div className="next-value">
          <Buttons />
        </div>
      </div>
    </div>
   </React.Fragment>
  );
}

