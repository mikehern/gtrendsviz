import React, { Component } from 'react';
import * as d3 from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import { Transition } from 'react-transition-group';

import './trendovertime.css';

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

  _createInitialLine(anchorNode, data, lineData) {
    const svgGroup = anchorNode
      .append('g')
      .attr('id', 'trendLine');

    svgGroup
      .append('path')
      .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#006bb6')
        .attr('stroke-width', 0)
        .attr('d', lineData)
      .transition()
        .duration(2600)
        .ease(d3.easeBounce)
        .attr('stroke-width', 5);

    return svgGroup;
  }

  _createTrendOverlay(chart) {
    const overlay = chart
      .append('g')
      .attr('id', 'trendOverlay')
      .attr('stroke-width', 1)
      .style('display', 'none');

    overlay
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'red');

    overlay
      .append('text')
      .attr('x', 15)
      .attr('dy', '.31em');

    return overlay;
  }

  _createOverlayInteraction(canvas, overlay, mouseInteraction, clickInteraction) {
    const invisibleWindow = canvas
      .append('rect')
      .attr('id', 'focus')
      .attr("fill", "none")
      .attr('pointer-events', 'all')
      .attr("width", width)
      .attr("height", height);

    invisibleWindow
      .on("mouseover", () => overlay.style('display', null))
      .on("mouseout", () => overlay.style('display', 'none'))
      .on("mousemove", mouseInteraction)
      .on('click', clickInteraction);

    return invisibleWindow;
  }

  _updateLineChart() {
    const { data, prevData, prevLine } = this.state
    const node = this.node;
    const canvas = d3.select(node);

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

    if (!trendLineExists && data.length !== 0) {
      const chart = this._createInitialLine(canvas, data, line);
      const overlay = this._createTrendOverlay(chart);
      const bisectDate = d3.bisector(d => d.date).left;

      function mouseInteraction() {
        const xPosition = xScale.invert(d3.mouse(this)[0]),
          date = bisectDate(data, xPosition, 1),
          current = data[date - 1],
          next = data[date] || 0,
          mouseMapping = xPosition - current.date > next.date - xPosition ? next : current;

        overlay.attr("transform", `translate(${xScale(mouseMapping.date)},${yScale(mouseMapping.value)})`);
        overlay.select("text")
          .text(() => mouseMapping.date.toDateString().slice(0, -4))
          .style('fill', 'red')
      }
      
      const updateDate = this.props.searchDate;
      
      function clickInteraction() {
        const xPosition = xScale.invert(d3.mouse(this)[0]),
          date = bisectDate(data, xPosition, 1),
          current = data[date - 1],
          next = data[date] || 0,
          mouseMapping = xPosition - current.date > next.date - xPosition ? next : current;
          
          d3.select('circle')
            .transition()
              .duration(300)
              .attr('r', 12)
              .attr('fill', '#006bb6')
            .transition()
              .duration(300)
              .attr('r', 5)
              .attr('fill', 'red');

          updateDate(mouseMapping.date);
      }

      this._createOverlayInteraction(canvas, overlay, mouseInteraction, clickInteraction);

      const initialLine = d3.select('#trendLine').select('path').attr('d');
      this.setState({ prevData: data, prevLine: initialLine });

      return canvas.node();
    }

    let dataChanged = JSON.stringify(data) !== JSON.stringify(prevData);

    if (dataChanged) {
      d3.select('#trendLine')
        .append('path')
        .datum(data)
        .attr('id', 'updatedLine')
        .attr('fill', 'none')
        .attr('stroke', '#006bb6')
        .attr('stroke-width', 5)
        .attr('d', line)
        .style('display', 'none')

      const updatedLine = d3.select('#trendLine').select('#updatedLine')
        .attr('d');

      d3.select('#trendLine').select('path')
        .transition()
        .duration(1800)
        .attrTween('d', () => {
          var previous = prevLine;
          var current = updatedLine;
          return interpolatePath(previous, current);
        });

      d3.select('#updatedLine').remove();
      d3.select('#trendOverlay').remove();
      d3.select('#focus').remove();

      const chart = d3.select('#trendLine');
      const overlay = this._createTrendOverlay(chart);
      const bisectDate = d3.bisector(d => d.date).left;

      function mouseInteraction() {
        const xPosition = xScale.invert(d3.mouse(this)[0]),
          date = bisectDate(data, xPosition, 1),
          current = data[date - 1],
          next = data[date] || 0,
          mouseMapping = xPosition - current.date > next.date - xPosition ? next : current;

        overlay.attr("transform", `translate(${xScale(mouseMapping.date)},${yScale(mouseMapping.value)})`);
        overlay.select("text")
          .text(() => mouseMapping.date.toDateString().slice(0, -4))
          .style('fill', 'red')
      }

      const updateDate = this.props.searchDate;

      function clickInteraction() {
        const xPosition = xScale.invert(d3.mouse(this)[0]),
          date = bisectDate(data, xPosition, 1),
          current = data[date - 1],
          next = data[date] || 0,
          mouseMapping = xPosition - current.date > next.date - xPosition ? next : current;

        d3.select('circle')
          .transition()
          .duration(300)
          .attr('r', 12)
          .attr('fill', '#006bb6')
          .transition()
          .duration(300)
          .attr('r', 5)
          .attr('fill', 'red');

        updateDate(mouseMapping.date);
      }

      this._createOverlayInteraction(canvas, overlay, mouseInteraction, clickInteraction);

      this.setState({ prevData: data, prevLine: updatedLine });
    }

  }

  render() {
    const firstDate = (this.state.data[0] !== undefined) ?
      this.state.data[0].date
        .toString()
        .split(' ')
        .slice(1, 3)
        .join(' ') : '';
    const lastDate = this.state.data[this.state.data.length - 1] !== undefined ?
      this.state.data[this.state.data.length - 1].date
        .toString()
        .split(' ')
        .slice(1, 3)
        .join(' ') : '';

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: {
        opacity: 1,
        transform: `translateY(1em)`,
        transition: `transform 600ms, opacity 1800ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`
      },
      exited: { transform: `translateY(-1em)`, opacity: 0 }
    };

    return (
      <div className="trend-wrapper--display">
        <Transition in={this.state.data[0] !== undefined} timeout={1000} >
          {(state) => (
            <div style={transitionStyles[state]}>
              <div className="component-label--display">
                Relative popularity between <span className="component-dynamiclabel--display">{firstDate}</span> and <span className="component-dynamiclabel--display">{lastDate}</span> 
              </div>
            </div>
          )}
        </Transition>
        <svg id="lineChart" width={width} height={height} ref={node => (this.node = node)} />
      </div>
    );
  }
}

export default TrendOverTime;