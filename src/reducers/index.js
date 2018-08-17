import { combineReducers } from 'redux'

// each topology action pushes a new topology snapshot to the state
function topologies(
  state = [{
    timestamp: 0,
    id: null,
    state: 'UNOPENED',
    description: {topologyType:'Unknown', servers: []}
  }], 
  action
  ) {
  switch (action.type) {
    case 'OPEN_TOPOLOGY':
      return [
        ...state,
        {
          timestamp: action.timestamp,
          id: action.id,
          state: 'OPEN',
          description: {topologyType:'Unknown', servers: []}
        }
      ]
    case 'CHANGE_TOPOLOGY_DESCRIPTION':
      return [
        ...state,
        {
          timestamp: action.timestamp,
          id: state[1].id,
          state: 'OPEN',
          description: action.newDescription
        }
      ]
    case 'CLOSE_TOPOLOGY':
      return [
        ...state,
        {
          timestamp: action.timestamp,
          id: state[1].id,
          state: 'CLOSED',
          description: {topologyType:'Unknown', servers: []}
        }
      ]
    default:
      return state
  }
}

// each command action updates the state.allCommands map, which maps command requestIds to command info
function commands(state = {
    client: null,
    allCommands: {}
  }, action
  ) {
  switch (action.type) {
    case 'START_COMMAND':
      const client = action.name === 'ismaster' ? action.client : state.client;
      state.allCommands[action.requestId] = {
        commandName: action.name,
        status: 'ongoing',
        db: action.db,
        connection: action.connectionId,
        start: action.timestamp,
        end: Date.now()
      }
      return {
        client: client,
        allCommands: state.allCommands
      }
    case 'FINISH_COMMAND':
      const command = state.allCommands[action.requestId];
      command.status = action.status;
      command.end = action.timestamp;
      command.duration = action.duration;
      return state
    default:
      return state
  }
}

// set displayTime
function displayTime(state = 'MOST_RECENT', action) {
  switch (action.type) {
    case 'SET_DISPLAY_TIME':
      return action.displayTime
    default:
      return state
  }
}

// set min/max timestamps
function timestamps(state = { min: null, max: null }, action) {
  switch (action.type) {
    case 'SET_MIN_TIMESTAMP':
      return { min: action.time, max: state.max }
    case 'SET_MAX_TIMESTAMP':
      return { min: state.min, max: action.time }
    default:
      return state
  }
}

const apmApp = combineReducers({
  topologies,
  commands,
  displayTime,
  timestamps
})

export default apmApp