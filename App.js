const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.send('Hello world!');
});

const gang = require('./gang.json');

app.post('/mygang', (req, res)=>{
  const pre = gang.date[req.body.date];
  const post = gang.month[req.body.month];
  res.send(`ชื่อแก๊งของคุณ คือ ${pre}${post}`);
});

const exRate = require('./currency.json');

app.get('/currency', (req, res)=>{
    let result = {};
    for(let currency in exRate) {
      result[currency] = exRate[currency].country;
    }
    res.json(result);
});

app.post('/exchange', (req,res)=>{
  const baht = req.body.baht;
  const rate = exRate[req.body.currency].rate
  res.json({amount: baht / rate, rate: rate});
});

app.get('/hello', (req, res)=>{
  consth = new Date().getHours();
  let p = 'evening';
  if(h < 12) p = 'morning';
  else if(h < 18) p = 'afternoon';
  res.send(`Good ${p}.`);
});

app.get('/bye', (req, res)=>{
  res.send('Good bye');
});

app.get('/iam/:name', (req, res)=>{
  res.send(`Nice to meet you, ${req.params.name}.`);
});

app.get('/iam/:name/:age', (req, res)=>{
  const name = req.params.name;
  const age = req.params.age> 50 ? 'old' : 'young';
  res.send(`Nice to meet you, ${name}. You're the ${age} one.`);
});

process.on('SIGINT', ()=>{
  console.log('User exits');
  process.exit();
});
app.listen(3000, (err)=>{
  if(err) console.error(err);
  else console.log('Server is listening at "http://localhost:3000"');
});
