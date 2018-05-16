const googleTrends = require('google-trends-api');

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


module.exports = { byTime };