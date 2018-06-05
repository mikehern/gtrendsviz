import React, { Component } from 'react';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import './news.css';
import NewsHeadline from './NewsHeadline';
import NewsDetail from './NewsDetail';

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
    const { data } = this.state;
    const articles = data.news !== undefined ? data.news.articles : [];
    const article = articles.filter(article => (article.title === headline));

    this.setState({ selectedArticle: article });
  }

  render() {
    const { data, selectedArticle } = this.state;
    const articles = data.news !== undefined ? data.news.articles : [];

    return <div className="newsWrapper">
        <TransitionGroup className="newsCollectionWrapper">
          {articles
            .map(({ title, url }) => (
              <CSSTransition
                in={articles.length > 0}
                key={url}
                timeout={1000}
                exit={false}
                classNames="hvr-back-pulse"
              >
                <NewsHeadline
                  headline={title}
                  selectedArticle={this._selectHeadlineHandler}
                />
              </CSSTransition>
            ))
            .slice(0, 4)}
        </TransitionGroup>
        {/* <Transition timeout={{enter: 1400, exit: 400}}>
          {(state) => (

          )}
        </Transition> */}
        {selectedArticle.length > 0 && <NewsDetail article={selectedArticle} />}
      </div>;
  }
}

export default News;