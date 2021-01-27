const app = require('express')()
const consign = require('consign')

consign()
  .then('./config/middlewares.js') //carrega dependências de um arquivo
  .then('./api')
  .then('./config/routes.js')
  .into(app) // injeta as dependências carregadas no app instância do express

app.listen(3000, () => {
  console.log('Backend executando...')
})