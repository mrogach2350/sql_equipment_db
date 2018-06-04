require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.NAME || 'root',
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 6969;

require('./schema')(Sequelize, sequelize);
const Armor = require('./schema').Armor;
const Weapon = require('./schema').Weapon;

app.get('/', (req, res) => {
    res.send('go to /api for more stuff');
});

app.get('/api/weapons', (req, res) => {
    Weapon.findAll()
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        res.json(err);
    })
});

app.get('/api/weapons/:id', (req, res) => {
    let weaponId = req.params.id;
    Weapon.findById(weaponId)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    })
});

app.post('/api/weapons', (req, res) => {
    let weapon = Weapon.build(req.body);
    weapon.save()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/api/weapons/seed', (req, res) => {
    let mockWeapons = require('./Mock_Weapons.json');
    Weapon.bulkCreate(mockWeapons)
    .then(results => {
        res.json({
            success: true,
            message: `${results.length} weapons created`
        })
    })
    .catch(err => res.json(err));
});

app.delete('/api/weapons/seed', (req, res) => {
    Weapon.sync({ force: true })
    .then(result => {
        res.json({
            success: true,
            message: 'Weapons Table cleared'
        })
    })
    .catch(err => res.json(err));
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Listening on PORT: ', PORT);
    });
});

