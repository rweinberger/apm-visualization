import React from 'react'

const Server = ({ address, type }) => (
  <div className='server'>
    {type}{"\n"}
    {address}
  </div>
)

export default Server
