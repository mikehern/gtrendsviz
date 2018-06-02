import React, { Component } from 'react';
import NewsHeadline from './NewsHeadline';

class NewsCollection extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.headlines !== prevState.headlines) {
      return { headlines: nextProps.headlines };
    }
  }

  constructor() {
    super();
    this.state = { 
      headlines: []
    };
  }

  render() {
    console.log('newscollection state: ', this.state);
    const headlines = this.state
    return(
      <div className="newsCollectionWrapper" >
        {this.state.headlines}
      </div>
    )
  }
}

export default NewsCollection;