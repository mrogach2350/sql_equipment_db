require('dotenv').config();
const Sequelize = require('./db').Sequelize;
const sequelize = require('./db').sequelize;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 6969;

//Bring in Each Model
require('./schema')(Sequelize, sequelize);
const Armor = require('./schema').Armor;
const Weapon = require('./schema').Weapon;

app.get('/', (req, res) => {
    res.send('go to /api for more stuff');
});

//Weapon Router + Controller
const weaponRouter = require('./routes/weapon.router')(express, Weapon);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', weaponRouter);``

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Listening on PORT: ', PORT);
    });
});

