const { Sequelize } = require('../db');
const { sequelize } = require('../db');

const Feat = sequelize.define('feat', {
  name: Sequelize.TEXT,
  type: Sequelize.TEXT,
  description: Sequelize.TEXT,
  prerequisites: Sequelize.TEXT,
  prerequisite_feats: Sequelize.TEXT,
  benefit: Sequelize.TEXT,
  normal: Sequelize.TEXT,
  special: Sequelize.TEXT,
  source: Sequelize.TEXT,
  fulltext: Sequelize.TEXT,
  teamwork: Sequelize.TEXT,
  critical: Sequelize.TEXT,
  grit: Sequelize.TEXT,
  style: Sequelize.TEXT,
  performance: Sequelize.TEXT,
  racial: Sequelize.TEXT,
  companion_familiar: Sequelize.TEXT,
  race_name: Sequelize.TEXT,
  note: Sequelize.TEXT,
  goal: Sequelize.TEXT,
  completion_benefit: Sequelize.TEXT,
  multiples: Sequelize.TEXT,
  suggested_traits: Sequelize.TEXT,
});

module.exports = Feat;