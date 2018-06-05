import React from 'react';
import NewsDetailPreview from './NewsDetailPreview';
import NewsDetailImage from './NewsDetailImage';

const NewsDetail = (props) => {
  const article = props.article[0];

  return(
    <div className="news-detail--wrapper">
      <div className="top">top</div>
      <NewsDetailPreview content={article.description} />
      <NewsDetailImage image={article.urlToImage} />
    </div>
  )
}

export default NewsDetail;