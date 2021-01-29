module.exports = (app) => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .post(app.api.user.save) // ação será feita pelo consign para registrar novo usuário
    .get(app.api.user.get) // ação para buscar dados de usuários

  app.route('/users/:id')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .put(app.api.user.save) // ação para atualizar usuário
    .get(app.api.user.getById) // ação para buscar usuário específico por ID

  app.route('/categories')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.category.get) // busca todas as categorias
    .post(app.api.category.save) // registra nova categoria

  // Tem que vir anter de categories/:id
  app.route('/categories/tree')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.category.getTree) // organiza as categorias em sistema de árvore

  app.route('/categories/:id')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.category.getById) // busca categoria por ID
    .put(app.api.category.save) // atualiza categoria
    .delete(app.api.category.remove) // remove uma categoria

  app.route('/articles')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.article.get) // busca todos os artigos
    .post(app.api.article.save) // registra um novo artigo

  app.route('/articles/:id')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.article.getById) // busca artigo por ID
    .put(app.api.article.save) // atualiza artigo
    .delete(app.api.article.remove) // remove um artigo

  app.route('/categories/:id/articles')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.article.getByCategory) // busca artigos por categoria
}