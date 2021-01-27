const app = require('express')()
const consign = require('consign')

consign()
  .then('./config/middlewares.js') //carrega dependências de um arquivo
  .into(app) // injeta as dependências carregadas no app instância do express

app.listen(3000, () => {
  console.log('Backend executando...')
})