import React from 'react'
import TopologyContainer from '../containers/TopologyContainer'
import SliderContainer from '../containers/SliderContainer'
import Header from '../containers/Header'
import ChartContainer from '../containers/ChartContainer'

const App = () => (
  <div>
    <Header />
    <SliderContainer />
    <TopologyContainer />
    <ChartContainer />
  </div>
)

export default App
