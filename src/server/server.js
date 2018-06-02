const express = require('express');
const os = require('os');

const search = require('./utils');
const app = express();

app.use(express.static('dist'));

app.get('/api/search/', async (req, res) => {
  // const payload = { keyword: `${req.query.q}` };
  // const result = await search.byTime(payload);
  // res.send({ results: result });

  const tempResult = [
    { date: 'May 1', value: 2 },
    { date: 'May 2', value: 10 },
    { date: 'May 3', value: 3 },
    { date: 'May 4', value: 2 },
    { date: 'May 5', value: 8 },
    { date: 'May 6', value: 8 },
    { date: 'May 7', value: 7 },
    { date: 'May 8', value: 3 },
    { date: 'May 9', value: 8 },
    { date: 'May 10', value: 3 },
    { date: 'May 11', value: 3 },
    { date: 'May 12', value: 4 },
    { date: 'May 13', value: 2 },
    { date: 'May 14', value: 4 },
    { date: 'May 15', value: 23 },
    { date: 'May 16', value: 5 },
    { date: 'May 17', value: 8 },
    { date: 'May 18', value: 2 },
    { date: 'May 19', value: 2 },
    { date: 'May 20', value: 3 },
    { date: 'May 21', value: 23 },
    { date: 'May 22', value: 36 },
    { date: 'May 23', value: 55 },
    { date: 'May 24', value: 41 },
    { date: 'May 25', value: 78 },
    { date: 'May 26', value: 71 },
    { date: 'May 27', value: 100 },
    { date: 'May 28', value: 72 },
    { date: 'May 29', value: 83 },
    { date: 'May 30', value: 54 }
  ];

  res.send({ results: tempResult });
});

app.get('/api/news/', async (req, res) => {
  const { keyword, date } = req.query;
  const result = await search.newsByDate(keyword, date);
  res.send({ news: result });
});

app.get('/api/getUserName', (req, res) => {
  res.send({ username: os.userInfo().username });
});


const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
