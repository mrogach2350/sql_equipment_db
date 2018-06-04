module.exports = initializeSchema = (Sequelize, sequelize) => {
    const Weapon = sequelize.define('weapon', {
        Name: {
            type: Sequelize.STRING
        },
        Cost_Number: {
            type: Sequelize.INTEGER
        },
        Cost_Denom: {
            type: Sequelize.STRING
        },
        DMG_S_Number: {
            type: Sequelize.STRING
        },
        DMG_S_Dice: {
            type: Sequelize.STRING
        },
        DMG_M_Number: {
            type: Sequelize.STRING
        },
        DMG_M_Dice: {
            type: Sequelize.STRING
        },
        Critical: {
            type: Sequelize.STRING
        },
        Crit_Range: {
            type: Sequelize.STRING
        },
        Range: {
            type: Sequelize.STRING
        },
        Weight: {
            type: Sequelize.STRING
        },
        Type: {
            type: Sequelize.STRING
        },
        Special: {
            type: Sequelize.TEXT
        },
        Masterwork: {
            type: Sequelize.BOOLEAN
        }
    });
    
    const Armor = sequelize.define('armor', {
        Name: {
            type: Sequelize.STRING
        },
        Cost_Number: {
            type: Sequelize.INTEGER
        },
        Cost_Denom: {
            type: Sequelize.STRING
        }
    });

    module.exports = {
        Armor: Armor,
        Weapon: Weapon
    }
}

