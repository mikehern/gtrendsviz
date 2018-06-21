import React from 'react';

const InitialSuggestion = () => {
  return(
    <div className="dashboard-suggestion--display">
      Select a date on the graph to see news for that day
      <br/>
      <br/>
      <div className="dashboard-description--display">
        <p>You're looking at relative popularity. So a datapoint twice as high as another was twice as popular, for the last 30 days. Actual volumes for the number of queries are not available.
          <br/><br />Interesting headlines usually occur on peak days. <br/>See if you can spot any patterns!
        </p>
      </div>
    </div>
  )
}

export default InitialSuggestion;