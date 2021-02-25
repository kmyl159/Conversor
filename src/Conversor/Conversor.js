import React,{useState}from 'react';
import './Conversor.css'
import Buttons from './Buttons/Index'

export default function Conversor() {
  
  const [data,setData] = useState("");
  const [response,setResponse] = useState("");
  const [butIn,setButIn] = useState("");
  const [butTo,setButTo] = useState("");
  var text = ('')

  function Verify(){
    console.log(butIn)
    console.log(butTo)
    if(butIn === 'Json' && butTo === 'Xml'){
      JsonToXml();
    }
    if(butIn === 'Json' && butTo === 'Csv'){
      JsonToCsv();
    }
    if(butIn === 'Xml' && butTo === 'Csv'){
      XmlToCsv();
    }
    if(butIn === 'Xml' && butTo === 'Json'){
      XmlToJson();
    }
    if(butIn === 'Csv' && butTo === 'Xml'){
      CsvToXml();
    }
    if(butIn === 'Csv' && butTo === 'Json'){
      CsvToJson();
    }
    if(butIn === undefined || butIn === ''|| butTo === undefined || butTo === ''){
      alert('Insira 2 opções de conversão')
    }
    if(butIn === butTo && butIn !== undefined && butIn !== ''){
      alert('Conversão em formatos iguais')
    }
  }
  
  function JsonToXml(){
    text =  Empty(text);
    text = text !== '' ? JsonValidate(text): text;
    
  }
  function JsonToCsv(){
    text =  Empty(text);
    text = text !== '' ? JsonValidate(text): text;
    
    var names = Object.keys(text)
    var value = Object.values(text)
    //motando linha de propiedades
    
    var propiedadesCsv =['']
    var valoresCsv =['']
    var indice = 0
    
    for(let i = 0; i< value.length; i++){
      // se Values que contem arrays divide o value em string
      if(JSON.stringify(value[i]).includes('{')){
       var valuesSplit = JSON.stringify(value[i]).split('"')

        var buscarPor = [":","{",",","}"]
        buscarPor.forEach(busca => {
          let indice = valuesSplit.indexOf(busca);
          while(indice >= 0){
              valuesSplit.splice(indice, 1);
              indice = valuesSplit.indexOf(busca);
          }
        });
        
        //atribui a string a um objeto
        const objectValue = {}
        for(let j =0; j < valuesSplit.length;j++){
          if(j % 2 ===0){
            objectValue[names[i] + '__' + valuesSplit[j]] = valuesSplit[j+1]
          }
        }
        //pega as chaves do objeto
        var objectValueKey = Object.keys(objectValue)
        var objectValueValue = Object.values(objectValue)
        //adiciona propiedades
        for(let j =0; j < objectValueKey.length;j++){
          if( indice === value.length -1 && j === objectValueKey.length -1 
            &&objectValueKey[j].includes(names[names.length - 1])){
            propiedadesCsv[0] += '"' + objectValueKey[j] +'"'
            
          }else if(objectValueKey[j].includes(names[i])){
            propiedadesCsv[0] += '"' + objectValueKey[j] +'",'
          }
        }
        //adiciona VALORES
        for(let j =0; j < objectValueKey.length;j++){
          if( indice === value.length -1 && j === objectValueKey.length -1 
            &&objectValueKey[j].includes(names[names.length - 1])){
            valoresCsv[0] += '"' + objectValueValue[j] +'"'
            
          }else if(objectValueKey[j].includes(names[i])){
            valoresCsv[0] += '"' + objectValueValue[j] +'",'
          }
        }
        
        
        indice++
      }else{
        // se values n tem arrays
        //adiciona propiedades
        if(indice === value.length -1){
          propiedadesCsv[0] += '"' + names[indice] + '"' 
        }else if(names[indice] === names[i]){
          propiedadesCsv[0] += '"' + names[indice] + '",' 
        }
        //adiciona valores
        if(indice === value.length -1){
          valoresCsv[0] += '"' + value[indice] + '"' 
        }else if(names[indice] === names[i]){
          valoresCsv[0] += '"' + value[indice] + '",' 
        }
        //adiciona valores
        indice++
      }
    }
    setResponse(propiedadesCsv + valoresCsv)
   
  }

  function XmlToJson(){
    Empty();
    try{

    }catch(err){
      console.log(err)
    }
  }
  function XmlToCsv(){
    Empty();
    try{

    }catch(err){
      console.log(err)
    }
  }

  function CsvToJson(){
    Empty();
    try{

    }catch(err){
      console.log(err)
    }
  }
  function CsvToXml(){
    Empty();
    try{

    }catch(err){
      console.log(err)
    }
  }





  function JsonValidate(props){
    try{
      var jsonLocal = JSON.parse(props)
    }catch(err){
      alert('JSON inserido é inválido')
    }
    return jsonLocal
  }
  function Empty(props){
    props = data;
    if(props === ''){
      alert('Campo de conversão vazio')
    }
    return props;
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
          <Buttons onClickVerify={(event)=>{setButIn(event.value)}}/>
        </div>
      </div>
      <textarea className ="data" name="value" value={data}
                placeholder="Digite o texto para conversão"
                cols='30' rows='10' onChange={(event)=>setData(event.target.value)}>
              {data}
      </textarea>
      <div className="next-value-container">
        <div className="title-emment">To</div>
        <div className="next-value">
          <Buttons onClickVerify= {(event)=>{setButTo(event.value)}}/>
        </div>
        <button className='btn-clear' onClick={()=>Clear()}>Clear</button>
      </div>
    </div>
    <div className="conversor-response">
      <button className='btn-convert' onClick={()=>Verify()}>Converter</button>
      <div className="title-emment response-title">Response</div>
      <textarea className ="response" name="value" defaultValue={response} cols='30' 
          readOnly={true} rows='10' placeholder="Texto convertido"> 
      </textarea>
    </div>
   </React.Fragment>
  );
}

