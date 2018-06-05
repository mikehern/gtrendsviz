import React, { Component } from 'react';
import './news.css';

const NewsHeadline = (props) => {
  const _selectionHandler = () => {
    props.selectedArticle(props.headline);
  }

  const _deselectionHandler = () => {
    props.selectedArticle('');
  }
  
  return (
    <div
      className="headline"
      onClick={_selectionHandler}
      onMouseEnter={_selectionHandler}
      onMouseLeave={_deselectionHandler}
    >
      {props.headline}
    </div>
  )
}


export default NewsHeadline;