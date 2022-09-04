import React, { useState } from 'react'
import TodoForm from './TodoForm'


export default function Todo({ todos, completeTodo, removeTodo, updateTodo }) {

  const [edit, setEdit] = useState({})

  const editTodo = (todo)=>{
    localStorage.setItem('tempValue',todo.text)
    setEdit({id: todo.id, value: todo.text, isComplete : todo.isComplete})
  }

  const submitUpdate = value=>{
    updateTodo(edit.id, value)
    setEdit({
      id:null,
      value:''
    })
  }
    if(edit.id){
      return <TodoForm edit={edit} onSubmit = {submitUpdate}/>
    }
  

  return todos.map((todo,index) => (
     <div key={index} className={todo.isComplete ?'todo-row complete' : 'todo-row'}>
      <div className='todoText'>
        {todo.text}
      </div>
      <div className='icons'>
        <input 
          style={{height:25, width: 25, borderRadius: 20}}
          type="checkbox"
          onChange={() => completeTodo(todo.id)}
           checked={todo.isComplete}
        />
        <button onClick={()=> editTodo(todo)} className='btn-hover color-main'>Edit</button>
        <button onClick={()=>removeTodo(todo.id)}   className='btn-hover color-main delete'>X</button>
      </div>
    </div>
  )
  )
}


       