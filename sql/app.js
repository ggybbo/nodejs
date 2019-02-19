const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
//   .then(data => console.log(data))
//   .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { // middle ware는 매번 요청마다 실행되며, sequelize sync안의 함수는 서버가 실행될때 한번만 실행된다
  User.findById(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.error(err);
      });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
          .sync()
          // .sync({ force: true })
          .then(result => {
            return User.findById(1);
          })
          .then(user => {
            if (!user) {
              return User.create({ name: 'ggybbo', email: 'ggybbo@naver.com' });
            }
            return user;
          })
          .then(user => {
            // console.log(user);
            app.listen(3000);
          })
          .catch(err => {
            console.error(err);
          });
