const { Sequelize } = require('../db');
const { sequelize } = require('../db');

const Weapon = sequelize.define('weapon', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    weight: Sequelize.STRING,
    price: Sequelize.STRING,
    proficiency: Sequelize.STRING,
    weaponClass: Sequelize.STRING,
    damageType: Sequelize.STRING,
    source: Sequelize.STRING,
    special: Sequelize.STRING,
    dmgT: Sequelize.STRING,
    dmgS: Sequelize.STRING,
    dmgM: Sequelize.STRING,
    dmgL: Sequelize.STRING,
    critical: Sequelize.STRING
});

module.exports = Weapon;