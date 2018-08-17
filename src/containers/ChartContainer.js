import React from "react"
import { connect } from 'react-redux'
import Chart from "react-google-charts"

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
const columns = [
  { type: "string", id: "Command" },
  { type: "string", id: "Status"},
  { type: "string", role: "tooltip"},
  { type: "number", id: "Start" },
  { type: "number", id: "End" }
];

const CommandChart = ({ rows, colors }) => {
  return (
    <Chart
      id='commandChart'
      options={ { colors: colors } }
      chartType="Timeline"
      data={[columns, ...rows]}
      width="600px"
      height="300px"
    />
  )
}

const getDescription = command => {
  return `duration: ${command.duration} ms`
}

const mapStateToProps = state => {
  const allCommands = Object.values(state.commands.allCommands)
  const firstTimestamp = state.timestamps.min;
  const maxDisplayTimestamp = state.displayTime === 'MOST_RECENT'
    ? Date.now()
    : state.displayTime

  const data = allCommands
    .filter(command => {
      return command.start <= maxDisplayTimestamp
    })
    .reduce((accumulator, command) => {
      const end = command.end <= maxDisplayTimestamp
        ? command.end
        : maxDisplayTimestamp
      const description = getDescription(command)
      const color = command.status === 'failed'
        ? 'red'
        : '#99c1ff'

      accumulator.colors.push(color)
      accumulator.rows.push([
        command.commandName,
        '',
        description,
        (command.start - firstTimestamp) * 1000, 
        (end - firstTimestamp) * 1000])
      return accumulator
    }, { rows: [], colors: [] })

  return data
}

export default connect(
  mapStateToProps
)(CommandChart)
