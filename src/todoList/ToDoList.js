import React, { useEffect, useRef, useState } from 'react'

export default function ToDoList() {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')
  const inputRef = useRef()
  const editRef = useRef()
  const [error, setError] = useState('')


  useEffect(() => {
    const temp = localStorage.getItem('todos')
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem('todos', temp)

  }, [todos])



  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo.trim()=== ''){
      setError('* please enter this field')
    }else{
      setError('')
      inputRef.current.focus()
      const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
      }
  
      setTodos([...todos].concat(newTodo))
      setTodo('')
    }
  }

  const deleteTodo = (id) => {
    const updatedTodo = [...todos.filter(todo => todo.id !== id)]
    setTodos(updatedTodo)
  }

  const toggleComplete = (id) => {
    const updateTodos = [...todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })]
    setTodos(updateTodos)
  }

  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText('')
  }

  const style = {
    marginTop: 20,
    width: '50%',
    marginLeft: '370px',
    display: 'flex',
  }
  return (
    <div style={{ marginTop: '50px' }}>

      <form onSubmit={handleSubmit}>
        <input
          className='form-control form-input'
          placeholder='Add todo...'
          type='text'
          autoFocus
          ref={inputRef}
          value={todo}

          onChange={(e) => setTodo(e.target.value)}
        />
        <button type='submit' className='btn-hover color-main' style={{marginBottom: 0}}>Add Todo</button>
        <p className='errorTodo'><small>{error ? error : ''}</small></p>
      </form>
      <ul>
        {todos.map(todo => <li key={todo.id} style={style}>
          {
            todoEditing === todo.id
              ? (<input type="text"
                ref={editRef}
                onChange={e => setEditingText(e.target.value)}
                value={editingText}
              />)
              : (<div>{todo.text} &nbsp; &nbsp;</div>)
          }
          {
            todoEditing === todo.id
              ? (<button onClick={() => editTodo(todo.id)}>Submit Edits </button>)

              : (<>
                <input type="checkbox"
                  onChange={() => toggleComplete(todo.id)}
                  checked={todo.completed}
                />
                <button onClick={() => { setTodoEditing(todo.id) }}>Edit Toto</button>
                &nbsp; &nbsp;
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>)
          }
        </li>)}
      </ul>

    </div>
  )
}
