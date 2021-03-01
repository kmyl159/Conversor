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
  }//ok
  
  function JsonToXml(){
    try {
      text =  Empty(text);
      text = text !== '' ? JsonValidate(text): text;
      text = cleanJson(text)
      toXml(text)
    } catch (err) {
      console.log(err)
    }
    
  }//ok
  function JsonToCsv(){
    try {
      text =  Empty(text);
      text = text !== '' ? JsonValidate(text): text;
      text = cleanJson(text)
      toCsv(text)
    }catch(err){
      console.log(err)
    }
  }//ok

  function XmlToJson(){
    try{
      text = Empty(text);
      text = XmlValidate(text)
      text = cleanXML(text)
      toJson(text)
    }catch(err){
      console.log(err)
    }
  }//ok
  function XmlToCsv(){
    try{
      text = Empty(text)
      text = XmlValidate(text)
      text = cleanXML(text)
      toCsv(text)     
    }catch(err){
      console.log(err)
    }
  }//ok

  function CsvToJson(){
    try{
      text  = Empty(text);
      text  = CsvValidate(text);
      text = cleanCsv(text)
      toJson(text)
    }catch(err){
      console.log(err)
    }
  }//ok
  function CsvToXml(){
    try{
      text  = Empty(text);
      text  = CsvValidate(text);
      text = cleanCsv(text)
      toXml(text)
    }catch(err){
      console.log(err)
    }
  }//ok



  function cleanXML(props){
    try{
      //retirando caracters
      props = props.split(">")
      props = String(props).split("</")
      props = String(props).split("\n")
      props = String(props).split("\t")
      props = String(props).split(",")
      
      //retirando elementos
      var buscarPor = [""," ",'root',"<root",'<?xml version="1.0" encoding="UTF-8" ?']
      buscarPor.forEach(busca => {
        let indice = props.indexOf(busca);
        while(indice >= 0){
          props.splice(indice, 1);
          indice = props.indexOf(busca);
        }
      }); 
      //retirando repetidos
      for(let i = 0; i<props.length;i++){
        for(let j = i+1; j<props.length;j++){
          if( props[i] === '<' + props[j] && j - i <= 2){
            props.splice(j,1)
          }
        }
      }
      var xml = []
      var XmlNames = []
      var XmlValues = []
      //adicionando nome e valores as variaveis
      for(let i = 0; i<props.length;i++){
        if(i%2 ===0){
          XmlNames.push(props[i])
        }else{
            XmlValues.push(props[i])
          }
        for(let j = i+1; j<props.length;j++){
          if( props[i] === '<' + props[j] && j - i > 2){
            XmlValues.push('')
            for(let x = i+1,div = x%2;x < j;x++){
              if(div ===0){
                if(x%2===0){
                  XmlNames.push(props[x])
                }else{
                  XmlValues.push(props[x])
                }
              }else{
                if(x%2!==0){
                  XmlNames.push(props[x])
                }else{
                  XmlValues.push(props[x])
                }
              }
              i =x+1
            }
          }
        }
      }
    
      XmlNames.forEach(name=>{
        xml.push(name.substr(1,name.length))
      })
      XmlValues.forEach(value =>{
        xml.push(value)
      })
      
      return xml

    }catch(err){
      console.log(err)
    }
  }//ok
  function XmlValidate(props){
    if(props.includes('<?xml version="1.0" encoding="UTF-8" ?>')&&
      props.includes('</root>')&&
      props.includes('<root>')){
        return props
      }else{
        alert('Xml não é válido')
      }
  }//ok
  function toXml(props){
    var XmlNames = []
    var XmlValues = []
    var Xml = []
    Xml.push('<?xml version="1.0" encoding="UTF-8" ?>\n')
    Xml.push('\t<root>\n')

    var divisor = props.length % 2  === 0 ? props.length : props.length - 1
    
    //dividindo nomes
    for(let i = 0; i < divisor / 2;i++){
      XmlNames.push(props[i])
    } 
    //dividindo valores       
    for(let i = (divisor / 2); i < divisor;i++){
      XmlValues.push(props[i])
    }  
    
    //montando array
    for(let i = 0; i < XmlNames.length ;i++){
      //imprime tabulação
      if(i > lastEmpty && XmlNames[i] !== '' && XmlValues[i] !== '' ){
        Xml.push(`\t\t\t<${XmlNames[i]}>${XmlValues[i]}</${XmlNames[i]}>\n`)
      }else if(XmlNames[i] !== '' && XmlValues[i] !== '' ){// coloca padrão
        Xml.push(`\t\t<${XmlNames[i]}>${XmlValues[i]}</${XmlNames[i]}>\n`)
      }else{
        Xml.push(`\t\t<${XmlNames[i]}>\n`)
        var lastEmpty = i

        for(let j = i+ 1; j < XmlNames.length ;j++){
          if(XmlValues[j] === '' && XmlValues[i] === XmlValues[j]){
            Xml.push(`\t\t</${XmlNames[i]}>\n`)
          }
        }
      }
      if( i === XmlNames.length -1){
        Xml.push(`\t\t</${XmlNames[lastEmpty]}>\n`)
        Xml.push('\t</root>')
      }
    }

    var response = ''
    response += Xml
    response = response.replaceAll(',','')

    setResponse(response)
  }//ok


  function cleanCsv(props) {
    try{
      //retirando caracteres
      props = props.split('"')
      var buscarPor = ["",'\n',",",null,undefined]
      buscarPor.forEach(busca => {
        let indice = props.indexOf(busca);
        while(indice >= 0){
            props.splice(indice, 1);
            indice = props.indexOf(busca);
        }
      }); 
      
      var csv = []
      var csvValue = []
      var csvNames = []
      var tempName = ''

      var divisor = props.length % 2  === 0 ? props.length : props.length - 1

      //motando nomes
      for(let i = 0; i < divisor / 2 ;i++){
        csvNames[i] = props[i]  
      }
      //motando valores
      for(let i = ( divisor / 2), j = 0; i <divisor;i++,j++){
        csvValue[j] = props[i]
      }
      //modificando array
      for(let i = 0; i <=csvNames.length ;i++){
        //verificar se tem __
        if(String(csvNames[i]).includes('__')){
          //pegar palavra anterior
          tempName = csvNames[i].substr(0,csvNames[i].indexOf('_'))
          //add nos nomes
          csvNames.splice(i,0,tempName)
          //add nos valores nulo
          csvValue.splice(i,0,'')
          //tirar do restante do for a palavra anterior
          for(let j = 0; j <=csvNames.length ;j++){
            if(String(csvNames[j]).includes(tempName + '__')){
              csvNames[j] = csvNames[j].substr(csvNames[j].indexOf('_') + 2, csvNames[j].length)
            }
          }
        }
      }  
      //compilando array
      csvNames.forEach(name =>{
        csv.push(name)
      })
      csvValue.forEach(value =>{
        csv.push(value)
      })
      return csv

    }catch(err){
      console.log(err)
    }
  }//ok
  function CsvValidate(props){
    if( props.includes('"')&&
        props.includes(',')){
      return props
    }else{
      alert('Csv não é válido')
    }
  }//ok
  function toCsv(props){
    //variaveis de modificação
    var CsvNames = []
    var CsvValues = []
    var CsvN = []
    var CsvV = []
    var Csv = ['']
     Csv[0] = ['']
     Csv[1] = ['']
    var tempName = ''

    var divisor = props.length % 2  === 0 ? props.length : props.length - 1
    
    //dividindo nomes
    for(let i = 0; i < divisor / 2;i++){
      CsvNames.push(props[i])
    } 
    //dividindo valores       
    for(let i = (divisor / 2); i < divisor;i++){
      CsvValues.push(props[i])
    }  

    //montando array
    for(let i = 0; i < CsvNames.length ;i++){
      if(i ===CsvNames.length -1 && CsvNames[i] !== '' && CsvValues[i] !== ''){
        CsvN.push(`"${CsvNames[i]}"`)
        CsvV.push(`"${CsvValues[i]}"`)
      }else if(CsvNames[i] !== '' && CsvValues[i] !== ''){
       CsvN.push(`"${CsvNames[i]}",`)
       CsvV.push(`"${CsvValues[i]}",`)
      }
      if(CsvValues[i] === ''){
        tempName = CsvNames[i]
        //names
        for(let j = i+1; j <  CsvNames.length && CsvValues[j+1] !== '' ;j++){
          CsvNames[i] = ''
          if(j === CsvNames.length - 1 || CsvValues[j+1] === ''  ){
            CsvN.push(`"${tempName}__${CsvNames[j]}"`)
          }else{
            CsvN.push(`"${tempName}__${CsvNames[j]}",`)
          }
          CsvNames[j] = ''
        }
        //values
        for(let j = i+1; j <  CsvNames.length && CsvValues[j+1] !== '' ;j++){
          if(j === CsvNames.length - 1 || CsvValues[j+1] === ''  ){
          CsvV.push(`"${CsvValues[j]}"`)
          }else{
            CsvV.push(`"${CsvValues[j]}",`)
          }
        }
      }
    }
    //compilando 
    CsvN.forEach(name =>{
      Csv[0] += name 
    })
    CsvV.forEach(value =>{
      Csv[1] += value 
    })

    setResponse(Csv)
  }//ok


  function cleanJson(props){
    try {
      //retirando caracters
      props = JSON.stringify(props).split('"')
      props = String(props).split(':')
      props = String(props).split(',')
      var buscarPor = ['',"  ",null,undefined]
      buscarPor.forEach(busca => {
        let indice = props.indexOf(busca)
        while(indice >= 0){
          props.splice(indice, 1)
          indice = props.indexOf(busca)
        }
      })
      props.splice(0, 1)

      //variaveis de modificação
      var JsonValues = [] 
      var JsonNames = [] 
      var Json = [] 

    
      //adicionando nome e valores as variaveis
      for(let i = 0; i<props.length;i++){
        if(i%2 ===0){
          JsonNames.push(props[i])
        }else{
          JsonValues.push(props[i])
        }
        for(let j = i+2; j<props.length;j++){
          if(props[i+1] === '{'  && props[j].includes('}')){
            JsonValues.push('')
            i++
            for(let x = i+1,div = x%2;x < j;x++){
              if(div ===0){
                if(x%2===0){
                  JsonNames.push(props[x])
                }else{
                  JsonValues.push(props[x])
                }
              }else{
                if(x%2!==0){
                  JsonNames.push(props[x])
                }else{
                  JsonValues.push(props[x])
                }
              }
              i =x+1
            }
          } 
        }
      }

      //compilando vetor

      JsonNames.forEach(name=>{
        Json.push(name)
      })
      JsonValues.forEach(value=>{
        Json.push(value)
      })

     
      
      return Json
      
    } catch (err) {
      console.log(err)
    }
  }//ok
  function JsonValidate(props){
    try{
      var jsonLocal = JSON.parse(props)
    }catch(err){
      alert('JSON inserido é inválido')
    }
    return jsonLocal
  }//ok
  function toJson(props){
    //variaveis de modificação
    var JsonNames = []
    var JsonValues = []
    var JsonN = []
    var Json = ['']
    var lastEmpty = ''

    var divisor = props.length % 2  === 0 ? props.length : props.length - 1
    
    //dividindo nomes
    for(let i = 0; i < divisor / 2;i++){
      JsonNames.push(props[i])
    } 
    //dividindo valores       
    for(let i = (divisor / 2); i < divisor;i++){
      JsonValues.push(props[i])
    }  

    //montando array
    Json[0]+= ('{ \n')
    for(let i = 0; i < JsonNames.length ;i++){
      if(i === JsonNames.length - 1 && JsonNames[i]!=='' && JsonValues[i]!==''){
        Json[0] +=(`\t"${JsonNames[i]}":"${JsonValues[i]}"`)
      }else if(JsonNames[i]!=='' && JsonValues[i]!==''){
        Json[0] += (`\t"${JsonNames[i]}":"${JsonValues[i]}",\n`)
        
      }
      if(JsonValues[i]===''){
        Json[0] += (`\t"${JsonNames[i]}": {\n`)
        lastEmpty = i
        
        for(let j = i+1; j < JsonNames.length && JsonValues[j] !=='' ;j++){
          JsonN[j] = JsonNames[j]
          JsonNames[j] = ''
          if(j === JsonNames.length - 1 || JsonValues[j+1] === ''  ){
            Json[0] += (`\t\t"${JsonN[j]}":"${JsonValues[j]}"\n`)
          }else{
            Json[0] += (`\t\t"${JsonN[j]}":"${JsonValues[j]}",\n`)
          }
          if(JsonValues[j+1] === '' && JsonValues[lastEmpty] === JsonValues[j+1]){
            Json[0] += (`\t\n } \n`)
          }
        }
      }
      if( i === JsonNames.length -1 && lastEmpty !== ''){
        Json[0] += (`\t } \n`)
        Json[0] += (`}`)
      }
    }

    
    setResponse(Json)
  }//ok


  function Empty(props){
    props = data;
    if(props === ''){
      alert('Campo de conversão vazio')
    }
    return props;
  }//ok
  function Clear() {
    setData("")
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
            <button className='btn-clear' onClick={()=>Clear()}>Clear</button>
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

