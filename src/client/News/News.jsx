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
      selectedArticle: '',
      displayArticleDetail: false,
    }

    this._selectHeadlineHandler = this._selectHeadlineHandler.bind(this);
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

    if (this.props.selectedArticle !== this.state.selectedArticle) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.date !== prevState.date) {
      this._fetchNewsForDate(this.props.keyword, this.props.date);
    }
  }

  _selectHeadlineHandler(headline) {
    this.setState({ selectedArticle: headline });
  }

  render() {
    const { data } = this.state;
    const articles = data.news !== undefined ? data.news.articles : [];

    return (
      <div>
        <TransitionGroup className="newsWrapper">
          {articles
            .map(({ title, url }) => (
              <CSSTransition
                in={articles.length > 0}
                key={url}
                timeout={1000}
                exit={false}
                classNames="hvr-back-pulse"
                mountOnEnter={true}
              >
                <NewsHeadline headline={title} selectedArticle={this._selectHeadlineHandler}/>
              </CSSTransition>
            ))
            .slice(0, 4)
          }
        </TransitionGroup>
      </div>
    );
  }
}

export default News;