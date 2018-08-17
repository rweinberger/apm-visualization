import { connect } from 'react-redux'
import Slider from 'rc-slider'
import { setDisplayTime } from '../actions'
import 'rc-slider/assets/index.css'

const style = { width: 600, margin: 50 };

const mapStateToProps = state => {
  const minTime = state.topologies[1].timestamp;
  const maxTime = state.timestamps.max;

  return {
    style: style,
    min: minTime - 1,
    max: maxTime,
    defaultValue: maxTime
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: val => dispatch(setDisplayTime(val))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider)
