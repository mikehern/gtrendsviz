import React from 'react';
import NewsDetailPreview from './NewsDetailPreview';

const NewsDetail = (props) => {
  const article = props.article[0];

  return(
    <div className="news-detail--wrapper">
      <div className="top">top</div>
      <NewsDetailPreview content={article.description} />
      <div className="bottom">bottom</div>
    </div>
  )
}

export default NewsDetail;