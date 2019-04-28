const { saveInChunks } = require('../helpers/seedHelpers')
const { itemGroupMapping } = require('../constants/magicItem.constants')


module.exports = (express, MagicItem) => {
  let magicItemRouter = express.Router();

  //PAGINATION
  magicItemRouter.get('/magicItems', (req, res) => {
    const currentPage = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit);
    const offset = currentPage * limit

    if(!limit) {
      MagicItem.findAll()
      .then(results => res.json({ totalNumberOfMagicItems: results.length }))
      .catch(err => res.json(err))
    } else {
      MagicItem.findAll({ limit, offset })
      .then(results => res.json(results))
      .catch(err => res.json(err))
    }
  })

  //GET BY ID
  magicItemRouter.get('/magicItems/:id', (req, res) => {
    let magicItemId = req.params.id;
    MagicItem.findById(magicItemId)
    .then(result => res.json(result))
    .catch(err => res.json(err))
  });

  //GET BY GROUP
  magicItemRouter.get('/magicItems/group/:group', (req, res) => {
    let group = req.params.group
    let groupKey = itemGroupMapping[group]

    MagicItem.findAll({ where: { group: groupKey } })
    .then(result => res.json(result))
    .catch(err => res.json(err))
  })

  //GET BY GROUP(S)
  magicItemRouter.post('/magicItems/group/', (req, res) => {
    const groupKeys = req.body.groups.map(x => ({
      group: { $eq: itemGroupMapping[x] }
    }))

    MagicItem.findAll({ 
      where: { 
        $or: groupKeys
      } 
    })
    .then(result => res.json(result))
    .catch(err => res.json(err))
  })

  //CREATE`
  magicItemRouter.post('/magicItems', (req, res) => {
    let magicItem = MagicItem.build(req.body);
    magicItem.save()
    .then(result => res.json(result))
    .catch(err => res.json(err));
  });

  //UPDATE
  magicItemRouter.put('/magicItems/:id', (req, res) => {
    let magicItemId = req.params.id;
    let magicItemData = req.body;
    MagicItem.findById(magicItemId)
    .then(magicItem => {
      magicItem.update(magicItemData)
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
  magicItemRouter.delete('/magicItems/:id', (req, res) => {
    let magicItemId = req.params.id;
    MagicItem.findById(magicItemId)
    .then(magicItem => {
      magicItem.destroy();
      res.json({
        success: true,
        data: magicItem,
        message: 'Successfully deleted'
      });
    })
    .catch(err => res.json(err));
  });

  //SEED - CREATE
  magicItemRouter.post('/magicItems/seed', (req, res) => {
    let magicItemData = require('../data/magicItems.json');
    MagicItem.sync({force: true})
    .then(() => saveInChunks('magicItem', magicItemData, MagicItem, res));
  });

  //DELETE - API
  magicItemRouter.delete('/magicItems/seed', (req, res) => {
    MagicItem.sync({ force: true })
    .then(result => {
      res.json({
        success: true,
        message: 'MagicItem Table cleared'
      })
    })
    .catch(err => res.json(err));
  });

  return magicItemRouter;
}