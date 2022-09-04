
import React, { useState } from 'react'
import { useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

export default function TodoListShow() {

  const [todos, setTodos] = useState(() => {
    const storeTodosLocal = JSON.parse(localStorage.getItem('todoList'))
    return storeTodosLocal
  })

  useEffect(() => {
    const jsonTodo = JSON.stringify(todos)
    localStorage.setItem('todoList', jsonTodo)
  }, [todos])

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return
    }
    const newTodos = [todo, ...todos]
    setTodos(newTodos)
  }

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const removeTodo = id => {
    const deleteTodo = window.confirm('Do you want delete this ??')
    const removeArr = todos.filter(todo => {
      if(todo.id && deleteTodo){
        return todo.id !== id
      }
      return -1
    })
    setTodos(removeArr)
  }

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return
    }
    setTodos(prev => prev.map((item) => (item.id === todoId ? newValue : item)))
  }


  return (
    <div>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  )
}
