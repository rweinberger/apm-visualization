import React from 'react'
import { connect } from 'react-redux'

const Header = ({ time }) => {
  return (
    <h1 id='header'>
      {new Date(time).toISOString()}
    </h1>
  )
}

const mapStateToProps = state => {
  const time = typeof state.displayTime === 'number' 
    ? state.displayTime 
    : state.topologies[state.topologies.length - 1].timestamp
  return { time: time }
}

export default connect(
  mapStateToProps
)(Header)
