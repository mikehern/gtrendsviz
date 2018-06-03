import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './news.css';
import NewsHeadline from './NewsHeadline';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      date: null,
      data: [],
    }
  }
  
  componentDidMount() {
    const { keyword, date } = this.props;
    this._fetchNewsForDate(keyword, date);
  }

  _fetchNewsForDate(keyword, date) {
    fetch(`/api/news?keyword=${keyword}&date=${date}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ keyword: keyword, date: date, data: data });
      });
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.data.length === 0) {
      return true;
    }

    if (this.props.date !== this.state.date) {
      return true;
    }

    if (nextProps.date !== this.state.date) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.date !== prevState.date) {
      this._fetchNewsForDate(this.props.keyword, this.props.date);
    }
  }

  render() {
    const articles = this.state.data.news !== undefined ? this.state.data.news.articles : [];
    const headlines = articles
      .map(({ title, url }) => <NewsHeadline headline={title} key={url} />)
      .slice(0, 4);

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