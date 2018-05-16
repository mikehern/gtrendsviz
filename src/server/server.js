const express = require('express');
const os = require('os');
const googleTrends = require('google-trends-api');

const app = express();


app.use(express.static('dist'));

app.get('/api/getUserName', (req, res) => {
  console.log(`Client made a proxy request to /api`);
  res.send({ username: os.userInfo().username });
});


const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
