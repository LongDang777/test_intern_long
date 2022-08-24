import React, { useEffect, useRef, useState } from 'react'

export default function ToDoList() {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')
  const inputRef = useRef()
  const editRef = useRef()

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
    inputRef.current.focus()
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo('')
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
          style={{ marginBottom: '30px' }}
          type='text'
          ref={inputRef}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type='submit'>Add Todo</button>
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