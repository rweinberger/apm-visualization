export const openTopology = (id, timestamp) => ({
  type: 'OPEN_TOPOLOGY',
  timestamp: timestamp,
  id: id
})

export const closeTopology = timestamp => ({
  type: 'CLOSE_TOPOLOGY',
  timestamp: timestamp
})

export const changeTopologyDescription = (newDescription, timestamp) => ({
  type: 'CHANGE_TOPOLOGY_DESCRIPTION',
  timestamp: timestamp,
  newDescription: newDescription
})

export const startCommand = (name, db, connectionId, requestId, timestamp, client) => ({
  type: 'START_COMMAND',
  name: name,
  db: db,
  connectionId: connectionId,
  requestId: requestId,
  timestamp: timestamp,
  client: client
})

export const finishCommand = (requestId, timestamp, duration, status) => ({
  type: 'FINISH_COMMAND',
  requestId: requestId,
  timestamp: timestamp,
  duration: duration,
  status: status
})

export const setMinTimestamp = time => ({
  type: 'SET_MIN_TIMESTAMP',
  time: time
})

export const setMaxTimestamp = time => ({
  type: 'SET_MAX_TIMESTAMP',
  time: time
})

export const setDisplayTime = newTime => ({
  type: 'SET_DISPLAY_TIME',
  displayTime: newTime
})