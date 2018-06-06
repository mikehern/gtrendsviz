import React from 'react';
import NewsDetailPreview from './NewsDetailPreview';
import NewsDetailImage from './NewsDetailImage';
import NewsDetailMeta from './NewsDetailMeta';

const NewsDetail = (props) => {
  const article = props.article[0];

  return(
    <div className="news-detail--wrapper">
      <NewsDetailMeta sourceName={article.source.name} date={article.publishedAt} />
      <NewsDetailPreview content={article.description} />
      <NewsDetailImage image={article.urlToImage} />
    </div>
  )
}

export default NewsDetail;