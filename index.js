require('dotenv').config();
const Sequelize = require('./db').Sequelize;
const sequelize = require('./db').sequelize;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 7000;

//Bring in Each Model
require('./schema')(Sequelize, sequelize);
const Armor = require('./schema').Armor;
const Weapon = require('./schema').Weapon;

app.get('/', (req, res) => {
    res.send('go to /api for more stuff');
});

//Weapon Router + Controller
const weaponRouter = require('./routes/weapon.router')(express, Weapon);
const armorRouter = require('./routes/armor.router')(express, Armor);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', armorRouter);
app.use('/api', weaponRouter);


//Initialize DB connection and start listening
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Listening on PORT: ', PORT);
    });
});

