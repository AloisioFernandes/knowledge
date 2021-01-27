const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = (app) => { //método da dependência consign para agregar requires ao app instância do express em index.js
  app.use(bodyParser.json())
  app.use(cors())
}