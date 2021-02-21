import React,{useState}from 'react';
import './Conversor.css'
import Buttons from './Buttons/Index'

export default function Conversor() {
  
  const [data,setData] = useState("");
  const [response,setResponse] = useState("");
  var butIn = ('') 
  var butTo = ('')

  function Verify(props){
    if(butIn.value === 'Json' && butTo.value === 'Xml'){
      setResponse(JsonToXml());
    }
    if(butIn.value === 'Json' && butTo.value === 'Csv'){
      alert('Formato Csv ainda não implementado')
    }
    if(butIn.value === 'Xml' && butTo.value === 'Csv'){
      alert('Formato Csv ainda não implementado')
    }
    if(butIn.value === 'Xml' && butTo.value === 'Json'){
      XmlToJson();
    }
    if(butIn.value === 'Csv' && butTo.value === 'Xml'){
      alert('Formato Csv ainda não implementado')
    }
    if(butIn.value === 'Csv' && butTo.value === 'Json'){
      alert('Formato Csv ainda não implementado')
    }
    if(butIn.value === butTo.value){
      alert('Conversão em formatos iguais')
    }
  }
  
  function JsonToXml(){

  }
  function XmlToJson(){

  }
  function Clear() {
    setData("")
  }


  return (
   <React.Fragment>
    <div className="header">
      <h3 >Conversor</h3>
    </div>
    <div className="conversor-container">
      <div className="prev-value-container">
        <div className="title-emment">In</div>
        <div className="prev-value">
          <Buttons onClickVerify={(event)=>{butIn =event}}/>
        </div>
      </div>
      <textarea className ="data" name="value" value={data}
       cols='30' rows='10' onChange={(event)=>setData(event.target.value)}>
      {data}
      </textarea>
      <div className="next-value-container">
        <div className="title-emment">To</div>
        <div className="next-value">
          <Buttons onClickVerify= {(event)=>{butTo =event}}/>
        </div>
        <input className='btn-clear' onClick={()=>Clear()} type="button"  value="Clear"/>
      </div>
      </div>
      <div className="conversor-response">
      <input className='btn-convert' onClick={()=>Verify()} type="button"  value="Coverter"/>
      <div className="title-emment response-title">Response</div>
      <textarea className ="response" name="value" value={response}
        cols='30' rows='10'>
      {response}
      </textarea>
    </div>
   </React.Fragment>
  );
}

