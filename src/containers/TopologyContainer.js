import { connect } from 'react-redux'
import Topology from '../components/Topology'

const mapStateToProps = state => {
  switch(state.displayTime) {
    case 'MOST_RECENT':
      return state.topologies[state.topologies.length - 1]
    default:
      for (let i = state.topologies.length - 1; i >= 0; i--) {
        const topology = state.topologies[i];
        if (topology.timestamp <= state.displayTime) {
          return topology
        }
      }
      return state.topologies[0]
  }
}

export default connect(
  mapStateToProps
)(Topology)
