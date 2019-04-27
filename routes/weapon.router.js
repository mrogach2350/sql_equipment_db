module.exports = (express, Weapon) => {
    let weaponRouter = express.Router();

    //LIST 
    weaponRouter.get('/weapons', (req, res) => {
        Weapon.findAll()
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //GET BY ID
    weaponRouter.get('/weapons/:id', (req, res) => {
        let weaponId = req.params.id;
        Weapon.findById(weaponId)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
    });

    //CREATE`
    weaponRouter.post('/weapons', (req, res) => {
        let weapon = Weapon.build(req.body);
        weapon.save()
        .then(result => res.json(result))
        .catch(err => res.json(err));
    });

    //UPDATE
    weaponRouter.put('/weapons/:id', (req, res) => {
        let weaponId = req.params.id;
        let weaponData = req.body;
        Weapon.findById(weaponId)
        .then(weapon => {
            weapon.update(weaponData)
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
    weaponRouter.delete('/weapons/:id', (req, res) => {
        let weaponId = req.params.id;
        Weapon.findById(weaponId)
        .then(weapon => {
            weapon.destroy();
            res.json({
                success: true,
                data: weapon,
                message: 'Successfully deleted'
            });
        })
        .catch(err => res.json(err));
    });

    //SEED - CREATE
    weaponRouter.post('/weapons/seed', (req, res) => {
        let baseWeapons = require('../data/baseWeapons');
        Weapon.sync({force:true}).then(() => {
            Weapon.bulkCreate(baseWeapons)
            .then(results => {
                res.json({
                    success: true,
                    message: `${results.length} weapons created`
                })
            })
            .catch(err => res.json(err));
        });
    });

    //DELETE - API
    weaponRouter.delete('/weapons/seed', (req, res) => {
        Weapon.sync({ force: true })
        .then(result => {
            res.json({
                success: true,
                message: 'Weapons Table cleared'
            })
        })
        .catch(err => res.json(err));
    });

    return weaponRouter;
}