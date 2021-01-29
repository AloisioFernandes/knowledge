const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db //permite usar app.db para fazer select, update, delete... em outros arquivos
app.mongoose = mongoose

consign()
  .include('./config/passport.js') // permite acessar a partir das rotas
  .then('./config/middlewares.js') //carrega dependências de um arquivo
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app) // injeta as dependências carregadas no app instância do express

app.listen(3000, () => {
  console.log('Backend executando...')
})