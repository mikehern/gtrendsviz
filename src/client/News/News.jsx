import React, { Component } from 'react';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import './news.css';
import NewsHeadline from './NewsHeadline';
import NewsDetail from './NewsDetail';
import NewsDetailPreview from './NewsDetailPreview';
import moment from 'moment';

const initPreviewStyle = {
  boxShadow: `0 0 0 0px rgb(232, 232, 232)`,
  transition: `box-shadow 1000ms cubic-bezier(0.390, 0.575, 0.565, 1.000), color 1400ms`,
  width: `100%`,
  display: `flex`,
  borderRadius: `18px`,
  flexDirection: `column`,
  alignItems: `center`,
  color: `white`,
  transform: `translate(0, -280px)`
};

const previewTransitions = {
  entered: {
    boxShadow: `0 2px 60px 5px #CEDEFF`,
    color: `#006bb6`
  }
};

const initMetaStyle = {
  opacity: `0`,
  textShadow: `0px 0px 1px #F2F2F2`,
  transform: `translate(0, 200px)`,
  transition: `opacity 800ms cubic-bezier(0.755, 0.050, 0.855, 0.060), transform 600ms`,
  width: `100%`,
  fontSize: `20px`,
  marginBottom: `200px`
};

const metaTransitions = {
  entered: {
    opacity: 1,
    textShadow: `2px 14px 8px #d0d0d0`,
    transform: `translate(0, 0)`
  }
};

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
    const article = selectedArticle[0];

    const displayTime = (date) => moment(date).format('h:mm A');

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
        <Transition
          in={Boolean(article)}
          timeout={{enter: 250}}
        >
          {(state) => (
            article ?
              <div className="news-detail--wrapper">
                <div style={{...initMetaStyle, ...metaTransitions[state]}}>
                  {article.source.name}
                  <br />
                  {displayTime(article.publishedAt)}
                </div>
                <div style={{...initPreviewStyle, ...previewTransitions[state]}}>
                  <NewsDetailPreview content={article.description}/>
                </div>
              </div>
            : null
          )}
        </Transition>
      </div>;
  }
}

export default News;