const { saveInChunks } = require('../helpers/seedHelpers')

module.exports = (express, Feat) => {
  let featRouter = express.Router();

  // //LIST 
  // featRouter.get('/feats', (req, res) => {
  //     Feat.findAll()
  //     .then(results => res.json(results))
  //     .catch(err => res.json(err))
  // });

  //Pagination
  featRouter.get('/feats', (req, res) => {
    const currentPage = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit);
    const offset = currentPage * limit

    if(!limit) {
      Feat.findAll()
      .then(results => res.json({ totalNumberOfFeats: results.length }))
      .catch(err => res.json(err))
    } else {
      Feat.findAll({ limit, offset })
      .then(results => res.json(results))
      .catch(err => res.json(err))
    }
  });

  //GET BY ID
  featRouter.get('/feats/:id', (req, res) => {
      let featId = req.params.id;
      Feat.findById(featId)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  });

  //CREATE`
  featRouter.post('/feats', (req, res) => {
      let feat = Feat.build(req.body);
      feat.save()
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });

  //UPDATE
  featRouter.put('/feats/:id', (req, res) => {
      let featId = req.params.id;
      let featData = req.body;
      Feat.findById(featId)
      .then(feat => {
          feat.update(featData)
          .then(result => res.json({ success: true, data: result }));
      })
      .catch(err => res.json(err));
  });

  //DELETE
  featRouter.delete('/feats/:id', (req, res) => {
      let featId = req.params.id;
      Feat.findById(featId)
      .then(feat => {
          feat.destroy();
          res.json({
              success: true,
              data: feat,
              message: 'Successfully deleted'
          });
      })
      .catch(err => res.json(err));
  });

  //SEED - CREATE
  featRouter.post('/feats/seed', (req, res) => {
    let feats = require('../data/feats.json');
    console.log('feats: ', feats[0])
    Feat.sync({force: true})
    .then(() =>  saveInChunks('feat', feats, Feat, res))
    .catch(err => res.json(err));
  });

  //DELETE - API
  featRouter.delete('/feats/seed', (req, res) => {
      Feat.sync({ force: true })
      .then(result => {
          res.json({
              success: true,
              message: 'Feat Table cleared'
          })
      })
      .catch(err => res.json(err));
  });

  return featRouter;
}