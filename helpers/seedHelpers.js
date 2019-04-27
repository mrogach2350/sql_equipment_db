const saveInChunks = (dataType, data, model, res) => {
  if (data.length < 100) {
    model.bulkCreate(data)
    .then(result => res.json({ success: true, message: `${dataType}(s) created` }))
    .catch(err => res.send(err))
  }

  const someData = data.splice(0, 100);

  model.bulkCreate(someData)
    .then(() => saveInChunks(dataType, data, model, res))
    .catch(err => res.sendErr)
}

module.exports = {
  saveInChunks,
}