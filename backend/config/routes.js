module.exports = (app) => {
  app.route('/users')
    .post(app.api.user.save) // ação será feita pelo consign para registrar novo usuário
    .get(app.api.user.get) // ação para buscar dados de usuários

  app.route('/users/:id')
    .put(app.api.user.save) // ação para atualizar usuário
    .get(app.api.user.getById) // ação para buscar usuário específico por ID

  app.route('/categories')
    .get(app.api.category.get) // busca todas as categorias
    .post(app.api.category.save) // registra nova categoria

  // Tem que vir anter de categories/:id
  app.route('/categories/tree')
    .get(app.api.category.getTree) // organiza as categorias em sistema de árvore

  app.route('/categories/:id')
    .get(app.api.category.getById) // busca categoria por ID
    .put(app.api.category.save) // atualiza categoria
    .delete(app.api.category.remove) // remove uma categoria
}