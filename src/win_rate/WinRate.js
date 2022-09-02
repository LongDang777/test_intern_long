import React, { useEffect, useRef, useState } from 'react'


export default function WinRate() {
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [errorOb, setErrorOb] = useState('')
  const [name, setName] = useState('')
  const [rate, setRate] = useState('')
  const [objects, setObjects] = useState([])
  const nameRef = useRef()

  const getID = id => document.getElementById(id)

  useEffect(() => {
    getID('fname').disabled = true
    getID('frate').disabled = true
    getID('btnAdd').disabled = true
  }, [])

  const handleTotal = (value) => {
    if (value < 4 || value % 2 != 0) {
      setError('Nhập số lượng lớn hơn 3 và là số chẵn')
      getID('fname').disabled = true
      getID('frate').disabled = true
      getID('btnAdd').disabled = true
      setObjects([])
    } else {
      setTotal(+value)
      setError('')
      getID('fname').disabled = false
      getID('frate').disabled = false
      getID('btnAdd').disabled = false
    }
  }
  const reg = /^\d+(?:\.\d{1,10})?$/;
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() === '' || rate.trim() === '') {
      setErrorOb('Chưa thêm tên đối tượng hoặc tỉ lệ thắng')
    } else if (rate < 0 || rate > 100) {
      setErrorOb('Tỉ lệ thắng phải từ 0 đến 100')
    } else if (!reg.test(rate)) {
      setErrorOb('Tỉ lệ thắng chỉ nhập số')
    }

    else {
      let newRate = Math.round(rate * 100) / 100
      setObjects([...objects, { name: name, win_rate: newRate }])
      setName('')
      setRate('')
      setErrorOb('')
      nameRef.current.focus()
    }


  }

  let arrA = []
  let arrB = []

  const arrSort = arr => arr.sort((a, b) => a.win_rate - b.win_rate);
  const sum = array => array.reduce((a, b) => a + b.win_rate, 0)
  const medium = array => sum(array) / 2


  const arr = arrSort(objects)

  // Tách mảng khi đã đủ số lượng

  let sumA = sum(arrA);
  let sumB = sum(arrB);
  let minusAB = Math.abs(sumA - sumB)

  if (objects.length === total && total > 0) {
    getID('fname').disabled = true
    getID('frate').disabled = true
    getID('btnAdd').disabled = true
    let s = 0;
    for (let i = 0; i < arr.length; i++) {
      if (s <= medium(arr)) {
        arrA.push(arr[i]);
        s += arr[i].win_rate;
      }
      else {
        arrB.push(arr[i]);
      }
    }

    sumA = sum(arrA);
    sumB = sum(arrB);
    minusAB = Math.abs(sumA - sumB)
  }

  // Khi tỉ lệ thắng còn chênh lệch nhiều

  // FOR
  // if (sumA > sumB && minusAB > arrA[0].win_rate) {
  //   let temp = arrA.shift()
  //   arrB.push(temp)
  //   for(let i = 0; i< 50; i++){
  //     if (sumA > sumB && minusAB > arrA[0].win_rate) {
  //       let temp = arrA.shift()
  //       arrB.push(temp)
  //     }
  //     if(arrA.length === 1){
  //       break; 
  //     }
  //   }
  // }
  // if (sumA < sumB && minusAB > arrB[0].win_rate) {
  //   let temp = arrB.shift()
  //   arrA.push(temp)
  // }


  //While
  while (sumA > sumB && minusAB > arrA[0].win_rate) {
    let temp = arrA.shift()
    arrB.push(temp)
    if (arrA.length === 1) {
      break;
    }
  }



  arrA = arrSort(arrA)
  arrB = arrSort(arrB)

  let count = 1
  let countA = 1
  let countB = 1


  return (
    <div>
      <div className='winrate'>
        <div className='thongTin'><h3>Thông tin nhập</h3>
          <div>
            <input
              onChange={e => handleTotal(e.target.value)}
              autoFocus
              type="number"
              placeholder='Số lượng'
              className='form-control form-input'
            />
            <small className='error' style={{ color: 'red' }}>{error}</small>
          </div>

          <h4>Số lượng phải nhập:  <b style={{ color: 'red' }}>{error === '' ? total : ''}</b></h4>

          <form onSubmit={handleSubmit} >
            <input
              ref={nameRef}
              id='fname'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Name..'
              className='form-control form-input'
            />

            <input
              onChange={e => setRate(e.target.value)}
              value={rate}
              id='frate'
              placeholder='Win rate'
              className='form-control form-input inputRate'
            />
            <button id='btnAdd' className='btn-hover color-main'>Thêm</button>
            {objects.length === total && total > 0 ? '' : <small className='error' style={{ color: 'red' }}>{errorOb}</small>}

            <h4>Số lượng đã nhập :  <b style={{ color: 'red' }}>{error === '' ? objects.length : ''}</b></h4>
          </form>
        </div>
        <div className='ketQua'>
          <div style={{ marginBottom: 20 }}>
            <h3>Mảng Gốc</h3>
            <table className='table'>
              <thead className='thead-dark'>
                <tr>
                  <th>ID no</th>
                  <th>Name</th>
                  <th>Win_rate</th>
                </tr>
              </thead>
              <tbody>
                {objects.map((object, index) => (
                  <tr key={index}>
                    <th>{count++}</th>
                    <td> {object.name}</td>
                    <td>{object.win_rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <div className='btnkq'>
      {arrA != 0 ? <button className='btn-hover color-main'>  Kết quả 👉 </button> : ""}
      </div>

      {arrA != 0 ? 
      <div className='slipArr'>
        <div className='nhomA'>
          <h4>Nhóm A</h4>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>ID no</th>
                <th>Name</th>
                <th>Win_rate</th>
              </tr>
            </thead>
            <tbody>
              {arrA.map((a, index) => (
                <tr key={index}>
                  <th>{countA++}</th>
                  <td> {a.name}</td>
                  <td>{a.win_rate}%</td>
                </tr>
              ))}
              <tr>
                <th colSpan='2'>Tổng win_rate</th>
                {arrA != 0 ? <th className='result btn-hover color-main'> {Math.round(sum(arrA) * 100) / 100}%</th> : ''}
              </tr>
            </tbody>
          </table>
        </div>

        <div className='nhomB'>
          <h4>Nhóm B</h4>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>ID no</th>
                <th>Name</th>
                <th>Win_rate</th>
              </tr>
            </thead>
            <tbody>
              {arrB.map((b, index) => (
                <tr key={index}>
                  <th>{countB++}</th>
                  <td> {b.name}</td>
                  <td>{b.win_rate}%</td>
                </tr>
              ))}
              <tr>
                <th colSpan='2'>Tổng win_rate</th>
                {arrB != 0 ? <th className='result btn-hover color-main'> {Math.round(sum(arrB) * 100) / 100}%</th> : ''}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      : ''}

    </div>
  )
}