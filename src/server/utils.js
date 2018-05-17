const config = require('../../config');

const googleTrends = require('google-trends-api');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.NEWSKEY);

const trendSinceJan2004 = (trendData) => {
  const parsed = JSON.parse(trendData);
  const valuesOnly = parsed.default.timelineData.map(el => el.value[0]);
  return valuesOnly;
}

const byTime = async (payload) => {
  try {
    const result = await googleTrends.interestOverTime(payload);
    return trendSinceJan2004(result);
  } catch (err) {
    console.error(err);
  }
}

const newsByDate = async (keyword, date) => {
  const payload = {
    q: `"${keyword}"`,
    language: 'en',
    sortBy: 'popularity',
    pageSize: 5,
  };

  try {
    const result = await newsapi.v2.everything(payload);
    return result;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { byTime, newsByDate };
