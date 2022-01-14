import React from 'react'
import { useParams } from 'react-router-dom'

const Default = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 mx-auto text-title text-upperCase pt-5 text-center'>
          <h1 className='display-3'>404</h1>
          <h1>error</h1>
          <h2>page not found</h2>
          <h3>
            the requested URL{' '}
            <span className='text-danger'>{window.location.pathname}</span> was
            not found
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Default
