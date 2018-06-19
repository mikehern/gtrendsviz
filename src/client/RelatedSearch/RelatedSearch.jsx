import React, { Component } from 'react';
import * as d3 from 'd3';
import './relatedsearch.css';

const bodyMargin = { top: 10, right: 20, bottom: 20, left: 10 };

class RelatedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.data.length === 0) {
      return true;
    }

    if (nextProps.data !== this.state.data) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevState.data) {
      this.setState({ data: this.props.data });
    }
    this._createBarChart();
  }

  _createBarChart() {
    const svg = d3.select(this.node);
    const bounds = svg.node().getBoundingClientRect();
    const chartWidth = bounds.width - bodyMargin.left - bodyMargin.right;
    const chartHeight = bounds.height - bodyMargin.top - bodyMargin.bottom;
    const data = this.state.data.sort((a, b) => d3.ascending(a.value, b.value)).slice(-10);

    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([(chartWidth / 2), chartWidth]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.query))
      .rangeRound([chartHeight, 0])
      .padding(0.02);

    const yAxis = d3.axisRight().scale(yScale);

    const canvasExists = !d3.select('.canvas').empty();

    if (canvasExists === false) {
      const canvas = svg
        .append('g')
        .attr('class', 'canvas')
        .attr('transform', `translate(${bodyMargin.left}, ${bodyMargin.top})`);

      canvas.append('defs');
      const defs = d3.select('defs');

      defs
        .append('linearGradient')
        .attr('id', 'linear')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%')

      const gradient = d3.select('linearGradient');

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#006bb6');

      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#60D1FF');

      svg
        .append('filter')
          .attr('id', 'blur')
        .append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '5');

      d3.select('#svgWrapper')
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(10, 0)`);

      d3.select('#svgWrapper').select('.y.axis').call(yAxis);

      d3.select('.canvas').selectAll('.bar')
        .data(data)
        .attr('x', 0)
        .attr('y', d => yScale(d.query))
        .attr('width', d => xScale(d.value))
        .attr('height', () => yScale.bandwidth());
    }

    const bars = d3.select('.canvas').selectAll('.bar')
      .data(data);

    bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => yScale(d.query))
      .attr('ry', 8)
      .attr('height', () => yScale.bandwidth())
      .transition()
        .duration(1200)
        .ease(d3.easeExpInOut)
        .attr('width', d => xScale(d.value))
        .attr('fill', `url(#linear)`);

    bars.exit()
      .remove();

    bars
      .transition()
        .duration(1000)
        .ease(d3.easeBackInOut)
        .attr('x', 0)
        .attr('y', d => yScale(d.query))
        .attr('width', d => xScale(d.value))
        .attr('height', () => yScale.bandwidth());

    d3.select('#svgWrapper').select('.y.axis')
      .transition()
        .duration(150)
        .ease(d3.easeBackIn)
        .attr('filter', null)
      .transition()
        .duration(600)
        .ease(d3.easeBackInOut)
        .attr('filter', 'url(#blur)')
      .transition()
        .duration(400)
        .ease(d3.easeBackOut)
        .attr('filter', null)
      .call(yAxis);

    d3.selectAll('.bar')
      .on('click', d => this.props.searchTerm(d.query));
  }

  render() {
    return <React.Fragment>
        <div className="component-label--display">
          Frequent searches related to<br/> <span className="component-dynamiclabel--display">{this.props.label}</span> </div>
        <svg id="svgWrapper" width="100%" height="600px" ref={node => (this.node = node)} />
      </React.Fragment>;
  }
}

export default RelatedSearch;