import React, { Component } from 'react';
import * as d3 from 'd3';
import { interpolatePath } from 'd3-interpolate-path';

const width = 800;
const height = 300;
const margin = { top: 20, right: 30, bottom: 30, left: 50 };

class TrendOverTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      prevData: '',
      prevLine: '',
    }
    this._updateLineChart = this._updateLineChart.bind(this);
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      const data = nextProps.data.map(el => {
        el.date = new Date(el.date);
        return el;
      })

      return {
        data: data,
      }
    }

    return null;
  }

  componentDidMount() {
    this._updateLineChart();
  }

  componentDidUpdate() {
    this._updateLineChart();
  }

  _updateLineChart() {
    const node = this.node;
    const svg = d3.select(node);
    const data = this.state.data;

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .range([height - margin.bottom, margin.top]);

    const line = d3.line(data)
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const trendLineExists = !d3.select('#trendLine').empty();

    if (!trendLineExists && this.state.data.length !== 0) {
      const g = svg.append('g').attr('id', 'trendLine');

      g.append('path')
        .datum(data)
          .attr('fill', 'none')
          .attr('stroke', '#006bb6')
          .attr('stroke-width', 0)
          .attr('d', line)
        .transition()
          .duration(2600)
          .ease(d3.easeBounce)
          .attr('stroke-width', 5);

      const focus = g.append('g').attr('id', 'trendOverlay')
        .attr('stroke-width', 1)
        .style('display', 'none')

      focus.append('circle')
        .attr('r', 5)
        .attr('fill', 'red')

      focus.append('text')
        .attr('x', 15)
        .attr('dy', '.31em')

      const bisectDate = d3.bisector(d => d.date).left;

      function mousemove() {
        const x0 = xScale.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i] || 0,
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        focus.attr("transform", `translate(${xScale(d.date)},${yScale(d.value)})`);
        focus.select("text")
          .text(() => d.date.toDateString().slice(0, -4))
          .style('fill', 'red')
      };

      const updateDate = this.props.searchDate;

      function dynamicText() {
        const x0 = xScale.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i] || 0,
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        updateDate(d.date);

        d3.select('circle')
          .transition()
            .duration(300)
            .attr('r', 12)
            .attr('fill', '#006bb6')
          .transition()
            .duration(300)
            .attr('r', 5)
            .attr('fill', 'red')
      }

      svg.append("rect")
        .attr("fill", "none")
        .attr('pointer-events', 'all')
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", () => focus.style('display', null))
        .on("mouseout", () => focus.style('display', 'none'))
        .on("mousemove", mousemove)
        .on('click', dynamicText)

      const prevLine = d3.select('#trendLine').select('path').attr('d');

      this.setState({ prevData: data, prevLine: prevLine });

      return svg.node();

    }

    let dataChanged = JSON.stringify(this.state.data) !== JSON.stringify(this.state.prevData);

    if (dataChanged) {
      const { prevLine } = this.state;

      d3.select('#trendLine')
        .append('path')
        .datum(data)
        .attr('id', 'newLine')
        .attr('fill', 'none')
        .attr('stroke', '#006bb6')
        .attr('stroke-width', 5)
        .attr('d', line)
        .style('display', 'none')

      const newLine = d3
        .select('#trendLine')
        .select('#newLine')
        .attr('d');

      d3.select('#trendLine').select('path')
        .transition()
        .duration(1000)
        .attrTween('d', () => {
          var previous = prevLine;
          var current = newLine;
          return interpolatePath(previous, current);
        });

      d3.select('#newLine').remove();

      this.setState({ prevData: data, prevLine: newLine });

    }

  }

  render() {
    return (
      <svg id="lineChart" width={width} height={height} ref={node => (this.node = node)}>
      </svg>
    );
  }
}

export default TrendOverTime;