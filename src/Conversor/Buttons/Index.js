import React from 'react';

export default function Buttons(props){
  const butt = [];
  const values = ['Xml','Json','Csv'];
  values.forEach(value=>{
    butt.push(
      <button onClick={() =>{}}
      key={value}
      value={value}
      className='btn-option'
      >
      {value}
      </button>
    )
  })
  return(
    <React.Fragment>
        {butt}
    </React.Fragment>
  )
}