import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { history } from './App'


export const HomeTemplate =(props)=> {



  return (
    <Route
      exact
      path={props.path}
      render={propsRoute => {
        return <Fragment>
            <div className='container'>
              <h3 className='infoName'>Intern - Dang Tien Long</h3>

              <div className='page'>

              <button className='btn-hover color' onClick={() => history.push('/')}>
                App To Do List
              </button>
              &#160; &#160; &#160;

              <button className='btn-hover color' onClick={() => history.push('/winrate')}>
                App Win Rate
              </button>
              </div>

              <props.component {...propsRoute} />
            </div>
          </Fragment>
      }}
    />
  )
}
