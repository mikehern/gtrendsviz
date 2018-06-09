import React, { Component } from 'react';
import * as d3 from 'd3';

const margin = { top: 20, right: 30, bottom: 30, left: 50 };

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
    const node = d3.select(this.node);
    const bounds = node.node().getBoundingClientRect();
    const width = bounds.width - margin.left - margin.right;
    const height = bounds.height - margin.top - margin.bottom;
    const data = this.state.tempData.sort((a, b) => d3.ascending(a.value, b.value));

    const canvas = node
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .append('g')

    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.query))
      .rangeRound([height, 0])
      .padding(0.1);

    const bars = canvas.selectAll('.bar')
      .data(data)
      .enter()

    bars.append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('width', d => xScale(d.value))
      .attr('y', d => yScale(d.query))
      .attr('height', () => yScale.bandwidth())
      .attr('fill', '#006bb6');

  }

  render() {
    const { data } = this.state;
    return(
      <React.Fragment>
        {/* <div>{JSON.stringify(data)}</div> */}
        <svg id="barChart" width="100%" height="600px" ref={node => (this.node = node)} />
      </React.Fragment>
    )
  }
}

export default RelatedSearch;