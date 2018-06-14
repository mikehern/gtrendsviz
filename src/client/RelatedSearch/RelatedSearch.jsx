import React, { Component } from 'react';
import * as d3 from 'd3';
import './relatedsearch.css';

const bodyMargin = { top: 10, right: 20, bottom: 20, left: 5 };

class RelatedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tempData: [{ "query": "react native", "value": 100 }, { "query": "nike react", "value": 64 }, { "query": "what is react", "value": 53 }, { "query": "epic react", "value": 45 }, { "query": "react js", "value": 42 }, { "query": "nike epic react", "value": 39 }, { "query": "react redux", "value": 30 }, { "query": "react router", "value": 23 }, { "query": "nike react flyknit", "value": 19 }, { "query": "epic react flyknit", "value": 19 }, { "query": "react form", "value": 18 }, { "query": "nike epic react flyknit", "value": 16 }, { "query": "create react app", "value": 15 }, { "query": "angular", "value": 14 }, { "query": "react bootstrap", "value": 13 }, { "query": "react tutorial", "value": 13 }, { "query": "react native app", "value": 11 }, { "query": "react navigation", "value": 11 }, { "query": "react table", "value": 9 }, { "query": "react setstate", "value": 9 }, { "query": "react lifecycle", "value": 9 }, { "query": "react map", "value": 8 }, { "query": "nike odyssey react", "value": 7 }, { "query": "kids react", "value": 7 }, { "query": "go react", "value": 7 }]
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

    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([(chartWidth / 2), chartWidth]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.query))
      .rangeRound([chartHeight, 0])
      .padding(0.05);

    //Handoff render and transition to D3
    const bars = canvas.selectAll('.bar')
      .data(data);

    bars
      .attr('x', 0)
      .attr('y', d => yScale(d.query))
      .attr('width', d => xScale(d.value))
      .attr('height', () => yScale.bandwidth());

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

    //Y axis called after bars render in order to overlay chart
    const yAxis = d3.axisRight().scale(yScale);
    canvas
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(0, -9)`);

    d3.select('.canvas').select('.y.axis').call(yAxis);
  }

  render() {
    const { data } = this.state;
    return(
      <React.Fragment>
        {/* <div>{JSON.stringify(data)}</div> */}
        <svg id="svgWrapper" width="100%" height="600px" ref={node => (this.node = node)} />
      </React.Fragment>
    )
  }
}

export default RelatedSearch;