const admin = require('./admin')

module.exports = (app) => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .post(admin(app.api.user.save)) // ação será feita pelo consign para registrar novo usuário se for admin
    .get(admin(app.api.user.get)) // ação para buscar dados de usuários se for admin

  app.route('/users/:id')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .put(admin(app.api.user.save)) // ação para atualizar usuário se for admin
    .get(admin(app.api.user.getById)) // ação para buscar usuário específico por ID se for admin

  app.route('/categories')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(admin(app.api.category.get)) // busca todas as categorias se for admin
    .post(admin(app.api.category.save)) // registra nova categoria se for admin

  // Tem que vir anter de categories/:id
  app.route('/categories/tree')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.category.getTree) // organiza as categorias em sistema de árvore

  app.route('/categories/:id')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.category.getById) // busca categoria por ID
    .put(admin(app.api.category.save)) // atualiza categoria se for admin
    .delete(admin(app.api.category.remove)) // remove uma categoria se for admin

  app.route('/articles')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(admin(app.api.article.get)) // busca todos os artigos se for admin
    .post(admin(app.api.article.save)) // registra um novo artigo se for admin

  app.route('/articles/:id')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.article.getById) // busca artigo por ID
    .put(admin(app.api.article.save)) // atualiza artigo se for admin
    .delete(admin(app.api.article.remove)) // remove um artigo se for admin

  app.route('/categories/:id/articles')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.article.getByCategory) // busca artigos por categoria

  app.route('/stats')
    .all(app.config.passport.authenticate()) // só permite a execução dos outros métodos se passar pela autenticação
    .get(app.api.stat.get) // busca a última estatística
}