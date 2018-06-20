import React from 'react';
import emptyrelatedsearch from '../assets/emptyrelatedsearch.svg';

const EmptySearchResults = () => {
  return (
    <div className="relatedsearch-empty--display">
      <img src={emptyrelatedsearch}/>
      <br />
      <br />
      There weren't many related searches.
    </div>
  )
}

export default EmptySearchResults;