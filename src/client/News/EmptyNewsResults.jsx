import React from 'react';
import emptynewsresults from '../assets/emptynewsresults.svg';

const EmptyNewsResults = () => {
  return(
    <div className="news-emptystate--display">
      <img src={emptynewsresults} />
      <br />
      <br />
      Sorry, we couldn't find any major news that day.
    </div>
  )
}

export default EmptyNewsResults;