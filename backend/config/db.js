const config = require('../knexfile')
const knex = require('knex')(config)

knex.migrate.latest([config]) //executa migrations assim que backend é carregado
module.exports = knex