import React, { Component } from 'react';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import './news.css';
import NewsHeadline from './NewsHeadline';
import NewsDetail from './NewsDetail';
import NewsDetailPreview from './NewsDetailPreview';

const initialStyle = {
  boxShadow: `0 0 0 0px rgb(232, 232, 232)`,
  transition: `box-shadow 1000ms cubic-bezier(0.390, 0.575, 0.565, 1.000), color 1400ms`,
  width: `100%`,
  display: `flex`,
  borderRadius: `18px`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  color: `white`,
  height: `200px`,
  position: `relative`,
  transform: `translate(0, 100px)`
};

const transitionStyles = {
  entered: { boxShadow: `0 2px 60px 5px #CEDEFF`, color: `#006bb6` }
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
        <Transition in={selectedArticle.length > 0} timeout={{enter: 250, exit: 400}}>
          {(state) => (
            selectedArticle.length > 0 ?
              <div style={{...initialStyle, ...transitionStyles[state]}}>
                <NewsDetailPreview content={selectedArticle[0].description}/>
              </div>
              : null
          )}
        </Transition>
      </div>;
  }
}

export default News;