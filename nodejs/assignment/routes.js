const fs = require('fs');

const routeHandler = (req, res) => {
  const { method, url } = req;
  if (url === '/') {
    fs.readFile('./view/index.html', 'utf-8', (err, data) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.write(data);
      res.end();
    });
  } else if (url === '/users') {
    fs.readFile('./view/users.html', 'utf-8', (err, data) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.write(data);
      res.end();
    });
  } else if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', (err, data) => {
      if (err) throw err;
      const parsedBody = Buffer.concat(body).toString().split("=")[1];
      const timestamp = +new Date();
      fs.writeFile(`post_data_${timestamp}.txt`, parsedBody, err => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    })
  } else {
    fs.readFile('./view/error.html', 'utf-8', (err, data) => {
      if (err) throw err;
      res.writeHead(404);
      res.write(data);
      res.end();
    });
  }
}

module.exports = routeHandler;