module.exports = initializeSchema = (Sequelize, sequelize) => {
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

    module.exports = {
        Armor: Armor,
        Weapon: Weapon
    }
}

