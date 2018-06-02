import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './news.css';
import NewsHeadline from './NewsHeadline';

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
    const articles = (this.state.data.news !== undefined) ? this.state.data.news.articles : [];
    const headlines = articles.map(({ title, url }) => (
      <NewsHeadline headline={title} key={url} />
    )).slice(0, 4);
    return(
      <div className="newsWrapper">
        <CSSTransition in={(headlines.length > 0)} timeout={2500} classNames="initHeadline">
          <div>
            {headlines}
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default News;