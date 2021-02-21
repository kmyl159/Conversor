import React,{useEffect, useState} from 'react';

export default function Buttons(){
 
  const [classe1,setClasse1] = useState('btn-option')
  const [classe2,setClasse2] = useState('btn-option')
  const [classe3,setClasse3] = useState('btn-option')
  
  const butt1 = (<button onClick={(event) =>setClasse1(Active(event.target))} key='Xml'
                  value='Xml' className={classe1}>Xml</button>)
  const butt2 = (<button onClick={(event) =>setClasse2(Active(event.target))} key='Json'
                  value='Json' className={classe2}>Json</button>)
  const butt3 = (<button onClick={(event) =>setClasse3(Active(event.target))} key='Csv'
                  value='Csv' className={classe3}>Csv</button>)

  useEffect(()=>
    butt1,butt2,butt3
  ,[classe1,classe2,classe3])
 
function Active(clas){
    try{
      clas.className = clas.className.includes('active') ? 'btn-option' : 'btn-option  active'; 
      return clas.className
    }catch(err){
      console.log(err)
    }
  }
  
  return(
    <React.Fragment>
        {(butt1)}
        {butt2}
        {butt3}
    </React.Fragment>
  )
}