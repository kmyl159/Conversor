import React,{useState}from 'react';
import './Index.css'
import Buttons from './Buttons/Index'
import Convert from '../Classes/converter'

export default function Conversor() {
  
  const [data,setData] = useState("");
  const [response,setResponse] = useState("");
  const [butIn,setButIn] = useState("");
  const [butTo,setButTo] = useState("");
  var text = ('')
  const convt = new Convert()

  function Verify(){
    
    if(butIn === 'Json' && butTo === 'Xml'){
      text= data
      setResponse(convt.JsonToXml(text));
    }
    if(butIn === 'Json' && butTo === 'Csv'){
      text=data
      setResponse(convt.JsonToCsv(text));
    }
    if(butIn === 'Xml' && butTo === 'Csv'){
      text=data
      setResponse(convt.XmlToCsv(text))
    }
    if(butIn === 'Xml' && butTo === 'Json'){
      text=data
      setResponse(convt.XmlToJson(text));
    }
    if(butIn === 'Csv' && butTo === 'Xml'){
      text=data
      setResponse(convt.CsvToXml(text))
    }
    if(butIn === 'Csv' && butTo === 'Json'){
      text=data
      setResponse(convt.CsvToJson(text));
    }
    if(butIn === undefined || butIn === ''|| butTo === undefined || butTo === ''){
      alert('Insira 2 opções de conversão')
    }
    if(butIn === butTo && butIn !== undefined && butIn !== ''){
      alert('Conversão em formatos iguais')
    }
  }//ok

  return (
   <main className='conversor'>
    <div className="header">
      <h3 >Conversor</h3>
    </div>
    <div className="conversor-container">
      <div className="prev-value-container">
        <div className="title-emment">In</div>
        <div className="prev-value">
          <Buttons onClickVerify={(event)=>{setButIn(event.value)}}/>
        </div>
      </div>
      <div className="area">
        <textarea className ="data" name="value" value={data}
                  placeholder="Digite o texto para conversão"
                  cols='30' rows='10' onChange={(event)=>setData(event.target.value)}>
                {data}
        </textarea>
        
      </div>
      <div className="next-value-container">
        <div className="title-emment">To</div>
        <div className="next-value">
          <Buttons onClickVerify= {(event)=>{setButTo(event.value)}}/>
        </div>
      </div>
    </div>
    <div className="conversor-response">
      <div className="response-title">Response
          <div className="clear-convert">
            <button className='btn-clear' onClick={()=>setData('')}>Clear</button>
            <button className='btn-convert' onClick={()=>Verify()}>Converter</button>
         </div>
      </div>
      <textarea className ="response" name="value" defaultValue={response} cols='30' 
          readOnly={true} rows='10' placeholder="Texto convertido"> 
      </textarea>
    </div>
   </main>
  );
}

