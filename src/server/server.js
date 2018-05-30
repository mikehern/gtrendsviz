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
  const keyword = req.query.keyword;
  const date = req.query.date;
  const result = await search.newsByDate(keyword, date);
  res.send({ news: result });
});

app.get('/api/getUserName', (req, res) => {
  res.send({ username: os.userInfo().username });
});


const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
