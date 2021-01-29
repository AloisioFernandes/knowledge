const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = (app) => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // extrai token do header da requisição
  }

  const strategy = new Strategy(params, (payload, done) => { // o payload passado é o mesmo do auth
    app.db('users')
      .where({ id: payload.id })
      .first()
      .then(user => done(null, user ? { ...payload } : false)) // done -> 1º parâmetro é o de erro, 2º é o usuário retornado na requisição e disponível em req.user
      .catch(err => done(err, false))
  })

  passport.use(strategy)

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }) // método para filtrar requisições que precisam de usuário logado
  }
}