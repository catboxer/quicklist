import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocalStorage=()=>{
  let list = localStorage.getItem('list');
  return (list?JSON.parse(localStorage.getItem('list')):[])

//   if(list){
//     return JSON.parse(localStorage.getItem('list'))
// } else
// {
//   return []
// }
}
function App() {
  const [name, setName]=useState('');
  const [list, setList]=useState(getLocalStorage());
  const [isEditing, setIsEditing]=useState(false);
  const [editID, setEditID]=useState(null)
  const [alert, setAlert]=useState({
    show: false, 
    msg:"", 
    type:""
  })

  const handleSubmit=((e)=>{
    e.preventDefault();
    if(!name) {
      showAlert(true, "danger","Enter Something" )
    } else if (name && isEditing){
      setList(
        list.map((item)=>{
          if (item.id===editID){
          return {...item,title:name}
        };
        return item;
      })
      )
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success','value changed')

    } else {
      showAlert(true, "success","Suxxess" )
      const newItem ={id: new Date().getTime().toString(), title:name};
      setList([...list, newItem]);
      setName('');
    }
  })

   const removeItem =((id)=>{
    showAlert(true, "danger","Deleted" );
        setList(prev=>prev.filter(item=>id!==item.id)
        )
   })

   const editItem =((id)=>{
    const specificItem = list.find(item=>id===item.id)
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title)
  })

  const showAlert = (show=false, type="", msg="")=>{
    setAlert({show,type,msg})
  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return <section className="section-center">
  <form className="grocery-form" onSubmit={handleSubmit}>
    {alert.show&&<Alert {...alert} showAlert={showAlert} list={list}/>}
    <h3>Make A List</h3>
    <div className="form-control">
      <input type="text" className='grocery' placeholder='e.g. cumin' value={name} onChange={(e)=>{
        setName(e.target.value)}}/>
      <button type="submit" className="submit-btn">
{isEditing?'edit':'submit'}
      </button>
      </div>
  </form>
    
    {list.length>0&& (
      <div className="grocery-container">
    <List items={list} removeItem={removeItem} editItem={editItem}/>
    
      <button 
      className="clear-btn"
      onClick={()=>{
        showAlert(true, "danger","List Cleared" )
        setList([])}}
      >clear items</button>

        <button 
        onClick={()=>{
         showAlert(true, "success","List Copied" )
         const printThis=(list.map((item)=>{return item.title}).join("\n"))
          navigator.clipboard.writeText(printThis)}}
          className="clear-btn">Copy items</button>

        <button 
        onClick={()=>{
         showAlert(true, "success","List Printed?" )
        window.print();}}
          className="clear-btn">Print items</button>
    
    </div>
    )}


  </section>
}

export default App
