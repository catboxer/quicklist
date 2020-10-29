import React from 'react'
import { TiEdit, TiTrash } from 'react-icons/ti'
const List = ({items, editItem, removeItem}) => {
 
  return <div className="grocery-list">
    {items.map((item)=>{
      const {id, title}=item;
      return (
        <article key={id} className='grocery-item'>
        <p className="title">{title}</p>
        <div className="btn-container">
          <button onClick={()=>{editItem(id)}} type="button" className="edit-btn">
            <TiEdit/> 
          </button>
          <button onClick={()=>{removeItem(id)}} type="button" className="delete-btn">
            <TiTrash/> 
          </button>
        </div>
        </article>
      )
    })}
  </div>
}

export default List
