const { Sequelize } = require('../db');
const { sequelize } = require('../db');

const Armor = sequelize.define('armor', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    weight: Sequelize.STRING,
    price: Sequelize.TEXT,
    source: Sequelize.STRING,
    armorCheckPenalty: Sequelize.TEXT,
    maxDexBonus: Sequelize.STRING,
    arcaneSpellFailure: Sequelize.TEXT,
    armorType: Sequelize.STRING,
    armorBonus: Sequelize.TEXT,
    speed20Ft: Sequelize.STRING,
    speed30fFt: Sequelize.TEXT
});

module.exports = Armor;