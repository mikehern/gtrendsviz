import React, { Component } from 'react';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: this.props.keyword,
      date: this.props.date,
      data: [],
    }
  }
  
  componentDidMount() {
    const { keyword, date } = this.state;
    this._fetchNewsForDate(keyword, date);
  }

  _fetchNewsForDate(keyword, date) {
    fetch(`/api/news?keyword=${keyword}&date=${date}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data, keyword: keyword });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.data.length === 0) {
      return true;
    }

    if (nextProps.date !== nextState.date) {
      return true;
    }

    if (nextProps.keyword !== nextState.keyword) {
      return true;
    }
    
    return false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this._fetchNewsForDate(this.props.keyword, this.props.date);
    }
  }

  render() {
    return(
      <div className="newsWrapper">
        
      </div>
    );
  }
}

export default News;