import React, { Component } from 'react';
import * as d3 from 'd3';

class TrendOverTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: '',
      trendData: [],
      tempTrendData: [{ "date": "Apr 17", "value": 70 }, { "date": "Apr 18", "value": 49 }, { "date": "Apr 19", "value": 30 }, { "date": "Apr 20", "value": 34 }, { "date": "Apr 21", "value": 50 }, { "date": "Apr 22", "value": 37 }, { "date": "Apr 23", "value": 30 }, { "date": "Apr 24", "value": 35 }, { "date": "Apr 25", "value": 32 }, { "date": "Apr 26", "value": 32 }, { "date": "Apr 27", "value": 25 }, { "date": "Apr 28", "value": 100 }, { "date": "Apr 29", "value": 50 }, { "date": "Apr 30", "value": 31 }, { "date": "May 1", "value": 38 }, { "date": "May 2", "value": 32 }, { "date": "May 3", "value": 41 }, { "date": "May 4", "value": 43 }, { "date": "May 5", "value": 51 }, { "date": "May 6", "value": 44 }, { "date": "May 7", "value": 36 }, { "date": "May 8", "value": 38 }, { "date": "May 9", "value": 42 }, { "date": "May 10", "value": 33 }, { "date": "May 11", "value": 15 }, { "date": "May 12", "value": 39 }, { "date": "May 13", "value": 42 }, { "date": "May 14", "value": 54 }, { "date": "May 15", "value": 78 }],
    }
    this.chartRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.trendData !== nextProps.trendData) {
      return {
        trendData: nextProps.trendData
      }
    }
    return null;
  }

  componentDidMount() {
    this._createLine();
  }

  _createLine() {
    const node = this.chartRef.current;
    let width = 600;
    let height = 150;

    let data = this.state.tempTrendData.map(el => {
      el.date = new Date(el.date);
      return el;
    });

    let xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([this.props.margin.left, width- this.props.margin.right]);

    let yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .range([height - this.props.margin.bottom, this.props.margin.top])
    
    let line = d3
      .line(data)
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5));

    let svg = d3.select('#theChart');

    let g = svg.append('g');

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

    let focus = g.append('g')
      .attr('stroke-width', 1)
      .style('display', 'none')

    focus.append('circle')
      .attr('r', 5)
      .attr('fill', 'red')

    focus.append('text')
      .attr('x', 15)
      .attr('dy', '.31em')

    let bisectDate = d3.bisector(d => d.date).left;

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

    let updateDate = this.props.searchDate;

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
      .on("mouseover", () => {
        focus.style('display', null)
      })
      .on("mouseout", () => focus.style('display', 'none'))
      .on("mousemove", mousemove)
      .on('click', dynamicText)

    return svg.node();
  }


  render() {
    return (
      <div ref={this.chartRef} >
        <svg id="theChart" viewBox="0, 0, 600, 150" width="600" height="150"></svg>
      </div>
    );
  }
}

export default TrendOverTime;