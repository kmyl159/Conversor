
export default class Convert {
  
  JsonToXml(props){
    try {
      if(props !== ''){
        props = this.JsonValidate(props);
        props = this.cleanJson(props)
        props = this.toXml(props)
        return props
      }
    } catch (err) {
      console.log(err)
    }
    
  }//ok
  JsonToCsv(props){
    try {
      if(props!== ''){
        props = props !== '' ? this.JsonValidate(props): props;
        props = this.cleanJson(props)
        props = this.toCsv(props)
        return props
      }
    }catch(err){
      console.log(err)
    }
  }//ok

  XmlToJson(props){
    try{
      if(props!==''){
        props = this.XmlValidate(props)
        props = this.cleanXML(props)
        props = this.toJson(props)
        return props
      }
    }catch(err){
      console.log(err)
    }
  }//ok
  XmlToCsv(props){
    try{
      if(props!==''){
        props = this.XmlValidate(props)
        props = this.cleanXML(props)
        props = this.toCsv(props) 
        return props    
      }
    }catch(err){
      console.log(err)
    }
  }//ok

  CsvToJson(props){
    try{
      if(props!==''){
        props  = this.CsvValidate(props);
        props = this.cleanCsv(props)
        props = this.toJson(props)
        return props
      }
    }catch(err){
      console.log(err)
    }
  }//ok
  CsvToXml(props){
    try{
      if(props!==''){
        props  = this.CsvValidate(props);
        props = this.cleanCsv(props)
        props = this.toXml(props)
        return props
      }
    }catch(err){
      console.log(err)
    }
  }//ok



  cleanXML(props){
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
  XmlValidate(props){
    if(props.includes('<?xml version="1.0" encoding="UTF-8" ?>')&&
      props.includes('</root>')&&
      props.includes('<root>')){
        return props
      }else{
        alert('Xml não é válido')
      }
  }//ok
  toXml(props){
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

   return response
  }//ok


  cleanCsv(props) {
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
  CsvValidate(props){
    if( props.includes('"')&&
        props.includes(',')){
      return props
    }else{
      alert('Csv não é válido')
    }
  }//ok
  toCsv(props){
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
    
    var response = ''
    response += Csv[0]
    response += Csv[1]

   return response
  }//ok


  cleanJson(props){
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
  JsonValidate(props){
    try{
      var jsonLocal = JSON.parse(props)
    }catch(err){
      alert('JSON inserido é inválido')
    }
    return jsonLocal
  }//ok
  toJson(props){
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

    
    return(Json)
  }//ok
 
}