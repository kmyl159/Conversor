import React,{useEffect, useState} from 'react';

export default function Buttons(props){
 
  const [classe1,setClasse1] = useState('btn-option')
  const [classe2,setClasse2] = useState('btn-option')
  const [classe3,setClasse3] = useState('btn-option')
  
  const butt1 = (
    <button 
    onClick={(event) =>setClasse1(Active(event.target))} 
    key='Xml' value='Xml' className={classe1} >Xml</button>)
    
  const butt2 = (
    <button 
    onClick={(event) =>setClasse2(Active(event.target))} 
    key='Json' value='Json' className={classe2} >Json</button>)
    
  const butt3 = (
    <button 
    onClick={(event) =>setClasse3(Active(event.target))} 
    key='Csv' value='Csv' className={classe3} >Csv</button>)

function ActiveVerify(){
  if(!butt1.props.className.includes('active')){
    setClasse2('btn-option')
    setClasse3('btn-option')
  }
  if(!butt2.props.className.includes('active')){
      setClasse1('btn-option')
      setClasse3('btn-option')
  }
  if(!butt3.props.className.includes('active')){
    setClasse1('btn-option')
    setClasse2('btn-option')
  }
}
function Active(clas){
    try{
      ActiveVerify()
      clas.className = clas.className.includes('active') ? 'btn-option' : 'btn-option  active'; 
      props.onClickVerify(clas)
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