const config = require('../../config');
const moment = require('moment');

const googleTrends = require('google-trends-api');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.NEWSKEY);

const trendSinceJan2004 = (trendData) => {
  const parsed = JSON.parse(trendData);
  const valuesOnly = parsed.default.timelineData.map(el => {
    return {
      date: el.formattedAxisTime,
      value: el.value[0]
    };
  });
  return valuesOnly;
}

const byTime = async (payload) => {
  const startDate = () => {
    let date = new Date();
    let month = date.getMonth();
    date.setMonth(month - 1);
    return date;
  }

  payload.startTime = startDate();
  //Although API defaults endTime to today, results aren't always available
  //running through today.

  try {
    const result = await googleTrends.interestOverTime(payload);
    return trendSinceJan2004(result);
  } catch (err) {
    console.error(err);
  }
}

const newsByDate = async (keyword, date) => {
  const start = moment(date).set('hour', 0).set('minute', 0).format();
  const end = moment(date).set('hour', 23).set('minute', 59).format();

  const sources = [
    'associated-press',
    'bbc-news',
    'cnn',
    'the-washington-post',
    'the-wall-street-journal',
    'the-new-york-times',
    'the-hill',
    'the-economist',
    'reddit-r-all',
    'axios',
    'espn',
    'hacker-news',
    'bloomberg',
    'buzzfeed'
  ];

  const payload = {
    q: `${keyword}`,
    sources: sources.join(),
    from: start,
    to: end,
    language: 'en',
    sortBy: 'popularity',
    pageSize: 16,

  };

  try {
    const result = await newsapi.v2.everything(payload);
    return result;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { byTime, newsByDate };
