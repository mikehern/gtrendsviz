const express = require('express');
const os = require('os');

const search = require('./utils');
const app = express();

app.use(express.static('dist'));

app.get('/api/search/', async (req, res) => {
  const payload = { keyword: `${req.query.q}` };
  const result = await search.byTime(payload);
  res.send({ results: result });
});

app.get('/api/news/', async (req, res) => {
  const { keyword, date } = req.query;
  const result = await search.newsByDate(keyword, date);
  res.send({ news: result });
});

app.get('/api/relatedSearch/', async (req, res) => {
  const payload = { keyword: `${req.query.q}` };
  const result = await search.relatedQueries(payload);
  res.send({ results: result });
});

app.get('/api/getUserName', (req, res) => {
  res.send({ username: os.userInfo().username });
});

app.get('/api/getRecentTrends/', async (req, res) => {
  const result = await search.recentTrends();
  res.send(result);
});


const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
