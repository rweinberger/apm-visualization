import { connect } from 'react-redux'
import Topology from '../components/Topology'

const mapStateToProps = state => {
  switch(state.displayTime) {
    // display most recent snapshot
    case 'MOST_RECENT':
      return state.topologies[state.topologies.length - 1]
    default:
      // iterate backwards over topology snapshots until one is found where snapshot.timestamp <= state.displayTime
      for (let i = state.topologies.length - 1; i >= 0; i--) {
        const snapshot = state.topologies[i];
        if (snapshot.timestamp <= state.displayTime) {
          return snapshot
        }
      }
      return state.topologies[0]
  }
}

export default connect(
  mapStateToProps
)(Topology)
