import React, { useEffect, useRef, useState } from 'react'

export default function TodoForm(props) {

  const [input, setInput] = useState(props.edit ? props.edit.value : '')
  const inpRef = useRef()

  const handleChange = e => {
    setInput(e.target.value)
  } 

  const handleSubmit = e => {
    e.preventDefault()
 
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      isComplete: false
    })
    
    //reset
    setInput('')
    inpRef.current.focus()
    localStorage.clear(oldValue);
  }
  // value cũ trước khi edit
  const oldValue = localStorage.getItem('tempValue');

  return (
    <form className='todo__form' onSubmit={handleSubmit}>
      {props.edit
        ?
        (<>
          <input
            value={input}
            onChange={handleChange}
            ref={inpRef}
            autoFocus
            name='text'
            type="text"
            placeholder='Add a todo'
            className='form-control form-input'
          />
          <button className='btn-hover color-main'>Update</button>
          <button className='btn-hover color-main delete' onClick={()=>setInput(oldValue)}>Exit</button>
        </>
        )
        : (<>
          <input
            value={input}
            onChange={handleChange}
            ref={inpRef}
            autoFocus
            name='text'
            type="text"
            placeholder='Add a todo'
            className='form-control form-input'
          />
          <button className='btn-hover color-main'>Add</button>
        </>
        )}
    </form>
  )
}
