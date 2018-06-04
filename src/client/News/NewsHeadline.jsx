import React, { Component } from 'react';
import './news.css';

class NewsHeadline extends Component {
  constructor(props) {
    super(props);
    this._selectionHandler = this._selectionHandler.bind(this);
    this._deselectionHandler = this._deselectionHandler.bind(this);
  }

  _selectionHandler() {
    this.props.selectedArticle(this.props.headline);
  }

  _deselectionHandler() {
    this.props.selectedArticle('');
  }

  render() {
    return(
      <div
        className="headline"
        onClick={this._selectionHandler}
        onMouseEnter={this._selectionHandler}
        onMouseLeave={this._deselectionHandler}
      >
        {this.props.headline}
      </div>
    )
  }
}


export default NewsHeadline;