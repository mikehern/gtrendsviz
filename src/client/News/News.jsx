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

    return(
      <TransitionGroup className="newsWrapper">
        {articles
          .map(({ title, url }) => (
            <CSSTransition
              in={(articles.length > 0)}
              key={url}
              timeout={1000}
              exit={false}
              classNames="hvr-back-pulse">
              <NewsHeadline headline={title} />
            </CSSTransition>))
          .slice(0, 4)
        }
      </TransitionGroup>
    )
  }
}

export default News;