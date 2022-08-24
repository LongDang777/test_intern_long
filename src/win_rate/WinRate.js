import React, {  useEffect, useRef, useState } from 'react'

const styleForm = {
  width: '600px',
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '240px',
  marginTop: '50px'
}

export default function WinRate() {

  const [total, setTotal] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [rate, setRate] = useState('')
  const [objects, setObjects] = useState([])
  const nameRef = useRef()

  const [groubA, setGroubA] = useState([]);
  const [groubB, setGroubB] = useState([]);
  const [numbers, setNumber] = useState('')

  
  useEffect(() => {
    const listRate = localStorage.getItem('todos')
    const loadedTodos = JSON.parse(listRate)
    if (loadedTodos) {
      setNumber(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const listRate = JSON.stringify(numbers)
    localStorage.setItem('todos', listRate)
  }, [numbers])

  const newArr = objects.sort((a, b)=> a.rate - b.rate );

  const sum = newArr.reduce((currentValue, value) => currentValue + value.rate, 0);

  const n =2;


  const result = [];
  let s = 0;
  let j = 0;
  result[j] = [];
  for(let i=0; i<newArr.length; i++){
    
    if(s <= Math.floor(sum/n)){
  
      result[j].push(newArr[i]);
      s +=newArr[i];
    }
    else{    
      s = 0;
      j = j + 1;   
      result[j] = [];
      result[j].push(newArr[i]);
    }
  }
  
  console.log(result)
  //kiem tra tổng số lượng đầu vào
  const handleTotal = (value) => {
    if(value < 4 || value % 2 != 0){
      document.getElementById("fname").disabled   = true
      document.getElementById("frate").disabled   = true
      setError('Nhập số lượng lớn hơn 3 và là số chẵn')
    }else{
       setError(""); setTotal(+value)
       document.getElementById("fname").disabled   = false
       document.getElementById("frate").disabled   = false
    }
  }

  const handleSubmit = (e) => { 
    e.preventDefault()
    setObjects([...objects,{name : name, rate : +rate}])
    setNumber([...numbers, +rate])
    setName('')
    setRate('')
    nameRef.current.focus()
  }

  

  return (
    <div style={{ margin: '50px auto' }}>
      <div>
        <label htmlFor="id">Số lượng: </label>&nbsp; &nbsp;
        <input
          onChange={e => handleTotal(e.target.value)}
          style={{ padding: '5px', margin: '20px 0' }}
          type="number"
          placeholder='Nhập số chẵn và >=4 ...'
        /> <br />
        <small style={{ color: 'red' }}>{error}</small>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Số lượng:   {error === '' ? total : ''}</h3>
        <div style={styleForm}>
          <div>
            <label>Name: </label>
            <input
              ref={nameRef}
              id='fname'
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ padding: '5px' }}
              type="text"
              placeholder='Enter name...'
            />
          </div>  &nbsp; &nbsp;

          <div>
            <label>Win Rate: </label>
            <input
              onChange={e => setRate(e.target.value)}
              value={rate}
              id='frate'
              min={0}
              max={100}
              style={{ padding: '5px' }}
              type="number"
              placeholder='(%)'
            />
          </div>  &nbsp; &nbsp;
          <button type='submit'>Add</button>
        </div>
      </form>
      <ul>
        {objects.map((object,index) => (
          <li key={index}>{object.name} - {object.rate}</li>
        ))
        }
      </ul>
      
    </div>
  )
}
