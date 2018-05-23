import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 800;
const height = 300;
const margin = { top: 20, right: 30, bottom: 30, left: 50 };

class TrendOverTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      lineData: ''
    }
    this.chartRef = React.createRef();
    this._createLineChart = this._createLineChart.bind(this);
  }
  //TODO: break down chart into parts and states, and map them to react lifecycle.  Begin with line data.
  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      const data = nextProps.data.map(el => {
        el.date = new Date(el.date);
        return el;
      })

      let xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right]);

      let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value))
        .range([height - margin.bottom, margin.top]);

      let line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5));

      let generatedLine = line(data);

      return {
        data: data,
        lineData: generatedLine,
      }
    }

    return null;
  }

  componentDidMount() {
    this._createLineChart();
  }

  _createLineChart() {
    // let node = this.chartRef;
  }

  render() {
    const { lineData } = this.state;
    console.log('STATES LINEDATA IS: ', lineData);
    return (
      <svg id="lineChart" width={width} height={height} ref={this.chartRef}>
        <path d={lineData} fill="none" stroke="#006bb6" strokeWidth="1"/>
      </svg>
    )
  }
}

export default TrendOverTime;