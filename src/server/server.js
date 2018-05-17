const express = require('express');
const os = require('os');

const search = require('./utils');
const app = express();

app.use(express.static('dist'));

app.get('/api/search/', async (req, res) => {
  const payload = { keyword: `${req.query.q}` };
  const result = await search.byTime(payload);
  const tempResult = JSON.stringify(result); //for testing only
  res.send({ results: tempResult }); //TODO: make D3-readable
});

app.get('/api/news/', async (req, res) => {
  const tempKeyword = 'Tesla production';
  const tempDate = new Date().toISOString();
  const result = await search.newsByDate(tempKeyword, tempDate);
  res.send({ news: result });
});

app.get('/api/getUserName', (req, res) => {
  res.send({ username: os.userInfo().username });
});


const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
