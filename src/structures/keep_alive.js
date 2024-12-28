const { Rectify } = require('enplex.js');
const app = new Rectify();
const port = 3000;

app.route('GET', '/', (req, res) => {
  res.send('Made By <strong> Ray </strong> And <strong> Ozuma </strong> <br>  <h3> Provided By Gamer CodeX</h3> ');
});

app.listen(port, () => {
  console.log(`Bot running on http://localhost:${port}`);
});
