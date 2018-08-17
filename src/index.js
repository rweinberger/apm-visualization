import EJSON from 'mongodb-extjson'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'
import {
  openTopology,
  closeTopology,
  changeTopologyDescription,
  startCommand,
  finishCommand,
  setMinTimestamp,
  setMaxTimestamp
} from './actions'

const store = createStore(rootReducer)

function getLogData(logArray) {
  return logArray.reduce(
    (data, event) => {
      const eventObject = EJSON.parse(event, { strict: false });
      data[eventObject.category].push(eventObject);
      return data;
    },
    { command: [], sdam: [] }
  );
}

// example log file; later, this should be supplied by the user
const sampleLogFile = [
  `{"timestamp":1534490110118,"category":"sdam","name":"topologyOpening","object":{"topologyId":2}}`,
  `{"timestamp":1534490110119,"category":"sdam","name":"serverOpening","object":{"topologyId":2,"address":"localhost:27017"}}`,
  `{"timestamp":1534490110119,"category":"command","name":"commandStarted","object":{"command":{"ismaster":true,"client":{"driver":{"name":"nodejs","version":"3.1.0"},"os":{"type":"Darwin","name":"darwin","architecture":"x64","version":"17.4.0"},"platform":"Node.js v8.11.2, LE, mongodb-core: 3.1.0"},"compression":[]},"databaseName":"admin","commandName":"ismaster","requestId":7,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110119,"category":"command","name":"commandSucceeded","object":{"duration":0.783542,"commandName":"ismaster","reply":{"ismaster":true,"maxBsonObjectSize":16777216,"maxMessageSizeBytes":48000000,"maxWriteBatchSize":100000,"localTime":{"$date":"2018-08-17T07:15:10.118Z"},"logicalSessionTimeoutMinutes":30,"minWireVersion":0,"maxWireVersion":7,"readOnly":false,"ok":1},"requestId":7,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110119,"category":"sdam","name":"serverDescriptionChanged","object":{"topologyId":2,"address":"localhost:27017","previousDescription":{"address":"localhost:27017","arbiters":[],"hosts":[],"passives":[],"type":"Unknown"},"newDescription":{"address":"localhost:27017","arbiters":[],"hosts":[],"passives":[],"type":"Standalone"}}}`,
  `{"timestamp":1534490110119,"category":"sdam","name":"topologyDescriptionChanged","object":{"topologyId":2,"address":"localhost:27017","previousDescription":{"topologyType":"Unknown","servers":[{"address":"localhost:27017","arbiters":[],"hosts":[],"passives":[],"type":"Unknown"}]},"newDescription":{"topologyType":"Single","servers":[{"address":"localhost:27017","arbiters":[],"hosts":[],"passives":[],"type":"Standalone"}]}}}`,
  `{"timestamp":1534490110122,"category":"command","name":"commandStarted","object":{"command":{"listCollections":true,"filter":{"name":"apm-logging-tests"},"cursor":{},"nameOnly":true,"lsid":{"id":{"$binary":{"base64":"RFYy6X21Tt2iNE8RcCdQrQ==","subType":"04"}}}},"databaseName":"integration_tests","commandName":"listCollections","requestId":8,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110123,"category":"command","name":"commandSucceeded","object":{"duration":0.531399,"commandName":"listCollections","reply":{"cursor":{"id":0,"ns":"integration_tests.$cmd.listCollections","firstBatch":[]},"ok":1},"requestId":8,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110124,"category":"command","name":"commandStarted","object":{"command":{"create":"apm-logging-tests","writeConcern":{"w":1},"lsid":{"id":{"$binary":{"base64":"RFYy6X21Tt2iNE8RcCdQrQ==","subType":"04"}}}},"databaseName":"integration_tests","commandName":"create","requestId":9,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110157,"category":"command","name":"commandFailed","object":{"duration":32.691597,"commandName":"create","reply":{"ok":0},"requestId":9,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110159,"category":"command","name":"commandStarted","object":{"command":{"insert":"apm-logging-tests","documents":[{"hi":true,"_id":{"$oid":"5b7675fefb070963a26ec62e"}}],"ordered":true,"writeConcern":{"w":1},"lsid":{"id":{"$binary":{"base64":"RFYy6X21Tt2iNE8RcCdQrQ==","subType":"04"}}}},"databaseName":"integration_tests","commandName":"insert","requestId":10,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110161,"category":"command","name":"commandSucceeded","object":{"duration":1.935977,"commandName":"insert","reply":{"n":1,"ok":1},"requestId":10,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110163,"category":"command","name":"commandStarted","object":{"command":{"find":"apm-logging-tests","filter":{"hi":true},"limit":1,"singleBatch":true,"batchSize":1,"returnKey":false,"showRecordId":false,"lsid":{"id":{"$binary":{"base64":"W5S2VxpWQSa0FhkKN3of3A==","subType":"04"}}}},"databaseName":"integration_tests","commandName":"find","requestId":11,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110169,"category":"command","name":"commandSucceeded","object":{"duration":2.7135,"commandName":"find","reply":{"cursor":{"firstBatch":[{"_id":{"$oid":"5b7676b04d630d6442370f16"},"hi":true}],"id":0,"ns":"integration_tests.apm-logging-tests"},"ok":1},"requestId":11,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110170,"category":"command","name":"commandStarted","object":{"command":{"insert":"apm-logging-tests","documents":[{"hey":true,"_id":{"$oid":"5b7675fefb070963a26ec62f"}}],"ordered":true,"writeConcern":{"w":1},"lsid":{"id":{"$binary":{"base64":"RFYy6X21Tt2iNE8RcCdQrQ==","subType":"04"}}}},"databaseName":"integration_tests","commandName":"insert","requestId":12,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110172,"category":"command","name":"commandSucceeded","object":{"duration":1.399848,"commandName":"insert","reply":{"n":1,"ok":1},"requestId":12,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110174,"category":"command","name":"commandStarted","object":{"command":{"endSessions":[{"id":{"$binary":{"base64":"RFYy6X21Tt2iNE8RcCdQrQ==","subType":"04"}}}]},"databaseName":"admin","commandName":"endSessions","requestId":13,"connectionId":"localhost:27017"}}`,
  `{"timestamp":1534490110174,"category":"sdam","name":"serverClosed","object":{"topologyId":2,"address":"localhost:27017"}}`,
  `{"timestamp":1534490110174,"category":"sdam","name":"topologyClosed","object":{"topologyId":2}}`,
  `{"timestamp":1534490110175,"category":"command","name":"commandSucceeded","object":{"duration":1.13361,"commandName":"endSessions","reply":{"ok":1},"requestId":13,"connectionId":"localhost:27017"}}`
]

const data = getLogData(sampleLogFile);

const minTimestamp = EJSON.parse(sampleLogFile[0], { strict: false }).timestamp;
const maxTimestamp = EJSON.parse(sampleLogFile[sampleLogFile.length - 1], { strict: false }).timestamp;

// set min and max timestamps
store.dispatch(setMinTimestamp(minTimestamp))
store.dispatch(setMaxTimestamp(maxTimestamp))

// dispatch all sdam-related actions
data.sdam.forEach(event => {
  const timestamp = event.timestamp;
  switch (event.name) {
    case 'topologyOpening':
      const id = event.object.topologyId;
      store.dispatch(openTopology(id, timestamp))
      break
    case 'topologyDescriptionChanged':
      const newDescription = event.object.newDescription;
      store.dispatch(changeTopologyDescription(newDescription, timestamp))
      break
    case 'topologyClosed':
      store.dispatch(closeTopology(timestamp))
      break
    default:
      break
  }
})

// dispatch all command-related actions
data.command.forEach(event => {
  const timestamp = event.timestamp;
  const requestId = event.object.requestId;
  const connectionId = event.object.connectionId;
  switch (event.name) {
    case 'commandStarted':
      const name = event.object.commandName;
      const db = event.object.databaseName;
      const client = event.object.command.client;
      store.dispatch(startCommand(name, db, connectionId, requestId, timestamp, client))
      break
    case 'commandSucceeded':
    case 'commandFailed':
      const status = event.object.reply.ok ? 'succeeded' : 'failed'
      const duration = event.object.duration;
      store.dispatch(finishCommand(requestId, timestamp, duration, status))
      break
    default:
      break
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
