import React,{useState} from 'react';

export default function Buttons(props){
 
  const [classe1,setClasse1] = useState('btn-option')
  const [classe2,setClasse2] = useState('btn-option')
  const [classe3,setClasse3] = useState('btn-option')
  
  const butt1 = (
    <button 
    onClick={(event) =>setClasse1(Active(event.target))} 
    name='Xml' value='' className={classe1} >Xml</button>)
    
  const butt2 = (
    <button 
    onClick={(event) =>setClasse2(Active(event.target))} 
    name='Json' value='' className={classe2} >Json</button>)
    
  const butt3 = (
    <button 
    onClick={(event) =>setClasse3(Active(event.target))} 
    name='Csv' value='' className={classe3} >Csv</button>)

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
      console.log(clas.name)
      clas.className = clas.className.includes('active') ? 'btn-option' : 'btn-option  active'; 
      clas.value = clas.value === clas.name ? '': clas.name
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