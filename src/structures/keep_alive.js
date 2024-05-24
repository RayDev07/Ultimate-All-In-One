const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Made By <strong> Ray </strong> And <strong> Ozuma </strong> <br>  <h3> Provided By Gamer CodeX</h3> ');
});

app.listen(port, () => {
  console.log(`Bot running on http://localhost:${port}`);
});
