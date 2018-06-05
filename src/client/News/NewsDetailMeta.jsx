import React from 'react';
import moment from 'moment';

const NewsDetailMeta = ({ sourceName, date }) => {
  const test = moment(date).format('h:mm A');
  return (
    <div className="news-meta--wrapper">
    {sourceName}
    <br/>
    {test}
    </div>
  )
}

export default NewsDetailMeta;