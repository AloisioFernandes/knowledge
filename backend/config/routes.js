module.exports = (app) => {
  app.route('/users')
    .post(app.api.user.save) // ação será feita pelo consign para registrar novo usuário
    .get(app.api.user.get) // ação para buscar dados de usuários

  app.route('/users/:id')
    .put(app.api.user.save) // ação para atualizar usuário
}