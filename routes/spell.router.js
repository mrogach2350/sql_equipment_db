const { saveSpellsInChunks } = require('../helpers/spellHelpers')

module.exports = (express, Spell) => {
    let spellRouter = express.Router();

    //PAGINATION
    spellRouter.get('/spells', (req, res) => {
        const currentPage = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit);
        const offset = currentPage * limit

        if(!limit) {
            Spell.findAll()
            .then(results => res.json({ totalNumberOfSpells: results.length }))
            .catch(err => res.json(err))
        } else {
            Spell.findAll({ limit, offset })
            .then(results => res.json(results))
            .catch(err => res.json(err))
        }
    })

    //GET BY ID
    spellRouter.get('/spells/:id', (req, res) => {
        let spellId = req.params.id;
        Spell.findById(spellId)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //CREATE`
    spellRouter.post('/spells', (req, res) => {
        let spell = Spell.build(req.body);
        spell.save()
        .then(result => res.json(result))
        .catch(err => res.json(err));
    });

    //UPDATE
    spellRouter.put('/spells/:id', (req, res) => {
        let spellId = req.params.id;
        let spellData = req.body;
        Spell.findById(spellId)
        .then(spell => {
            spell.update(spellData)
            .then(result => {
                res.json({
                    success: true,
                    data: result
                });
            });
        })
        .catch(err => res.json(err));
    });

    //DELETE
    spellRouter.delete('/spells/:id', (req, res) => {
        let spellId = req.params.id;
        Spell.findById(spellId)
        .then(spell => {
            spell.destroy();
            res.json({
                success: true,
                data: spell,
                message: 'Successfully deleted'
            });
        })
        .catch(err => res.json(err));
    });

    //SEED - CREATE
    spellRouter.post('/spells/seed', (req, res) => {
        let spellData = require('../data/spell.json');
        Spell.sync({force: true}).then(() => saveSpellsInChunks(spellData, res));
    });

    //DELETE - API
    spellRouter.delete('/spells/seed', (req, res) => {
        Spell.sync({ force: true })
        .then(result => {
            res.json({
                success: true,
                message: 'Spell Table cleared'
            })
        })
        .catch(err => res.json(err));
    });

    return spellRouter;
}