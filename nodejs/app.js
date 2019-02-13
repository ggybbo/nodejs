const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

const requestHandler = require('./routes');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html><head><title>My first page</title></head><body><h2>hello world</h2></body></html>`);
    return res.end();
  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    }); // new chunk is ready to be
    req.on('end', () => {
      fs.writeFileSync('rowBody.txt', body);
      const parsedBody = Buffer.concat(body).toString();
      fs.writeFileSync('body.txt', parsedBody);
      fs.writeFile('body.txt', parsedBody, (err) => {
        console.error(err);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
    fs.writeFileSync('message.json', JSON.stringify(req.headers));
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html><head><title>My another page</title></head><body><h2>hello world</h2><form action="/message" method="POST"><input type="text" name="message" /><input type="submit" /></form></body></html>`);
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write(`<html><head><title>My another page</title></head><body><h2>hello world</h2></body></html>`);
  res.end();
});
// const server = http.createServer(requestHandler); // module.exports

server.listen(7777);