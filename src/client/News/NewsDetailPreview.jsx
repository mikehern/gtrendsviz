import React from 'react';

const NewsDetailPreview = ({ content }) => {
  return (
    <div className="news-preview--wrapper">
      <div className="news-preview--padding">{content}</div>
    </div>
  );
}

export default NewsDetailPreview;