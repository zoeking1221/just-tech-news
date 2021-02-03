const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// turn on connection to db and server
// force: true means database connection must sync with the model definitions/associations.
// force: true means the tables will re-create is there are any association changes
// force: true is similar to DROP TABLE IF EXISTS
// *** need to update to force: true when you add the relationships
// once you turn on the server with sequelize.sync({ force: true }) and confirm the database tables were recreated,
// switch back to using { force: false } and restart the server one more time just to make sure the changes took hold
//  and you don't accidentally remove data!
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
