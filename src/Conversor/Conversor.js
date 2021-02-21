import React,{useState}from 'react';
import './Conversor.css'
import Buttons from './Buttons/Index'

export default function Conversor() {
  
  const [data,setData] = useState("");
  var butTo = ('') 
  var butFor = ('')

  function Verify(props){
    if(butTo.value === 'Json' && butFor.value === 'Xml'){
      JsonForXml();
    }
    if(butTo.value === 'Json' && butFor.value === 'Csv'){
      alert('Formato Csv ainda não implementado')
    }
    if(butTo.value === 'Xml' && butFor.value === 'Csv'){
      alert('Formato Csv ainda não implementado')
    }
    if(butTo.value === 'Xml' && butFor.value === 'Json'){
      XmlForJson();
    }
    if(butTo.value === 'Csv' && butFor.value === 'Xml'){
      alert('Formato Csv ainda não implementado')
    }
    if(butTo.value === 'Csv' && butFor.value === 'Json'){
      alert('Formato Csv ainda não implementado')
    }
    if(butTo.value === butFor.value){
      alert('Conversão em formatos iguais')
    }
  }
  
  function JsonForXml(){

  }
  function XmlForJson(){

  }



  return (
   <React.Fragment>
    <div className="header">
      <h3 >Conversor</h3>
    </div>
    <div className="conversor-container">
      <div className="prev-value-container">
        <h4 className="to">To</h4>
        <div className="prev-value">
          <Buttons onClickVerify={(event)=>{butTo =event}}/>
        </div>
      </div>
      <textarea className ="value" name="value" value={data}
       cols='30' rows='10' onChange={(event)=>setData(event.target.value)}>
      {data}
      </textarea>
      <div className="next-value-container">
        <h4 className="for">For</h4>
        <div className="next-value">
          <Buttons onClickVerify= {(event)=>{butFor =event}}/>
        </div>
      </div>
      <input onClick={()=>Verify()} type="button" className='btn-convert' value="Coverter"/>
    </div>
   </React.Fragment>
  );
}

