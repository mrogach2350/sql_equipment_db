module.exports = (express, Armor) => {
    let armorRouter = express.Router();

    //LIST 
    armorRouter.get('/armor', (req, res) => {
        Armor.findAll()
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //GET BY ID
    armorRouter.get('/armor/:id', (req, res) => {
        let armorId = req.params.id;
        Armor.findById(armorId)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //CREATE`
    armorRouter.post('/armor', (req, res) => {
        let armor = Armor.build(req.body);
        armor.save()
        .then(result => res.json(result))
        .catch(err => res.json(err));
    });

    //UPDATE
    armorRouter.put('/armor/:id', (req, res) => {
        let armorId = req.params.id;
        let armorData = req.body;
        Armor.findById(armorId)
        .then(armor => {
            armor.update(armorData)
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
    armorRouter.delete('/armor/:id', (req, res) => {
        let armorId = req.params.id;
        Armor.findById(armorId)
        .then(armor => {
            armor.destroy();
            res.json({
                success: true,
                data: armor,
                message: 'Successfully deleted'
            });
        })
        .catch(err => res.json(err));
    });

    //SEED - CREATE
    armorRouter.post('/armor/seed', (req, res) => {
        let baseArmor = require('../_baseArmor.json');
        Armor.sync({force: true}).then(() => {
            Armor.bulkCreate(baseArmor)
            .then(results => {
                res.json({
                    success: true,
                    message: `${results.length} armor created`
                })
            })
            .catch(err => res.json(err));
        });
    });

    //DELETE - API
    armorRouter.delete('/armor/seed', (req, res) => {
        Armor.sync({ force: true })
        .then(result => {
            res.json({
                success: true,
                message: 'Armor Table cleared'
            })
        })
        .catch(err => res.json(err));
    });

    return armorRouter;
}