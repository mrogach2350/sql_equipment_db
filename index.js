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
    Weapon.findAll().then(results => {
        res.json(results);
    });
});

app.get('/api/weapons/:id', (req, res) => {
    let weaponId = req.params.id;
    Weapon.findById(weaponId).then(result => {
        res.json(result);
    }).catch(err => {
        res.json(err);
    })
});

app.post('/api/weapons/bulk', (req, res) => {
    let weapons = req.body;
    Weapon.bulkCreate(weapons).then(result => {
            res.json(result);
        }
    )
});

sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => {
        console.log('Listening on PORT: ', PORT);
    });
});

let mockWeapon = {
    Name: "elementum nullam",
    Cost_Number: 89,
    Cost_Denom: "gp",
    DMG_S_Number: 2,
    DMG_S_Dice: "6",
    DMG_M_Number: 2,
    DMG_M_Dice: "3",
    Critical: 2,
    Crit_Range: "19-20",
    Range: 9,
    Weight: 9,
    Type: "J",
    Special: "",
    Masterwork: false
}

