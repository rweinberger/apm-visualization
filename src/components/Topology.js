import React from 'react'
import Server from './Server'

const Topology = ({ id, state, description }) => (
  <div className='topology'>
    <p> Topology {id} is in state {state} and type {description.topologyType} </p>
    <div id='servers'>
      {description.servers.map(server =>
        <Server
          {...server}
        />
      )}
      {description.servers.length > 0 ? '' : 'No open servers.'}
    </div>
  </div>
)

export default Topology
