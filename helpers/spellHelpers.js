const Spell = require('../models/Spell')

const saveSpellsInChunks = (spellData, res) => {
    if(spellData.length < 100) {
        Spell.bulkCreate(spellData)
        .then(result => res.json({ success: true, message: `spells created`}))
        .catch(err => res.send(err))
    }

    const someSpells = spellData.splice(0, 100)

    Spell.bulkCreate(someSpells)
        .then(() => saveSpellsInChunks(spellData, res))
        .catch(err => res.send(err))
}

module.exports = {
    saveSpellsInChunks,
}