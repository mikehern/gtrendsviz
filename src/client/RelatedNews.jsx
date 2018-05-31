import React, { Component } from 'react';

class RelatedNews extends Component {
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
    fetch(`/api/news?keyword=${keyword}&date=${date}`)
      .then(res => res.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    return(<span>{JSON.stringify(this.state.data)}</span>);
  }
}

export default RelatedNews;