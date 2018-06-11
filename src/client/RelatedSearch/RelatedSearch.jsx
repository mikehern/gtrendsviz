import React, { Component } from 'react';
import * as d3 from 'd3';
import './relatedsearch.css';

const bodyMargin = { top: 10, right: 20, bottom: 20, left: 5 };
const miniMargin = { top: 10, right: 10, bottom: 20, left: 10 };

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
    const bodyWidth = (bounds.width * 0.8) - bodyMargin.left - bodyMargin.right;
    const miniWidth = (bounds.width * 0.2) - miniMargin.left - miniMargin.right;
    const bodyHeight = bounds.height - bodyMargin.top - bodyMargin.bottom;
    const miniHeight = bounds.height - miniMargin.top - miniMargin.bottom;
    const data = this.state.tempData.sort((a, b) => d3.ascending(a.value, b.value));

    const bodyChart = svg
      .append('g')
        .attr('class', 'bodyWrapper')
        .attr('transform', `translate(${bodyMargin.left}, ${bodyMargin.top})`)   
      .append('g')
        .attr('class', 'bodyChart')
        .attr('clip-path', `url(#clip)`)
        .style('clip-path', `url(#clip)`);

    const miniChart = svg
      .append('g')
        .attr('class', 'miniChart')
        .attr('transform', `translate(${bodyMargin.left + bodyWidth + bodyMargin.right + miniMargin.left}, ${miniMargin.top})`);

    const brushGroup = svg
      .append('g')
        .attr('class', 'brushGroup')
        .attr('transform', `translate(${bodyMargin.left + bodyWidth + bodyMargin.right + miniMargin.left}, ${miniMargin.top})`);

    bodyChart.append('defs');
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
        .attr('stop-color', '#2BABE0');

    defs.append('clipPath')
      .attr('id', 'clip')
      .append('rect')
        .attr('x', -bodyMargin.left)
        .attr('width', bodyWidth + bodyMargin.left)
        .attr('height', bodyHeight);

    const bodyYZoom = d3.scaleLinear()
      .domain([0, bodyHeight])
      .range([0, bodyHeight]);

    const bodyXScale = d3.scaleLinear()
      .domain([0, 100])
      .range([(bodyWidth / 2), bodyWidth]);

    const bodyYScale = d3.scaleBand()
      .domain(data.map(d => d.query))
      .rangeRound([bodyHeight, 0])
      .padding(0.1);

    const miniXScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, miniWidth]);

    const miniYScale = d3.scaleBand()
      .domain(data.map(d => d.query))
      .rangeRound([miniHeight, 0])
      .padding(0.1);

    const bodyXAxis = d3.axisBottom().scale(bodyXScale)
      .ticks(3)
      .tickSize(0);
    
    d3.select('.bodyWrapper')
      .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(${0}, ${bodyHeight + 6})`);

    d3.select('.bodyWrapper').select('.x.axis').call(bodyXAxis);

    //Handoff render and transition to D3
    const bars = bodyChart.selectAll('.bar')
      .data(data);

    bars
      .attr('x', 0)
      .attr('y', d => bodyYScale(d.query))
      .attr('width', d => bodyXScale(d.value))
      .attr('height', () => bodyYScale.bandwidth());

    bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', `url(#linear)`)
      .attr('x', 0)
      .attr('y', d => bodyYScale(d.query))
      .attr('ry', 10)
      .attr('width', d => bodyXScale(d.value))
      .attr('height', () => bodyYScale.bandwidth());

    bars.exit()
      .remove();

    const miniBars = miniChart.selectAll('.bar')
      .data(data);

    miniBars
      .attr('x', 0)
      .attr('y', d => miniYScale(d.query))
      .attr('width', d => miniXScale(d.value))
      .attr('height', () => miniYScale.bandwidth());

    miniBars.enter().append('rect')
      .attr('class', 'bar')
      .attr('fill', '#D2D2D2')
      .attr('x', 0)
      .attr('y', d => miniYScale(d.query))
      .attr('ry', 4)
      .attr('width', d => miniXScale(d.value))
      .attr('height', () => miniYScale.bandwidth())

    miniBars.exit()
      .remove();

    //Y axis called after bars render in order to overlay chart
    const bodyYAxis = d3.axisRight().scale(bodyYScale);
    bodyChart
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(0, 0)`);

    d3.select('.bodyChart').select('.y.axis').call(bodyYAxis);
  }

  render() {
    const { data } = this.state;
    return(
      <React.Fragment>
        {/* <div>{JSON.stringify(data)}</div> */}
        <svg id="svgWrapper" width="100%" height="500px" ref={node => (this.node = node)} />
      </React.Fragment>
    )
  }
}

export default RelatedSearch;