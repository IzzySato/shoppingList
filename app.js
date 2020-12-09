const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const list = require('./private/data/list');

const app = express();

const msg404 = 'There are not the code that you are looking for.';
const port = 8000;

app.use('/css', express.static(path.join(__dirname, 'private', 'css')));
app.use('/img', express.static(path.join('private', 'img')));
app.use('/js', express.static(path.join('private', 'js')));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // res.set('Server', 'Wazubi Engine');
  // req.set('X-Powered-By', 'Magical Pixies');

  fs.readFile('./private/html/index.html', (error, pgPes) => {
    if (error) {
      res.writeHead(404);
      res.write(msg404);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(pgPes);
    }
    res.end();
  });
});

//GET
app.get('/data', (req, res) => {
  const {
    format,
    data
  } = req.query;

  if (format === 'json') {
    if (data === 'shoppingList') {
      res.setHeader('Content-Type', 'application/json');
      //TODO change name
      const shoppingList = list.getShopping();
      console.log(shoppingList);
      res.json(shoppingList);
    } else if (data == 'others') {
      res.setHeader('Content-Type', 'application/json');
      //TODO change name
      const otherData = list.getOtherList();
      //console.log(JSON.stringify(otherData));
      res.json(otherData);
    }
  } else if (format === 'html') {
    res.setHeader('Content-Type', 'text/html');
    const html = list.getHTML();
    //console.log(html);
    res.send(html);
  } else res.send({
    msg: 'wrong format'
  });
});

//POST
app.post('/data', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  //TODO change name
  const newProduct = req.body;
  list.getShopping().push(newProduct);
  console.log(newProduct);
  res.json(newProduct);
});

app.use((req, res, next) => {
  res.status(404).send(msg404);
});

app.listen(port, () => {
  console.log('Listening port ' + port + '.');
});