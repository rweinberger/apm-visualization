import React from "react"
import { connect } from 'react-redux'
import Chart from "react-google-charts"

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
// Specify the labels on the chart
const columns = [
  { type: "string", id: "Command" },
  { type: "string", id: "Status"},
  { type: "string", role: "tooltip"},
  { type: "number", id: "Start" },
  { type: "number", id: "End" }
];

// chart component
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

// override default tooltip to display command duration
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
    // filter commands on whether they started before the max display time
    .filter(command => {
      return command.start <= maxDisplayTimestamp
    })
    .reduce((accumulator, command) => {
      const description = getDescription(command)

      // if command failed, color it red
      const color = command.status === 'failed'
        ? 'red'
        : '#99c1ff'

      // if the command ended after the max display time, just have it end at the max display time
      const end = command.end <= maxDisplayTimestamp
        ? command.end
        : maxDisplayTimestamp

      // a bit of a hack: there's a bug where Google Charts doesn't recognize ranges < 1 second long,
      // so multiply by 1000: https://github.com/google/google-visualization-issues/issues/2269
      const startTime = (command.start - firstTimestamp) * 1000
      const endTime = (end - firstTimestamp) * 1000

      accumulator.colors.push(color)
      accumulator.rows.push([
        command.commandName,
        '',
        description,
        startTime,
        endTime
      ])

      return accumulator
    }, { rows: [], colors: [] })

  return data
}

export default connect(
  mapStateToProps
)(CommandChart)
