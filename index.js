require('dotenv').config();
const { Sequelize } = require('./db');
const { sequelize } = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 7000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('go to /api for more stuff');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// TODO: FINISH IO SETUP WHEN DB IS FINISHED
// io.on('connection', (socket) => {
//     console.log('user connected');

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });

//     socket.on('add-message', (message) => {
//         io.emit('message', {
//             type: 'new-message',
//             text: message
//         });
//     });
// });

//Bring in Each Model
const Weapon = require('./models/Weapon');
const Armor = require('./models/Armor');
const Spell = require('./models/Spell')

//Weapon Router + Controller
const armorRouter = require('./routes/armor.router')(express, Armor);
const weaponRouter = require('./routes/weapon.router')(express, Weapon);
const spellRouter = require('./routes/spell.router')(express, Spell);
app.use('/api', armorRouter);
app.use('/api', weaponRouter);
app.use('/api', spellRouter);

//Initialize DB connection and start listening
sequelize.sync().then(() => {
    http.listen(PORT, () => {
        console.log('Listening on PORT: ', PORT);
    });
});

