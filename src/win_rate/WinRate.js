import React, { useEffect, useRef, useState } from 'react'

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


  const [numbers, setNumber] = useState('')

  //kiem tra tổng số lượng đầu vào

  useEffect(() => {
    slipObjects();
  }, [objects])

  useEffect(() => {
    document.getElementById("fname").disabled = true
    document.getElementById("frate").disabled = true
  }, [])
  const handleTotal = (value) => {
    if (value < 4 || value % 2 != 0) {
      document.getElementById("fname").disabled = true
      document.getElementById("frate").disabled = true
      setError('Nhập số lượng lớn hơn 3 và là số chẵn')
    } else {
      setError(""); setTotal(+value)
      document.getElementById("fname").disabled = false
      document.getElementById("frate").disabled = false
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setObjects([...objects, { name: name, win_rate: +rate }].sort((a, b) => (a.win_rate - b.win_rate)))
    setNumber([...numbers, +rate])
    setName('')
    setRate('')
    nameRef.current.focus()
  }

  const sumArray = mang => {
    let sum = 0;
    mang.map(value => { sum += value.win_rate });
    return sum;
  }
  let tong = sumArray(objects); // tổng phần tử
  let half = sumArray(objects) / 2
  let min = objects[0]
  console.log(objects);

  if (3 > objects.length == total) {
    document.getElementById("fname").disabled = true
    document.getElementById("frate").disabled = true
  }


  let groubA = []
  let groubB = []

  const slipObjects = () => {
    // TH1: một phần tử thoả dk: arr[i]-tb <= min
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].win_rate - half <= min.win_rate && objects[i].win_rate - half >= 0) {
        groubA.push(objects[i])
        return groubA
      }
      //Th2: hai phần tử thoả dk
      else {
        for (let j = 1, n = 0; j < objects.length; j++) {
          groubA.length = 0
          n = objects[i] + objects[j];
          if (Math.abs(n - half) <= min.win_rate) {
            groubA.push(objects[i], objects[j])
            return groubA
          }
        }
      }
    }
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
        <h3>Số lượng:   {error === '' ? objects.length : ''}</h3>
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

      <h2>Mảng ban đâu</h2>
      <div>

        {objects.map((object, index) => (
          <li key={index}>{object.name} - {object.win_rate}</li>
        ))
        }

      </div>

      <h2>Mảng sau khi tách</h2>
      {console.log(groubA)}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div>
          <ul>
            {groubA.map((object, index) => (
              <li key={index}>{object.name} - {object.win_rate}</li>
            ))
            }
          </ul>
        </div>

        <div>
          <ul>
            {groubB.map((object, index) => (
              <li key={index}>{object.name} - {object.win_rate}</li>
            ))
            }
          </ul>
        </div>
      </div>


    </div>
  )
}
