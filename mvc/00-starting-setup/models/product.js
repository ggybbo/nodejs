const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductFromFile = (cb) => {
  return fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => console.error(err));
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => console.error(err));
      }
    });
  }

  static findById(id, cb) {
    getProductFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static deleteById(id) {
    getProductFromFile(products => {
      const updatedProduct = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        
      });
    });
  }
}