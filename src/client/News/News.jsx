import React, { Component } from 'react';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import moment from 'moment';
import './news.css';
import NewsHeadline from './NewsHeadline';
import EmptyNewsResults from './EmptyNewsResults';

import {
  initPreviewStyle,
  previewTransitions,
  initMetaStyle,
  metaTransitions,
  initImgStyle,
  imgTransitions,
  labelTransitions,
} from './transitions';


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
    const { data, selectedArticle, date } = this.state;
    const articles = data.news !== undefined ? data.news.articles : [];
    const article = selectedArticle[0];
    //TODO: refactor using totalResults property from state, checking for 0
    const labelDate = (date !== null) ? date.toString().split(' ').slice(1, 3).join(' ') : '';

    const displayTime = (date) => moment(date).format('h:mm A');

    return <React.Fragment>
        {(articles.length > 0) &&
          <Transition in={articles.length > 0} timeout={10}>
            {state => (
              <div style={labelTransitions[state]}>
                <div className="component-label--display">
                  News headlines from <span className="component-dynamiclabel--display">
                    {labelDate}
                  </span>
                </div>
              </div>
            )}
          </Transition>
        }
        {((articles.length === 0) && (this.state.data.length !== 0)) && <EmptyNewsResults />}
        <div className="newsWrapper">
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
          <Transition in={Boolean(article)} timeout={{ enter: 250 }}>
            {state => (
              article ?
              <div className="news-detail--wrapper">
                <div style={{ ...initMetaStyle, ...metaTransitions[state] }}>
                  {article.source.name}
                  <br />
                  {displayTime(article.publishedAt)}
                </div>
                <div style={{ ...initPreviewStyle, ...previewTransitions[state] }}>
                  <div className="news-description--display">
                    {article.description}
                  </div>
                </div>
                <img style={{ ...initImgStyle, ...imgTransitions[state] }} src={article.urlToImage} />
              </div> : null)}
          </Transition>
        </div>
      </React.Fragment>;
  }
}

export default News;