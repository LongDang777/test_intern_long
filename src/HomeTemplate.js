import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { history } from './App'


export const HomeTemplate =(props)=> {

  const style = {
    width: '1000px',
    margin: '40px auto',
    textAlign: 'center',
  }

  return (
    <Route
      exact
      path={props.path}
      render={propsRoute => {
        return <Fragment>
            <div style={style}>
              <h3>Intern - Dang Tien Long</h3>

              <button onClick={() => history.push('/')}>
                App To Do List
              </button>
              &#160; &#160; &#160;

              <button onClick={() => history.push('/winrate')}>
                App Win Rate
              </button>

              <props.component {...propsRoute} />
            </div>
          </Fragment>
      }}
    />
  )
}
